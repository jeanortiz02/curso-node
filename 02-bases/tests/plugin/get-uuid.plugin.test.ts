import { getUUID } from "../../src/plugins";




describe('get-uuid.plugin.test.ts', () => { 

    test('getUUID() should return a UUID', () => {
        
        const uuid = getUUID();

        // console.log(uuid.length)

        expect(typeof uuid).toBe('string');
        expect(uuid.length).toBe(36);

    });
 })