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

         m.xexp = this.nn(Math.round(Math.log(this.totalStats(m)/3600 + 1)*100));


         m.type = "mob";

         return m;
     },

     mobs:
     {
         testchicken:
         {
             name: "Chicken",
             desc: "Just an everyday farm chicken.",
             base: 75, res: 100,
             drops: [{ prob: 1, item: "testfeather", count: 1 }],
             plan:
             [{ prob: 0.7, skill: "peck"}, { prob: 0.3, skill: "peckground" }]
         },

         slime:
         {
             name: "Slime", attr: {wet: true},
             desc: "An oddly adorable, gooey creature. Taste like blueberries.",
             base: 120,
             drops: [{ prob: 0.1, item: "goo", count: 1 }],
             plan: [{prob:1, skill:"attack"}]
         },

         slime2:
         {
             name: "Big Slime", attr: {wet: true},
             desc: "Just a slime with more goo.",
             base: 480,
             drops: [{ prob: 0.14, item: "goo", count: 1 }],
             plan: [{prob:1, skill:"attack"},{prob:1, skill: "sltackle"}]

         },

         slime3:
         {
             name: "Large Slime", attr: {wet: true},
             desc: "A big slime with more goo.",
             base: 960,
             drops: [{ prob: 0.14, item: "goo", count: 2 }],
             plan: [{prob:1, skill:"sltackle"}]

         },

         slime4:
         {
             name: "Huge Slime", attr: {wet: true},
             desc: "They just keep getting bigger...",
             base: 1440,
             drops: [{ prob: 0.16, item: "goo", count: 3 }],
             plan: [{prob:1, skill:"slvortex"},{prob:2, skill: "sltackle"}]

         },

         slime5:
         {
             name: "Enormous Slime", attr: {wet: true},
             desc: "...and bigger, and each had more goo than the last.",
             base: 2160,
             drops: [{ prob: 0.16, item: "goo", count: 4 }],
             plan: [{prob:1, skill: "slvortex"}]

         },

         slime6:
         {
             name: "Giant Slime", attr: {wet: true},
             desc: "A hulking slime that could easily surround you alone.",
             base: 3240,
             drops: [{ prob: 0.18, item: "goo", count: 5 }],
             plan: [{prob:1, skill:"slvortex"}]

         },

         slime7:
         {
             name: "Mega Slime", attr: {wet: true},
             desc: "These slimes are so big, they make Giant Slimes look like little kids.",
             base: 3600*2,
             drops: [{ prob: 0.2, item: "goo", count: 6 }],
             plan: [{prob:1, skill:"slvortex"}, {prob:1, skill: "slexp"}]

         },

         slime8:
         {
             name: "Giga Slime", attr: {wet: true},
             desc: "This slime is so big, it makes the Mega Slime look like an ant.",
             base: 3600*4.5,
             drops: [{ prob: 0.2, item: "goo", count: 6 }],
             plan: [{prob:2, skill:"slcrash"}, {prob:1, skill: "slexp"}]

         },

         slimed:
         {
             name: "Giga Slime Dragon", attr: {wet: true, flying: true},
             desc: "A dragon made out of slime...I don't get it either.",
             base: 3600*9,
             drops: [{ prob: 1, item: "goo", count: 8 }],
             plan: [{prob:1, skill:"slcrash"}, {prob:1, skill: "slbreath"}]

         },

         spook:
         {
             name: "Spook",
             desc: "A ghastly spook. It's small size does not pack a small threat!",
             base: 350, res: 200, attr: { ghost: true },
             plan: [{prob:5, skill:"shadows"}, {prob:1, skill:"hellrain"}],
             drops: [{ prob:0.1, item: "spkcrystal", count:1 }, { prob:0.1, item: "spkcrystal", count:1 }, { prob: 0.01, item: "destinygem", count:1 }]

         },

         grim:
         {
             name: "Grim",
             desc: "A ghastly grim. It's a dangerous devil!",
             base: 350, res: 650,  attr: { ghost: true, flying: true },
             plan: [{prob:3, skill:"hellrain"},{prob:1, skill:"shadows"}]

         },

         mspook:
         {
             name: "Medium Spook",
             desc: "A ghastly spook. It's much larger than your average spook!",
             base: 950, res: 700,  attr: { ghost: true },
             plan: [{prob:2, skill:"shadows"}, {prob:3, skill:"hellrain"}],
             drops: [{ prob:0.2, item: "spkcrystal", count:1 }, { prob:0.2, item: "spkcrystal", count:1 }, { prob: 0.07, item: "destinygem", count:1 }]

         },

         lspook:
         {
             name: "Large Spook",
             desc: "A ghastly spook. It's WAY larger than your average spook!",
             base: 1950, res: 1400, attr: { ghost: true },
             plan: [{prob:2, skill:"blackfog"},{prob:1, skill:"shadows"}, {prob:1, skill:"hellrain"}, {prob:2, skill: "blood"}],
             drops: [{ prob:0.3, item: "spkcrystal", count:1 }, { prob:0.3, item: "spkcrystal", count:1 }, { prob: 0.1, item: "destinygem", count:1 }]

         },

         sinester:
         {
             name: "Sinester",
             desc: "Just as the name implies, this sinister ghoul has ended many unsuspecting travelers' adventures.",
             base: 3700, attr: { ghost: true, flying: true }, mag: 4200,
             plan: [{prob:5, skill:"blackfog"}, {prob:1, skill:"hellstorm"}, {prob:3, skill: "blood"}],
             drops: [{ prob:1, item: "destinygem", count:1 }, { prob:0.5, item: "destinygem", count:1 }, { prob: 0.3, item: "destinygem", count:1 }]
         },

         sshell:
         {
             name: "Shallow Shell",
             desc: "A once-beautiful creature now turned evil by a curse on its soul.",
             base: 7600, str: 3600, sta: 1600, attr: {ghost: true},
             plan: [{prob:5, skill:"dispulse"}]
         },

         lshell:
         {
             name: "Lost Shell",
             desc: "A Shell that met its getting lost within the dark woods.",
             base: 12600,
             attr: {ghost: true},
             plan: [{prob:5, skill:"disblast"}, {prob:2, skill:"disfield"}]
         },

         oshell:
         {
             name: "Oblivion Shell",
             desc: "When ordinary Shells meet death by the lost Oblivion spells, these guys were made as a side effect.",
             base: 17600, str: 3600, sta: 3600,
             attr: {ghost: true},
             plan: [{prob:5, skill:"diswarp"}]
         },

         ushell:
         {
             name: "Uber Shell",
             desc: "Nothing more than a Giant Shell.",
             base: 23600, str: 3600, sta: 8600,
             attr: {ghost: true},
             plan: [{prob:5, skill:"disexpl"}]
         },

         xshell:
         {
             name: "X Shell",
             desc: "One of the top members of the Shells.",
             base: 35600, str: 3600, sta: 23600,
             attr: {ghost: true},
             plan: [{prob:5, skill:"disexpl"}]
         },

         xshell2:
         {
             name: "X Shell Vespir",
             desc: "A Shell whose power has earned it the name Vespir.",
             base: 41600, str: 3600, sta: 36600,
             attr: {ghost: true},
             plan: [{prob:5, skill:"disexpl"}]
         },

         xshell3:
         {
             name: "X Shell Exolesco",
             desc: "A much more rare and powerful breed of Shell, this one was once the king of the Shells.",
             base: 72600, str: 3600, sta: 55600,
             attr: {ghost: true},
             plan: [{prob:5, skill:"disexpl"}]
         },

         zombie:
         {
             name: "Zombie",
             desc: "Just your typical, animated corspe.",
             base: 3600, sta: 6000, men: 6000, str: 4000, res: 8000,
             attr: {undead: true},
             plan: [{prob:3, skill: "superpunch"}, {prob: 1, skill:"sonichand"}]
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

         bat:
         {
             name: "Scary Bat",
             desc: "An unfortunately frightening bat.",
             base: 700, spd: 400, attr: {flying: true},
             plan:[{ prob:1, skill:"fangs"}]
         },

         lsquirrel:
         {
             name: "Lethal Squirrel",
             desc: "A squirrel trained to kill.",
             base: 1200,
             men: 600,
             spd: 3600,
             plan:[{ prob:1, skill:"fangs"}]
         },

         dsquirrel:
         {
             name: "Deadly Squirrel",
             desc: "A Lethal Squirrel that has traded its bite for a super-charged punch.",
             base: 1600,
             men: 800,
             spd: 4600,
             plan: [{prob:1, skill: "superpunch"}]
         },

         adsquirrel:
         {
             name: "Armoured Deadly Squirrel",
             desc: "The knights of the squirrel world.",
             base: 1600,
             res: 4600,
             men: 800,
             spd: 3600,
             plan: [{prob:1, skill: "superpunch"}]
         },

         jetsquirrel:
         {
             name: "Deadly Squirrel with Jetpack", attr: { flying: true },
             desc: "As if a Deadly Squirrel itself was a pain, this one has flight!",
             base: 4400,
             men: 3300,
             spd: 7600,
             plan: [{prob:2, skill: "sonichand"}, {prob:1, skill: "bombs"}]
         },

         golem:
         {
             name: "Golem", attr: {grounded: true},
             desc: "A stone protector whose job is to be as solid as possible, yet keep away threats.",
             base: 5600, res: 24000, sta: 17000, spd: 2400,
             plan: [{prob:2, skill: "superpunch"}, {prob:1, skill: "grndbrk"}]
         },

         sgolem:
         {
             name: "Super Golem", attr: {grounded: true},
             desc: "An upgraded Golem that's more likely to use its kick instead of it's punch.",
             base: 9600, res: 29000, sta: 21000, spd: 2300,
             plan: [{prob:1, skill: "superpunch"}, {prob:2, skill: "grndbrk"}]
         },

         elector:
         {
             name: "Elector", attr: {flying:true},
             desc: "A mysterious creature that can call electricty to its aid.",
             base: 24600, res: 7200, sta: 5000, spd: 65200,
             plan: [{prob:5, skill: "thunderstorm"}, {prob:2, skill: "voltblast"}, {prob:1, skill: "bombs"}]
         },

         rouge:
         {
             name: "Rouge",
             desc: "Speedy people whose job it is to chip away your defenses enough for bigger threats to easily slay you.",
             base: 14600, res: 17200, sta: 25000, spd: 35200,
             plan: [{prob:5, skill: "attack"}, {prob:4, skill: "superkick"}, {prob:2, skill: "shadows"}, {prob:1, skill: "bombs"}]
         },

         warrior:
         {
             name: "Warrior",
             desc: "The warrior clad in shining armor with his sword in hand is a force to be reckoned with.",
             base: 34600, str:65305 ,res: 47200, sta: 55000, spd: 15200,
             plan: [{prob:5, skill: "attack"}, {prob:2, skill: "sweep"}, {prob:2, skill: "sonichand"}, {prob:3, skill: "punch"}]
         },

         priest:
         {
             name: "Priest",
             desc: "A follower of the Holy Lord, they specialize in keeping their allies alive.",
             base: 100, res: 1720, sta: 65525, spd: 1050, mag: 33450, men: 14520,
             plan: [{prob:5, skill: "healwave"}, {prob:4, skill: "healingpulse"}, {prob:2, skill: "healinghope"}, {prob:1, skill: "elixari"}]
         },

         mage:
         {
             name: "Mage",
             desc: "A being which chose the path of magic, and is good at it, too.",
             base: 600, res: 4720, sta: 2525, spd: 23050, mag: 233450, men: 114520,
             plan: [{prob:5, skill: "darkblitz"}, {prob:4, skill: "arcpulse"}, {prob:2, skill: "thunderstorm"}, {prob:1, skill: "vehemence"}]
         },

         psiwar:
         {
             name: "Psi-Warrior",
             desc: "A human whose talents are employed to screw with your head.",
             base: 600, res: 4720, sta: 2525, spd: 43050, men: 114520, psy: 153450,
             plan: [{prob:5, skill: "psyslice"},{prob:4, skill: "psyblast"} ,{prob:3, skill: "blackout"}, {prob:2, skill: "hyperfocus"}, {prob:1, skill: "psyc"}]
         },




         reddragon:
         {
             name: "Red Dragon",
             desc: "A dragon highly capable of burning entire cities in minutes, known by their bright red scales.",
             base: 3600*1200, attr: { flying: true },
             plan: [{
                     prob: 1,
                     skill: "firebreath"
                 }]
         }
     }
 });
