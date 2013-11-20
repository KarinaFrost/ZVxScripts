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

     /** Returns a made up "level" value, has no effect on gameplay, but needed because ZOMG rpg haz no levelz?!!?!?!
      *
      */
     level: function (exp)
     {
         return Math.floor(Math.log(exp/2 + Math.E) + Math.pow(exp/60,0.6)/2);
     },

     getPlayer: function (rpgname, name, soft)
     {
         //this.database.pdbCounter = Number(this.database.pdbCounter);

         var pid, pobj, np, x;

         pid = this.database.games[rpgname].pdb[name.toLowerCase()];
         pobj = this.activeState[rpgname].players[pid];

         if (!pid)
         {
             if (soft) return null;
             pid = ++this.database.games[rpgname].pdbCounter;
             this.database.games[rpgname].pdb[name.toLowerCase()] = pid;
             pobj = this.activeState[rpgname].players[pid];
         }

         if (!pobj)
         {
             pobj = this.io.registerDB(this, "rpg_game.game$"+rpgname+".p$" + String(pid));
             this.activeState[rpgname].players[pid] = pobj;
         }

         if (Object.keys(pobj) == 0)
         {
             np = this.newPlayer();

             for (x in np) pobj[x] = np[x];

             np = null; x = null;
         }

         pobj.name = name;
         if (!pobj.battleActions) pobj.battleActions = [];
         if (!pobj.totalexp) pobj.totalexp = 0;

         this.entityUpdateStats(pobj);
         return pobj;


     },


     newPlayer: function ()
     {
         var newp =
             {
                 type: null,
                 area: "town1",
                 name: null,

                 exp: {},


                 str: 100,                res: 100,
                 spd: 100,                mag: 100,
                 psy: 100,                spr: 100,
                 men: 100,

                 hp: 100, mp:0,
                 lp: 100, sp: 0,
                 msp: 0,

                 type: "player",

                 items: {},
                 // Bulk items, e.g., {... ironore: 50, ... }

                 equips: [],
                 // Single items

                 battle: null,
                 // Active battle ID

                 activeActions: [],
                 // Current action being executed. These occur outside of battle
                 // And they are qued.


                 bulkEffects: [],
                 // All of these are executed at the same time.

                 indvEffects: {},
                 // Like bulkEffects, but an object instead of array.

                 head: null,

                 body:
                 // Cotton clothing.
                 {

                     material: "cotton",
                     type: "clothes",
                     quality: 600
                 },


                 lhand: null,

                 rhand:
                 // A wooden sword.
                 {
                     material: "birch",
                     type: "sword",
                     quality: 600
                 },


                 feet:
                 // Leather shoes
                 {
                     material: "leather",
                     type: "shoes",
                     quality: 600
                 }

             };

         this.initializeEntity(newp);

         return newp;
     },

     playerStep: function (player, ctx)
     {
         // Only run player steps while the player is online
         var src = this.user.id(player.name);
         if (!src) return;
         else { player.src = src; player.os = sys.os(src); }

         if (player.battle) return;
         // Regular player events don't occur while the player is in a battle!

         if (!this.areas[player.area] || player.hp <= 0)
         {
             player.hp = 1;
             player.sp = 1;
             player.mp = 1;
             player.msp = 1;
             player.area = "graveyard";
             player.activeActions = [];

             this.com.message(player.src, 'You were revived at the graveyard...');
         }

         this.playerUpdateStats(player);

         this.entityTick(player);


         for (var x in player.activeActions)
         {
             if ("timer" in player.activeActions[x] && player.activeActions[x].timer-- <= 0)
             {
                 if (player.activeActions[x].done) this.actions[player.activeActions[x].done].call(this, player.activeActions[x], { rpg: ctx.rpg, player:player, index: x, chan:ctx.chan });
                 player.activeActions.shift();
                 break;
             }
             else if (player.activeActions[x].tick)
             {
                 this.actions[player.activeActions[x].tick].call(this, player.activeActions[x], { rpg: ctx.rpg, player:player, index: x, chan: ctx.chan  });
             }
             break;
         }



     }
     ,

     playerUpdateStats: function (e)
     {
         const constlist = ["str", "res", "sta", "men", "psy", "spd", "spr", "mag"];
         for (x in constlist)
         {
             e[constlist[x]] = Math.max(Math.abs(e[constlist[x]] || 0), 100);
         }
         this.entityUpdateStats(e);


         //  e.maxmp =  (e.mag*0.13 + (Math.log(e.mag+Math.E)*10 | 0));
         // e.maxsp = (e.str*0.02 + e.res*0.02 + (Math.log(e.res/100+Math.E)*150 | 0));
         //  e.maxmsp = (e.res*0.01 + e.mag*0.01 + e.psy*0.12 + e.spr*0.01 + (Math.log(e.psy/1000+Math.E)*50 | 0));
         //  e.maxhp = (e.str*0.01 + e.res*0.03 + (Math.log(e.res/100+Math.E)*100 | 0));
         //  e.power = Math.floor(800*Math.log(3/2*e.str+e.psy/3+Math.E)+e.psy/25000+300);
         //e.offense = Math.floor(e.power / 10000 * (100 + this.equipAtk(e.lhand) + this.equipAtk(e.rhand)));
         //e.defense = Math.floor(e.power / 10000 * (100 + this.equipDef(e.lhand)/2 + this.equipDef(e.rhand)/2 + this.equipDef(e.body) + this.equipDef(e.feet) + this.equipDef(e.head) + this.equipDef(e.back)));
     }
 });
