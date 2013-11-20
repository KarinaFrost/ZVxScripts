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
({
     rpgActions:
     {

         walk: function (src, sub, chan, ctx)
         {
             var x, i, steps = 0, adj, dest;

             const areas = this.areas[ctx.player.area];
             adj = areas.adjc;

             if (sub.length == 1)
             {
                 this.com.message(ctx.player.src, "You are at: " + this.areas[ctx.player.area].name + (this.areas[ctx.player.area].desc?": " + this.areas[ctx.player.area].desc : "")+ "\nFrom here you can go to:", this.theme.GAME, false, chan);
                 for ( i = 0; i < this.areas[ctx.player.area].adjc.length; i++)
                 {
                     var obj = this.areas[ctx.player.area].adjc[i];
                     var name = (typeof obj === "string" ? obj : obj.area);
                     var dist = (typeof obj === "string" ? 10  : obj.distance);
                     var areaObj = this.areas[name];
                     this.com.message(ctx.player.src, areaObj.name + " (" + name + ") Distance: " + dist , -1, false, chan);
                 }
                 this.com.message(ctx.player.src, "Other players in this area:", this.theme.RPG, false, chan);
                 var pll = this.activeState[ctx.rpg.name].players;
                 for (x in pll)
                 {
                     if (pll[x] != ctx.player && pll[x].area == ctx.player.area && sys.exists(pll[x].src) && sys.isInChannel(pll[x].src, chan))
                     {
                         this.com.message(ctx.player.src, pll[x].name + " [level "+this.level(pll[x].totalexp)+"]" + (pll[x].battle ? " [battling]": ""), this.theme.RPG, false, chan);

                     }
                 }
                 return;
             }



             l0: for (i = 1; i < sub.length; i++)
             {
                 var to = sub[i];

                 l1:
                 {

                     for (x in adj)
                     {
                         if (typeof adj[x] == "string")
                         {
                             if (adj[x] == to)
                             {
                                 steps += 10;
                                 break l1;
                             }
                         }
                         else if (adj[x].area == to)
                         {
                             steps += adj[x].distance;
                             break l1;
                         }
                     } // end for loop


                     this.com.message([src], "Can't find that place!", this.theme.RPG, false, chan);
                     break l0;
                 } // end l1

                 if (ctx.player.sp < steps)
                 {
                     this.com.message(src, "Not enough stamina (SP)!", this.theme.RPG);
                     break l0;
                 }


                 dest = to;
                 adj = this.areas[to].adjc;

                 ctx.player.activeActions.push({ timer: Math.max(Math.round(steps/10), 1), sp:steps, done: "walk", to: to });

             }

             if (dest)
             {
                 this.com.message(ctx.player.src, "You started walking to " +this.areas[dest].name+ "!", this.theme.GAME, false, chan);
//                 ctx.player.activeActions.push({ timer:1, done: "location"});
             }



         },

         dig: function (src, sub, chan, ctx)
         {
             ctx.player.activeActions.push({ timer: 40, done: "dig", tick: "digTick" });
         },

         flee: function (src, sub, chan, ctx)
         {
             if (!ctx.player.battle) return;

             if (ctx.player.flee) return;
             ctx.player.flee = 3;
             this.com.message(ctx.player.src, "You plan to flee this battle!", this.theme.GAME, false, chan);
         },

         dequip: function (src, sub, chan, ctx)
         {
             var slot = (sub[1]||"").toLowerCase();

             if (! (slot in {"lhand":null, "rhand":null, "head":null, "feet":null, "body":null, "back":null}))
             {
                 this.com.message([src], "Unknown slot to dequip");
                 return;
             }// add error message

             var item = ctx.player[slot];

             if (item === undefined) throw new Error("???");

             if (item === null && slot === "lhand" && ctx.player.rhand && ctx.player.rhand.hands === 2)
             {
                 item = ctx.player.rhand;
                 slot = "rhand";
             }

             if (item === null)
             {
                 this.com.message(src, "No item in that slot.");
                 return; // nothing to dequip
             }

             ctx.player[slot] = null; // remove item

             ctx.player.equips.unshift(item); // Add to equips

             this.com.message([src], "Item removed.");

         },

         battle: function (src, sub, chan, ctx)
         {
             var x;
             if (ctx.player.battle) return;

             if (! ctx.rpg.battleCounter) ctx.rpg.battleCounter = 0;

             var mobs = [];

             var ares = this.areas[ctx.player.area];
             var mba = [];

             if (ares.mobs)
             {

                 var totalProb = 0;

                 for (x in this.areas[ctx.player.area].mobs)
                 {
                     totalProb += this.areas[ctx.player.area].mobs[x].prob;
                 }

                 var rnd = Math.random()*totalProb;

                 var s = 0;

                 for (x in this.areas[ctx.player.area].mobs)
                 {
                     s += this.areas[ctx.player.area].mobs[x].prob;
                     if (rnd <= s)
                     {
                         mobs = mobs.concat(this.areas[ctx.player.area].mobs[x].mobs);
                     break;
                     }

                 }

                 for (x in mobs) mba.push(this.mkMob(mobs[x]));
             } else if (ares.battle)
             {
                 for (var x in ares.battle)
                 {
                     var count = 0;
                     var bt = ares.battle[x];
                     var min = (typeof bt.min == typeof Number() ? bt.min : 1);
                     var max = bt.max || 3;

                     count = min;

                     var prob = bt.prob || 0.5;

                     while (count < max && Math.random() < prob) count++;

                     if (count < min) count = min;

                     for (var i = 0; i < count; i++) { mba.push(this.mkMob(bt.mob || "testchicken")); mobs.push(this.mobs[bt.mob || "testchicken"].name);}
                 }
             }





             if (mba.length == 0)
             {
                 this.com.message(src, "No mobs here to battle!", this.theme.RPG, false, chan);
                 return;
             }

             var batId = this.newBattle(ctx.rpg);
             var batObj = this.getBattle(ctx.rpg, batId);

             ctx.player.battle = batId;
             batObj.teams = [[ctx.player.name], mba];

             this.com.message(sys.id(ctx.player.name), "You started battle with " + mobs.join(", ") + "!", this.theme.RPG, false,chan);

              var pll = this.activeState[ctx.rpg.name].players;
             for (x in pll)
             {
                 if (pll[x] != ctx.player && pll[x].area == ctx.player.area && sys.exists(pll[x].src) && sys.isInChannel(pll[x].src, chan))
                 {
                     this.com.message(pll[x].src, ctx.player.name + " started a battle! You can watch it using /rpg watch " + ctx.player.name, this.theme.RPG, false, chan);
                 }
             }


         },



         challenge:
         function(src, sub, chan , ctx)
         {
             var plname = ctx.action.match(/challenge(?:[,\/| ]([^;]+)$)?/)[1];
             if (!plname)
             {
                 this.com.message(src,  "Enter a player name (e.g. /rpg challenge ArchZombie0x)", this.theme.RPG, false, chan);
                 return;
             }

             var pl = this.getPlayer(ctx.rpg.name, plname, true);

             if (!pl)
             {
                 this.com.message(src,  "No such player!", this.theme.RPG, false, chan);
                 return;
             }

             if (ctx.player.battle)
             {
                 this.com.message(src,  "Leave your battle first!", this.theme.RPG, false, chan);
                 return;
             }

             ctx.player.chall = {name: plname.toLowerCase(), time: + new Date};

             if (pl.chall && pl.chall.name == ctx.player.name.toLowerCase())
             {

                 if ((+new Date) - pl.chall.time >= 60*1000)
                 {
                      this.com.message(src, "The other player's challenge expired by timeout.", this.theme.RPG, false, chan);

                 }
                 else
                 {
                     if (pl.battle || ctx.player.battle)
                     {
                         this.com.message([src, pl.src],  "Leave your battles first before PvP!", this.theme.RPG, false, chan);
                         return;
                     }
                     this.com.message([pl.src, src], "Started battle between " + pl.name + " and " + ctx.player.name + "!", this.theme.RPG, false, chan);

                     delete pl.chall;
                     delete ctx.player.chall;
                     var batId = this.newBattle(ctx.rpg);
                     var batObj = this.getBattle(ctx.rpg, batId);

                     batObj.allowJoins = false;

                     ctx.player.battle = batId;
                     pl.battle = batId;
                     batObj.teams = [[pl.name], [ctx.player.name]];

                     this.com.message([pl.src, src], "Battle betwen " + pl.name + " and " + ctx.player.name + "!", this.theme.RPG, false,chan);

                     var pll = this.activeState[ctx.rpg.name].players;
                     for (x in pll)
                     {
                         if (pll[x] != ctx.player && pll[x] != pl && pll[x].area == ctx.player.area && sys.exists(pll[x].src) && sys.isInChannel(pll[x].src, chan))
                         {
                             this.com.message(pll[x].src, ctx.player.name +" and " + pl.name + " started a battle! You can watch it using /rpg watch " + pl.name, this.theme.RPG, false, chan);
                         }
                     }

                     return;
                 }


             }

             this.com.message(pl.src, ctx.player.name + " challenged " + pl.name + "! Type '/rpg challenge " + ctx.player.name + "' to accept!", this.theme.RPG, false, chan);
             this.com.message(src, ctx.player.name + " challenged " + pl.name + "!", this.theme.RPG, false, chan);

         },

         look:
         function (src, sub, chan, ctx)
         {
            /* this.com.message(src, "Players in this area:", this.theme.RPG, false, chan);
             var pll = this.activeState[ctx.rpg.name].players;
             for (var x in pll)
             {
                 if (pll[x].area == ctx.player.area)
                 {
                     this.com.message(src, pll[x].name + "[level "+this.level(pll[x].totalexp)+"]" + (pll[x].battle ? " [battling]": ""), this.theme.RPG, false, chan);
                 }
             }*/
         },
	 /*
         test: function (src, sub, chan, ctx)
         {
             if (! ctx.rpg.battleCounter) ctx.rpg.battleCounter = 0;

             ctx.player.battle = ctx.rpg.battleCounter;
             ctx.rpg.battles[ctx.rpg.battleCounter++] = {players: [ctx.player.name], mobs: [this.mkMob("testchicken")]};


             for (var x in this.areas[ctx.player.area].mobs)
             {
                 this.com.message(sys.id(ctx.player.name), "You started battle with " + JSON.stringify(this.areas[ctx.player.area].mobs[x]), this.theme.GAME);
             }
         }*/
         //,
         view: function (src, sub, chan, ctx)
         {
             var msgs = [];

             this.com.message(src, "Your player:", this.theme.RPG, false, chan);
             msgs.push("<b>Level:</b> " + this.level(ctx.player.totalexp || 0));

             this.com.message(src, this.entHtml(ctx.player, sys.os(src) == "android"), this.theme.GAME, true, chan);
             if (ctx.player.rhand && this.equips[ctx.player.rhand.type].hands === 2)
             {
                 msgs.push("<b>Both Hands:</b> " + this.equipName(ctx.player.rhand));
             }
             else
             {
                 msgs.push("<b>Right Hand:</b> " + this.equipName(ctx.player.rhand));
                 msgs.push("<b>Left Hand:</b> " + this.equipName(ctx.player.lhand));
             }
             msgs.push("<b>Head:</b> " + this.equipName(ctx.player.head));
             msgs.push("<b>Body:</b> " + this.equipName(ctx.player.body));
             msgs.push("<b>Feet:</b> " + this.equipName(ctx.player.feet));
             msgs.push("<b>Back:</b> " + this.equipName(ctx.player.back));


             msgs.push("<b>RES:</b> " + Math.floor(ctx.player.res));
             msgs.push("<b>STR:</b> " + Math.floor(ctx.player.str));
             msgs.push("<b>STA:</b> " + Math.floor(ctx.player.sta));
             msgs.push("<b>SPD:</b> " + Math.floor(ctx.player.spd));
             msgs.push("<b>MEN:</b> " + Math.floor(ctx.player.men));
             msgs.push("<b>MAG:</b> " + Math.floor(ctx.player.mag));
             msgs.push("<b>PSY:</b> " + Math.floor(ctx.player.psy));
            // msgs.push("<b>SPR:</b> " + 0/0);

             this.less.less(src, msgs.join("<br />"), true, chan);
         },

         watch:
         function (src, sub, chan, ctx, cmd)
         {

             var plname = ctx.action.match(/watch(?:[,\/| ]([^;]+)$)?/)[1];
             if (!plname && !ctx.player.watching)
             {
                 this.com.message(src,  "Type a player name.", this.theme.RPG, false, chan);
                 return;
             }

             if (ctx.player.watching)
             {
                 var bat = this.getBattle(ctx.rpg, ctx.player.battle);
                 if (bat) bat.watchers.splice(bat.watchers.indexOf(ctx.player.name.toLowerCase(), 1));
                 ctx.player.watching = null;
             }

             if (!plname)
             {
                 this.com.message(src,  "No player to watch.", this.theme.RPG, false, chan);
                 return;
             }

             var pl = this.getPlayer(ctx.rpg.name, plname, true);



             if (!pl || pl.area != ctx.player.area)
             {
                 this.com.message(src,  "That player seems to be in another area or doesn't exist.", this.theme.RPG, false, chan);
                 return;
             }

             if (!pl.battle)
             {
                 this.com.message(src,  "That player doesn't seem to be battling.", this.theme.RPG, false, chan);
                 return;
             }

             var bat = this.getBattle(ctx.rpg, pl.battle);

             bat.watchers.push(ctx.player.name.toLowerCase());

             ctx.player.watching = pl.battle;

             var pll = this.pidsOfBattle(bat, chan);


             this.com.message(pll, ctx.player.name + " started watching the battle!", this.theme.RPG, false, chan);
         },

         allowjoins:
         function (src, sub, chan, ctx, cmd)
         {


             if (!ctx.player.battle)
             {
                 this.com.message(src,  "Not in a battle.", this.theme.RPG, false, chan);
                 return;
             }

             var bat = this.getBattle(ctx.rpg, ctx.player.battle);

             if (bat.allowJoins === false) // NOT undefined
             {
                 this.com.message(src,  "This battle is private.", this.theme.RPG, false, chan);
                 return;
             }

             bat.allowJoins = true;


             var pll = this.activeState[ctx.rpg.name].players;
             for (x in pll)
             {
                 if (pll[x] != ctx.player && pll[x].area == ctx.player.area && sys.exists(pll[x].src) && sys.isInChannel(pll[x].src, chan))
                 {
                     this.com.message(pll[x].src, ctx.player.name + " allowed joins for a battle! You can join it using /rpg joinbattle " + ctx.player.name, this.theme.RPG, false, chan);
                 }
             }

         },


         joinbattle:
         function (src, sub, chan, ctx, cmd)
         {

             var plname = ctx.action.match(/joinbattle(?:[,\/| ]([^;]+)$)?/)[1];
             if (ctx.player.battle)
             {
                 this.com.message(src,  "Finish your battle first.", this.theme.RPG, false, chan);
                 return;
             }

             if (ctx.player.watching)
             {
                 var bat = this.getBattle(ctx.rpg, ctx.player.battle);
                 if (bat) bat.watchers.splice(bat.watchers.indexOf(ctx.player.name.toLowerCase(), 1));
                 ctx.player.watching = null;
             }

             if (!plname)
             {
                 this.com.message(src,  "No player to join.", this.theme.RPG, false, chan);
                 return;
             }

             var pl = this.getPlayer(ctx.rpg.name, plname, true);



             if (!pl || pl.area != ctx.player.area)
             {
                 this.com.message(src,  "That player seems to be in another area or doesn't exist.", this.theme.RPG, false, chan);
                 return;
             }

             if (!pl.battle)
             {
                 this.com.message(src,  "That player doesn't seem to be battling.", this.theme.RPG, false, chan);
                 return;
             }

             var bat = this.getBattle(ctx.rpg, pl.battle);

             if (!bat.allowJoins)
             {
                 this.com.message(src,  "That battle can't be joined.", this.theme.RPG, false, chan);
                 return;
             }

             bat.teams[pl.team].push(ctx.player);

             ctx.player.battle = pl.battle;

             var pll = this.pidsOfBattle(bat, chan);

             this.com.message(pll, ctx.player.name + " joined the battle!", this.theme.RPG, false, chan);
         },

         items: function (src, sub, chan, ctx)
         {
             var msgs, x, items;

             this.com.message(src, "Your player's items:");

             msgs = [];

             items = ctx.player.items;

             for (x in items)
             {
                 msgs.push("<b>" + this.items[x].name + "</b> (x" + items[x] + ")");
             }

             this.less.less(src, msgs.join("<br />"), true);


         },

         use:
         function (src, sub, chan, ctx)
         {
             if (sub.length == 1)
             {
                 this.com.message(src,  "Select a move to use next turn using /rpg use <skillname> , for example: /rpg use heal", this.theme.RPG, false, chan);
                 return;
             }

             if (this.playerCanUseSkill(ctx.player, sub[1]))
             {
                 ctx.player.use = sub[1];
                 this.com.message(src,  "You plan to use " + sub[1] +".", this.theme.RPG, false, chan);
             }
             else if (this.skills[sub[1]]) this.com.message(src, "Skill Error: Not able to use skill \""+sub[1]+"\"!", this.theme.ERROR, false, chan);
             else this.com.message(src, "Skill Error: No such skill \""+sub[1]+"\", (example: /rpg use heal), make sure to use the shortnames, (e.g. elshock and not Electric Shock.)", this.theme.ERROR, false, chan);
         },

         plan: function (src, sub, chan, ctx)
         {
             var plan = [];
             if (sub.length == 1)
             {
                 this.com.message(src,  "Your plan is: " + JSON.stringify(plan), this.theme.RPG, false, chan);
                 return;
             }
             for (var x in sub)
             {
                 if (x != 0)
                 {
                     var pli = sub[x];

                     if (pli.match(/\w+:[\d\.]+/))
                     {
                         var m = pli.match(/(\w+):([\d\.]+)/);

                         var skname = m[1];
                         var prob = Number(m[2]);

                         if (this.playerCanUseSkill(ctx.player, skname))
                         {
                             plan.push({skill:skname, prob: prob});
                         }
                         else if (this.skills[skname]) this.com.message(src, "Skill Error: Not able to use skill \""+skname+"\"!", this.theme.ERROR, false, chan);
                         else this.com.message(src, "Skill Error: No such skill \""+skname+"\", (example: /rpg plan attack:5 strike:9 heal:1), make sure to use the shortnames, (e.g. elshock and not Electric Shock.)", this.theme.ERROR, false, chan);
                     }
                     else
                     {
                         this.com.message(src, "Format Error, (example: /rpg plan attack:5 strike:9 heal:1), make sure to use the shortnames, (e.g. elshock and not Electric Shock.)", this.theme.ERROR, false, chan);

                     }

                 }

             }

             ctx.player.plan = plan;

             this.com.message(src, "Your plan has been set to: " + JSON.stringify(plan), this.theme.RPG, false, chan);

         },

         print: function (src, sub, chan,ctx)
         {
             this.com.message(src, "Copy/pasteable char output:", this.theme.RPG, true, chan);

             var msgs = [];

             msgs.push("<b>Player:</b> " + ctx.player.name);
             msgs.push("<b>Level:</b> " + this.level(ctx.player.totalexp || 0));
             msgs.push("<b>RES:</b> " + Math.floor(ctx.player.res));
             msgs.push("<b>STR:</b> " + Math.floor(ctx.player.str));
             msgs.push("<b>STA:</b> " + Math.floor(ctx.player.sta));
             msgs.push("<b>SPD:</b> " + Math.floor(ctx.player.spd));
             msgs.push("<b>MEN:</b> " + Math.floor(ctx.player.men));
             msgs.push("<b>MAG:</b> " + Math.floor(ctx.player.mag));
             msgs.push("<b>PSY:</b> " + Math.floor(ctx.player.psy));


             for (var x in ctx.player.exp)
             {
                 if (this.playerCanUseSkill(ctx.player, x))
                 {
                     msgs.push("<b>["+x+"]</b>: "+this.level(ctx.player.exp[x]-this.skills[x].threshold));
                 }

             }

             this.com.message(src, msgs.join(", ") + " **", this.theme.RPG, true, chan);


         },

         skills: function (src, sub, chan, ctx)
         {
             var msg = [];
             for (var x in ctx.player.exp)
             {
                 if (this.playerCanUseSkill(ctx.player, x))
                 {
                     msg.push("<b>" + this.skills[x].name + "</b> ("+x+") [level "+this.level(ctx.player.exp[x]-this.skills[x].threshold)+"] " + (this.skills[x].desc|| "<description not yet added>"));
                 }

             }

             this.com.message(src, "Skills:<br/>" + msg.join("<br/>"), this.theme.RPG, true, chan);

         }
         ,
         equip: function (src, sub, chan, ctx)
         {
             if (!sub[1])
                 // list equips
             {
                 for (var x in ctx.player.equips)
                 {
                     this.com.message(src, "" + (+x+1) + ": " + this.equipName(ctx.player.equips[x]));
                 }

                 return;
             }

             var idx = +sub[1] - 1;

             var item = ctx.player.equips.splice(idx, 1)[0];
             var kind = this.equips[item.type];

             if (!item) return; // invalid indexing ._.

             var slot = kind.type;

             if (slot === "hand")
             {
                 if (sub[2] === "lhand") slot = "lhand";
                 else if (sub[2] === "rhand") slot = "rhand";
                 else
                 {
                     if (kind.hands !== 2)
                         // error
                     {
                         ctx.player.equips.unshift(item); // put item back
                         this.com.message(src, "Which hand?");
                         return; // exit
                     }

                     slot = "rhand";

                     if (ctx.player.lhand)

                         // remove left hand equip
                     {
                         ctx.player.equips.unshift(ctx.player.lhand);
                         ctx.player.lhand = null;
                     }
                 }
             }

             if (ctx.player[slot]) ctx.player.equips.unshift(ctx.player[slot]);// put old item back

             if (slot === "lhand" && ctx.player.rhand && this.equips[ctx.player.rhand.type].hands === 2)
             {
                 ctx.player.equips.unshift(ctx.player.rhand);// put old item back
                 ctx.player.rhand = null;
             }

             ctx.player[slot] = item;

             this.com.message(src, "Equipped " + this.equipName(item));

             return;
         }

     }
     ,
     actions:
     {
         location:
         function (actionObj, ctx)
         {


         },

         walk:
         function (act, ctx)
         {
             var oldarea, chan = ctx.chan;

             ctx.player.sp -= act.sp || 0;
             this.com.message(ctx.player.src, "Walked from " + this.areas[ctx.player.area].name + " to " +this.areas[act.to].name + ".", this.theme.RPG, false, ctx.chan);
             ctx.player.sta += Math.floor(act.sp/2);
             ctx.player.spd += Math.ceil(act.sp/2);
             var lv = this.level(ctx.player.totalexp);
             ctx.player.totalexp += act.sp;
             var newlv = this.level(ctx.player.totalexp);
             if (lv < newlv)
             {
                 this.com.broadcast(ctx.player.name + " has leveled up to level " + newlv + "!", this.theme.GAME, false, ctx.chan);
             }
             var pll = this.activeState[ctx.rpg.name].players;
             for (x in pll)
             {
                 if (pll[x] != ctx.player && pll[x].area == ctx.player.area && sys.exists(pll[x].src) && sys.isInChannel(pll[x].src, ctx.chan))
                 {
                     this.com.message(pll[x].src, ctx.player.name + " walked out of your area towards " +this.areas[act.to].name +".", this.theme.RPG, false, ctx.chan);
                 }
             }

             oldarea = ctx.player.area;

             ctx.player.area = act.to;
             if (ctx.player.activeActions.length != 1) return;
             this.com.message(ctx.player.src, "You are at: " + this.areas[ctx.player.area].name + (this.areas[ctx.player.area].desc?": " + this.areas[ctx.player.area].desc : "")+ "\nFrom here you can go to:", this.theme.GAME, false, ctx.chan);
             for (var i = 0; i < this.areas[ctx.player.area].adjc.length; i++)
             {
                 var obj = this.areas[ctx.player.area].adjc[i];
                 var name = (typeof obj === "string" ? obj : obj.area);
                 var dist = (typeof obj === "string" ? 10  : obj.distance);
                 var areaObj = this.areas[name];
                 this.com.message(ctx.player.src, areaObj.name + " (" + name + ") Distance: " + dist , -1, false, ctx.chan);
             }
             this.com.message(ctx.player.src, "Other players in this area:", this.theme.RPG, false, ctx.chan);
             for (x in pll)
             {
                 if (pll[x] != ctx.player && pll[x].area == ctx.player.area && sys.exists(pll[x].src) && sys.isInChannel(pll[x].src, ctx.chan))
                 {
                     this.com.message(ctx.player.src, pll[x].name + " [level "+this.level(pll[x].totalexp)+"]" + (pll[x].battle ? " [battling]": ""), this.theme.RPG, false, chan);
                     this.com.message(pll[x].src, ctx.player.name + " walked from " + this.areas[oldarea].name +" into your area.", this.theme.RPG, false, chan);
                 }
             }
             return;
         },

         dig:  function (actionObj, ctx)
         {
             //  print(this.util.inspect(ctx.player));
             var src = sys.id(ctx.player.name);
             this.com.message([src], "You dug something up!", this.theme.GAME);

             for (var x in this.areas[ctx.player.area].digs)
             {
                 this.com.message([src], "It was an " + x + "! You threw it away!", this.theme.GAME);
             }
         }
         ,
         explore: function (actionObj, ctx)
         {
             ctx.rpg.battles[ctx.rpg.battleCounter++] = {players: [ctx.player.name], mobs: [this.mkMob("testchicken")]};

             for (var x in this.areas[ctx.player.area].mobs)
             {
                 this.com.message(sys.id(ctx.player.name), "You started battle with " + JSON.stringify(this.areas[ctx.player.area].mobs[x]), this.theme.GAME);
             }
         }
         ,
         digTick: function (actionObj, ctx)
         {
             var src = sys.id(ctx.player.name);
             this.com.message([src], "You are digging a hole.", this.theme.GAME);
         }
     }
 });
