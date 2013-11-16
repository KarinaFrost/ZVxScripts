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
     playerCanUseSkill: function (player, skillname)
     {
         var skill = this.skills[skillname], exp;

         if (!skill) return false;

         if (skill.threshold === null || skill.threshold === undefined) return false;

         if (skill.threshold === 0) return true;

         exp = player.exp[skillname] || 0;

         return skill.threshold <= exp;
     },

     skills:
     {
         // Mob skills

         firebreath:
         {
             name: "Fire Breath", elemet: "fire", cost: { mp: 1300},
             components: [{ target: "opp", base: 3500, move: "physical", desc: "%s blasted fire at %t!", count: 3 }]
         },
         peck:
         {
             name: "Chicken Peck", element: "phsyical",
             components: [{ target: "opp", base: 5, move: "physical", desc: "%s pecked %t!", count: 1 }]
         },

         peckground:
         {
             name: "Chicken Peck", element: "phsyical",
             components: [{ target: "none", base : 0, move: "nil", desc: "%s pecked the ground!", count: 0 }]
         },

         rabbit:
         {
             name: "Root Crest: Rabbit Attack!", element: "root",
             components:[{ target: "opp", base:20, move: "instakill", desc: "A killer rabbit was summonned by %s and it attacked %t!", count: 1}]
         },

         sltackle:
         {
             name: "Slimy Tackle", cost: {sp: 10},
             components: [{target: "opp", base: 15, move: "physical", desc: "%s tackled %t!", count:1}]
         },

         slvortex:
         {
             name: "Slimy Vortex", cost: {mp: 25},
             components: [{target: "opp", base: 35, move: "physical", desc: "%s summoned a slimy vortex which engulfs %t!", count:1}]
         },

         slexp:
         {
             name: "Slimy Explosion", cost: {mp: 57},
             components: [{target: "opp", base: 95, move: "physical", desc: "%s created a slimy explosion which blasted %t!", count:5}]
         },

         slcrash:
         {
             name: "Slimy Crash", cost: {mp: 89},
             components: [{target: "opp", base: 195, move: "physical", desc: "%s used slimy crash which covered %t in slime!", count:2}]
         },

         fangs:
         {
             name: "Fangs", cost: {sp: 5},
             components: [{target: "opp", base: 9, move: "physical", desc: "%s bit %t!", count:2}]
         },

         // Player skills

         attack:
         {
             name: "Attack", element: "physical", cost:{sp:2}, exp: "str", next: ["psyburst", "heal", "shadows", "punch", "kick" /*, "thundershock", "shadows", "toxin", "blades"*/], threshold: 0,
             components: [{ target: "opp", base:5, move: "physical", desc: "%s attacked %t!", count:1 }]
         },

         punch:
         {
             name: "Punch", cost: {sp:5, msp:1}, exp: "str", next: ["kick", "superpunch"], threshold: 60*5,
             components: [{ target: "opp", base:15, move: "physical", desc: "%s punched %t!", count:1 }]

         },

         superpunch:
         {
             name: "Super Punch", cost: {sp:15, msp:5}, exp: "str", next: ["megapunch"], threshold: 60*10,
             components: [{ target: "opp", base:36, move: "physical", desc: "%s punched %t!", count:1 }]

         },


         megapunch:
         {
             name: "Mega Punch", cost: {sp:32, msp:12}, exp: "str", next: [], threshold: 60*15,
             components: [{ target: "opp", base:56, move: "physical", desc: "%s punched %t with a powerful punch!", count:1 }]

         },

         kick:
         {
             name: "Kick", cost: {sp:8, msp:2}, exp: "str", next: ["punch", "superkick"], threshold: 60*5,
             components: [{ target: "opp", base:20, move: "physical", desc: "%s kicked %t!", count:1 }]

         },

         heal:
         {
             name: "Healing Spell", cost: {mp:5, msp: 5}, exp: "mag", next: ["healbubble", "healpulse", "lightburst"], threshold: 60*5,
             components: [{ target: "ally", base: 15, move: "heal", desc: "%s healed %t!", count: 1}]
         },

         lightburst:
         {
             name: "LightBurst", cost: {mp: 20, sp: 5, msp: 5}, exp: "mag", threshold: 60*10, next: ["lightblast"],
             components: [{ target: "opp", base: 45, move: "magical", desc: "%s released a luminous light which burns %t!", count:1 }]
         },

         lightblast:
         {
             name: "Light Blast", cost: {mp: 35, sp: 5, msp: 15}, exp: "mag", threshold: 60*15, next: ["sunburst", "blitzfield"],
             components: [{ target: "opp", base: 75, move: "magical", desc: "%s fired a blast of billiant light at %t!", count:1 }]
         },

         sunburst:
         {
             name: "Sunburst", cost: {mp: 89, sp: 5, msp: 35}, exp: "mag", threshold: 60*20,
             components: [{ target: "opp", base: 172, move: "magical", desc: "%s shot a ball of white hot light at %t!", count:1 }]
         },

         blitzfield:
         {
             name: "Blitzfield", cost: {mp: 89, sp: 5, msp: 35}, exp: "mag", threshold: 60*20,
             components: [{ target: "opp", base: 65, move: "magical", desc: "%s casts a spell which engulfs the field in light, burning their enemies! %t", count:5 }]
         },

         healbubble:
         {

             name: "Healing Bubble", cost: {mp:30, msp: 5}, exp: "mag", next: ["healwave"], threshold: 60*10,
             components: [{ target: "ally", base: 60, move: "heal", desc: "%t was in %s's healing bubble.", count: 3}]

         },

         healwave:
         {
             name: "Healing Wave", cost: {mp:50, msp: 35}, next: ["healrain"], threshold: 60*15,
             components: [{ target: "ally", base: 180, move: "heal", desc: "%t was caught in %s's healing wave.", count: 3}]
         },

         healrain:
         {

             name: "Healing Rain", cost: {mp:175, msp: 30}, exp: "mag", next: ["elixarai",  "altruist"], threshold: 60*25,
             components: [{ target: "ally", base: 370, move: "heal", desc: "%t bathed in the healing rain", count: 9}]

         },

         elixarai:
         {

             name: "Elixarai", cost: {mp:750, msp: 130}, exp: "mag", next: [], threshold: 60*30,
             components: [{ target: "ally", base: 750, move: "heal", desc: "%t was healing by the blinding light!", count: 10}]

         },


         healpulse:
         {

             name: "Healing Pulse", cost: {mp:35, msp: 20},  exp: "mag", next: ["healingenergy"], threshold: 60*10,
             components: [{ target: "ally", base: 110, move: "heal", desc: "%s used healing pulse on %t!", count: 1}]

         },

         healingenergy:
         {

             name: "Healing Energy", cost: {mp:45, msp: 25}, exp: "mag", next: ["healinghope"], threshold: 60*30,
             components: [{ target: "ally", base: 240, move: "heal", desc: "%s used healing energy on %t!", count: 1}]

         },

         healinghope:
         {

             name: "Healing Hope", cost: {mp:64, msp: 30}, exp: "mag", next: ["angelwing", "invigoration"], threshold: 3600,
             components: [{ target: "ally", base: 430, move: "heal", desc: "%s used healing hope on %t!", count: 1}]

         },

         angelwing:
         {

             name: "Angel's Wing", cost: {mp:300, msp: 30}, exp: "mag", next: ["angelpromise"], threshold: 3600*3,
             components: [{ target: "ally", base: 890, move: "heal", desc: "A holy energy healed %t!", count: 1}]

         },

         angelpromise:
         {

             name: "Angel's Promise", cost: {mp:500, msp: 130}, exp: "mag", next: [], threshold: 3600*13,
             components: [{ target: "ally", base: 1258, move: "heal", desc: "A holy energy healed %t!", count: 1}]

         },

         altruist:
         {
             name: "Altruist's Sacrafice", exp: "res", cost: { mp: 100, msp: 30 }, threshold: 3600*16,
             components: [{target: "ally", base: 850, move: "transfer"}]
         },

         invigoration:
         {
             name: "Invigoration", exp: "mag", cost: {mp: 500, msp: 130}, threshold: 3600*6,
             components: [{target: "self", base: 500, move: "heal"}]
         },

         psyburst:
         {
             name: "Psycho Burst", exp: "psy", desc: "The user concentrates psychic energy and uses it to attack.", cost: { msp: 8 }, threshold: 60*5,next: ["psyshock"],
             components: [{ target: "opp", base: 10, move: "psychic", desc: "%s unleashed a burst of psychic energy against %t!", count: 1}]
         },

         psyshock:
         {
             name: "Psycho Shock", exp: "psy", desc: "The user concentrates psychic energy and unleashes it in a shockwave.", cost: { msp: 20 }, threshold: 60*15, next: ["psyslice", 'hyperfocus'],
             components: [{ target: "opp", base: 25, move: "psychic", desc: "%s unleashed a shockwave of psychic energy towards %t!", count: 1}]
         },

         hyperfocus:
         {
             name: 'Hyperfocus', exp: 'men', desc: 'The user improves their focus to regain mental stamina', cost: {sp: 30}, threshold: 60*20,
             components: [{ target: "self", base: 25, move: "boostmsp", desc: "%s gained a state of higher focus!", count: 1}]
         },

         psyslice:
         {
             name: "Psycho Slice", exp: "psy", desc: "The user concentrates psychic energy into a wedge and unleashes it.", cost: { msp: 40 }, threshold: 60*35, next: ["psyblast", "blackout"],
             components: [{ target: "opp", base: 45, move: "psychic", desc: "%s unleashed a blade of psychic energy towards %t!", count: 1}]
         },

         psyblast:
         {
             name: "Psycho Blast", exp: "psy", desc: "The user unleashes a blast of psychic energy", cost: { msp: 80 }, threshold: 60*45,
             components: [{ target: "opp", base: 155, move: "psychic", desc: "%s blasted %t with psychic energy!", count: 1}]
         },

         blackout:
         {
             name: "Blackout", desc: "The user unleashes a large of psychic energy which hits multiple enemies.", cost: { msp: 95 }, next: ["blackmind"], threshold: 60*45,
             components: [{ desc: "%s unleashed a storm of psychic energy!" },
                          { target: "opp", base: 85, move: "psychic", desc: "%t was caught in the flux!", count: 3}]
         },

         blackmind:
         {
             name: "Black Mind", desc: "The user unleashes a terrible flux of psychic energy.", cost: { msp: 198 }, threshold: 60*78,
             components: [{ desc: "%s unleashed a terrible flux of psychic energy!" },
                          { target: "opp", base: 175, move: "psychic", desc: "%t was caught in the flux!", count: 5}]
         },

         shadows:
         {
             name: "Shadows", exp: "mag",  desc: "A terrible shadow attacks the enemy!", cost: {mp: 10, msp:5}, threshold: 60*5, next:["blackfog"],
             components: [{ target: "opp", base: 25, move: "ghost", desc: "%t was caught by shadows controlled by %s!", count: 1}]
         },

         blackfog:
         {
             name: "Black Fog", exp: "mag", desc: "A black fog engulfs the enemy!", cost: {mp: 15, msp:10}, threshold: 60*10, next: ["blood"],
             components: [{ target: "opp", base: 35, move: "ghost", desc: "%t suffocated in black fog!", count: 1}]
         },

         blood:
         {
             name: "Devil's Blood", exp: "mag", desc: "The user sacrafices their own blood to lay a curse on the enemy", cost: { hp: 55, mp: 10, msp: 10 }, threshold: 60*15, next: ["hellrain", "sarchith"],
             components: [{ target: "opp", base: 85, move: "ghost", desc: "%s drew blood unto the ground and it curses %t!", count: 1}]

         },

         sarachith:
         {
             name: "Sarachith", exp: "res", desc: "The user users a contract of demons to injure their opponent.", cost: { hp: 85, mp: 10, msp: 10 },
             components: [{ target: "opp", base: 85, move: "ghost", desc: "%s exchanged a contract with demons and it curses %t!", count: 1}]
         },

         hellrain:
         {
             name: "Hell's Rain", exp: "mag", desc: "A terrible downpour of pure darkness enroaches the battlefield!", cost: {mp:20, msp:5}, threshold: 60*35,
             components: [{ target: "opp", base: 65, move: "ghost", desc: "%t was caught in the dark rain!", count: 5},{ target: "ally", base: 25, move: "ghost", desc: "%t was caught in the dark rain!", count: 2}]

         }








     }
 });
