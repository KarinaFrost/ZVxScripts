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
             return d;
         },

         bunny: function (ctx)
         {
             var d = Math.floor(ctx.target.maxhp/2);

             ctx.target.hp -= d;
             return d;
         },

         /** Physical does physical damage
          * @param {rpgContext} ctx
          */
         physical: function (ctx)
         {
             var offense = ctx.attacker.physpower;
             var base = ctx.component.base;

             var defense = ctx.target.physpower;


             var mult = Math.min(Math.max(0.1, offense/defense), 10);


             var damage = base * mult;

             damage = Math.max(damage | 0, 1);
             ctx.target.hp -= damage;

             return "(-" +damage + ")";
         },


         // todo: Update this function
         psychic: function (ctx)
         {
             var offense = ctx.attacker.physpower;
             var base = ctx.component.base;

             var defense = ctx.target.physpower;


             var mult = Math.min(Math.max(0.1, offense/defense), 10);


             var damage = base * mult;

             damage = Math.max(damage | 0, 1);
             ctx.target.msp -= damage;

             return "(-" +damage + " MSP)";
         },

         heal: function (ctx)
         {
            /* var offense = ctx.attacker.physpower;
             var base = ctx.component.base;

             var defense = ctx.target.physpower;


             var mult = Math.min(Math.max(0.1, offense/defense), 10);


             var damage = base * mult;*/
             ctx.target.hp += ctx.component.base;

             return "(+" + ctx.component.base + ")";
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
             return temp;
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
