({
     mixins:
     {
         electrum: { output: 2, input: { gold:1, silver: 1}},
         brass: {output:3, input: { copper:2, zinc: 1}},
         steel: {output:10, input: {iron: 9, graphite: 1}},
         wdsteel: {output:5, input: {wdscale: 3. steel: 2}},
         blkdsteel: {output:5, input: {blkdscale: 3. steel: 2}},
     }


 });
