global.window = {};
require('../data/algo-data.js');
const a = window.ALGO_DATA;
let n = 0;
a.forEach(g => { n += g.items.length; console.log('# ' + g.group + ' (' + g.items.length + ')'); g.items.forEach(i => console.log('   - ' + i.name)); });
console.log('TOTAL groups=' + a.length + ' items=' + n);
