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
     require: ["security",  "com", "theme", "time", "logs", "user", 'util'],


     loadModule: function()
     {
         this.script.registerHandler("beforeLogIn", this );
         this.script.registerHandler("afterLogIn", this );
         this.script.registerHandler("beforeLogOut", this );
         this.script.registerHandler("afterChangeTeam", this);
     },

     checkUser: function (src)
     {

         var banID = this.security.banID(src);

         if (banID)
         {

             var ban = this.security.database.bans[banID];



             if (!this.user.hasPerm(src, "PROTECTED"))
             {


                 return false;
             }
             else
             {
                 this.com.message(src, "Note: Your account is protected, and therefore the ban is void.");
             }
         }

         return true;
     },

     beforeLogIn: function(src)
     {


         if (! this.checkUser(src))
         {
             var banID = this.security.banID(src);
             this.com.message(
                 [src],
                 "<hr/>You are banned.<br>" + this.theme.issuehtml(ban) + "<hr/>",
                 this.theme.CRITICAL,
                 true
             );
             sys.stopEvent();
             this.logs.logMessage(this.logs.WARN, "Banned user: " + sys.name(src) + " (IP: " + sys.ip(src) + ") (#: " + banID + ") tried to log in.");
             return;
         }



         this.logs.logMessage(this.logs.INFO, sys.name(src) + " logged in. (IP "+sys.ip(src)+ ")");

         return;
     },

     afterLogIn: function (src)
     {
         var n = sys.name(src);
         var ip = sys.ip(src);
         var t = this;
         sys.hostName(ip, function (r)
                      {
                          t.logs.logMessage(this.logs.INFO, "Recived hostname for (Name "+n+")" + " (IP "+ip+ ") (Hostname "+r+")");
                      }
                     );
     },


     beforeLogOut: function (src)
     {
         this.logs.logMessage(this.logs.INFO, sys.name(src) + " logged out. (IP "+sys.ip(src)+")");
     },

     afterChangeTeam: function (src)
     {
        // this.profile.registerPlayer(src);
     }
 });
