import { LogEntity } from "../../entities/log-entity";
import { CheckServiceMultiple } from "./check-multiple";


describe('check-multiple.test.ts', () => { 

    
    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    
    const successCallback = jest.fn();
    const errorCallBack = jest.fn();
    
    const checkService = new CheckServiceMultiple(
        [mockRepo1, mockRepo2, mockRepo3], 
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

        expect( mockRepo1.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity))
        expect( mockRepo2.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity))
        expect( mockRepo3.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity))
    });

    test('should call errorCallback whith fetch returns false', async() => {
        

        const wasOk = await checkService.execute('https://www.cdcvsdvsdgoogle.com');

        // console.log(wasOk);

        expect(wasOk).toBe(false);
        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallBack ).toHaveBeenCalled();

        expect( mockRepo1.saveLog ).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });
 })