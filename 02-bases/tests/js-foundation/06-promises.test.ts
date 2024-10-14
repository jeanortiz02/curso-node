import { getPokemonById } from "../../src/js-foundation/06-promises";


describe('js-foundation/06-promises', () => { 

    test('getPokemonById should return a pokemon', async() => {
        
        const pokemonId = 1;
        const pokemonName = await getPokemonById(pokemonId);

        // console.log(pokemonName);
        expect(pokemonName).toBe('bulbasaur');
    });

    test('should return an error i pokemon does not exist', async() => {
        
        const nonExistentPokemonId = 1001131351;
        
        try {
            await getPokemonById(nonExistentPokemonId);
        } catch (error) {
            expect(error).toBe(`Pokemon not found with id ${nonExistentPokemonId}`)
        }
    });
 })