import { getUserById } from "../../src/js-foundation/03-callback";


describe('js-foundation/03-callback', () => {
    

    test('getuserById should return an error if user does not exit', () => {
        
        const id = 10;
        getUserById(id, (err, user) => {
            expect(err).toBe(`User not found with id ${id}`);
            expect(user).toBeUndefined();
        });

    });

    test('getUserById should return an user with its ID and name', () => {
        
        const usuario = {
            id: 1,
            name: 'John Doe',
        }
        getUserById(1, (err, user) => {
            expect(err).toBeUndefined();
            expect(user).toEqual(usuario);

            expect(user?.id).toBe(usuario.id);
            expect(user?.name).toBe(usuario.name);
        });
    });
});