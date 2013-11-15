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
             base: 75, res: 100,
             drops: [{ prob: 1, item: "testfeather", count: 1 }],
             plan:
             [{ prob: 0.7, skill: "peck"}, { prob: 0.3, skill: "peckground" }]
         },

         slime:
         {
             name: "Slime",
             desc: "A slimy slime!",
             base: 120,
             drops: [{ prob: 0.1, item: "goo", count: 1 }],
             plan: [{prob:1, skill:"attack"}]
         },

         spook:
         {
             name: "Spook",
             desc: "A ghastly spook. It's small size does not pack a small threat!",
             base: 350, res: 200,
             plan: [{prob:5, skill:"shadows"}, {prob:1, skill:"hellrain"}]

         },

         grim:
         {
             name: "Grim",
             desc: "A ghastly grim. It's a dangerous devil!",
             base: 350, res: 650,
             plan: [{prob:3, skill:"hellrain"},{prob:1, skill:"shadows"}]

         },

         mspook:
         {
             name: "Medium Spook",
             desc: "A ghastly spook. It's much larger than your average spook!",
             base: 950, res: 700,
             plan: [{prob:2, skill:"shadows"}, {prob:3, skill:"hellrain"}]

         },

         lspook:
         {
             name: "Large Spook",
             desc: "A ghastly spook. It's WAY larger than your average spook!",
             base: 1950, res: 1400,
             plan: [{prob:2, skill:"blackfog"},{prob:1, skill:"shadows"}, {prob:1, skill:"hellrain"}, {prob:2, skill: "blood"}]

         },

         sinester:
         {
             name: "Sinester",
             base: 3700,
             plan: [{prob:5, skill:"blackfog"}, {prob:1, skill:"hellrain"}, {prob:3, skill: "blood"}]
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
         },

         dkfrog:
         {
             name: "Dark Frog",
             desc: "You can ask this frog is he's read any well-known gririmore, and his responce, more than likely, will be 'read-it read-it'.",
             base: 300
         },

         dsquirrel:
         {
             name: "Deadly Squirrel",
             desc: "Nuts with evil, this squirrel is as dangerous as squirls get!",
             base: 3600,
             men: 2000,
             spd: 4600
         },

         reddragon:
         {
             name: "Red Dragon",
             desc: "...",
             base: 3600*1200,
             plan: [{
                     prob: 1,
                     skill: "firebreath"
                 }]
         }
     }
 });
