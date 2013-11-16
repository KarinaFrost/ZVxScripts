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
/** @scope script.modules.rpg_game */
({
     /** Component classes.
      * @namespace
      */
     moves:
     {
         nil: function () {},

         /** Instakill kills all enemies instantly, no damage calculation
          * @param {rpgContext} ctx
          */
         instakill: function (ctx)
         {
             var d = ctx.target.hp + ctx.target.maxhp;
             ctx.target.hp = -ctx.target.maxhp;
             return {string: "(- " + d+" HP)", damage: d};
         },

         bunny: function (ctx)
         {
             var d = Math.floor(ctx.target.maxhp/2);

             ctx.target.hp -= d;
             return d;
         },

         ghost:
         function (ctx)
         {
              var offense = ctx.attacker.magicpower;
             var base = ctx.component.base;

             var defense = ctx.target.defpower;


             var mult = Math.min(Math.max(0.1, offense/defense), 10);
             var qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult(ctx.attacker.exp[ctx.move.shortname]/base*2 || 0 + Math.E);
             }


             var damage = base * mult;

             damage = Math.max(damage | 0, 5);
             ctx.target.hp -= damage/3;
             ctx.target.sp -= damage/3;
             ctx.target.msp -= damage/3;

             return {string: "(-" +Math.round(damage/3) + " HP, -"+Math.round(damage/3)+" SP, -"+Math.round(damage/3)+" MSP)", damage:damage, exptype: "mag"};
         },

         boostmsp:
         function (ctx)
         {
             ctx.target.msp += ctx.component.base;
             return {string: "(+" +ctx.component.base + " MSP)", damage:damage, exptype: "men"};
         },

         /** Physical does physical damage
          * @param {rpgContext} ctx
          */
         physical: function (ctx)
         {
             var offense = ctx.attacker.physpower;
             var base = ctx.component.base;
             var qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult(ctx.attacker.exp[ctx.move.shortname]/base || 0 + Math.E);
             }

             var defense = ctx.target.defpower;
             var mult = Math.min(Math.max(0.1, offense/defense), 10);


             var damage = base * mult * qmult;

             damage = Math.max(damage | 0, 1);
             ctx.target.hp -= damage;

             return {string: "(-" +damage + " HP)", damage:damage, exptype: "res"};
         },


         // todo: Update this function
         psychic: function (ctx)
         {
             var offense = ctx.attacker.psypower;
             var base = ctx.component.base;

             var defense = ctx.target.defpower;
             var qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult(ctx.attacker.exp[ctx.move.shortname]/base*0.6 || 0 + Math.E);
             }


             var mult = Math.min(Math.max(0.1, offense/defense), 10);


             var damage = base * mult * qmult;

             damage = Math.max(damage | 0, 1);
             ctx.target.msp -= damage;

             return {string: "(-" +damage + " MSP)", damage:damage, exptype: "men"};
         },

         magical: function (ctx)
         {
             var offense = ctx.attacker.magicpower;
             var base = ctx.component.base;

             var defense = ctx.target.defpower;


             var mult = Math.min(Math.max(0.1, offense/defense), 10);
             var qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult(ctx.attacker.exp[ctx.move.shortname]/base || 0 + Math.E);
             }


             var damage = base * mult * qmlt;

             damage = Math.max(damage | 0, 1);
             ctx.target.hp -= damage;

             return {string: "(-" +damage + " HP)", damage:damage, exptype: "res"};
         },

         heal: function (ctx)
         {
            /* var offense = ctx.attacker.physpower;
             var base = ctx.component.base;

             var defense = ctx.target.physpower;


             var mult = Math.min(Math.max(0.1, offense/defense), 10);


             var damage = base * mult;*/
             var qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult(ctx.attacker.exp[ctx.move.shortname]/base || 0 + Math.E);
             }
             ctx.target.hp += Math.floor(ctx.component.base * qmlt);

             return {string: "(+" + Math.floor(ctx.component.base * qmlt) + " HP)", damage: Math.floor(ctx.component.base * qmlt), exptype: "none"};
         }
     },

     /** Selects a skill from the entities use or plan attributes.
      * @param entity The entity to select a move from
      * @returns {rpgSkillDescriptor} The skill to use
      */
     pickMove: function (entity)
     {
         var temp, total, index, iterative_weight_total, random_weighted_index;

         if (entity.use)
         {
             temp = entity.use;
             delete entity.use;
             return this.skills[temp];
         }

         else if (entity.plan)
         {
             total = 0;

             for (index = 0; index < entity.plan.length; index++)
             {
                 total += entity.plan[index].prob;
             }

             random_weighted_index = Math.random()*total;

             for (index = 0, iterative_weight_total = 0; index < entity.plan.length; index++)
             {
                 iterative_weight_total += entity.plan[index].prob;

                 if (iterative_weight_total > random_weighted_index)
                 {
                     return this.skills[entity.plan[index].skill];
                 }

             }
         }

         return this.skills.attack;
     }
 });
