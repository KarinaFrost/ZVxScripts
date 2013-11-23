({
     require: ["io", "util", "user", "com", "theme", 'logs'],


     loadModule: function()
     {
         this.io.registerConfig(this, {enabled: true, type: "remote", pathway: "https://raw.github.com/ArchZombie/proxylist/master/proxylist.txt"});

         this.script.registerHandler("beforeLogIn", this);

         if (this.config.enabled && this.config.type == "remote")
         {
             var a = sys.synchronousWebCall(this.config.pathway).split(/\r\n|\n|r/g);
             for (var x in a) if (a[x].match(/:/)) a[x] = a[x].split(/:/)[0];
             this.PROXYBANS = this.util.keyify(a);
         }
         else if (this.config.enabled && this.config.type == "local")
         {

             var a = sys.read(this.config.pathway).split(/\r\n|\n|r/g);
             for (var x in a) if (a[x].match(/:/)) a[x] = a[x].split(/:/)[0];
             this.PROXYBANS = this.util.keyify(a);
         }


     },
     beforeLogIn: function (src)
     {
         if (this.config.enabled && sys.ip(src) in this.PROXYBANS && ! this.user.hasPerm(src, "PROXY"))
         {
             this.com.message(src, "Proxies are not allowed.", this.theme.CRITICAL);
             this.logs.logMessage(this.logs.WARN, this.user.name(src) + " tried to log in using a proxy (IP " + sys.ip(src) + ")");
             sys.stopEvent();
         }
     },

     configureEvent: function()
     {
         if (this.config.enabled && this.config.type == "remote")
         {
             var a = sys.synchronousWebCall(this.config.pathway).split(/\r\n|\n|r/g);
             for (var x in a) if (a[x].match(/:/)) a[x] = a[x].split(/:/)[0];
             this.PROXYBANS = this.util.keyify(a);
         }
         else if (this.config.enabled && this.config.type == "local")
         {

             var a = sys.read(this.config.pathway).split(/\r\n|\n|r/g);
             for (var x in a) if (a[x].match(/:/)) a[x] = a[x].split(/:/)[0];
             this.PROXYBANS = this.util.keyify(a);
         }
     }

 });