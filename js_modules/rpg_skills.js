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
             components: [{ target: "opp", base: 3500,  desc: "%s blasted fire at %t!", count: 3 }]
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
             name: "It's Dyanamite", element: "root", threshold:1,
             components:[{ target: "opp", base:20, move: "instakill", desc: "A killer rabbit that's dynamite was summonned by %s and it attacked %t!", count: 1},{desc:"http://www.youtube.com/watch?v=Nvs5pqf-DMA", count: 0}]
         },

         sltackle:
         {
             name: "Slimy Tackle", cost: {sp: 15},
             components: [{target: "opp", base: 35, move: "physical", desc: "%s tackled %t!", count:1}]
         },

         slvortex:
         {
             name: "Slimy Vortex", cost: {mp: 25},
             components: [{target: "opp", base: 95, move: "physical", desc: "%s summoned a slimy vortex which engulfs %t!", count:1}]
         },

         slexp:
         {
             name: "Slimy Explosion", cost: {mp: 87},
             components: [{target: "opp", base: 195, move: "physical", desc: "%s created a slimy explosion which blasted %t!", count:5}]
         },

         slcrash:
         {
             name: "Slimy Crash", cost: {mp: 189},
             components: [{target: "opp", base: 409, move: "physical", desc: "%s used slimy crash which covered %t in slime!", count:2}]
         },

         slbreath:
         {
             name: "Slimy Breath", cost: {mp: 289},
             components: [{target: "opp", base: 802, offense: "magical", defense:"physical", damage: "normal", desc: "%s breathed slime on %t!", count:2}]
         },

         fangs:
         {
             name: "Fangs", cost: {sp: 8}, threshold: 100,
             components: [{target: "opp", base: 14, move: "physical", desc: "%s bit %t!", count:1}]
         },

         diswave:
         {
             name: "Distortion Wave", cost: {msp: 2}, threshold: 60*15, next: ["disbrk"],
             components: [{target: "opp", base: 14, move: "magical", desc: "%s blasted %t with a distortion wave!", count:1}]
         },

         disbrk:
         {
             name: "Distortion Break", cost: {msp: 4}, threshold: 60*35, next: ["dispulse"],
             components: [{target: "opp", base: 34, move: "magical", desc: "%s caught %t in a distortion fissure!", count:1}]
         },

         dispulse:
         {
             name: "Distortion Pulse", cost: {msp: 6}, threshold: 60*45, next: ["disblast"],
             components: [{target: "opp", base: 74, move: "magical", desc: "%s blasted %t with a distortion pulse!", count:1}]
         },

         disblast:
         {
             name: "Distortion Blast", cost: {msp: 8}, next: ["disfield"], threshold: 60*60,
             components: [{target: "opp", base: 104, move: "magical", desc: "%s blasted %t with a surge of distortion energy!", count:1}]
         },

         disfield:
         {
             name: "Distortion Field", cost: {msp: 10}, next: ["diswarp"], threshold: 60*85,
             components: [{target: "opp", base: 104, move: "magical", desc: "%s captured %t within a distortion field!", count:4}]
         },

         diswarp:
         {
             name: "Distortion Warp", cost: {msp: 14}, next: ["disexpl"], threshold: 3600*2.2,
             components: [{target: "opp", base: 204, move: "magical", desc: "%s captured %t within a distortion warp!", count:4}]
         },

         disexpl:
         {
             name: "Distortion Explosion", threshold: 3600* 3.5,
             cost: {msp: 16}, next: [],
             components: [{target: "opp", base: 304, move: "magical", desc: "%s released an explosion of distortion energy! It struk %t!", count:4}]
         },


         // Player skills

         attack:
         {
             name: "Attack", element: "physical", exp: "res", next: ["psyburst", "heal", "shadows", "punch", "thundershock", "snowb" /*, "thundershock", "shadows", "toxin", "blades"*/], threshold: 0,
             desc: "A basic attack",
             components: [{ target: "opp", base:5, offense: "general", defense: "general", desc: "%s attacked %t!", count:1 }]
         },

         snowb:
         {
             name: "Snowball", element: "ice", exp: "mag", desc: "The user fires an extra cold snowball at the enemy!", cost: { mp: 5, sp:5, msp:1 }, threshold: 60*10,
             components: [{ target: "opp", base:15, move: "ice", desc: "%s threw a snow ball at %t!", count:1 }], next: ["snowdr"]


         },

         snowdr:
         {
             name: "Snow Drift", element: "ice", exp: "mag", desc: "The user brings snow upon thy enemies!", cost: { mp: 15, msp: 3 }, threshold: 60*15, next: ["icecl"],
             components: [{ target: "opp", base:35, move: "ice", desc: "%s attacked %t with lots of snow!", count:1 }]

         },

         icecl:
         {
             name: "Icicles", element: "ice", exp: "mag", desc: "The user drops icicles upon thy foes!", threshold: 60*25, cost: {mp: 35, msp: 5 },
             components: [{ target: "opp", base:95, move: "ice", desc: "%s dropped icicles on %t!", count:1 }], next: ["iceball"]


         },

         iceball:
         {
             name: "Ice Ball", element: "ice", exp: "mag", desc: "The user throws a ball of ice at thy foes!", threshold: 60*45, cost: {mp: 80, msp: 5 },
             components: [{ target: "opp", base:140, move: "ice", desc: "%s threw an ice ball at %t!", count:1 }], next: ["chwave"]


         },

         chwave:
         {
             name: "Chilly Wave", element: "ice", exp: "mag", desc: "The user attacks their enemies with cold air!", threshold: 60*60, cost: {mp: 120, msp: 10 },
             components: [{ target: "opp", base:220, move: "ice", desc: "%s sent frigid air at %t!", count:3 }], next: ["arcpulse"]


         },

         arcpulse:
         {
             name: "Arctic Pulse", element: "ice", exp: "mag", desc: "The user blasts the enemy with fridgid air!", threshold: 60*75, cost: {mp: 220, msp: 20 },
             components: [{ target: "opp", base:550, move: "ice", desc: "%s threw a snow ball at %t!", count:1 }]


         },

         thundershock:
         {

             name: "Thundershock", cost: {mp:15, msp:5}, exp: "mag", next: ["thunderbolt"], threshold: 60*10, attr: {air:true},
             desc: "User zaps enemy!",
             components: [{ target: "opp", base:36, offense: "magical", defense: "electric", desc: "%s zapped %t!", count:1 }]
         },

         thunderbolt:
         {

             name: "Thunderbolt", cost: {mp:35, msp:10}, exp: "mag", next: ["voltblast"], threshold: 60*15, attr: {air:true},
             desc: "User calls upon lighting.",
             components: [{ target: "opp", base:86, offense: "magical", defense: "electric", desc: "%s zapped %t!", count:1 }]
         },


         voltblast:
         {

             name: "Volt Blast", cost: {mp:89, msp:15}, exp: "mag", next: ["thunderstorm"], threshold: 60*35,
             desc: "User creates an electric discharge by imbalancing the polarity of the ground and air.",
             components: [{ target: "opp", base:210, offense: "magical", defense: "electric", desc: "%s shocked %t with a strong electric discharge!", count:1 }]
         },



         thunderstorm:
         {

             name: "Thunderstorm", cost: {mp:190, msp:20}, exp: "mag", next: ["plasmabomb"], threshold: 3600, attr: {air: true},
             desc: "Fires a large number of lightning bolts down on foes.",
             components: [{ target: "opp", base: 320, offense: "magical", defense: "electric", desc: "%s called down a thunderstorm on %t!", count:3 }]
         },

         plasmabomb:
         {
             name: "Plasma Bomb", cost: {mp:350, msp:30}, exp: "mag", next: [], threshold: 3600,  attr: {air: true},
             desc: "Fires a ball of plasma at an enemy.",
             components: [{ target: "opp", base:640, offense: "magical", defense: "electric", desc: "%s shot hot plasma at %t!", count:1 }]
         },
