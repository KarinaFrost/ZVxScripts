/*  ///////////////////////// LEGAL NOTICE ///////////////////////////////

 This file is part of ZVxScripts,
 a modular script framework for Pokemon Online server scripting.

 Copyright (C) 2013  Ryan P. Nicholl, aka "ArchZombie" / "ArchZombie0x", <archzombielord@gmail.com>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.

 /////////////////////// END LEGAL NOTICE /////////////////////////////// */
/** An rpg battle descriptor. Note the format is subject to change.
 * @name rpgBattle
 * @class
 */
/** The players in the battle. Note this is an array of player /names/ not objects. This is done so as not to have duiplicates of player objects in the database.
 * @name players
 * @type {Array.<String>}
 * @memberOf rpgBattle.prototype
 */
/** The mobs in the battle.
 * @name mobs
 * @type {Array.<rpgMob>}
 * @memberOf rpgBattle.prototype
 */
/** @scope script.modules.rpg_game */
({
     /** Battle step will cause a turn in a battle to take place
      * @event
      * @param {rpgCtx} ctx
      * @param {rpgBattle} ctx.battleid The id of the specific battle this should step.
      * @param {rpgClass} ctx.rpg The current rpg we are in.
      */

     newBattle:
     function (rpg)
     {
         var id = rpg.battleCounter++;
         var bat = new Object;

         bat.round = 0;
         bat.watchers = [];
         bat.teams = [];

         rpg.battles[id] = bat;

         return id;
     },


     getBattle:
     function (rpg, bat)
     {
         return rpg.battles[bat];
     },

     getPlayersOfBattle:
     function (rpg, battle)
     {
         var x, x2, teams = battle.teams, players = [];

         for (x in teams) for (x2 in teams[x])
         {
             if (typeof teams[x][x2] == typeof String()) players.push(this.getPlayer(rpg.name, teams[x][x2]));

         }

         return players;
     },

     nn:
     function (a)
     {
         if (isNaN(a)) throw new Error("NaN");

         return a;
     },

     battleStep: function (ctx)
     {
         const DAMAGECONV = {"mp":"mag", "sp":"sta", "msp":"men", "hp":"res", "lp": "spr"};

         var _tmp, x, x2, x3, i, players, attacker, move, at, that = this, entities = [], rpg = ctx.rpg, battle = ctx.battle, teams = battle.teams, tracker, chan = ctx.chan, pids = this.pidsOfBattle(battle, chan);

         function nn(a)
         {
             if (isNaN(a)) throw new Error("NaN");

             return a;
         }

         function isDead(e)
         {
             return (e.attr && e.attr.undead ? e.hp < -e.maxhp : e.hp <= 0) || e.msp <= 0 || e.sp <= 0;
         }

         function testDead (e)
         {
             var pname, drops, x;

             if ((typeof e.flee == typeof Number() && e.flee <= 0) || (e.attr && e.attr.undead ? e.hp < -e.maxhp : e.hp <= 0) || e.msp <= 0 || e.sp <= 0)
             {
                 if ((e.attr && e.attr.undead ? e.hp < -e.maxhp : e.hp <= 0)) that.com.message(pids, e.name + " was slain!", that.theme.RPG, false, ctx.chan);
                 else if (e.sp <= 0) that.com.message(pids, e.name + " collapsed!", that.theme.RPG, false, ctx.chan);
                 else if (e.msp <= 0) that.com.message(pids, e.name + " lost consciousness!" , that.theme.RPG, false, ctx.chan);
                 else if (typeof e.flee == typeof Number() && e.flee <= 0)
                 {
                     delete e.flee;
                     that.com.message(pids, e.name + " escaped!" , that.theme.RPG, false, ctx.chan);
                 }
                 else that.com.message(pids, e.name + " died a mysterious death!", that.theme.RPG, false, ctx.chan);

                 // Remove from teams
                 teams[e.team].splice(teams[e.team].indexOf(e), 1);

                 if (e.type == "player")
                 {
                     pname = e.name.toLowerCase();

                     that.getPlayer(rpg.name, pname).battle = null;
                 }
                 if (e.drops)
                 {
                     drops = that.util.arrayify(e.drops);
                     for (x in drops) if (drops[x].prob > Math.random() && typeof drops[x].item === typeof String()) // b
                     {
                         that.com.message(pids, "The defeated " + e.name + " dropped " + drops[x].count + " " + that.items[drops[x].item].name + "(s)", that.theme.RPG, false, chan);
                         battle.droppedItems[drops[x].item] = (battle.droppedItems[drops[x].item] || 0) + drops[x].count;
                     }
                 }

                 return true;
             }

             else return false;
         }

         if (!battle.tracker) battle.tracker = new Object;
         if (!battle.round) { battle.round = 0; battle.xexp = 0; }
         if (!battle.droppedItems) battle.droppedItems = {};

         tracker = battle.tracker;
         battle.round++;




         for (x in teams) for (x2 in teams[x])
         {
             if (typeof teams[x][x2] == typeof String())
             {
                 entities.push(this.getPlayer(rpg.name, teams[x][x2]));
                 if (!entities[entities.length-1].battle) entities[entities.length-1].battle = ctx.battleId;
                 if (!battle.tracker[_tmp = teams[x][x2].toLowerCase()]) battle.tracker[_tmp] = { str:0, sta:0, mag:0, men:0, psy:0 };
             }
             else entities.push(teams[x][x2]);

             entities[entities.length-1].team = x;
         }


         this.util.shuffle(entities);
         entities.sort(function (a, b){ return b.spd - a.spd; });

         this.com.message(pids, "Battle: Start Round #" + battle.round + ":", this.theme.RPG, false, ctx.chan);


         for (x in entities)
         {
             if (battle.round == 1)
             {
//                 this.entityUpdateStats(entities[x]);
                 if (entities[x].xexp) battle.xexp += Number(entities[x].xexp);
                 entities[x].round = 1;
             }

             entities[x].round = (entities[x].round || 0) + 1;

             if (entities[x].attr)
             {
                 if (entities[x].attr.ghost) this.com.message(pids, entities[x].name + " is wrapped in shadows!", this.theme.RPG, false, ctx.chan);
                 if (entities[x].attr.flying) this.com.message(pids, entities[x].name + " is airborne!", this.theme.RPG, false, ctx.chan);

             }
         }

         roundLoop: for (x in entities)
         {
             attacker = ctx.attacker = entities[x];
             at = entities[x].type;
             move = ctx.move = this.pickMove(entities[x]);


             if (isDead(attacker)) continue roundLoop;
             if (typeof attacker.flee == typeof Number())
             {
                 attacker.flee--;
                 this.com.message(pids, ctx.attacker.name + " is trying to escape!", this.theme.GAME, false, ctx.chan);
                 continue roundLoop;
             }

             if (move.cost)
             {

                 for (x2 in move.cost)
                 {

                     var mul = 0.8;

                     if (attacker.type == "player")
                     {
                         mul = this.lMult(attacker.exp[move.shortname]/(this.skills[move.shortname].threshold+1));
                     }

                     var cos = Math.ceil(move.cost[x2] * mul);

                     nn(cos);

                     if (attacker[x2] <= cos)
                     {


                         //ctx.attacker[x2] -= ctx.move.cost[x2]/3;
                         this.com.message(pids, ctx.attacker.name + " tried to use "  + ctx.move.name + " but didn't have enough " + x2.toUpperCase() + "!",
                                          this.theme.GAME, false, ctx.chan);

                         if (attacker.type == "player")
                         {
                             x3 = DAMAGECONV[x2];
                             battle.tracker[attacker.name.toLowerCase()][x3] = (battle.tracker[attacker.name.toLowerCase()][x3] || 0) + 50;
                         }
                         continue roundLoop;
                     }
                 }

                 for (x2 in move.cost)
                 {
                     var mul = 0.8;

                     if (attacker.type == "player")
                     {
                         mul = this.lMult(attacker.exp[move.shortname]/(this.skills[move.shortname].threshold+1));
                     }

                     var cos = Math.ceil(move.cost[x2] * mul);
                     nn(cos);
                     ctx.attacker[x2] -= cos;

                     if (attacker.type == "player" && ctx.attacker[x2] <= ctx.attacker["max" + x2]/2)
                     {
                         x3 = DAMAGECONV[x2];
                         if (x3) battle.tracker[attacker.name.toLowerCase()][x3] = (battle.tracker[attacker.name.toLowerCase()][x3] || 0) +  10;
                     }
                 }
             }



             this.com.message(pids, ctx.attacker.name + " used "  + ctx.move.name + "!", this.theme.RPG, false, ctx.chan);

             //
             if (attacker.type === "player" && attacker.round <= 250)
             {
                 // spd exp
                 battle.tracker[attacker.name.toLowerCase()].spd = (battle.tracker[attacker.name.toLowerCase()].spd || 0) + x*10;
                 // move exp
                 if (!ctx.attacker.exp[move.shortname]) ctx.attacker.exp[move.shortname] = 0;

                 ctx.attacker.exp[move.shortname] += 10;

                 l1: if (this.skills[move.shortname].next)
                 {
                     var ar = this.skills[move.shortname].next;
                     var div = 1;
                     i = [];

                     for (x2 in ar)
                     {
                         attacker.exp[ar[x2]] = attacker.exp[ar[x2]] || 0;
                         l3:
                         {

                             l4:
                             {
                                 if (!this.skills[ar[x2]])
                                 {
                                     try
                                     {
                                         throw new Error("Skill '" + ar[x2] + "' does not exist!");
                                     } catch (e) { this.script.error(e); }
                                 }
                                 if (!this.skills[ar[x2]].prereq) break l4;

                                 for (x3 in this.skills[ar[x2]].prereq)
                                 {
                                     if (attacker.exp[this.skills[ar[x2]].prereq[x3]] < (this.skills[this.skills[ar[x2]].prereq[x3]] || {}).threshold)
                                     {
                                         break l3;
                                     }
                                 }
                             }

                             if (attacker.exp[ar[x2]] < (this.skills[ar[x2]] || {}).threshold)
                             {
                                 i.push(ar[x2]);
                             }
                             else div++;
                         }

                     }

                     if (i.length == 0)
                     {
                         break l1;
                     }

                     this.util.shuffle(i);
                     i.sort( function (a, b){ return ctx.attacker.exp[b] - ctx.attacker.exp[a]; } );

                     var oldexp = attacker.exp[i[0]] || 0;
                     attacker.exp[i[0]] =  oldexp + Math.max(0, Math.ceil(4 + 6/div));

                     if (attacker.exp[i[0]] >= (this.skills[i[0]] || {}).threshold)
                     {
                         this.com.message(this.user.id(attacker.name), "<hr/>", -1, true, ctx.chan);
                         this.com.message(this.user.id(attacker.name), "You gained the skill " + this.skills[i[0]].name + "!", this.theme.RPG, true, ctx.chan);
                         this.com.message(this.user.id(attacker.name), "<hr/>", -1, true, ctx.chan);
                     }



                 }
             }


             // todo: : redo this part in order to allow pvp
             for (x2 in ctx.move.components)
             {
                 var cmp = ctx.move.components[x2];
                 var targets = ctx.targets = [];
                 var count = cmp.count;
                 var t = this.util.arrayify(cmp.target);


                 for (x3 in t) switch(t[x3])
                 {
                 case "ally":
                     for (x4 in entities) if (entities[x4].team == attacker.team) targets.push(entities[x4]);
                     break;
                 case "opp":
                     for (x4 in entities) if (entities[x4].team != attacker.team) targets.push(entities[x4]);
                     break;
                 case "self":
                     ctx.targets.push(ctx.attacker);
                     break;
                 }



                 if (count == -1) count = targets.length;

                 else this.util.shuffle(targets);


                 var maxcount = count;

                 var struck = [];

                 if (count > 0)
                 {
                     for (x3 in targets)
                     {

                         if (count-- === 0) break;


                         var damage = this.runComponent(cmp, move, attacker, targets[x3]);
//                         var dmgObj = this.moves[cmp.move].call(this, {attacker: entities[x], target:targets[x3], component:cmp, move: move});
//                         var dmg = dmgObj.string;

                         var dmgParts = [];

                         for (x4 in damage)
                         {
                             dmgParts.push(String(Math.round(damage[x4])) + " " + x4.toUpperCase());
                         }
                         if (dmgParts.length) struck.push(targets[x3].name + " ("+dmgParts.join(", ") + ")");
                         else struck.push(targets[x3].name);

                         try
                         {
                             var q = Object.keys(damage);
                             for (x4 in damage)
                             {
                                 var etype = DAMAGECONV[x4];

                                 if (targets[x3].type == "player") if (etype) battle.tracker[targets[x3].name.toLowerCase()][etype] = nn(battle.tracker[targets[x3].name.toLowerCase()][etype] || 0) + nn(10/q.length);

                                 if (ctx.move.exp && attacker.type == "player")
                                 {
                                     battle.tracker[attacker.name.toLowerCase()][ctx.move.exp] = (battle.tracker[attacker.name.toLowerCase()][ctx.move.exp] || 0) +
                                         Math.abs(10*0.8*cmp.base/damage[x4] ||0);
                                 }

                             }
                         }
                         catch (e) {this.script.error(e);}
                     }


                 }

                 if (cmp.desc) this.com.message(pids, cmp.desc.replace(/%s/g, ctx.attacker.name).replace(/%t/, struck.join(" ")), this.theme.RPG, false, ctx.chan);







             }


             }




         for (i = 0; i < entities.length; i++)
         {


             if (testDead(entities[i]))
             {

                 entities.splice(i, 1);

                 i--;
             }



         }

         for (x in entities)
         {
             this.entityTick(entities[x]);
         }

         this.com.message(pids, "Battle: End Round #" + battle.round + ":", this.theme.RPG, false, ctx.chan);

         this.printOutStatus(pids, entities, ctx.chan);



         for (x in teams) if (teams[x].length == 0)
         {
             this.com.message(pids, "Battle ended!", this.theme.RPG, false, ctx.chan);

             delete ctx.rpg.battles[ctx.battleId];

             var dps = new Object;


             players = this.getPlayersOfBattle(rpg, battle);


             for (x in battle.droppedItems)
             {
                 while (battle.droppedItems[x]-- > 0)
                 {

                     i = Math.floor(Math.random()*players.length);

                     if (!dps[i]) dps[i] = new Object;

                     dps[i][x] = (dps[i][x] || 0) + 1;
                 }
             }

             for (var i in dps)
             {
                 var msg = [];
                 for (x in dps[i])
                 {
                     msg.push(dps[i][x] + " " + that.items[x].name + "(s)");

                     try
                     {
                         players[i].items[x] = (players[i].items[x] || 0) + dps[i][x];
                     }
                     catch (e)
                     {
                         this.script.error(e);
                     }
                 }

                 if (msg.length) this.com.message(pids, players[i] + " got " + msg.join(", ") + "!", this.theme.RPG, false, chan);
             }


             for (i in players)
             {
                 var pl = players[i];

                 pl.battle = null;

                 pl.totalexp = (pl.totalexp || 0);
                 var lv = this.level(pl.totalexp);
                 l2: if (battle.tracker[players[i].name.toLowerCase()])
                 {
                     var trackr = battle.tracker[players[i].name.toLowerCase()];
                     var tot = 0;
                     for (x in trackr)
                     {
                         tot += trackr[x];


                     }

                     var roundnum = 0;
                     var eroundnum = pl.round;

                     pl.round = 0;

                     for (x2 = 0; x2 < eroundnum && x2 < 100; x2++) roundnum++;
                     for (; x2 < eroundnum && x2 < 50; x2++) roundnum += 2/3;
                     for (; x2 < eroundnum && x2 < 100; x2++) roundnum += 1/2;
                     for (; x2 < eroundnum && x2 < 300; x2++) roundnum += 1/3;
                     for (; x2 < eroundnum && x2 < 500; x2++) roundnum += 1/5;
                     for (; x2 < eroundnum && x2 < 700; x2++) roundnum += 1/10;
                     for (; x2 < eroundnum && x2 < 1000; x2++) roundnum += 1/100;

                     roundnum = Math.round(roundnum);

                     //if (roundnum > 100) roundnum = 100 + (roundnum - 100) / 2;
                     var mult = nn(Math.min(roundnum*10 + nn(battle.xexp || 0), roundnum*15)/tot);

                     for (x in trackr)
                     {
                         var v = Math.floor(trackr[x]*mult);

                         if (typeof pl[x] != "number") { print("WARN: Error condition\n" + sys.backtrace()); break l2; }

                         pl[x] = nn(pl[x] + v);
                         pl.totalexp += nn(v);

                     }
                 }
                 // pl.totalexp += battle.round*10;
                 var lv2 = this.level(pl.totalexp);

                 if (lv2 > lv)
                 {
                     this.com.broadcast(pl.name + " has leveled up to level " + lv2 + "!", this.theme.GAME, false, ctx.chan);
                 }

                 for (x in battle.watchers)
                 {
                     this.getPlayer(ctx.rpg.name, battle.watchers[x]).watching = null;
                 }


             }

             //print("Deletebattle " + ctx.battleId);
             //delete rpg.battles[ctx.battleId];
         }
         },

     pidsOfBattle:
     function (battle, chan)
     {
         var pids = [], x, x2;

         for (x in battle.teams) for (x2 in battle.teams[x]) if (sys.id(battle.teams[x][x2]))
         {
             var id = sys.id(battle.teams[x][x2]);
             pids.push(id);
             if (! sys.isInChannel(id, chan)) sys.putInChannel(id, chan);
         }

         if (!battle.watchers) battle.watchers = [];

         for ( x in battle.watchers) if (sys.id(battle.watchers[x]))
         {
             var id = sys.id(battle.watchers[x]);
             pids.push(id);
             if (! sys.isInChannel(id, chan)) sys.putInChannel(id, chan);
         }

         return pids;
     }

 });
