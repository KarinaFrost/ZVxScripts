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
     offenseClasses:
     {
         none:
         function(ctx)
         {
             var qmlt = 0.8, base = ctx.component.base;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base*1.2 || 0 + Math.E);
             }
             else if (ctx.attacker.base)
             {
                 qmlt = this.qMult((ctx.attacker.base)/base || 0 + Math.E);
             }
             return { offense: 1, qmult: qmlt};
         },

         general:
         function (ctx)
         {
             var damage, base = ctx.component.base, offense = ctx.attacker.defpower, qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base*1.2 || 0 + Math.E);
             }
             else if (ctx.attacker.base)
             {
                 qmlt = this.qMult((ctx.attacker.base)/base/3 || 0 + Math.E);
             }

             return {offense: offense, qmult: qmlt };

         },

         physical:
         function (ctx)
         {
             var damage, base = ctx.component.base,offense = ctx.attacker.physpower, qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base*1.2 || 0 + Math.E);
             }
             else if (ctx.attacker.base)
             {
                 qmlt = this.qMult((ctx.attacker.base)/base/3 || 0 + Math.E);
             }

             return {offense: offense, qmult: qmlt };

         },

         magical:
         function (ctx)
         {
             var damage, base = ctx.component.base,offense = ctx.attacker.magicpower, qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base || 0 + Math.E);
             }
             else if (ctx.attacker.base)
             {
                 qmlt = this.qMult((ctx.attacker.base)/base/3 || 0 + Math.E);
             }

             return {offense: offense, qmult: qmlt };

         },

         psychic:
         function (ctx)
         {
             var damage, base = ctx.component.base,offense = ctx.attacker.psypower, qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base/3 || 0 + Math.E);
             }
             else if (ctx.attacker.base)
             {
                 qmlt = this.qMult((ctx.attacker.base)/base/3 || 0 + Math.E);
             }

             return {offense: offense, qmult: qmlt };
         }


     },

     defenseClasses:
     {
         none:
         function ()
         {
             return 1;
         },

         general:
         function (ctx)
         {
             var defense = ctx.target.defpower;



             return defense;
         },

         physical:
         function(ctx)
         {
             var defense = ctx.target.defpower;

             if (ctx.target.attr && ctx.target.attr.ghost)
             {
                 defense *= 2;
             }

             if (ctx.target.attr && ctx.target.attr.flying && !(ctx.component.attr && ctx.component.attr.air))
             {
                 defense *= 2;
             }

             return defense;
         },

         magical:
         function(ctx)
         {
             var defense = ctx.target.defpower;
             return defense;
         },

         electric:
         function(ctx)
         {
             var defense = ctx.target.defpower;

             if (ctx.component.attr && ctx.component.attr.air && ctx.target.attr && ctx.target.attr.flying)
             {
                 defense /= 2;
             }

             if (ctx.target.attr && ctx.target.attr.wet)
             {
                 defense /= 2;
             }

             else if (ctx.target.attr && ctx.target.attr.grounded)
             {
                 defense *= 8;
             }

             return defense;
         },

         ice:
         function(ctx)
         {
             var defense = ctx.target.defpower;

             if (ctx.target.attr && ctx.target.attr.flying)
             {
                 defense /= 2;
             }

             return defense;
         },

         fire:
         function(ctx)
         {
             var defense = ctx.target.defpower;

             if (ctx.target.attr && (ctx.target.attr.ghost || ctx.target.attr.flamable))
             {
                 defense /= 2;
             }

             if (ctx.target.attr && (ctx.target.attr.wet || ctx.target.attr.firey))
             {
                 defense *= 2;
             }

             return defense;
         },

         light:
         function(ctx)
         {
             var defense = ctx.target.defpower;

             if (ctx.target.attr && (ctx.target.attr.ghost || ctx.target.attr.undead))
             {
                 defense /= 2;
             }

             return defense;
         },

         water:
         function(ctx)
         {
             var airlevel, defense = ctx.target.defpower;

             if (ctx.target.attr && ctx.target.attr.firey)
             {
                 defense /= 2;
             }

             return defense;
         },

         ghost:
         function(ctx)
         {
             var defense = ctx.target.defpower;

             if (ctx.target.attr && ctx.target.attr.firey)
             {
                 defense *= 2;
             }

             return defense;
         },

         psychic:
         function(ctx)
         {
             var defense = ctx.target.defpower;

             if (ctx.target.attr && ctx.target.attr.ghost)
             {
                 defense /= 2;
             }

             return defense;
         }







     },

     calcDamage:
     function (ctx)
     {
         var base = ctx.component.base, qmult = ctx.qmult, mult = Math.min(Math.max(0.1, Math.pow(ctx.offense/ctx.defense, 0.5)), 10);

         return base * qmult * mult;
     },

     damageClasses:
     {
         normal:
         function (ctx)
         {
             var damage = ctx.damage;

             return {hp:-damage};
         },

         ghost:
         function (ctx)
         {
             var damage = Math.round(ctx.damage/3);

             return {hp: -damage, sp: -damage, msp: -damage};
         },

         ice:
         function (ctx)
         {
             var damage = Math.round(ctx.damage/2);

             return { hp: -damage, sp: -damage };
         },

         dark:
         function (ctx)
         {
             var damage = Math.round(ctx.damage/2);

             return { hp: -damage, mp: -damage };
         },

         nullify:
         function (ctx)
         {
             return { mp: -ctx.damage };
         },

         heal:
         function (ctx)
         {
             var damage = ctx.damage;

             return { hp: damage};
         },

         healmp:
         function (ctx)
         {
             var damage = ctx.damage;

             return { mp: damage};
         },

         healsp:
         function (ctx)
         {
             var damage = ctx.damage;

             return { sp: damage};
         },

         healmsp:
         function (ctx)
         {
             var damage = ctx.damage;

             return { sp: damage};
         },

         none:
         function()
         {
             return {};
         },

         ghostify:
         function(ctx)
         {
             var turns = Math.round(ctx.damage);

             if (!ctx.target.attr) ctx.target.attr = {ghost:turns};

             else ctx.target.attr.ghost = (ctx.target.attr.ghost || 0) + turns;

             return {};
         },

         psychic:
         function (ctx)
         {
             var damage = Math.round(ctx.damage);

             return { msp: -damage };
         }


     },

     componentClasses:
     {
         physical:
         {
             offense: "physical", defense: "physical", damage: "normal"
         },

         ghost:
         {
             offense: "magical", defense: "ghost", damage: "ghost"
         },

         ice:
         {
             offense: "magical", defense: "ice", damage: "ice"
         },

         dark:
         {
             offense: "magical", defense: "ghost", damage: "dark"
         },

         magical:
         {
             offense: "magical", defense: "magical", damage: "normal"
         },

         psychic:
         {
             offense: "psychic", defense: "psychic", damage: "psychic"
         },

         heal:
         {
             offense: "none", defense: "none", damage: "heal"
         },

         boostmsp:
         {
             offense: "none", defense: "none", damage: "healmsp"
         },

         boostmp:
         {
             offense: "none", defense: "none", damage: "healmp"
         },

         boostsp:
         {
             offense: "none", defense: "none", damage: "healsp"
         },

         ghostify:
         {
             offense: "none", defense: "none", damage: "ghostify"
         },

         light:
         {
             offense: "magical", defense: "light", damage: "normal"
         }
     },


     runComponent:
     function (comp, move, attacker, target)
     {
         var x, offenseObj = this.offenseClasses[comp.offense || this.componentClasses[comp.move].offense].call(this, {attacker: attacker, move: move, base: comp.base, component: comp}),
         offense = offenseObj.offense, qmult = offenseObj.qmult, defense = this.defenseClasses[comp.defense || (comp.move && this.componentClasses[comp.move].defense) || "general"].call(this, {target: target, component: comp}), damage = this.calcDamage.call(this, {offense:offense, defense: defense, qmult: qmult, component: comp}), damageObj = this.damageClasses[comp.damage || (this.componentClasses[comp.move] || {}).damage || "normal"]({damage: damage, target: target});
         // defense classes

         //print(JSON.stringify([damage, damageObj, offense, defense, qmult]));
         for (x in damageObj)
         {
             target[x] += damageObj[x];
         }



         return damageObj;
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
