// import { yarg } from "./yargs.plugin";


const runCommand = async ( args: string[]) => {

    process.argv = [...process.argv, ...args];

    const { yarg } = await import('./yargs.plugin'); 

    return yarg;
}


describe('yargs.plugin.test.ts', () => { 

    const originalArv = process.argv;
    beforeEach(() => {
        process.argv = originalArv;
        jest.resetModules();
    })

    test('should return default values ', async() => {

        const argv = await runCommand(['-b', '8']);

        // console.log(argv);
        // console.log(yarg);

        expect(argv).toEqual(expect.objectContaining({
            b: 8,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
            destination: 'outputs',
        }))
    });

    test('should return configuration with custom values ', async() => {
        const argv = await runCommand(['-b', '12', '-s', '-l', '5', '-n', 'custom-name', '-d', 'custom-dir']);
        // console.log(argv);
        expect(argv).toEqual( expect.objectContaining({
            b: 12,
            l: 5,
            s: true,
            n: 'custom-name',
            d: 'custom-dir',
        }))

    });
 })