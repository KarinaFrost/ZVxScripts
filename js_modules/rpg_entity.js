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
     entityTick: function (e)
     {


         e.sp += e.maxsp/30;
         e.msp += e.maxmsp/15;

         // Stamina
         if (e.sp < 0)
             // No stamina
         {
             e.hp += e.sp;
             // Reduce the HP by the amount of missing stamina.

             e.sp = 0;
             // Reset stamina
         }
         if (e.sp > e.maxsp / 3)
             // Has a fairly large amount of stamina
         {
             e.hp += e.maxhp/60;
             // Recover some HP
         }
         if (e.sp > e.maxsp)
             // Too much stamina!
         {
             e.sp = e.maxsp;
             // Remove overflow

             e.hp += e.maxhp/90;
             // recover extra hp!
         }

         // Mental Stamina
         if (e.msp < 0)
             // No mental stamina
         {
             e.mp -= e.msp;
             e.hp -= e.msp;
             // Lose hp and mana

             e.msp = 0;
             // Reset
         }
         if (e.msp > e.maxmsp / 3)
             // Recover mana
         {
             e.mp += e.maxmp/20;
             // increase
         }

         if (e.msp > e.maxmsp)
         {
             e.msp = e.maxmsp;
         }

         // Mana
         if (e.mp < 0)
             // Not enough mana
         {
             e.sp += e.mp;
             e.msp += e.mp;
             // Decrease staminas

             e.mp = 0;
             // Reset mana;
         }
         if (e.mp > e.maxmp)
             // Too much mana
         {
             if (e.mp > e.maxmp *1.1) e.hp += e.maxmp*1.1 - e.mp;
             // Decrease HP by overflow, uncontrolable mana damages body!

             e.mp = e.maxmp;
             // Reset
         }

         // Health
         if (e.hp <= 0 && !e.invincible && (!e.undead && e.hp > -e.maxhp*5))
             // check for death
         {
             // this.entityDie(e);
         }
         else if (e.hp > e.maxhp)
         // overflow
         {
             e.hp = e.maxhp;
             // reset
         }



     },

     "1/ln(1.2)": 1/Math.log(1.2),
     "1/ln(1.3)": 1/Math.log(1.3),
     "1/3600*0.1": 1/3600*0.1,
     "1/3600*0.15": 1/3600*0.15,

     entityUpdateStats: function (e)
     {
         /*
          * plot {y = ln(x/3600 + 2)/ln(1.2) + x/3600*0.1, y = ln(x/3600 + 2)/ln(1.3) + x/3600*0.15} from 3600 to 3600*20
          *
          * Physical:
          * y = ln(x/3600 + 2)/ln(1.2) + x/3600*0.1
          *
          * Magical:
          * y = ln(x/3600 + 2)/ln(1.3) + x/3600*0.15
          *
          */
         //e.maxmp =  Math.floor(e.mag*0.13 + (Math.log(e.mag+Math.E)*10 | 0));
         //e.maxsp = Math.floor(e.str*0.02 + e.res*0.02 + (Math.log(e.res/100+Math.E)*150 | 0));
         //e.maxmsp = Math.floor(e.res*0.01 + e.mag*0.01 + e.psy*0.12 + e.spr*0.01 + (Math.log(e.psy/1000+Math.E)*50 | 0));
         //e.maxhp = Math.floor(e.str*0.01 + e.res*0.03 + (Math.log(e.res/100+Math.E)*100 | 0));


         e.physpower =  Math.floor((Math.log(e.str/3600 + 1) * this["1/ln(1.2)"] + e.str * this["1/3600*0.1"])*100);
         e.maxsp =  Math.floor((Math.log(e.sta/3600 + 1) * this["1/ln(1.2)"] + e.sta * this["1/3600*0.1"])*100);
         e.maxhp = Math.floor( (Math.log(e.res/3600 + 1) * this["1/ln(1.2)"] + e.res * this["1/3600*0.1"])*100);

         e.magicpower = Math.floor(  (Math.log(e.mag/3600 + 1) * this["1/ln(1.3)"] + e.mag * this["1/3600*0.15"])*100  );
         e.maxmsp =     Math.floor(  (Math.log(e.men/3600 + 1) * this["1/ln(1.3)"] + e.men * this["1/3600*0.15"])*100   );
         e.maxmp =      Math.floor(  (Math.log(e.mag/3600 + 1) * this["1/ln(1.3)"] + e.mag * this["1/3600*0.15"])*100  );

         e.psypower = Math.floor(  (Math.log(e.psy/3600 + 1) * this["1/ln(1.3)"] + e.psy * this["1/3600*0.15"])*100  );

         //e.offense = Math.floor(e.power / 10000 * (100 + this.equipAtk(e.lhand) + this.equipAtk(e.rhand)));
         //e.defense = Math.floor(e.power / 10000 * (100 + this.equipDef(e.lhand)/2 + this.equipDef(e.rhand)/2 + this.equipDef(e.body) + this.equipDef(e.feet) + this.equipDef(e.head) + this.equipDef(e.back)));
     },

     initializeEntity: function (e)
     {
         if (!e.sta) e.sta = 100;
         if (!e.str) e.str = 100;
         if (!e.res) e.res = 100;
         if (!e.men) e.men = 100;
         if (!e.psy) e.psy = 100;
         if (!e.spd) e.spd = 100;
         if (!e.mag) e.mag = 100;
         if (!e.spr) e.spr = 100;

         this.entityUpdateStats(e);
         e.hp = e.maxhp;
         e.mp = e.maxmp;
         e.msp = e.maxmsp;
         e.sp = e.maxsp;

     },

     entHtml:  function (e)
     {
         var that = this;

         function bar (val, max, colorfull, colorempty, neon)
         {
             var hpBar = "";
             var d;

             var hpFract = Math.floor(val/max*8*10);
             if (hpFract < 0) hpFract = 0;
             var hpTenths = (hpFract - hpFract%8)/8;
             var hpEightiths = (hpFract-hpTenths*8) % 8;

             for (var x = 0; x < hpTenths; x++) hpBar += "\u2588";
             var hpSlivers = ["", "\u258f", "\u258e", "\u258d", "\u258c", "\u258b", "\u258a", "\u2589"];

             //if ("" + hpSlivers[hpEightiths] == "undefined") print( "UNDEFINED " + [val, max, hpSlivers, hpEightiths, hpFract, hpTenths, hpTenths*8, hpFract - hpTenths].join(", "));

             if (hpEightiths >= 4) hpBar += "\u2588";
             //else hpBar += hpSlivers[hpEightiths];
             while(hpBar.length < 10) hpBar += "\u259e";

             return "<code>[<span style='color:" + that.color.colorTriadToString(that.color.neonify(that.color.colorMixProp(colorfull, colorempty, val/max), neon))+ "'>" + hpBar + "</span>]</code> ("+String(val/max*100).substring(0, 5)+"%) " + Math.floor(val) + "/" + Math.floor(max);
         }

         return "<table><tr><td></td><td>" + e.name + "</td></tr>" +
             "<tr><td><b>HP</b></td><td>" + bar(e.hp, e.maxhp, [0, 0xff, 0], [0xff, 00, 00], 1) + "</td></tr>"+
             "<tr><td><b>SP</b></td><td>" + bar(e.sp, e.maxsp,  [0x20, 0xff, 0x20], [0xaa, 0xaa, 0xaa], 0) +"</td></tr>"+
             "<tr><td><b>MP</b></td><td>" + bar(e.mp, e.maxmp, [0, 0, 0xff], [0, 00, 00], 0) +"</td></tr>"+
             "<tr><td><b>MSP</b></td><td>" + bar(e.msp, e.maxmsp,  [0xaa, 0xaa, 0xff], [00, 00, 00], 0) +"</td></tr></table>";

     },

     printOutStatus: function (pids, entities)
     {
         var player_htmls = [];
         var mob_htmls= [];
         for (x in entities)
         {
             (entities[x].type == "player" ? player_htmls : mob_htmls).push(this.entHtml(entities[x]));
         }

         var outhtml = "<p align='center'><table><tr><td><h1></h1></td><td><h1>&nbsp;&nbsp;&nbsp;&nbsp;V.S.&nbsp;&nbsp;&nbsp;&nbsp;</h1></td><td><h1></h1></td></tr>";

         for (var i = 0; i < player_htmls.length || i < mob_htmls.length; i++)
         {
             outhtml += "<tr><td>" + (player_htmls[i]||"&nbsp;") + "</td><td></td><td>" + (mob_htmls[i]||"&nbsp;") + "</td></tr>";
         }

         outhtml += "</table></p>";



         this.com.message(pids, outhtml, -1, true);

     }

 });
