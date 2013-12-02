({
     require: ["commands", "com"],

     meta:
     {
         commands: ["dismiss"]
     },

     dismiss:
     {
         category: "basic",
	 desc: "Dissmiss the announcement.",
         perm: function () {return true;},
         code:
         function (src, cmd, chan)
         {

             this.com.message(src, "Dismissed the announcement.");
             sys.setAnnouncement(" ", src);
         }


     }

 });