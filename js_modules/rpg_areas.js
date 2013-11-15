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
            name: "Town West Side", desc: "Naturalist hippies are protesting attempts to get rid of the frog overpopulation.", adjc: ["town1"],
            digs:
            {
                ironore: 0.5
            },
            mobs: [{prob: 2, mobs:["dkfrog"]},{prob: 1, mobs:["dkfrog", "dkfrog"]}]
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
            name: "The Sewer", desc: "Seems like there are a lot of slimes down here!", adjc: ["town1north"],
            digs:
            {
                ironore: 0.5
            },
            mobs: [{prob: 2, mobs:["slime","slime","slime","slime","slime"]},{prob: 1, mobs:["slime","slime", "slime"]}]
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
