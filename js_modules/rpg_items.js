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

     useItem:
     function (itemclass, pids, player, chan)
     {
         if (!item.use)
         {
             this.com.message(pids, "Was distracted by the shiny " + item.name + ".", this.theme.WARN, chan);
             return;
         }
     },

     items:
     {
	 goo:
         {
             name: "Goo Lump"

         },

         spkcrystal:
         {
             name:"Spooky Crystal"
         },

         destinygem:
         {
             name:"Destiny Gem"
         },


         /* METALS */
         ironore:
         {
             name: "Iron Ore",
             material: "iron",
             base: 2
         },

         goldore:
         {
             name: "Gold Ore",
             material: "gold",
             base: 2
         },

         tinore:
         {
             name: "Tin Ore",
             material: "tin",
             base: 2
         },

         silverore:
         {
             name: "Silver Ore",
             material: "tin",
             base: 2
         },

         tiore:
         {
             name: "Titanium Ore",
             material: "ti",
             base: 2
         },

         tinore:
         {
             name: "Tin Ore",
             material: "tin",
             base: 2
         },




         shroomcap:
         {
             name: "Mushroom Cap"
         },

         testfeather:
         {
             name: "Chicken Feather"
         }
     }
 });
