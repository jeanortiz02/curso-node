import { getAge } from "../../src/plugins";


describe('plugins/get-age.plugin.ts', () => { 

    test('should return the age of a person', () => {
        
        const birthdate = '2000-07-02';
        const age = getAge(birthdate);

        expect(typeof age).toBe('number');
    });

    test('getAge should return current age', () => {
        const birthdate = '2000-07-02';
        const age = getAge(birthdate);

        const calculate = new Date().getFullYear() - new Date(birthdate).getFullYear();

        expect( age).toBe(calculate);
    });

    test('getAge should return 0 years', () => {
        
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);

        const birthdate = '2000-07-02';
        const age = getAge(birthdate);

        expect( age ).toBe(0);
        expect( spy ).toHaveBeenCalled();
    });
 })