import { envs } from "./envs.plugin";



describe('envs.plugin.test', () => { 

    test('should return envs options', () => {
        
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'iibi.tec04@gmail.com',
            MAILER_SECRET_KEY: 'gmzycrnzhdnugsgn',
            PROD: false,
            MONGO_URL: 'mongodb://jortiz:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'jortiz',
            MONGO_PASS: '123456789',
            POSTGRES_URL: 'postgresql://jortiz:123456789@localhost:5432/postgres',
            POSTGRES_DB: 'postgres-test',
            POSTGRES_USER: 'jortiz',
            POSTGRES_PASSWORD: '123456789'
        })
    });

    test('should return error if not found env', async() => {
        
        jest.resetModules();
        process.env.PORT = 'vvsverrweg';

        try {
            await import('./envs.plugin');

            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    });
 })