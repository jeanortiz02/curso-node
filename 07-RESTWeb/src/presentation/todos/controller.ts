import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';


export class TodosController {

    //* DI 
    constructor(
        private readonly todoRepository : TodoRepository 
    ) {}

    public getTodos = (req: Request, res: Response) => {

        new GetTodos(this.todoRepository)
            .execute()
            .then( todos => res.json(todos))
            .catch(err => res.status(400).json({err}));
        
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(404).json({ error: `ID argument must be a number`});

        new GetTodo(this.todoRepository)
            .execute(id)
            .then( todo => res.json(todo))
            .catch(err => res.status(400).json({err}));
    }

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if( error) return res.status(400).json( { error } );
        
        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then( todo => res.status(201).json(todo))
            .catch(err => res.status(400).json({err}));
    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create( { ...req.body, id } )
        if (error) return res.status(400).json( { error } );
        
        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then( todo => res.json(todo))
            .catch(err => res.status(400).json({err}));
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(404).json({ error: `ID argument must be a number`});

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then( todo => res.json(todo))
            .catch(err => res.status(400).json({err}));

       

    }
}