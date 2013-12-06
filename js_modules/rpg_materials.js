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




/* /////////////////////// WARNING TO GAMERS /////////////////////////////

 These values are SUBJECT TO CHANGE. Source code viewer beware! They wont
 stay like this!

 /////////////////////////////////////////////////////////////////////// */




({

    materials:
    {
     /*woods*/
        birch:
        {
            name: "Birch Wood",
            type: "wood",
            strength: 7,
            sharpness: 5,
            density: 5,
            magic: 20
        },

        ebony:
        {
            name: "Ebony Wood",
            type: "wood",
            strength: 35,
            sharpness: 10,
            density: 14,
            magic: 25
        },

        oak:
        {
            name: "Oak Wood",
            type: "wood",
            strength: 20,
            sharpness: 8,
            density: 8,
            magic: 10
        },
/*bone*/
        ivory:
        {
            name: "Ivory",
            type: "bone",
            strength: 30,
            sharpness: 80,
            density: 15,
            magic: 35
        },
/*dragon*/
        wdscale:
        {
            name: "White Dragon Scale",
            type: "scale",
            strength: 70,
            sharpness: 20,
            density: 15
            magic: 30
        },

        wdfang:
        {
            name: "White Dragon Fang",
            type: "bone",
            strength: 10,
            sharpness: 60,
            density: 20
            magic: 40
        },

        firedscale:
        {
            name: "Fire Dragon Scale",
            type: "scale",
            strength: 120,
            sharpness: 20,
            density: 35
        },

        firedfang:
        {
            name: "Fire Dragon Fang",
            type: "bone",
            strength: 30,
            sharpness: 80,
            density: 45
        },

        sdscale:
        {
            name: "Sky Dragon Scale",
            type: "scale",
            strength: 50,
            sharpness: 15,
            density: 8
        },

        sdfang:
        {
            name: "Sky Dragon Fang",
            type: "bone",
            strength: 15,
            sharpness: 40,
            density: 12
        },

        drdfang:
        {
            name: "Dark Dragon Fang",
            type: "bone",
            strength: 10,
            sharpness: 60,
            density: 3
        },

        drdscale:
        {
            name: "Dark Dragon Scale",
            type: "scale",
            strength: 40,
            sharpness: 10,
            density: 4
        },

        blkdfang:
        {
            name: "Black Dragon Fang",
            type: "bone",
            strength: 25,
            sharpness: 75,
            density: 8
        },

        blkdscale:
        {
            name: "Black Dragon Scale",
            type: "scale",
            strength:80,
            sharpness: 15,
            density: 8
        },
 /*metals*/
        iron:
        {
            name: "Iron",
            type: "metal",
            strength: 60,
            sharpness: 40,
            density: 80,
            magic: 5

        },

        copper:
        {
            name: "Copper",
            type: "metal",
            strength: 40,
            sharpness: 30,
            density: 70,
            magic: 5
        },

        zinc:
        {
            name: "Zinc",
            type: "metal",
            strength: 30,
            sharpness: 20,
            density: 40,
            magic: 7
        },

        gold:
        {
            name: "Gold",
            type: "metal",
            strength: 20,
            sharpness: 10,
            density: 40,
            magic: 60
        },

        silver:
        {
            name: "Silver",
            type: "metal",
            strength: 25,
            sharpness: 10,
            density: 40,
            magic: 60
        },

        electrum:
        {
            name: "Electrum",
            type: "metal",
            strength: 22,
            sharpness: 10,
            density: 40,
            magic: 120
        },

        steel:
        {
            name: "Steel",
            type: "metal",
            strength: 120,
            sharpness: 60,
            density: 95,
            magic: 2
        },

        hgsteel:
        {
            name: "High-Grade Steel",
            type: "metal",
            strength: 150,
            sharpness: 70,
            density: 100,
            magic: 1

        },

        ti:
        {
            name: "Titanium",
            type: "metal"
            strength: 90,
            sharpness: 50,
            density: 40,
            magic: 5
        }
        ,
        ametal:
        {
            name: "Amorphorous Metal Alloy",
            type: "metal",
            strength: 125,
            sharpness: 350,
            density: 85,
            magic: 85
        }
        ,
        brass:
        {
            name: "Brass",
            type: "metal",
            strength: 140,
            sharpness: 60,
            density: 90,
            magic: 5
        }
        ,
        /*gems*/
        ruby:
        {
            name: "Ruby",
            type: "gem",
            strength: 100,
            sharpness: 250,
            density: 40
        }//Looked up on Wikipedia, then estimated and compared to other materials. - Karina
        ,
        sapp:
        {
            name: "Sapphire",
            type: "gem",
            strength: 180,
            sharpness: 170,
            density: 40
            magic: 90
        }//Looked up on Wikipedia, then estimated and compared to other materials. - Karina
        ,
        emerald:
        {
            name: "Emerald",
            type: "gem",
            strength: 165,
            sharpness: 150,
            density: 30
            magic: 40
        }//Looked up on Wikipedia, then estimated and compared to other materials. - Karina
        ,
        diamond:
        {
            name: "Diamond",
            type: "gem",
            strength: 200,
            sharpness: 200,
            density: 40,
            magic: 50
        }
        ,
        /*hides*/
        leather:
        {
            name: "Leather",
            type: "hide",
            strenth: 30,
            sharpness: 0,
            density: 5
        }
        ,
        snakeskin:
        {
            name: "Snakeskin",
            type: "hide",
            strength: 25,
            sharpness: 5,
            density: 22
        }
        ,
        /*cloth*/
        cotton:
        {
            name: "Cotton",
            type: "cloth",
            strength: 8,
            sharpness: 0,
            density: 3
        }
        ,
        /*alloys, these are mixtures containing the fictional metals. I had also sorted them.
        The method of getting the stats is by averaging the material values with amount needed, rounded out. - Karina*/
        wdsteel:
        {
            name: "W. Dragon Steel",
            type: "metal",
            strength: 90,
            sharpness: 36,
            density: 47,
            magic: 19,
        }
        ,
        blkdsteel:
        {
            name: "Blk. Dragon Steel",
            type: "metal",
            strength: 96,
            sharpness: 36,
            density: 43,
            magic: 1,
        }
        ,
    }

});
    /*
      Ideally these should be (relatively) realistic:

      hardness (Vickers) / 10
      density (g/cm^3) *10
      resistance (nΩ·m) / 5
      thermal 100/(W·m−1·K−1)
      opacity (opaque%)

      Mark details where this has been looked up with //(*)

      Put //fictional for non-real materials, e.g.:

      dragontooth:
      {
      // fictional
          hardness: ...
          ...
      }



    */
