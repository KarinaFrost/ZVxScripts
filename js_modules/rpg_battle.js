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

     getBattle:
     function (rpg, bat)
     {
         return rpg.battles[bat];
     },

     battleStep: function (ctx)
     {
         var x, x2, x3, i, rpg = ctx.rpg, that = this;

         var battle = ctx.battle;

         if (!battle.tracker) battle.tracker = new Object;

         if (!battle.round) battle.round = 0;


         battle.round++;

         function isDead(e)
         {
             return (e.attr && e.attr.undead ? e.hp < -e.maxhp : e.hp <= 0) || e.msp <= 0 || e.sp <= 0;
         }

         function testDead (e)
         {


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


                 if (e.type == "player")
                 {
                     var pname = e.name.toLowerCase();

                     battle.players.splice(battle.players.indexOf(pname), 1);


                     that.getPlayer(rpg.name, pname).battle = null;
                     // Remove from battle.



                 }


                 else // type is "mob"
                 {
                     if (e.drops)
                     {
                         battle.droppedItems = battle.droppedItems || new Array;
                         var drops = that.util.arrayify(e.drops);

                         for (x in drops)
                         {
                             if (drops[x].prob > Math.random())
                             {
                                 if (typeof drops[x].item === "string") // bulk item
                                 {
                                     that.com.message(pids, "The defeated " + e.name + " dropped " + drops[x].count + " " + that.items[drops[x].item].name + "(s)", that.theme.RPG, false, ctx.chan);

                                     battle.droppedItems[drops[x].item] = (battle.droppedItems[drops[x].item] || 0) + drops[x].count;
                                 }
                             }
                         }
                     }

                     battle.mobs.splice(battle.mobs.indexOf(e),1);
                 }

                 return true;
             }

             else return false;
         }


         // team_players is an array of all the players that are playing
         // we make it from battle.players
         var team_players = [];
         for (x in battle.players)
         {
             team_players.push(this.getPlayer(rpg.name, battle.players[x]));
             // Battle players contains NAMES of players, not the player objects!

             // also set the tracker
             if (!battle.tracker[battle.players[x].toLowerCase()]) battle.tracker[battle.players[x].toLowerCase()] = { str:0, sta:0, mag:0, men:0, psy:0 };
         }

         var team_mobs = []; // Do not save!
         for ( x in battle.mobs)
         {
             team_mobs.push(battle.mobs[x]);
         }

         var entities = []; // Do not save!

         for (x in team_players)
         {
             entities.push(team_players[x]);
         }

         for (x in team_mobs)
         {
             entities.push(team_mobs[x]);
         }

         this.util.shuffle(entities);

         entities.sort(
             function (a, b)
             {
                 return b.spd - a.spd;
             }
         );

         var pids = [];

         for ( x in battle.players) if (sys.id(battle.players[x]))
         {
             var id = sys.id(battle.players[x]);
             pids.push(id);
             if (! sys.isInChannel(id, ctx.chan)) sys.putInChannel(id, ctx.chan);
         }

         this.com.message(pids, "Battle: Start Round #" + battle.round + ":", this.theme.RPG, false, ctx.chan);


         for (x in entities)
         {
             if (battle.round == 1) this.entityUpdateStats(entities[x]);
             this.entityTick(entities[x]);

         }

         this.printOutStatus(pids, entities, ctx.chan);


         l0: for (x in entities)
         {
             var attacker = ctx.attacker = entities[x];
             var at = entities[x].type;
             var move = ctx.move = this.pickMove(entities[x]);

             if (typeof attacker.flee == typeof Number())
             {
                 attacker.flee--;
                 this.com.message(pids, ctx.attacker.name + " is trying to escape!",
                                  this.theme.GAME, false, ctx.chan);
             }

             if (isDead(attacker)) continue;

             if (ctx.move.cost) for (x2 in ctx.move.cost)
             {


                 if (ctx.attacker[x2] <  ctx.move.cost[x2])
                 {
                     //ctx.attacker[x2] -= ctx.move.cost[x2]/3;
                     this.com.message(pids, ctx.attacker.name + " tried to use "  + ctx.move.name + " but didn't have enough " + x2.toUpperCase(),
                                      this.theme.GAME, false, ctx.chan);

                     if (attacker.type == "player")
                     {
                         x3 = {"mp":"mag", "sp":"sta", "msp":"men", "hp":"res", "lp": "spr"}[x2];
                         battle.tracker[attacker.name.toLowerCase()][x3] = (battle.tracker[attacker.name.toLowerCase()][x3] || 0) +  ctx.move.cost[x2]*5;
                     }
                     continue l0;
                 }
                 else
                 {

                     ctx.attacker[x2] -= ctx.move.cost[x2];
                     if (attacker.type == "player" && ctx.attacker[x2] <= ctx.attacker["max" + x2]/2)
                     {
                         x3 = {"mp":"mag", "sp":"sta", "msp":"men", "hp":"res", "lp": "spr"}[x2];
                         battle.tracker[attacker.name.toLowerCase()][x3] = (battle.tracker[attacker.name.toLowerCase()][x3] || 0) +  ctx.move.cost[x2];
                     }
                 }
             }

             this.com.message(pids, ctx.attacker.name + " used "  + ctx.move.name + "!", this.theme.RPG, false, ctx.chan);

             if (attacker.type === "player")
             {
                 // spd exp
                 battle.tracker[attacker.name.toLowerCase()].spd = (battle.tracker[attacker.name.toLowerCase()].spd || 0) + 10 * +x;
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
                         if (attacker.exp[ar[x2]] < (this.skills[ar[x2]] || {}).threshold) i.push(ar[x2]);
                         else div++;
                     }

                     if (i.length == 0)
                     {
                         break l1;
                     }

                     this.util.shuffle(i);
                     i.sort( function (a, b){ return ctx.attacker.exp[b] - ctx.attacker.exp[a]; } );

                     var oldexp = attacker.exp[i[0]] || 0;
                     attacker.exp[i[0]] = oldexp + Math.ceil(4 + 6/div);

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
                     if (at === "player")
                         targets = ctx.targets = ctx.targets.concat(team_players);
                     else
                         targets = ctx.targets = ctx.targets.concat(team_mobs);
                     break;
                 case "opp":
                     if (at !== "player")
                         targets = ctx.targets = ctx.targets.concat(team_players);
                     else
                         targets = ctx.targets = ctx.targets.concat(team_mobs);
                     break;
                 case "self":
                     ctx.targets.push(ctx.attacker);
                     break;
                 }



                 if (count == -1) count = targets.length;

                 else this.util.shuffle(targets);

                 var struck = [];

                 if (count > 0)
                 {
                     for (x3 in targets)
                     {

                         if (count-- === 0) break;


                         var dmgObj = this.moves[cmp.move].call(this, {attacker: entities[x], target:targets[x3], component:cmp, move: move});
                         var dmg = dmgObj.string;


                         struck.push(targets[x3].name + " "+dmg);

                         try {
                             if (targets[x3].type == "player" && dmgObj.exptype != "none" && dmgObj.exptype)
                             {
                                 battle.tracker[targets[x3].name.toLowerCase()].res = (battle.tracker[targets[x3].name.toLowerCase()][dmgObj.exptype||"res"] || 0) + (dmgObj.damage*2 || 0);
                             }


                             if (attacker.type == "player" && ctx.move.exp)
                             {
                                 battle.tracker[attacker.name.toLowerCase()][ctx.move.exp] = (battle.tracker[attacker.name.toLowerCase()][ctx.move.exp] || 0) + (Math.pow(cmp.base,2)/dmgObj.damage ||0);
                             }
                         } catch (e) {this.script.error(e);}
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

         this.com.message(pids, "Battle: End Round #" + battle.round + ":", this.theme.RPG, false, ctx.chan);

         this.printOutStatus(pids, entities, ctx.chan);



         if (battle.players.length == 0 || battle.mobs.length == 0)
         {
             this.com.message(pids, "Battle ended!", this.theme.RPG, false, ctx.chan);
            // print("endbattle");
             delete ctx.rpg.battles[ctx.battleId];
            // if (battle.players.length == 0) return;
             var dps = new Array(battle.players.length);
             // [i] = index of player id



             for (x in battle.droppedItems)
             {
                 while (battle.droppedItems[x]-- > 0)
                 {

                     i = Math.floor(Math.random()*dps.length);

                     dps[i] = dps[i] || new Object;

                     dps[i][x] = (dps[i][x] || 0) + 1;
                 }
             }

             for (i = 0; i < dps.length; i++)
             {
                 var msg = [];



                 for (x in dps[i])
                 {
                     msg.push(dps[i][x] + " " + that.items[x].name + "(s)");

                     this.getPlayer(rpg.name, battle.players[i]).items[x] = (this.getPlayer(rpg.name, battle.players[i]).items[x] || 0) + dps[i][x];
                 }

                 if (msg.length) this.com.message(pids, battle.players[i] + " got " + msg.join(", ") + "!", this.theme.RPG, false, ctx.chan);
             }


             for (i in battle.players)
             {
                 var pl = this.getPlayer(rpg.name, battle.players[i]);

                 pl.battle = null;

                 pl.totalexp = (pl.totalexp || 0);
                 var lv = this.level(pl.totalexp);
                 l2: if (battle.tracker[battle.players[i].toLowerCase()])
                 {
                     var trackr = battle.tracker[battle.players[i].toLowerCase()];
                     var tot = 0;
                     for (x in trackr)
                     {
                         tot += trackr[x];


                     }

                     var mult = battle.round*10/tot;

                     for (x in trackr)
                     {
                         var v = Math.floor(trackr[x]*mult);

                         if (typeof pl[x] != "number") { print("WARN: Error condition\n" + sys.backtrace()); break l2; }

                         pl[x]  += v;
                         pl.totalexp += v;

                     }
                 }
                // pl.totalexp += battle.round*10;
                 var lv2 = this.level(pl.totalexp);

                 if (lv2 > lv)
                 {
                     this.com.broadcast(pl.name + " has leveled up to level " + lv2 + "!", this.theme.GAME, false, ctx.chan);
                 }


             }

             //print("Deletebattle " + ctx.battleId);
             //delete rpg.battles[ctx.battleId];
         }
     }

 });
