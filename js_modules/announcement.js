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
     require: ["com", "commands", "theme", "user", "io"],

     loadModule: function ()
     {
         var announcementObject =
             {
                 get text ()
                 {
                     return sys.getAnnouncement();
                 },

                 set text (v)
                 {
                     sys.changeAnnouncement(v);
                 }

             };

         this.io.registerConfig(this, announcementObject, true);
         this.commands.registerCommand("announcement", this);
     },

     announcement:
     {
         mode: "lazy",
         category: "alias",
         server: true,
         desc: "Shortcut for /configure announcement.text .",
         perm: "CONFIGURE[ANNOUNCEMENT.TEXT]",
         code: function (src, cmd, chan)
         {
             if (!cmd.input) this.commands.issueCommand(src, "/configure announcement.text", chan);
             else this.commands.issueCommand(src, "/configure announcement.text = " + JSON.stringify(cmd.input), chan);
         }
     }

 });