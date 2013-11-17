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
            mobs: [{prob: 2, mobs:["testchicken"]},{prob: 1, mobs:["eshroom", "testchicken"]}]
        },
        town1west:
        {
            name: "Town West Side", desc: "Naturalist hippies are protesting attempts to get rid of the frog overpopulation.", adjc: ["town1", "westpath"],
            digs:
            {
                ironore: 0.5
            },
            mobs: [{prob: 2, mobs:["dkfrog"]},{prob: 1, mobs:["dkfrog", "dkfrog"]}]
        },

        westpath:
        {
            name: "West Pathway", desc: "The pathway to the West Forest. Travelers sometimes avoid it due to the scary bats the live here.", adjc: ["westforest", "town1west"],
            mobs: [{prob:1, mobs: ["bat"]}, {prob:1, mobs: ["bat","bat"]}]
        },

        westforest:
        {
            name: "West Forest", desc: "The west forest, inhabited by angry squirrels...", adjc: ["westpath", "westforest2"],
            mobs: [{prob:1, mobs: ["bat","lsquirrel"]}, {prob:1, mobs: ["lsquirrel","lsquirrel"]}]
        },

        westforest2:
        {
            name: "West Forest (deep)", desc: "Watch out for the deadly squirrels!", adjc: ["westforest"],
            mobs: [{prob:1, mobs: ["lsquirrel","lsquirrel"]}, {prob:1, mobs: ["lsquirrel","dsquirrel"]}, {prob:1, mobs: ["dsquirrel"]},
                   {prob:1, mobs: ["dsquirrel","adsquirrel"]}, {prob:1, mobs: ["dsquirrel","dsquirrel"]},{prob:1, mobs: ["adsquirrel","adsquirrel"]}
                  ]
        },

        town1east:
        {
            name: "Town East Side", desc:"Currently having a chicken problem...", adjc: ["town1"],
            digs:
            {
                ironore: 0.5
            },
            mobs: [{prob: 2, mobs:["testchicken", "testchicken", "testchicken","testchicken"]},{prob: 1, mobs:["testchicken","testchicken", "testchicken"]}]
        },

        town1north:
        {
            name: "Town North Side", desc: "The locals don't seem to notice the local slime population.", adjc: ["town1"],
            adjc: ["town1", {area:"sewer1",distance:3}],
            digs:
            {
                ironore: 0.5
            },
            mobs: [{prob: 2, mobs:["slime"]},{prob: 1, mobs:["slime", "slime"]}]
        },

        town1south:
        {
            name: "Town South Side", desc: "This part of town has been abandonned since it was taken over by spooks.", adjc: ["town1"],
            adjc: ["town1", {area:"darkforest", distance: 40}],
            digs:
            {
                ironore: 0.5
            },
            mobs: [{prob: 6, mobs:["spook"]},{prob: 2, mobs:["spook", "spook"]}, {prob: 1, mobs:["spook", "spook", "spook", "spook"]}, {prob: 1, mobs:["spook", "spook", "spook", "grim"]}]
        },

        darkforest:
        {
            name: "Dark Forest", desc: "This forest is the natural home of spooks, townspeople avoid it like the plauge. Legend tells of the deadly sinesters that live here.",
            adjc: [{area:"town1south", distance: 40}],
            mobs: [{prob: 0.5, mobs:["spook", "mspook", "sinester"]},{prob: 1, mobs:["spook", "mspook"]},{prob: 2, mobs:["spook", "grim", "mspook"]}, {prob: 1, mobs:["lspook", "mspook", "spook", "grim"]}, {prob: 1, mobs:["grim", "lspook", "mspook", "spook"]}]
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

            name: "The Sewer (bat room)", desc: "Seems like there are a lot of slimes down here! ... and some spooks? There seems to be a pipe here which goes back to the entrace, but there's no way to climb back up it if you go down.", adjc: ["sewer4", "sewer1"],
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
