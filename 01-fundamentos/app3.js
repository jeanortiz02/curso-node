

const fs = require('fs');

const content = fs.readFileSync('readme.md', 'utf8');

const wordCount = content.split(' ').length;

const wordWithReact = content.match(/react/gi).length;

console.log('Palabras:', wordCount);
console.log('Palabras with React>', wordWithReact);