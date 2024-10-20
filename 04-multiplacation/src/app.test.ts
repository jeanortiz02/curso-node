import { ServerApp } from "./presentation/server-app";


describe('App.ts', () => { 

    test('should call server.run with values', async() => {
        
        
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '10', '-l', '5', '-s'];

        await import('./app');

        expect( serverRunMock ).toHaveBeenCalled();

    });
 })
 