({
     require: ["commands", "com"],

     meta:
     {
         commands: ["dismiss"]
     },

     dismiss:
     {
         category: "basic",
         perm: function () {return true;},
         code:
         function (src, cmd, chan)
         {

             this.com.message(src, "Dismissed the announcement.");
             sys.setAnnouncement("", src);
         }


     }

 });