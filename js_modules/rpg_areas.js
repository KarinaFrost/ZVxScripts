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
     areaStep: function () {}
     ,
     areas:
     {
         graveyard:
         {
             name: "The graveyard", desc: "You have been revived from the dead! Now crawl out of here and back where you belong.",
             adjc: ["town1"]

         },
         town1:
         {
             name: "The Town", desc:"Center of all activity! The south center is closed.", adjc: ["town1west", "town1east", "town1north", "town1south"/*, "town1south"*/],
             // mobs: [{prob: 2, mobs:["testchicken"]},{prob: 1, mobs:["eshroom", "testchicken"]}]
             battle: [{min:1, max:1, mob: "testchicken" },{min:0, max:1, mob: "eshroom", prob: 0.5}]
         },



         town1west:
         {
             name: "Town West Side", desc: "Naturalist hippies are protesting attempts to get rid of the frog overpopulation.", adjc: ["town1", "westpath"],
             digs:
             {
                 ironore: 0.5
             },
             battle: [{min:1, max:3, mob: "dkfrog", prob:0.7 },{min:0, max:2, mob: "eshroom", prob: 0.5}]


         },

         westpath:
         {
             name: "West Pathway", desc: "The pathway to the West Forest. Travelers sometimes avoid it due to the scary bats the live here.", adjc: ["westforest", "town1west"],
             battle: [{min:1, max:3, mob: "bat", prob:0.7 },{min:0, max:2, mob: "dkfrog", prob: 0.2}]
         },

         westforest:
         {
             name: "West Forest", desc: "The west forest, inhabited by angry squirrels...", adjc: ["westpath", "westforest2"],
             mobs: [{prob:1, mobs: ["bat","lsquirrel"]}, {prob:1, mobs: ["lsquirrel","lsquirrel"]}]
         },

         westforest2:
         {
             name: "West Forest [deep]", desc: "Watch out for the deadly squirrels!", adjc: ["westforest", "westforest3"],
             mobs: [{prob:1, mobs: ["lsquirrel","lsquirrel"]}, {prob:1, mobs: ["lsquirrel","dsquirrel"]}, {prob:1, mobs: ["dsquirrel"]},
                    {prob:1, mobs: ["dsquirrel","adsquirrel"]}, {prob:1, mobs: ["dsquirrel","dsquirrel"]},{prob:1, mobs: ["adsquirrel","adsquirrel"]}
                   ]
         },

          westforest3:
         {
             name: "West Forest [factory]", desc: "There is an unusual factory here...", adjc: ["westforest2", "town2"],
             battle: [{ prob: 0.5, min:1, max: 2, mob: "jetsquirrel"},{ prob: 0.5, min:0, max: 1, mob: "adsquirrel"}]

         },

         town2east:
         {
             name: "Rorthidor [east]", desc: "A town of golems. The entrance is blocked.", adjc: ["westforest3", "town2"],
             battle: [{ min:1, max:3, mob: "golem", prob:0.3}]

         },

         town2:
         {
             name: "Rorthidor", desc: "A town of golems.", adjc: ["westforest3", "town2"]
         },

         town1east:
         {
             name: "Town East Side", desc:"Currently having a chicken problem...", adjc: ["town1"],
             digs:
             {
                 ironore: 0.5
             },
             battle: [{min:1, max:8, mob: "testchicken", prob:0.7 }]

         },

         town1north:
         {
             name: "Town North Side", desc: "The locals don't seem to notice the local slime population.", adjc: ["town1"],
             adjc: ["town1", {area:"sewer1",distance:3}],
             digs:
             {
                 ironore: 0.5
             },
             battle: [{min:1, max:2, mob: "slime", prob:0.5 }]

         },

         town1south:
         {
             name: "Town South Side", desc: "This part of town has been abandonned since it was taken over by spooks.", adjc: ["town1"],
             adjc: ["town1", {area:"darkforest", distance: 40}],
             digs:
             {
                 ironore: 0.5
             },
             battle: [{min:1, max:4, mob: "spook", prob:0.66 }, {min:0, max:1, mob:"grim", prob: 0.1}]

         },

         darkforest:
         {
             name: "Dark Forest", desc: "This forest is the natural home of spooks, townspeople avoid it like the plauge. Legend tells of the deadly sinesters that live here.",
             adjc: [{area:"town1south", distance: 40}, {area:"darkforest2", distance: 20}],
             battle: [{min:1, max:3, mob: "spook", prob:0.5 },{min:0, max:2, mob: "mspook", prob: 0.5}, {min:0, max:2, mob:"lspook", prob: 0.5}, {min:0, max:1, mob:"grim", prob: 0.3},  {min:0, max:1, mob:"sinester", prob: 0.1}]
         },

         darkforest2:
         {
             name: "Dark Forest [bones]", desc: "Bones lie on the ground everywhere here. There is an ominous presense about. Somehow the walk back seems longer.",
             adjc: [{area:"darkforest", distance: 40}, {area:"darkforest3", distance: 20}, {area:"darkforest5", distance: 20}],
             battle: [{min:0, max:2, mob: "spook", prob:0.3 },{min:1, max:2, mob: "mspook", prob: 0.5}, {min:0, max:2, mob: "lspook", prob: 0.5}, {min:0, max:1, mob:"grim", prob: 0.3},  {min:0, max:2, mob:"sinester", prob: 0.7}]
         },

         darkforest3:
         {
             name: "Dark Forest [graveyard]", desc: "An old graveyard. Somehow the walk back seems longer.",
             adjc: [{area:"darkforest2", distance: 65}, {area:"darkforest", distance: 40}, {area:"darkforest4", distance: 10}],
             battle: [{min:1, max:3, mob: "zombie", prob:0.5 },{min:0, max:2, mob: "mspook", prob: 0.5}, {min:0, max:2, mob: "lspook", prob: 0.5}, {min:0, max:1, mob:"grim", prob: 0.3},  {min:0, max:2, mob:"sinester", prob: 0.7}]
             //
         },

         darkforest4:
         {
             name: "Dark Forest [crypt]", desc: "An old crypt.",
             adjc: [{area:"darkforest3", distance: 10}],
             battle: [{min:1, max:3, mob: "zombie", prob:0.8 },{min:0, max:2, mob: "mspook", prob: 0.5}, {min:0, max:2, mob: "lspook", prob: 0.5}]
         },

         darkforest5:
         {
             name: "Dark Forest [clearing]", desc: "Something tells you this place is dangerous. Somehow you can't find your way back",
             adjc: [{area:"darkforest4", distance: 40},{area:"darkforest6", distance: 40}],
             battle: [{min:1, max:3, mob: "lspook", prob:0.5 },{min:0, max:2, mob: "sinester", prob: 0.5}, {min:0, max:1, mob: "sshell", prob: 0.5}]
         },

         darkforest6:
         {
             name: "Dark Forest [shadow path]", desc: "Shadows lurk everywhere Somehow you can't find your way back",
             adjc: [{area:"darkforest7", distance: 40}],
             battle: [{min:0, max:2, mob: "lspook", prob:0.5 },{min:0, max:2, mob: "zombie", prob: 0.2}, {min:1, max:3, mob: "sshell", prob: 0.8}]
         },

         darkforest7:
         {
             name: "Dark Forest [shadow pits]", desc: "Something tells you this place is dangerous.",
             adjc: [{area:"darkforest8", distance: 40}, {area:"darkforest5", distance: 90}],
             battle: [{min:0, max:2, mob: "lspook", prob:0.5 },{min:0, max:2, mob: "lshell", prob: 0.2}, {min:1, max:3, mob: "sshell", prob: 0.8}]
         },

         darkforest8:
         {
             name: "Dark Forest [black trees]", desc: "Something tells you this place is dangerous.",
             adjc: [{area:"darkforest9", distance: 40}, {area:"darkforest7", distance: 90}],
             battle: [{min:1, max:2, mob: "lshell", prob: 0.7}, {min:0, max:2, mob: "sshell", prob: 0.5}]
         },


         darkforest9:
         {
             name: "Dark Forest [black dirt]", desc: "Something tells you this place is dangerous.",
             adjc: [{area:"darkforest10", distance: 40}, {area:"darkforest8", distance: 90}],
             battle: [{min:1, max:2, mob: "lshell", prob: 0.7}, {min:0, max:2, mob: "oshell", prob: 0.5}]
         },

         darkforest10:
         {
             name: "Dark Forest [evil paths]", desc: "Something tells you this place is dangerous.",
             adjc: [{area:"darkforest11", distance: 40}, {area:"darkforest9", distance: 90}],
             battle: [{min:1, max:2, mob: "oshell", prob: 0.7}, {min:0, max:2, mob: "ushell", prob: 0.5}]
         },

          darkforest11:
         {
             name: "Dark Forest [corrupted vines]", desc: "Something tells you this place is dangerous.",
             adjc: [{area:"darkforest12", distance: 40}, {area:"darkforest10", distance: 90}],
             battle: [{min:1, max:2, mob: "ushell", prob: 0.7}, {min:0, max:2, mob: "xshell", prob: 0.5}]
         },

         darkforest12:
         {
             name: "Dark Forest [strange place]", desc: "Something tells you this place is dangerous.",
             adjc: [{area:"darkforest11", distance: 90}],
             battle: [{min:1, max:2, mob: "xshell", prob: 0.7}, {min:0, max:2, mob: "xshell2", prob: 0.5}]
         },


         //

         sewer1:
         {
             name: "The Sewer", desc: "Seems like there are a lot of slimes down here!", adjc: ["town1north", "sewer2"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime","slime","slime","slime","slime"]},{prob: 1, mobs:["slime","slime", "slime"]}]
         },

         sewer2:
         {
             name: "The Sewer (somewhere)", desc: "Seems like there are a lot of slimes down here!", adjc: ["sewer1", "sewer3"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime","slime","slime","slime"]},{prob: 1, mobs:["slime","slime", "slime"]}]
         },

         sewer3:
         {
             name: "The Sewer (pipeway)", desc: "Seems like there are a lot of slimes down here!", adjc: ["sewer2", "sewer4"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime","slime2","slime2"]},{prob: 1, mobs:["slime2","slime2", "slime2"]}]
         },


         sewer4:
         {
             name: "The Sewer (intersection)", desc: "Seems like there are a lot of slimes down here!", adjc: ["sewer3", "sewer5", "sewer4b"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime3","slime3"]},{prob: 1, mobs:["slime2","slime3", "slime3"]}]
         },


         sewer4b:
         {

             name: "The Sewer (ghost room)", desc: "Seems like there are a lot of slimes down here! ... and some spooks? There seems to be a pipe here which goes back to the entrace, but there's no way to climb back up it if you go down.", adjc: ["sewer4", "sewer1"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime3","slime3", "lspook"]},{prob: 1, mobs:["slime2", "mspook", "slime3", "lspook"]}]
         },

         sewer5:
         {
             name: "The Sewer (slimy pathway)", desc: "Seems like there are a lot of slimes down here!", adjc: ["sewer6", "sewer4"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime4","slime4","slime"]},{prob: 1, mobs:["slime4","slime4", "slime3"]}, {prob: 1, mobs:["slime","slime", "slime2"]}]
         },

         sewer6:
         {
             name: "The Sewer (rusted room)", desc: "Seems like there are a lot of slimes down here!", adjc: ["sewer5", "sewer7"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime","slime"]},{prob: 1, mobs:["slime3","slime", "slime2"]},
                    {prob: 2, mobs:["slime2","slime5"]},{prob: 1, mobs:["slime4","slime5", "slime5"]},
                    {prob: 2, mobs:["slime5","slime5"]},{prob: 1, mobs:["slime5","slime3", "slime5"]},
                    {prob: 2, mobs:["slime4","slime2"]},{prob: 1, mobs:["slime5","slime3", "slime4"]}]
         },

         sewer7:
         {
             name: "The Sewer (stinky pipes)", desc: "Seems like there are a lot of slimes down here!", adjc: ["sewer6", "sewer8"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime","slime6"]},{prob: 1, mobs:["slime6","slime", "slime2"]},
                    {prob: 2, mobs:["slime2","slime6"]},{prob: 1, mobs:["slime4","slime5", "slime6"]},
                    {prob: 2, mobs:["slime5","slime6"]},{prob: 1, mobs:["slime5","slime6", "slime5"]},
                    {prob: 2, mobs:["slime6","slime2"]},{prob: 1, mobs:["slime6","slime3", "slime4"]}]
         },

         sewer8:
         {
             name: "The Sewer (slime path)", desc: "Seems like there are a lot of slimes down here!", adjc: ["sewer7", "sewer9" ],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime7","slime7"]},{prob: 1, mobs:["slime3","slime", "slime7"]},
                    {prob: 2, mobs:["slime7","slime5"]},{prob: 1, mobs:["slime7","slime5", "slime5"]},
                    {prob: 2, mobs:["slime5","slime7"]},{prob: 1, mobs:["slime5","slime7", "slime5"]},
                    {prob: 2, mobs:["slime7","slime2"]},{prob: 1, mobs:["slime5","slime3", "slime4"]}]
         },

         sewer9:
         {
             name: "The Sewer (slime core)", desc: "Seems like there are a lot of slimes down here!", adjc: ["sewer8", "slfort1"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime7","slime7"]},{prob: 1, mobs:["slime7","slime7", "slime7"]},
                    {prob: 1, mobs:["slime7","slime7", "slime6"]}]
         },

         slfort1:
         {
             name: "Underground Slime Fortress [outside]", desc: "Seems like some kind of slime fortress...", adjc: ["sewer9", "slfort2"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 2, mobs:["slime7","slime8"]},{prob: 1, mobs:["slime7","slime8", "slime7"]},
                    {prob: 1, mobs:["slime8","slime7", "slime8"]}, {prob: 2, mobs:["slime8"]}]
         },

         slfort2:
         {
             name: "Underground Slime Fortress [inside]", desc: "There seems be something awfully dangerous here!", adjc: ["slfort1"],
             digs:
             {
                 ironore: 0.5
             },
             mobs: [{prob: 1, mobs:["slimed"]}]
         },


         cliff1:
         {
             name: "A cliff",
             adjc: ["town1", "proto"],
             mobs: [{prob: 1, mobs:["reddragon"]}]
         },

         darkpathway:
         {

         },

         dforest:
         {
             name: "Deadly Forest",
             adjc: ["town1"],
             mobs: [{prob: 2, mobs:["dsquirrel"]},{prob: 1, mobs:["dsquirrel", "dsquirrel"]}]
         }
     }

 });
