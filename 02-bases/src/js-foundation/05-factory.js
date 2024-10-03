
const getAge = require('get-age')
const crypto = require('crypto'); 


const buildMakePerson = ({ name, birthdate }) => {

    return {
        id: crypto.randomUUID(),
        name: name,
        birthdate: birthdate,
        age: getAge(birthdate),
    }
  
  }
  
  
  const obj = { name: 'John', birthdate: '1985-10-21' };
  
  const john = buildMakePerson( obj );
  console.log(john);
  