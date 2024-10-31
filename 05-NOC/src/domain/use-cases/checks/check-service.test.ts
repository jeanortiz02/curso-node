import { LogEntity } from "../../entities/log-entity";
import { CheckService } from "./check-service";


describe('check-service.test.ts', () => { 

    
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    
    const successCallback = jest.fn();
    const errorCallBack = jest.fn();
    
    const checkService = new CheckService(
        mockRepository, 
        successCallback, 
        errorCallBack
    );
    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    test('should call successCallBack whtn fetch returns true', async() => {
        

        const wasOk = await checkService.execute('https://www.google.com');

        // console.log(wasOk);

        expect(wasOk).toBe(true);
        expect( successCallback ).toHaveBeenCalled();
        expect( errorCallBack ).not.toHaveBeenCalled();

        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });

    test('should call errorCallback whith fetch returns false', async() => {
        

        const wasOk = await checkService.execute('https://www.cdcvsdvsdgoogle.com');

        // console.log(wasOk);

        expect(wasOk).toBe(false);
        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallBack ).toHaveBeenCalled();

        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });
 })