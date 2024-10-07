


const buildMakePerson = ( { getAge, generateUniqueId } ) => {

    return ({ name, birthdate }) => {
        return {
            id: generateUniqueId(),
            name: name,
            birthdate: birthdate,
            age: getAge(birthdate),
        }
    }
  
  }
  
  
//   const obj = { name: 'John', birthdate: '1985-10-21' };
  
//   const john = buildMakePerson( obj );
//   console.log(john);
  

module.exports = { 
    buildMakePerson,
 };