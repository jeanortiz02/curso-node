


describe('App', () => {
    
    test('should to pass', () => {
       
        // 1. Arrange
        const num1 = 10;
        const num2 = 10;

        // 2. Act
        const result = num1 + num2;

        
        // 3. Assert
        expect(result).toBe(20);
    });
});