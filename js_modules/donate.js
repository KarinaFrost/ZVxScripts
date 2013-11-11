({
     require: ["com", "user", "commands", "theme", 'io'],
     counter: 0,
     udb: null,

     BUTTON: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=8BQHLUEXVWVQ2&lc=US&item_name=ZVX%20Scripts%20%26%20RPG%20Open%20Source%20Development&item_number=zvx0&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img width="74" height="21" title="" alt="" src="data:image/gif;base64,R0lGODlhSgAVAPcmAP+sLf7iq/7gpf7ksf7en/+6Tf+vM7+LNv+xOu7bskBedhA+a/+0QN+aLo9/WHBuWxA+aoCQl0BfeXB+f2BhUc+TMn+Jg7+YU76zkZ+HVp6jmX+Nj97Qre+iKo6Xk56gke+yT/63R3+LiTBUdO7Tm1BdXs4HAkBfd+7ZrH+Khs+VON7MomB0fkBgeq6ojf7HbGBze765o87Bnp6hlf/s0M7Do/7Rhb62mjBKWxA7YjBUczBUcv64SmB2gp9+Qs7EqP/89jBTcY6Uif+lNEBedN+dNIBwSa6wov/NgtEQBY6Vjb+OO/7amP++Xf+3RlBpev7UjP/Ti6+QVb++r8+hUs6/mf/05P/CYNEOBc6+lN7Knf7epP+oLH+MjJ6fjVBrfmBmXf/05v/ryf61Rv/ZoCBJbv/it3BoTY6WkP/py//YnyBCX/+vOkBVYP+/Wf63S767qP7WjP65Tf/w2f/FZu/gwv/u0++kMVBsgmB1gP7hqmB4h//uzv7dnv/w2HCAhP7Qf66smf+mLf/boP6/WTBMYf7Jcv+uM//y2yBIba6unv/sz//itv+pNP+yP/7mt/+pJv/15//rzv7pvv/syP/dqv/46v/03//OhP/w0/+/Xv+xOAAzZswAAP+ZMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAABKABUAAAj/AE0IHGjCk8GDCBMqXMiwocOEBCMONLgoTKSLGC8CAZKxo8ePIEN+tJLGoMSJcyypXMmypcuXMGPKfGnH00lPfi7p3Mmzp8+fQIMKDYrIJkFPYjIpXcq0qdOnUKNKncrHaMFBlLJq3cqVUoSvEaZ0HUuWa52yaClFMeppktu3cONOgsOpbt09cvPqfXsEz96/k6DY9MRjy6PDiBMr9sBJw6MELTj9OBxjgwcOhznESKBhQ4LDnDdoSJBAEacWmH9Y/qy49WEbPAy+MTSgtu3buHtwqlE7EKcuA3SPWLCA9xdOEkYgH4CCuATkaOzOmMFp+AIUuLMP0ENIjsExIWwE/xhPvnx5HZzI3+Ak4gOnPwFWcMoTAP2HABDSyxAhI8CJ9CJwcoN8JwTgnhLmJRjACyGEYJAjDDDwQh8CVGjhhRVyooCFQnDixROcaJHhhpzsMKIAVbCgQBklCqAAJwJ0qEAKLHCSAoYYMuFGhAwYxAYCQDJARxwEFGmkkRhwMkGRJCQCAQlEcFJkFpzAkOSSV5IAQRAuuKAkAVsSYEGVFpSJwZFHAnIFkGwadIgBcMZpQAF01kmnA5w8cIEUhXDiQAEPcJIBCG1wcgGeGRSA6AV5glCCoFRwUkIBjD6gKBgg2EmnE3LKaZAgAIQq6qikUmAXJzkYEeodONSVgw8AmLCqQqyczNoqJ2twskQRdVEAwBl2wUrqsKJyMRgkyCar7LIVHODsActC0mwHyDZbLbTIHtBAB9pC0kC33h5AbbTkIsvWEJukq+667Lbr7rvwxitvuo1Y5UkTmuSr77789uvvvwAHLLAmVgnkCRKYJKzwwgw37PDDEEccccETqVHJxRhnrPHGHHfs8ccck0HxUZ6YIcnJKKNMAw0pt+zyyzDHDDMjJp1E8kM456wzQycFBAA7" /></a>',

     loadModule: function()
     {
         this.script.registerHandler("afterLogIn", this);
         this.commands.registerCommand("donate", this);
         this.io.registerConfig(this, {alwaysShowDonate: false});
         this.udb = new Object;
     },


     afterLogIn: function (src)
     {
         if (!this.config.alwaysShowDonate)
         {
             if (sys.name(src).toLowerCase() in this.udb && this.udb[sys.name(src).toLowerCase()] < +new Date + 3600*24*3) return;

             this.udb[sys.name(src).toLowerCase()] = +new Date;
         }

	 if (sys.os(src) == "android")
         {
             sys.sendHtmlMessage(src, "<timestamp />Contribute to ZVxScripts & RPG Development! <a href='https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=8BQHLUEXVWVQ2&lc=US&item_name=ZVX%20Scripts%20%26%20RPG%20Open%20Source%20Development&item_number=zvx0&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted'>[donate with paypal]</a> or use bitcoin: 17Act28nb7vLqkWMDridtz8KjBXpaWXBpA", chan);
         } else

         {
             sys.sendHtmlMessage(src, "<timestamp />Contribute to ZVxScripts & RPG Development! " + this.BUTTON + " or use bitcoin: 17Act28nb7vLqkWMDridtz8KjBXpaWXBpA");
         }
     },


     donate:
     {
         desc: "Donate to development!",
         perm: function () {return true;},

         code:
         function (src, cmd, chan)
         {
             sys.sendHtmlMessage(src, "<timestamp />Contribute to ZVxScripts & RPG Development! <a href='https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=8BQHLUEXVWVQ2&lc=US&item_name=ZVX%20Scripts%20%26%20RPG%20Open%20Source%20Development&item_number=zvx0&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted'>[donate with paypal]</a> or use bitcoin: 17Act28nb7vLqkWMDridtz8KjBXpaWXBpA", chan);
         }
     }



 });