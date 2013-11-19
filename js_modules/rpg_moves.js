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
             offense: "none", defense: "none", damage: "boostmsp"
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

         phyghost:
         function (ctx)
         {
             var offense = ctx.attacker.physpower;
             var base = ctx.component.base;

             var defense = ctx.target.defpower;


             var mult = Math.min(Math.max(0.1, offense/defense), 10);
             var qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base*2 || 0 + Math.E);
             }


             var damage = base * mult;

             damage = Math.max(damage | 0, 5);
             ctx.target.hp -= damage/3;
             ctx.target.sp -= damage/3;
             ctx.target.msp -= damage/3;

             return {string: "(-" +Math.round(damage/3) + " HP, -"+Math.round(damage/3)+" SP, -"+Math.round(damage/3)+" MSP)", damage:damage, exptype: "mag"};
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
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base*2 || 0 + Math.E);
             }


             var damage = base * mult;

             damage = Math.max(damage | 0, 5);
             ctx.target.hp -= damage/3;
             ctx.target.sp -= damage/3;
             ctx.target.msp -= damage/3;

             return {string: "(-" +Math.round(damage/3) + " HP, -"+Math.round(damage/3)+" SP, -"+Math.round(damage/3)+" MSP)", damage:damage, exptype: "mag"};
         },


         dark:
         function (ctx)
         {
             var offense = ctx.attacker.magicpower;
             var base = ctx.component.base;

             var defense = ctx.target.defpower;


             var mult = Math.min(Math.max(0.1, offense/defense), 10);
             var qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base*2 || 0 + Math.E);
             }


             var damage = base * mult;

             damage = Math.max(damage | 0, 5);
             ctx.target.hp -= damage/2;
             ctx.target.mp -= damage/2;

             return {string: "(-" +Math.round(damage/2) + " HP, -"+Math.round(damage/2)+" MP)", damage:damage, exptype: "mag"};
         },

         boostmsp:
         function (ctx)
         {
             ctx.target.msp += ctx.component.base;
             return {string: "(+" +ctx.component.base + " MSP)", damage: ctx.component.base, exptype: "men"};
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
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base || 0 + Math.E);
             }

             if (ctx.target.attr && ctx.target.attr.ghost)
             {
                 offense = offense/2;
             }

             var defense = ctx.target.defpower;
             var mult = Math.min(Math.max(0.1, offense/defense), 10);


             var damage = base * mult * qmlt;

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
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base*0.6 || 0 + Math.E);
             }


             var mult = Math.min(Math.max(0.1, offense/defense), 10);


             var damage = base * mult * qmlt;

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
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base || 0 + Math.E);
             }


             var damage = base * mult * qmlt;

             damage = Math.max(damage | 0, 1);
             ctx.target.hp -= damage;

             return {string: "(-" +damage + " HP)", damage:damage, exptype: "res"};
         },

         heal: function (ctx)
         {
             // var offense = ctx.attacker.physpower;
             var base = ctx.component.base;
             /*
              var defense = ctx.target.physpower;


              var mult = Math.min(Math.max(0.1, offense/defense), 10);


              var damage = base * mult;*/
             var qmlt = 0.8;

             if (ctx.attacker.type == "player")
             {
                 qmlt = this.qMult((ctx.attacker.exp[ctx.move.shortname]-this.skills[ctx.move.shortname].threshold)/base || 0 + Math.E);
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