/*
         bomb:
         {
             name: "Bomb", cost: { mp: 15, sp: 5 }, exp: "mag",
         },
  */

         bombs:
         {
             name: "Bombs", cost: {sp:15, mp:15},
             components: [{ target: "opp", base: 136, offense: "magical", defense: "fire", desc: "%s dropped bombs on %t!", count:1 }]
         },


         punch:
         {
             name: "Punch", cost: {sp:5, msp:1}, exp: "str", next: ["kick", "superpunch"], threshold: 60*5,
             desc: "The user punches their enemy.",
             components: [{ target: "opp", base:15, move: "physical", desc: "%s punched %t!", count:1 }]

         },

         superpunch:
         {
             name: "Super Punch", cost: {sp:15, msp:5}, exp: "str", next: ["megapunch"], threshold: 60*10,
             desc: "The user punches their enemy with greater force.",
             components: [{ target: "opp", base:36, move: "physical", desc: "%s punched %t!", count:1 }]

         },


         megapunch:
         {
             name: "Mega Punch", cost: {sp:32, msp:12}, exp: "str", next: ["sonichand", "ghostpunch"], threshold: 60*15,

             desc: "The user punches their enemy with even greater force.",
             components: [{ target: "opp", base:56, move: "physical", desc: "%s punched %t with a powerful punch!", count:1 }]

         },

         sonichand:
         {
             name: "Sonic Hand", cost: {sp: 65, msp: 12}, exp: "str", next: ["blitzhand"], threshold: 60*20,
             desc: "The user punches their enemy with great speed and power.",
             components: [{ target: "opp", base:107, move: "physical", desc: "%s punched %t with a powerful punch at blinding speed!", count:1 }]
         },

         blitzhand:
         {
             name: "Bliltz Hand", cost: {sp: 160, msp: 12}, exp: "str", next: ["shatterbreak"], threshold: 60*35,
             desc: "The user punches their enemy with incredible great speed and power.",
             components: [{ target: "opp", base:340, move: "physical", desc: "%s punched %t with a powerful punch at blinding speed!", count:1 }]
         },

         shatterbreak:
         {
             name: "Shatterbreak", cost: {sp: 254, msp: 22}, exp: "str", next: ["forcepunch"], threshold: 60*35,
             desc: "A secret move which shatters bones and smashes rocks.",
             components: [{ target: "opp", base:512, move: "physical", desc: "%s used shatterbreak against %t!", count:1 }]
         },

         forcepunch:
         {
             name: "Force Punch", cost: {sp: 304, msp: 22}, exp: "str", next: ["blastpunch"], threshold: 3600,
             desc: "A punch like no other.",
             components: [{ target: "opp", base:812, move: "physical", desc: "%s used shatterbreak against %t!", count:1 }]
         },

         blastpunch:
         {
             name: "Blast Punch", cost: {sp: 404, mp: 30, msp: 22}, exp: "str", next: ["exppunch"], threshold: 3600*2,
             desc: "When regular punches aren't enough.",
             components: [{ target: "opp", base:1304, offense: "physical", defense: "fire", desc: "%s punched %t causing a small explosion!", count:1 }]
         },

         icepunch:
         {
             name: "Ice Punch", cost: {sp: 404, mp: 30, msp: 22}, exp: "str", next: [], threshold: 3600*2,
             desc: "When regular punches aren't enough.",
             components: [{ target: "opp", base:1304, offense: "physical", defense: "ice", damage: "ice", desc: "%s punched %t causing a small explosion!", count:1 }]
         },

         vltpunch:
         {
             name: "Volt Punch", cost: {sp: 404, mp: 30, msp: 22}, exp: "str", next: [], threshold: 3600*2,
             desc: "When regular punches aren't enough.",
             components: [{ target: "opp", base:1304, offense: "physical", defense: "electric", damage: "normal", desc: "%s punched %t causing a small explosion!", count:1 }]
         },

         exppunch:
         {
             name: "Explosion Punch", cost: {sp: 704, mp: 100, msp: 30}, exp: "str", next: ["oblpunch"], threshold: 3600*3,
             desc: "When blast punches aren't enough.",
             components: [{ target: "opp", base:2024, move: "physical", desc: "%s punched %t causing an explosion!", count:1 }]
         },


         oblpunch:
         {
             name: "Obliteratory Punch", cost: {sp: 1204, mp: 200, msp: 30}, exp: "str", next: [], threshold: 3600*5,
             desc: "When you have a power complex.",
             components: [{ target: "opp", base:2789, move: "physical", desc: "%s punched %t causing a large explosion!", count:1 }]
         },

         ghostpunch:
         {
             name: "Ghostly Punch", cost: {sp: 65, msp: 12}, exp: "str", next: [], threshold: 60*20,
             desc: "The user punches their enemy with shadows.",
             components: [{ target: "opp", base:107, offense: "physical", defense: "ghost", damage:"ghost", desc: "%s punched %t with a ghostly punch!", count:1 }]
         },

         kick:
         {
             name: "Kick", cost: {sp:8, msp:2}, exp: "str", next: ["superkick"], threshold: 60*5,

             desc: "The user kicks their enemy.",
             components: [{ target: "opp", base:20, move: "physical", desc: "%s kicked %t!", count:1 }]

         },

         superkick:
         {
             name: "Super Kick", cost: {sp:16, msp:2}, exp: "str", next: ["sweep"], threshold: 60*5,

             desc: "The user kicks their enemy.",
             components: [{ target: "opp", base:35, move: "physical", desc: "%s kicked %t!", count:1 }]

         },

         sweep:
         {
             name: "Sweeping Kick", cost: {sp:16, msp:2}, exp: "str", next: ["grndsweep"], threshold: 60*5,

             desc: "The user kicks their enemies with a spinning flourish.",
             components: [{ target: "opp", base:35, move: "physical", desc: "%s kicked %t!", count:2 }]

         },

         grndsweep:
         {
             name: "Groundsweeper", cost: {sp:25, msp:4}, exp: "str", next: ["grndbrk"], threshold: 60*5,

             desc: "The user kicks their enemies with a spinning flourish.",
             components: [{ target: "opp", base:45, move: "physical", desc: "%s hit %t in a fast combo flurry of kicks!", count: 4 }]
         },

         grndbrk:
         {
             name: "Groundbreak", cost: {sp:45, msp:5}, exp: "str", next: [], threshold: 60*5,

             desc: "The user uses a strong kick, tearing up even the ground.",
             components: [{ target: "opp", base:75, move: "physical", desc: "%s hit %t in a heavy sweep kick!", count: 2 }]
         },

         heal:
         {
             name: "Healing Spell", cost: {mp:10, msp: 5}, exp: "mag", next: ["healbubble", "healpulse", "lightburst"], threshold: 60*5,
             desc: "Heals an ally.",
             components: [{ target: "ally", base: 17, move: "heal", desc: "%s healed %t!", count: 1}]
         },

         lightburst:
         {
             name: "LightBurst", cost: {mp: 20, sp: 5, msp: 5}, exp: "mag", threshold: 60*10, next: ["lightblast"],
             desc: "Releases a light which burns an enemy.",
             components: [{ target: "opp", base: 45, move: "light", desc: "%s released a luminous light which burns %t!", count:1 }]
         },

         lightblast:
         {
             name: "Light Blast", cost: {mp: 35, sp: 5, msp: 15}, exp: "mag", threshold: 60*15, next: ["sunburst", "blitzfield"],
             desc: "Releases a strong blast of light which burns an enemy.",
             components: [{ target: "opp", base: 75, move: "light", desc: "%s released a blast of billiant light at %t!", count:1 }]
         },

         sunburst:
         {
             name: "Sunburst", cost: {mp: 89, sp: 5, msp: 35}, exp: "mag", threshold: 60*20, next: ["lux"],
             desc: "Fires a ball of condensed light energy which burns an enemy.",
             components: [{ target: "opp", base: 172, move: "light", desc: "%s shot a ball of white hot light at %t!", count:1 }]
         },

         lux:
         {
             name: "Luxecaedere", cost: {mp: 160, sp: 35, msp: 68}, exp: "mag", threshold: 3600*0.8, next: ["luxi"],
             desc: "Summons powerful light energy which burns an enemy.",
             components: [{ target: "opp", base: 320, move: "light", desc: "%s summoned a blazing hot light which burns %t!", count:1 }]
         },

         luxi:
         {
             name: "Luxiudicium", cost: {mp: 305, sp: 45, msp: 230}, exp: "mag", threshold: 3600*2, next: ["judgement"],
             desc: "Summons powerful light energy which wraps around and burns an enemy.",
             components: [{ target: "opp", base: 780, move: "light", desc: "%s summoned a blazing hot light which purges %t!", count:1 }]
         },

         judgement:
         {
             name: "Judgement", cost: {mp: 705, sp: 170, msp: 330}, exp: "mag", threshold: 3600*5, next: ["decree"],
             desc: "Summons powerful light energy from the sky which which burns an enemy.",
             components: [{ target: "opp", base: 1430, move: "light", desc: "%s calls a blazing judgement upon %t!", count:1 }]
         },

         decree:
         {
             name: "King's Decree", cost: {mp: 1305, sp: 170, msp: 330}, exp: "mag", threshold: 3600*9, next: ["law"],
             desc: "A decree issued with power from the heavens.",
             components: [{ target: "opp", base: 2430, move: "light", desc: "%s casts a powerfull decree. The spell brings down holy fire upon %t!", count:1 }]
         },

         law:
         {
             name: "Spirit's Law", cost: {mp: 2305, sp: 470, msp: 730}, exp: "mag", threshold: 3600*24,
             desc: "A powerful magical attack that draws upon light energy to attack.",
             components: [{ target: "opp", base: 4690, move: "light", desc: "%s casts a spell which causes fire from all sides to burn %t!", count:1 }]
         },





         blitzfield:
         {
             name: "Blitzfield", cost: {mp: 89, sp: 5, msp: 35}, exp: "mag", threshold: 60*20, next: ["hseal"],
             desc: "Brings forth a power from the world which purges from the ground to all enemies.",
             components: [{ target: "opp", base: 65, move: "light", desc: "%s casts a spell which engulfs the field in light, burning their enemies! %t", count:5 }]
         },

         hseal:
         {
             name: "Holy Seal", cost: {mp: 148, sp: 20, msp: 85}, exp: "mag", threshold: 60*35, next: ["ager"],
             desc: "Traps enemies in a magical spell which injures all enemies within it.",
             components: [{ target: "opp", base: 113, move: "light", desc: "%s casts a spell seal around the battlefield which damages %t within it!", count:5 }]
         },

         ager:
         {
             name: "Agerexussum", cost: {mp: 328, sp: 30, msp: 125}, exp: "mag", threshold: 3600, next: ["halfld"],
             desc: "Traps enemies in a magical spell which purges and burns all enemies within it.",
             components: [{ target: "opp", base: 210, move: "light", desc: "%s casts a spell seal around the battlefield which purges %t!", count:5 }]
         },

         halfld:
         {
             name: "Hallowed Field", next: ["purgatory"],
             desc: "Calls upon a mysterious power to slay the casters enemies.",
             cost: {mp: 428, sp: 60, msp: 225}, exp: "mag", threshold: 3600*3,
             components: [{ target: "opp", base: 410, move: "light", desc: "%s invokes a mysterious power which causes a hallowed aura to descent upon %t!", count:7 }]
         },

         purgatory:
         {
             name: "Purgatory", cost: {mp:628, sp: 30, msp: 125}, exp: "mag", threshold: 3600*5,
             desc: "Calls upon a greater holy power to slay the casters enemies.",
             components: [{ target: "opp", base: 810, move: "light", desc: "%s invokes purgatory! %t was crushed by the holy aura!", count:7 }]
         },


         healbubble:
         {

             name: "Healing Bubble", cost: {mp:15, msp: 5}, exp: "mag", next: ["healwave"], threshold: 60*10,

             desc: "Creates a bubble of magical energy that heals all allies within it.",
             components: [{ target: "ally", base: 25, move: "heal", desc: "%t was in %s's healing bubble.", count: 3}]

         },

         healwave:
         {
             name: "Healing Wave", cost: {mp:30, msp: 25}, next: ["healrain"], threshold: 60*15,
             desc: "Creates a wave of magical energy that heals all allies who touch it.",
             components: [{ target: "ally", base: 50, move: "heal", desc: "%t was caught in %s's healing wave.", count: 3}]
         },

         healrain:
         {

             name: "Healing Rain", cost: {mp:67, msp: 45}, exp: "mag", next: ["elixarai"], threshold: 60*25,
             desc: "Creates a shower of magical energy that heals all allies who touch it.",
             components: [{ target: "ally", base: 120, move: "heal", desc: "%t bathed in the healing rain", count: 9}]

         },

         elixarai:
         {

             name: "Elixarai", cost: {mp:140, msp: 110}, exp: "mag", next: ["holyguard"], threshold: 60*30,
             desc: "The field is engulfed in a blinding light which heals all allies within it.",
             components: [{ target: "ally", base: 240, move: "heal", desc: "%t was healing by the blinding light!", count: 10}]

         },

         holyguard:
         {

             name: "HolyGuard", cost: {mp:240, msp: 180}, exp: "mag", next: [], threshold: 60*45,
             desc: "The field is engulfed in a powerfull energy which heals all allies within it.",
             components: [{ target: "ally", base: 440, move: "heal", desc: "%t was healing by the descending energy!", count: 10}]

         },


         healpulse:
         {

             name: "Healing Pulse", cost: {mp:25, msp: 10},  exp: "mag", next: ["healingenergy"], threshold: 60*10,
             desc: "Creates a pulse of magical energy with stronger healing abilities.",
             components: [{ target: "ally", base: 50, move: "heal", desc: "%s used healing pulse on %t!", count: 1}]

         },

         healingenergy:
         {

             name: "Healing Energy", cost: {mp:45, msp: 25}, exp: "mag", next: ["healinghope"], threshold: 60*30,
             desc: "A healing energy that restores health.",
             components: [{ target: "ally", base: 95, move: "heal", desc: "%s used healing energy on %t!", count: 1}]

         },

         healinghope:
         {

             name: "Healing Hope", cost: {mp:75, msp: 60}, exp: "mag", next: ["angelwing", "invigoration"], threshold: 60*45,
             desc: "A wish of healing creates miracles in even the most dire circumstances.",
             components: [{ target: "ally", base: 180, move: "heal", desc: "%s used healing hope on %t!", count: 1}]

         },

         angelwing:
         {

             name: "Angel's Wing", cost: {mp:140, msp: 110}, exp: "mag", next: ["angelpromise"], threshold: 3600,
             desc: "Calls upon a greater power to assist in healing where people fail.",
             components: [{ target: "ally", base: 340, move: "heal", desc: "A holy energy healed %t!", count: 1}]

         },

         angelpromise:
         {

             name: "Angel's Promise", cost: {mp:250, msp: 230}, exp: "mag", next: [], threshold: 3600*1.5,
             desc: "Calls upon a greater power to assist in healing where people fail.",
             components: [{ target: "ally", base: 670, move: "heal", desc: "A holy energy healed %t!", count: 1}]

         },

         altruist:
         {
             name: "Altruist's Sacrafice", exp: "res", cost: { mp: 100, msp: 30 }, threshold: 3600*2,
             components: [/*{target: "ally", base: 850, move: "transfer"}*/]
         },

         invigoration:
         {
             name: "Invigoration", exp: "mag", cost: {mp: 200, msp: 130}, threshold: 3600*2,
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
             name: "Blackout", desc: "The user unleashes a large of psychic energy which hits multiple enemies.", cost: { msp: 95 }, exp:"psy", next: ["blackmind"], threshold: 60*45,
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
             name: "Black Fog", exp: "mag", desc: "A black fog engulfs the enemy!", cost: {mp: 15, msp:10}, threshold: 60*10, next: ["blood", "hellrain"],
             components: [{ target: "opp", base: 35, move: "ghost", desc: "%t suffocated in black fog!", count: 1}]
         },

         blood:
         {
             name: "Devil's Blood", exp: "mag", desc: "The user sacrafices their own blood to lay a curse on the enemy", cost: { hp: 55, mp: 10, msp: 10 }, threshold: 60*15, next: ["sarachith"],
             components: [{ target: "opp", base: 85, move: "ghost", desc: "%s drew blood unto the ground and it curses %t!", count: 1}]

         },

         sarachith:
         {
             name: "Sarachith", exp: "res", desc: "The user users a contract of demons to injure their opponent.", cost: { hp: 85, mp: 10, msp: 10 }, threshold: 60*25, next: ["ghostbody"],
             components: [{ target: "opp", base: 175, move: "ghost", desc: "%s exchanged a contract with demons and it curses %t!", count: 1}]
         },

         ghostbody:
         {
             name: "Ghost Body", exp: "mag", desc: "The user empowers ghostly energy.", cost: {msp: 400, msp: 200}, threshold: 60*45,
             components: [{ target: "self", base: 10, move: "ghostify", desc: "%s was wrapped in shadows!", count:1}]
         },

         hellrain:
         {
             name: "Hell's Rain", exp: "mag", desc: "A terrible downpour of pure darkness enroaches the battlefield!", cost: {mp:20, msp:5}, threshold: 60*20, next: ["hellstorm", "darkpulse"],
             components: [{ target: "opp", base: 65, move: "ghost", desc: "%t was caught in the dark rain!", count: 5},{ target: "ally", base: 25, move: "ghost", desc: "%t was caught in the dark rain!", count: 2}]

         },

         darkpulse:
         {
             name: "Dark Pulse", exp: "mag", desc: "A pulse of evil energy injures a foe.", cost: { mp: 35, msp:15}, next:  ["darkblitz"],
             components: [{ target: "opp", base: 165, move: "dark", desc: "%t was blasted by %s's evil energy!", count: 1}]
         },

         darkblitz:
         {
             name: "Dark Blitz", exp: "mag", desc: "Weapons made from shadows injure your enemy.", cost: { mp: 35, msp:15}, next:  ["diswave", "darkstorm"],  threshold: 60*30,
             components: [{ target: "opp", base: 165, move: "dark", defense: "physical", desc: "Dark weapons called by %s fall from the sky and fall upon %t!", count: 1}]
         },

         darkstorm:
         {
             name: "Dark Storm", exp: "mag", desc: "Darkness falls from the sky.", cost: { mp: 35, msp:15}, next:  [],  threshold: 60*30,
             components: [{ target: "opp", base: 165, move: "dark", desc: "Dark energy falls from the sky and injures %t!", count: 1}]
         },


         hellstorm:
         {
             name: "Hellstorm", exp: "mag", desc: "A wretched downpour of pure darkness enroaches the battlefield!", cost: {mp:40, msp:15}, threshold: 60*20, next: ["helltwister"],
             components: [{ target: "opp", base: 135, move: "ghost", desc: "%t was caught in the dark storm!", count: 5},{ target: "ally", base: 25, move: "ghost", desc: "%t was caught in the dark storm!", count: 2}]


         },

         helltwister:
         {
             name: "Hell's Twister", exp: "mag", desc: "A swirling vortex of shadows attacks the enemy!", cost: {mp:90, msp:20}, threshold: 60*30, next: ["scourge"],
             components: [{ target: "opp", base: 235, move: "ghost", desc: "%t was caught in the dark twister!", count: 3}]


         },

         scourge:
         {
             name: "Hell's Scourge", exp: "mag", desc: "A descent of horrible energy devastates the battlefield!", cost: {mp:120, msp:30}, threshold: 60*45, next: ["vehemence"],
             components: [{ target: "opp", base: 315, move: "ghost", desc: "%s summoned an evil energy which descended upon the battlefield and injured %t!", count: 5}]

         },

         vehemence:
         {
             name: "Hell's Vehemence", exp: "mag", desc: "An evil energy descends upon an enemy.", cost: {mp: 220, msp: 60}, threshold: 3600*1.5, next: ["ardor"],
             components: [{ target: "opp", base: 650, move: "ghost", desc: "An evil energy descended upon %t!", count: 1}]
         },

         ardor:
         {
             name: "Ghost's Ardor", exp: "mag", desc: "An ghastly spirit descends upon an enemy.", cost: {mp: 420, msp: 60}, threshold: 3600*3, next: ["pillars"],
             components: [{ target: "opp", base: 1050, move: "ghost", desc: "A ghastly spirit descended upon %t!", count: 1}]

         },

         pillars:
         {
             name: "7 Ghostly Pillars", exp: "mag", desc: "Pillars of the underworld are brought forth to attack.", cost: {mp: 870, msp: 60}, threshold: 3600*6,
             components: [{ target: "opp", base: 2150, move: "ghost", desc: "%s summoned 7 ghostly pillars which surrounded the enemy! The space inside became cursed and injures %t!", count: 1}]

         }


         /*
         ardor:
         {
             name: 'Tricksters Ardour', exp: "mag", desc: "A
         }*/

         //vhemenence:








     }
 });
