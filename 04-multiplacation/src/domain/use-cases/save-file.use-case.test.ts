import { SaveFile } from "./save-file.use-case";
import fs from 'fs';





describe('save-file.use-case', () => { 

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name'
    }

    afterEach(() => {
        // clean up
        const outputFoldExist = fs.existsSync('outputs');
        if ( outputFoldExist ) fs.rmSync('outputs', {recursive: true});


        const customFoldExist = fs.existsSync('custom-outputs');
        if ( customFoldExist ) fs.rmSync('custom-outputs', {recursive: true});

        
    });


    test('should save file with default values', () => {
        
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content'
        } 

        const result = saveFile.execute(options);
        
        
        const checkFile = fs.existsSync(filePath); // Ojo
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' } );
        

        expect(result).toBe(true);
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with default values ', () => {
        const saveFile = new SaveFile();

        const filePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

        const result = saveFile.execute(customOptions);

        const fileExist = fs.existsSync(filePath);
        const read = fs.readFileSync(filePath, { encoding: 'utf8'});

        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(read).toBe(customOptions.fileContent)
        
    });

    test('should return false if directory could not be created', () => {
        
        const saveFile = new SaveFile();
        const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => {
                throw new Error('Unable to create directory');
            }
        )

        const result = saveFile.execute(customOptions)
        
        expect(result).toBe(false);
        mkdirMock.mockRestore();
    });

    test('should return false if file could not be created', () => {
        
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => {
                throw new Error('This is a custom writing error message');
            }
        )

        const result = saveFile.execute({fileContent: 'hola'})
        
        expect(result).toBe(false);
        writeFileSpy.mockRestore();
    });
 })