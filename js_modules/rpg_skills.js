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
/** This type of object contains the definitions of skills
 * @name rpgSkill
 * @class
 */
/** The name of the skill
 * @name name
 * @memberOf rpgSkill.prototype
 */
/** The cost of using the skill.
 * @name cost
 * @memberOf rpgSkill.prototype
 * @type rpgCost
 */
/** Skill level.
 * @name level
 * @type rpgSkillLevel
 * @memberOf rpgSkill.prototype
 */
/**
 * @name rpgSkillComponent
 * @class
 */
/** Target of the component, either "self", "opp", "ally" or combinations of such (in array)
 * @name target
 * @memberOf rpgSkillComponent.prototype
 */
/** How many enemies to strike
 * @name count
 * @memberOf rpgSkillComponent.prototype
 */
/** Type of component, e.g., 'physical', 'magical', 'heal' etc.
 * @name move
 * @memberOf rpgSkillComponent.prototype
 */
/** The base damage done.
 * @name base
 * @memberOf rpgSkillComponent.prototype
 */


/** @scope script.modules.rpg_game */
({
     skills:
     {
         // Mob skills

         peck:
         {
             name: "Chicken Peck", element: "phsyical",
             components: [{ target: "opp", base: 20, move: "physical", desc: "%s pecked %t!", count: 1 }]
         },

         peckground:
         {
             name: "Chicken Peck", element: "phsyical",
             components: [{ target: "none", base: 20, move: "nil", desc: "%s pecked the ground!", count: 0 }]
         },

         rabbit:
         {
             name: "Root Crest: Rabbit Attack!", element: "root",
             components:[{ target: "opp", base:20, move: "instakill", desc: "A killer rabbit was summonned by %s and it attacked %t!", count: 1}]
         },

         // Player skills

         attack:
         {
             name: "Attack", element: "physical", cost:{sp:20}, next: ["psyburst", "heal", "thundershock", "shadows", "toxin", "blades"], threshold: 0,
             components: [{ target: "opp", base:50, move: "physical", desc: "%s attacked %t!", count:1 }]
         },

         heal:
         {
             name: "Healing Spell", cost: {mp:20, msp: 10}, next: ["healbubble", "healpulse", "lightburst"], threshold: 300,
             components: [{ target: "ally", base: 50, move: "heal", desc: "%s healed %t!", count: 1}]
         },

         healbubble:
         {

             name: "Healing Bubble", cost: {mp:35, msp: 20}, next: ["healwave"], threshold: 3600,
             components: [{ target: "ally", base: 85, move: "heal", desc: "%t was in %s's healing bubble.", count: 3}]

         },

         healwave:
         {
             name: "Healing Wave", cost: {mp:45, msp: 25}, next: ["healrain"],
             components: [{ target: "ally", base: 180, move: "heal", desc: "%t was caught in %s's healing wave.", count: 3}]
         },

         healrain:
         {

             name: "Healing Rain", cost: {mp:75, msp: 30}, next: ["elixarai",  "altruist"],
             components: [{ target: "ally", base: 370, move: "heal", desc: "%t bathed in the healing rain", count: 9}]

         },

         elixarai:
         {

             name: "Elixarai", cost: {mp:175, msp: 130}, next: [],
             components: [{ target: "ally", base: 750, move: "heal", desc: "%t was healing by the blinding light!", count: 10}]

         },


         healpulse:
         {

             name: "Healing Pulse", cost: {mp:35, msp: 20}, next: ["healingenergy"],
             components: [{ target: "ally", base: 110, move: "heal", desc: "%s used healing pulse on %t!", count: 1}]

         },

         healingenergy:
         {

             name: "Healing Energy", cost: {mp:45, msp: 25}, next: ["healinghope"],
             components: [{ target: "ally", base: 240, move: "heal", desc: "%s used healing energy on %t!", count: 1}]

         },

         healinghope:
         {

             name: "Healing Hope", cost: {mp:64, msp: 30}, next: ["angelwing", "invigoration"],
             components: [{ target: "ally", base: 430, move: "heal", desc: "%s used healing hope on %t!", count: 1}]

         },

         angelwing:
         {

             name: "Angel's Wing", cost: {mp:300, msp: 30}, next: ["angelpromise"],
             components: [{ target: "ally", base: 890, move: "heal", desc: "A holy energy healed %t!", count: 1}]

         },

         angelpromise:
         {

             name: "Angel's Promise", cost: {mp:1000, msp: 130}, next: [],
             components: [{ target: "ally", base: 1258, move: "heal", desc: "A holy energy healed %t!", count: 1}]

         },

         altruist:
         {
             name: "Altruist's Sacrafice", cost: { mp: 100, msp: 30 },
             components: [{target: "ally", base: 850, move: "transfer"}]
         },

         invigoration:
         {
             name: "Invigoration", cost: {mp: 500, msp: 130},
             components: [{target: "self", base: 500, move: "heal"}]
         },

         psyburst:
         {
             name: "Psycho Burst", desc: "The user concentrates psychic energy and uses it to attack.", cost: { msp: 10 }, threshold: 60*5,
             components: [{ target: "opp", base: 30, move: "psychic", desc: "%s unleashed a burst of psychic energy against %t!", count: 1}]
         },

         psyshock:
         {
             name: "Psycho Shock", desc: "The user concentrates psychic energy and unleashes it in a shockwave.", cost: { msp: 40 }, threshold: 3600,
             components: [{ target: "opp", base: 56, move: "psychic", desc: "%s unleashed a shockwave of psychic energy towards %t!", count: 1}]
         },

         psyslice:
         {
             name: "Psycho Slice", desc: "The user concentrates psychic energy into a wedge and unleashes it.", cost: { msp: 40 }, threshold: 3600*2,
             components: [{ target: "opp", base: 140, move: "psychic", desc: "%s unleashed a shockwave of psychic energy towards %t!", count: 1}]
         },

         psyblast:
         {
             name: "Psycho Blast", desc: "The user unleashes a blast of psychic energy", cost: { msp: 80 }, threshold: 3600*2,
             components: [{ target: "opp", base: 340, move: "psychic", desc: "%s blasted %t with psychic energy!", count: 1}]
         },

         blackmind:
         {
             name: "Black Mind", desc: "The user unleashes a terrible flux of psychic energy.", cost: { msp: 158 },
             components: [{ desc: "%s unleashed a terrible flux of psychic energy!" },
                          { target: "opp", base: 175, move: "psychic", desc: "%t was caught in the flux!", count: 5}]
         }








     }
 });
