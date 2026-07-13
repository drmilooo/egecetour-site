const fs = require('fs');
let q = fs.readFileSync('quadsafari.html', 'utf8');
const repl = [
  [/x/g, 's'],
  [/!/g, 'Ç'],
  [/~/g, 'S'],
  [/S/g, 'Ü'],
  [/ /g, 'Ö'],
  [/\\x13/g, 'Ö'],
  [/a/g, 'K'],
  [/x/g, 's'],
  [//g, 'g']
];
// Instead of complex exact regexes, I'll just remove the FFFD marks where known, or replace the whole file from index.html!
