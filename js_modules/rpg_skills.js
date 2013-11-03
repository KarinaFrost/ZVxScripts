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
/** The rpg skill levels: 0-F, 1-E, 2-D, 3-C, 4-B, 5-A, 6-S, 7-X, 8-O
 * @name rpgSkillLevel
 * @type Number
 * @class
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
         rabbit:
         {
             name: "Root Crest: Rabbit Attack!", element: "root",
             components:[{ target: "opp", base:20, move: "instakill", desc: "A killer rabbit was summonned by %s and it attacked %t!", count: 1}]
         },

         attack:
         {
             name: "Attack", element: "physical", next: ["psyburst", "heal", "thundershock", "shadows", "toxin", "blades"], threshold: 0,
             components: [{ target: "opp", base:20, move: "physical", desc: "%s attacked %t!", count:1 }]
         },

         psyburst:
         {
             name: "Psycho Burst", desc: "The user concentrates psychic energy and uses it to attack.", cost: { msp: 20 },
             components: [{ target: "opp", base: 15, move: "psychic", desc: "% unleashed a burst of psychic energy against %t!", count: 1}]
         },

         heal:
         {
             name: "Healing Spell", cost: {mp:20, msp: 10}, next: ["healbubble", "healpulse", "lightburst"],
             components: [{ target: "ally", base: 20, move: "heal", desc: "%s healed %t!", count: 1}]
         },

         healbubble:
         {

             name: "Healing Bubble", cost: {mp:35, msp: 20}, next: [],
             components: [{ target: "ally", base: 15, move: "heal", desc: "%t was in %s's healing buble.", count: 3}]

         },

         healwave:
         {

             name: "Healing Wave", cost: {mp:45, msp: 25}, next: [],
             components: [{ target: "ally", base: 25, move: "heal", desc: "%t was caught in %s's healing wave.", count: 3}]

         },

         healrain:
         {

             name: "Healing Rain", cost: {mp:75, msp: 30}, next: ["elixarai"],
             components: [{ target: "ally", base: 45, move: "heal", desc: "%t bathed in the healing rain", count: 9}]

         },

         elixarai:
         {

             name: "Elixarai", cost: {mp:175, msp: 130}, next: [],
             components: [{ target: "ally", base: 100, move: "heal", desc: "%t was healing by the blinding light!", count: 10}]

         },


         healpulse:
         {

             name: "Healing Pulse", cost: {mp:35, msp: 20}, next: ["healingenergy"],
             components: [{ target: "ally", base: 35, move: "heal", desc: "%s used healing pulse on %t!", count: 1}]

         },

         healingenergy:
         {

             name: "Healing Energy", cost: {mp:45, msp: 25}, next: ["healinghope"],
             components: [{ target: "ally", base: 65, move: "heal", desc: "%s used healing energy on %t!", count: 1}]

         },

         healinghope:
         {

             name: "Healing Hope", cost: {mp:64, msp: 30}, next: ["angelwing", "altrist", "invigoration"],
             components: [{ target: "ally", base: 185, move: "heal", desc: "%s used healing hope on %t!", count: 1}]

         },

         angelwing:
         {

             name: "Angel's Wing", cost: {mp:300, msp: 30}, next: ["angelpromise"],
             components: [{ target: "ally", base: 358, move: "heal", desc: "A holy energy healed %t!", count: 1}]

         },

         angelpromise:
         {

             name: "Angel's Promise", cost: {mp:1000, msp: 130}, next: [],
             components: [{ target: "ally", base: 1258, move: "heal", desc: "A holy energy healed %t!", count: 1}]

         },

         altrist:
         {
             name: "Altruist's Sacrafice", cost: { mp: 100, msp: 30 },
             components: [{target: "ally", base: 500, move: "transfer"}]
         },

         invigoration:
         {
             name: "Invigoration", cost: {mp: 200, msp: 130},
             components: [{target: "self", base: 200, move: "heal"}]
         }







     }
 });
