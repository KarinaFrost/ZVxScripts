({
     require: ["commands", "util", "com", "theme"],


     loadModule:
     function()
     {
         this.commands.registerCommand("coredump", this);
     },


     coredump:
     {
         category: "system/debug",
         perm: "COREDUMP",
         code:
         function ()
         {
             this.com.broadcast("Writing core dump to file on next tick, expect lots of lag.", this.theme.CRITICAL);

             sys.setTimer(this.util.bind(this, this.dump), 200, false);
         }
     },

     dump:
     function()
     {
         try {
             var fname = (+new Date).toString() + ".core";

             var dtext = this.util.inspect(global, true);

             sys.write(fname, dtext);

             this.com.broadcast("Wrote core dump to " + fname, this.theme.CRITICAL);
         } catch (e) { scirpt.error(e); }
     }
 });