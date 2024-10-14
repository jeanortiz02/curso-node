import { buildMakePerson } from "../../src/js-foundation/05-factory";



describe('js-foundation/05-factory.test.ts', () => {

    const getUUID = () => '12345';
    const getAge = () => 30;
    
    test('buildMakePerson should return a function', () => {
        
        const makePerson = buildMakePerson({getAge, getUUID});

        expect(typeof makePerson).toBe('function');
    });

    test('makePerson should return a person', () => {
        const makePerson = buildMakePerson({getAge, getUUID});

        const johnDoe = makePerson({name: 'John', birthdate: '2000-07-02'});
        
        expect(johnDoe).toEqual({
             id: '12345', 
             name: 'John', 
             birthdate: '2000-07-02', 
             age: 30 
        })
    });

});