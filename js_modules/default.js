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
     require: ["io", "user", "constdata"],

     metatype: "runtime",

     DEFAULTS: ["logs",  "iologger", "interceptor", "dump", "gateway", "chat", "reset", "modprobe", "server","cmdlist", "kick", "mute", "info", "groupmod", "configure", "ban", "setauth", "sourcedist", "eval", "help", "modprobe", "io", "userconf"],

     loadModule: function ()
     {
         var x;



         this.io.registerConfig(this, { modules: ["me", "channels","info", "serverimp", "authlist", "readlogs", "automute", "logmessager", "rules", "die", "announcement", "clearchat", "antiproxy", "motd", "playerlist" ] });

         for (x in this.DEFAULTS)
         {

             this.script.loadModule(this.DEFAULTS[x]);
         }

         for (x in this.config.modules)
         {
             if (this.constdata.RENAMES[this.config.modules[x]]) this.config.modules[x] = this.constdata.RENAMES[this.config.modules[x]];
             this.script.loadModule(this.config.modules[x]);
         }
     }


});
