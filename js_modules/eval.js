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

     require: ["com", "commands", "theme", "util", "less", "io", "user", "time", "text", 'zsrx'],

     eval:
     {
	 mode: "lazy",
         category: "system/eval",
         desc: "Executes code. Shows the resut.",
         perm: "EVAL",
         code: function (src, cmd, chan)
         {
             var start = +new Date;
             try
             {

                 var r = eval(cmd.input);
                 var end = +new Date;
                 var start2 = +new Date;
                 var result_text = this.text.escapeHTML(this.util.inspect(r, true));
                 this.less.less(src, "<b>Exec Time:</b> " + (this.time.diffToStr(end - start) || "&lt;1 milisecond" ) +
                                "<br /><b>Serializer Time:</b> " + (this.time.diffToStr(+new Date-start2) || "&lt;1 milisecond")+ "<br/><b>Result:</b><br/>" + result_text, true);
             }
             catch (e)
             {
                 this.com.message([src], e.toString(), this.theme.CRITICAL);
                 this.com.message([src], e.backtracetext, -1);
             }
         }
     },

     keys:
     {
         mode: "lazy",
         category: "system/eval",
         desc: "Executes code. Shows the keys of the result.",
         perm: "EVAL",
         code: function (src, cmd, chan)
         {
             var start = +new Date;
             try
             {

                 var r = eval(cmd.input);
                 var end = +new Date;
                 var start2 = +new Date;
                 var result_text = this.text.escapeHTML(JSON.stringify(Object.keys(r)));
                 this.less.less(src, "<b>Exec Time:</b> " + (this.time.diffToStr(end - start) || "&lt;1 milisecond" ) +
                                "<br /><b>Serializer Time:</b> " + (this.time.diffToStr(+new Date-start2) || "&lt;1 milisecond")+ "<br/><b>Result:</b><br/>" + result_text, true);
             }
             catch (e)
             {
                 this.com.message([src], e.toString(), this.theme.CRITICAL);
                 this.com.message([src], e.backtracetext, -1);
             }
         }
     },

     inspect:
     {
         mode: "strict",
         category: "system/eval",
         desc: "Executes code as postinput. Shows the result, with any options.",
         options:
         {
             "depth": "How deep to look in the object.",
             iter: "How many times to iterate at maximum."//,
          //   maxtotal: "How many total properties to look at, at maximum."
         },

         perm: "EVAL",
         code: function (src, cmd, chan)
         {
             var start = +new Date;
             try
             {
                 var r = eval(cmd.postinput);
                 var end = +new Date;
                 var start2 = +new Date;
                 var result_text = this.text.escapeHTML(this.util.inspect(r, true, (cmd.flags.depth? +cmd.flags.depth: 4), (cmd.flags.iter? +cmd.flags.iter: 50)));
                 this.less.less(src, "<b>Exec Time:</b> " + (this.time.diffToStr(end - start) || "&lt;1 milisecond" ) +
                                "<br /><b>Serializer Time:</b> " + (this.time.diffToStr(+new Date-start2) || "&lt;1 milisecond")+ "<br/><b>Result:</b><br/>" + result_text, true);
             }
             catch (e)
             {
                 this.com.message([src], e.toString(), this.theme.CRITICAL);
                 this.com.message([src], e.backtracetext, -1);
             }
         }
     },

     json:
     {
         mode: "lazy",
         category: "system/eval",
         desc: "Executes code. Shows the result as JSON if possible.",
         perm: "EVAL",
         code: function (src, cmd, chan)
         {
             var start = +new Date;
             try
             {
                 var r = eval(cmd.input);
                 var end = +new Date;
                 var start2 = +new Date;
                 var result_text = this.text.escapeHTML(this.zsrx.zsrx(r));
                 this.less.less(src, "<b>Exec Time:</b> " + (this.time.diffToStr(end - start) || "&lt;1 milisecond" ) +
                                "<br /><b>Serializer Time:</b> " + (this.time.diffToStr(+new Date-start2) || "&lt;1 milisecond")+ "<br/><b>Result:</b><br/>" + result_text, true);
             }
             catch (e)
             {
                 this.com.message([src], e.toString(), this.theme.CRITICAL);
                // this.com.message([src], e.backtracetext, -1);
             }
         }
     },


     loadModule: function ()
     {
         this.commands.registerCommand("eval", this);
         this.commands.registerCommand("inspect", this);
         this.commands.registerCommand("keys", this);
         this.commands.registerCommand("json", this);
     }
 });
