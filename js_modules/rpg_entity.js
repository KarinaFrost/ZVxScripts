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
          * plot {y = ln(x + 1)/ln(1.2) + x*0.1, y = ln(x + 1)/ln(1.3) + x*0.15, y = 0.17x + ln(x+1)/ln(1.8), y = 0.172x + 5.5 ln (x + 1)} from 0 to 250
          *
          Physical  y = 0.1x + 5.48481 log(1+x)
          Magical y = 0.15x + 3.81149 log(1+x)
          Psychic y = 0.17x + 1.7013 log(1+x)
          Defensive y = 0.172x + 5.5 log(1+x)
          *
          */

         if (!e.attr) e.attr = {};
         var base = 100;
         base = (e.totalexp / 7) || e.base || 100;
         if (!e.sta) e.sta = base;
         if (!e.str) e.str = base;
         if (!e.res) e.res = base;
         if (!e.men) e.men = base;
         if (!e.psy) e.psy = base;
         if (!e.spd) e.spd = base;
         if (!e.mag) e.mag = base;
         if (!e.spr) e.spr = base;

         e.physpower = Math.floor(  100*(0.1*e.str/3600 + 5.48181 * Math.log( e.str/3600 + 1))    );
         e.magicpower = Math.floor(  100*(0.15*e.mag/3600 + 3.81149 * Math.log( e.mag/3600 + 1))    );
         e.psypower = Math.floor(  100*(0.17*e.psy/3600 + 1.7013 * Math.log( e.psy/3600 + 1))   );
         e.defpower = Math.floor(    100*(0.172*e.res/3600 + 5.5 *Math.log(e.res/3600+1))    );


         e.maxhp = Math.floor(    100*(0.172/3600*e.res + 5.5*Math.log(e.res/3600 + 1))   );
         e.maxsp = Math.floor(    100*(0.172/3600*e.sta + 5.5*Math.log(e.sta/3600 + 1))   );
         e.maxmp = Math.floor(    100*(0.172/3600*e.mag + 5.5*Math.log(e.mag/3600 + 1))   );
         e.maxmsp = Math.floor(    100*(0.172/3600*e.men + 5.5*Math.log(e.men/3600 + 1))   );


         /*e.physpower =  Math.floor((Math.log(e.str/3600 + 1) * this["1/ln(1.2)"] + e.str * this["1/3600*0.1"])*100);
         e.maxsp =  Math.floor((Math.log(e.sta/3600 + 1) * this["1/ln(1.2)"] + e.sta * this["1/3600*0.1"])*100);
         e.maxhp = Math.floor( (Math.log(e.res/3600 + 1) * this["1/ln(1.2)"] + e.res * this["1/3600*0.1"])*100);*/
/*
         e.magicpower = Math.floor(  (Math.log(e.mag/3600 + 1) * this["1/ln(1.3)"] + e.mag * this["1/3600*0.15"])*100  );
         e.maxmsp =     Math.floor(  (Math.log(e.men/3600 + 1) * this["1/ln(1.3)"] + e.men * this["1/3600*0.15"])*100   );
         e.maxmp =      Math.floor(  (Math.log(e.mag/3600 + 1) * this["1/ln(1.3)"] + e.mag * this["1/3600*0.15"])*100  );

         e.psypower = Math.floor(  (Math.log(e.psy/3600 + 1) * this["1/ln(1.3)"] + e.psy * this["1/3600*0.15"])*100  );
*/
         //e.offense = Math.floor(e.power / 10000 * (100 + this.equipAtk(e.lhand) + this.equipAtk(e.rhand)));
         //e.defense = Math.floor(e.power / 10000 * (100 + this.equipDef(e.lhand)/2 + this.equipDef(e.rhand)/2 + this.equipDef(e.body) + this.equipDef(e.feet) + this.equipDef(e.head) + this.equipDef(e.back)));
     },

     initializeEntity: function (e)
     {
         var base = 100;
         base = (e.totalexp / 7) || e.base || 100;
         if (!e.sta) e.sta = base;
         if (!e.str) e.str = base;
         if (!e.res) e.res = base;
         if (!e.men) e.men = base;
         if (!e.psy) e.psy = base;
         if (!e.spd) e.spd = base;
         if (!e.mag) e.mag = base;
         if (!e.spr) e.spr = base;

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

             if (!that.config.lowBandwidth)
             {
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

                 return "[<span style='color:" + that.color.colorTriadToString(that.color.neonify(that.color.colorMixProp(colorfull, colorempty, val/max), neon))+ "'>" + hpBar + "</span>] ("+String(val/max*100).substring(0, 5)+"%) " + Math.floor(val) + "/" + Math.floor(max);

             }
             else return "<span style='color:" + that.color.colorTriadToString(that.color.neonify(that.color.colorMixProp(colorfull, colorempty, val/max), neon))+ "'>("+String(val/max*100).substring(0, 5)+"%) " + Math.floor(val) + "/" + Math.floor(max) + "</span>";
         }

         return "<table><tr><td></td><td>" + e.name + "</td></tr>" +
             "<tr><td><b>HP</b></td><td>" + bar(e.hp, e.maxhp, [0, 0xff, 0], [0xff, 00, 00], 1) + "</td></tr>"+
             "<tr><td><b>SP</b></td><td>" + bar(e.sp, e.maxsp,  [0x20, 0xff, 0x20], [0xaa, 0xaa, 0xaa], 0) +"</td></tr>"+
             "<tr><td><b>MP</b></td><td>" + bar(e.mp, e.maxmp, [0, 0, 0xff], [0, 00, 00], 0) +"</td></tr>"+
             "<tr><td><b>MSP</b></td><td>" + bar(e.msp, e.maxmsp,  [0xaa, 0xaa, 0xff], [00, 00, 00], 0) +"</td></tr></table>";

     },

     printOutStatus: function (pids, entities, chan)
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



         this.com.message(pids, outhtml, -1, true, chan);

     }

 });
