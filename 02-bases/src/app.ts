import { buildLogger } from './plugins/logger.plugin';


// const { getAge } = require('./plugin/get-age.plugin');
// const { generateUniqueId } = require('./plugin/get-uuid.plugin'); 
// const templateExport = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring')
// require('./js-foundation/05-factory')
// const getPokemonById = require('./js-foundation/06-promises')

// getPokemonById(10)
//     .then(pokemon => console.log({pokemon}))
//     .catch(err => console.log(err))
//     .finally(() => console.log('Finalmente'))


const logger = buildLogger('app.js');

logger.log('Hola mundo');
logger.error('Esto es algo malo');

// console.log('Hola mundo')



// ! Referencia a la funcion factory y uso 
// const { buildMakePerson } = require('./js-foundation/05-factory')
// const makePerson = buildMakePerson({ getAge, generateUniqueId });
// const obj = { name: 'John', birthdate: '1985-10-21' };
// const person = makePerson(obj);
// console.log(person);



