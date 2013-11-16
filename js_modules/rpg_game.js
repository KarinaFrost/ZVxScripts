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
/** Contains the RPG game :)
 * @name rpg_game
 * @memberOf script.modules
 * @requires io, com, theme, commands, util, logs, less
 * @namespace
 * @augments Module
 * */
/** @scope script.modules.rpg_game */
({

     require: ["io", "com", "theme", "commands", "util", "logs", "less", "color", "user"],

     include: ["rpg_areas", "rpg_player", "rpg_entity", "rpg_actions",
               "rpg_mobs", "rpg_equips", "rpg_materials", "rpg_moves",
               "rpg_battle", "rpg_items", "rpg_skills"],


     database: null,
     /** channel */
     channels: null,

     game: null,

     players: null,

     hooks: null
     ,
     loadModule: function ()
     {
         this.database = this.io.openDB("rpg_game");
         if (!this.database.games) this.database.games = new Object;
         this.channels = new Object;
         this.hooks = new Object;
         this.activeState = new Object;

         this.commands.registerCommand("loadrpg", this);
         this.commands.registerCommand("rpg", this);

         this.script.registerHandler("step", this);


         this.io.registerConfig(this, { lowBandwidth: false });

         for (var x in this.skills)
         {
             this.skills[x].shortname = x;
         }
     },

     unloadModule: function ()
     {
         this.io.closeDB("rpg_game");


     },

     step: function ()
     {
         for (var x in this.channels)
         {
             this.RPGStep(this.channels[x], x);
         }
     },

     RPGStep: function (rpg, chan)
     {

         if (rpg.paused) return;
         rpg.tick++;

         if (rpg.tick % 5 != 0) return;

         for (var x in rpg.areas)
         {
             this.areaStep(rpg.areas[x], { rpg: rpg, chan: chan });
         }

         for (x in this.activeState[rpg.name].players)
         {
             this.playerStep(this.activeState[rpg.name].players[x], {rpg: rpg, chan: chan});
         }

         for (x in rpg.battles)
         {
             this.battleStep( {rpg:rpg, battle: rpg.battles[x], battleId: x, chan:chan, message: this.hooks[rpg.name] });
         }
     },

     getRPG: function (rpgname)
     {
         if (this.database.games[rpgname])
         {
             this.activeState[rpgname] = { players: {} };
             return this.database.games[rpgname];
         }

         else
         {
             var newr = this.database.games[rpgname] =
                 {
                     name: rpgname,
                     areas: JSON.parse(JSON.stringify(this.areas)),
                     materials: {},
//                     players: {},
                     pdb: {},
                     pdbCounter: 0,
                     battles: {},
                     battleCoutner: 0,
                     running: false,
                     tick: 0
                 };



             this.activeState[rpgname] = { players: {} };


	     return newr;
         }

         return newr;
     },

     startRPGinChan: function (rpgname, chan)
     {
         var rpg = this.getRPG(rpgname);

         this.channels[chan] = rpg;

         if ( this.hooks[rpgname] ) throw new Error("Already hooked into another channel?");

         this.logs.logMessage(this.logs.INFO, "Loaded RPG game " + rpgname + " in channel " + sys.channel(chan));

         this.hooks[rpgname] =
             {
                 message: this.util.bind
                 (
                     this
                     ,
                     function(player, message)
                     {
                         this.com.message([player], message, this.theme.GAME, true, [chan]);
                     }
                 )
                 ,
                 broadcast: this.util.bind
                 (
                     this
                     ,
                     function (message)
                     {
                         this.com.broadcast(message, this.theme.GAME, true, [chan]);
                     }
                 )
             };


         rpg.running = true;
         rpg.chan = chan;

     },

     /** @type commandDescriptor */
     rpg: // not to be confused with "RPG"
     {
         category: "fun/rpg",
         desc: "Enter an RPG command!",
         perm: function ()
         {
             return true;
         },
         code: function (src, cmd, chan)
         {
             if (!this.channels[chan])
             {
                 this.com.message([src], "No RPG running in that channel", this.theme.WARN);
                 return;
             }

             var rpg = this.channels[chan];

             var player = this.getPlayer(rpg.name, this.user.name(src));


             //    this.com.message([src], "Creating you a new RPG character!", this.theme.GAME);
             //    this.logs.logMessage(this.logs.INFO, sys.name(src) + " created an RPG character in RPG " + rpg.
             player.name = this.user.name(src);

             if (!cmd.input || cmd.input.match(/^\s*$/))
             {
                 this.com.message(src, "Subcommands, (/rpg <subcommand>):\nwalk <area> (ommit area to show current area)\nview (view player stats)\nbattle (start a battle)\nitems (show items)\nplan <move>:<prob> <move>:<prob> ... (e.g. /rpg plan attack:5 heal:2)\nskills (shows your skills available to use via /rpg plan)\nequip Show available equips or equip one.\ndequip remove slot item", this.theme.RPG, false, chan);
                 return;
             }

             //    rpg.players[sys.name(src).toLowerCase()] = player;

             var actions = String(cmd.input).split(/\;/g);

             for (var x in actions)
             {
                 var subactions = actions[x].split(/[,\/| ]/g);

                 if (subactions.length == 0) continue;

                 subactions[0] = subactions[0].toLowerCase();
                 if (subactions[0] in this.rpgActions)
                 {
                     this.rpgActions[subactions[0]].apply(this, [src, subactions, chan, {player: player, rpg: rpg }] );
                 }
             }
         }
     },

     /** @type commandDescriptor */
     loadrpg:
     {
         desc: "Loads an RPG into a channel.",
         category: "administrative/rpg",
         perm: "RPG[ADMIN]",
         code: function (src, cmd, chan)
         {

             var rpgname = cmd.input.replace(/^\s*([^\s]+)\s*$/, "$1");

             if (this.channels[chan])
             {
                 this.com.message([src], "This channel already has a running RPG", this.theme.WARN);
                 return;
             }

             var rpg = this.getRPG(rpgname);

             if (this.hooks[rpgname])
             {
                 this.com.message([src], "RPG is already running!", this.theme.WARN);
                 return;
             }

             this.startRPGinChan(rpgname, chan);
         }
     },

     qMult:
     function (q)
     {
         // min
         return 1 - (1 / Math.log(q + 4));
     }


 });
