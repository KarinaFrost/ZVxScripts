({

     /** Computes the result of averaging two colors together of proportion p.
      *
      */
     colorMixProp: function (a, b, p)
     {
         if (typeof p === "undefined") p = 0.5;
         if (p > 1) p = 1;
         if (p < 0) p = 0;
         if (!(p < 1 || p > 0)) p = 0.5;



         var res=  [Math.round(a[0]*p + b[0]*(1-p)), Math.round(a[1]*p + b[1]*(1-p)), Math.round(a[2]*p + b[2]*(1-p)) >> 0];


         // print("Mix " + JSON.stringify([a, b, p]) + " -> " + JSON.stringify(res));
         return res;
     },

     neonify: function (c, level)
     {
        // return c;
         if (level === undefined) level = 1;


         level = level*0xff;

         var m = Math.max(c[0], c[1], c[2]);

         if (m >= level) {if (script.__debug_mode__) print ("neonify " + JSON.stringify({c:c,level:level,m:m,q:q, out:out })); return c;}

         var q = level/m;


         var out = [Math.floor(c[0]*q), Math.floor(c[1]*q), Math.floor(c[2]*q)];
         return out;
     },

     colorTriadToString: function (triad)
     {
         var c = "#";


         var red = Math.max(Math.min(Math.round(triad[0]), 255), 0).toString(16);
         if (red.length == 1) red = "0" + red;
         var green =  Math.max(Math.min(Math.round(triad[1]), 255), 0).toString(16);
         if (green.length == 1) green = "0" + green;
         var blue =  Math.max(Math.min(Math.round(triad[2]), 255), 0).toString(16);
         if (blue.length == 1) blue = "0" + blue;


         var q = "#" + red + green + blue;

         return q;
     }

 });