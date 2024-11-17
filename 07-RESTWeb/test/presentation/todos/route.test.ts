import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';


describe('todo route testing', () => {

    beforeAll( async() => {
        await testServer.start()
    })

    afterAll( () => {
        testServer.close();
    });

    beforeEach(async() => {
        await prisma.todo.deleteMany();
    })

    const todo1 = {text: 'Hola mundo 1'}
    const todo2 = {text: 'Hola mundo 2'}
    
    test('should return TODOS /api/todos', async() => { 


        await prisma.todo.createMany({
            data: [ todo1, todo2]
        })

        const { body } = await request(testServer.app )
            .get('/api/todos')
            .expect(200)

        expect( body ).toBeInstanceOf( Array );
        expect( body.length ).toBe( 2 );
        expect( body[0].text ).toBe( todo1.text );
        expect( body[1].text ).toBe( todo2.text );
     })


     test('should return a TODO /api/todos/:id', async() => {

        await prisma.todo.createMany({
            data: [ todo1, todo2]
        })

        const todo = await prisma.todo.findFirst()

        const { body } = await request(testServer.app )
            .get(`/api/todos/${todo!.id}`)
            .expect(200)

        // console.log( body );

        expect( body ).toEqual({
            id: todo!.id,
            text: todo1.text,
            completedAt: null
        })
     })

     test('should return a 404 not found api/todos/:id', async() => { 
        const todoId = 2295
        const { body } = await request(testServer.app )
        .get(`/api/todos/${todoId}`)
        .expect(400)


        // console.log( body );

        expect( body ).toEqual({ err: `Todo with id ${todoId} not found` })
        
      });

      test('should return a new TODO api/todos', async() => { 
        
        const { body } = await request(testServer.app) 
            .post(`/api/todos/`)
            .send( todo1 )
            .expect(201)

        expect( body ).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null
        })

       });

       test('should return an error if text is not present api/todos', async() => { 
        
        const { body } = await request(testServer.app) 
            .post(`/api/todos/`)
            .send( { } )
            .expect(400)

        expect( body ).toEqual({ error: 'Text property is required' })

       });

       test('should return an error if text is empty api/todos', async() => { 
        
        const { body } = await request(testServer.app) 
            .post(`/api/todos/`)
            .send( { text: '' } )
            .expect(400)

        expect( body ).toEqual({ error: 'Text property is required' })

       });

       test('should return a updated TODO api/todos', async() => { 

        const todo = await prisma.todo.create({ data: todo1});
        
        const { body } = await request(testServer.app) 
            .put(`/api/todos/${todo.id}`)
            .send( {
                text: 'Hola mundo Updated',
                completedAt: '2024-11-17'
            } )
            .expect(200)

        expect(body).toEqual({
            id: expect.any(Number),
                text: 'Hola mundo Updated',
                completedAt: '2024-11-17T00:00:00.000Z'
        })

       });


       // TODO realizar la operacion con errores personalizados
       test('should return 404 if todo not found', async() => { 

        const todoId = 2332;
        
        const { body } = await request(testServer.app) 
            .put(`/api/todos/${todoId}`)
            .send( {
                text: 'Hola mundo Updated',
                completedAt: '2024-11-17'
            } )
            .expect(400)

        expect( body ).toEqual({ err: `Todo with id ${todoId} not found` })
            

        });

        
        test('should return and updated TODO only the date', async() => { 
            
            const todo = await prisma.todo.create({ data: todo1});
        
            const { body } = await request(testServer.app) 
                .put(`/api/todos/${todo.id}`)
                .send( {
                    completedAt: '2024-11-17'
                } )
                .expect(200)

            expect( body ).toEqual({
                id: expect.any(Number),
                text: todo1.text,
                completedAt: '2024-11-17T00:00:00.000Z'
              })
         });

         test('should delet a TODO api/todos/:id', async() => { 

            const todo = await prisma.todo.create({ data: todo1});

            const { body } = await request(testServer.app)
                .delete(`/api/todos/${todo.id}`)
                .expect(200)

            expect( body ).toEqual({ 
                id: expect.any(Number), 
                text: todo1.text, 
                completedAt: null 
            })
          })

          // TODO cambiar a 404
          test('should return 404 if TODO not exists api/todos/:id', async() => { 

            const todoId = 2332;
            const { body } = await request(testServer.app)
                .delete(`/api/todos/${todoId}`)
                .expect(400)

            console.log(body)
            expect( body ).toEqual({ err: `Todo with id ${todoId} not found` })
          })

});