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
     mkMob: function (mb)
     {
         var m = JSON.parse(JSON.stringify(this.mobs[mb]));

         this.initializeEntity(m);


         m.type = "mob";

         return m;
     },

     mobs:
     {
         testchicken:
         {
             name: "Chicken",
             desc: "",
             str: 75,
             sta: 50,
             res: 200,
             men: 90,
             drops: [{
                         prob: 1,
                         item: "testfeather",
                         count: 1
                     }],
             plan:
             [
                 {
                     prob: 0.7,
                     skill: "peck"
                 },
                 { prob: 0.3, skill: "peckground" }
             ]
         },

         eshroom:
         {
             name: "Evil Mushroom",
             desc: "One day, a mushroom turned into a monster... but... it didn't get any larger when that happened.",
             str: 50,
             res: 50,
             drops: [{
                         prob: 1,
                         item: "shroomcap",
                         count: 1
                     }]
         }
         ,
         dkfrog:
         {
             name: "Dark Frog",
             desc: "You can ask this frog is he's read any well-known gririmore, and his responce, more than likely, will be 'read-it read-it'.",
             str: 300,
             res: 300,
             sta: 300, men: 300
         }
         ,
         dsquirrel:
         {
             name: "Deadly Squirrel",
             desc: "Nuts with evil, this squirrel is as dangerous as squirls get!",
             str: 3600,
             sta: 3600,
             men: 2000,
             spd: 4600,
             res: 3600
         },

         reddragon:
         {
             name: "Red Dragon",
             desc: "...",
             str: 3600*1400,
             sta: 3600*400,
             men: 3600*100,
             spd: 3600*1900,
             res: 3600*1200,
             plan: [{
                     prob: 1,
                     skill: "firebreath"
                 }]
         }
     }
 });
