import { Request, Response } from "express";
import { CreateTodoDto } from "../../domain/dtos";
import { CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
import { UpdateTodoDto } from '../../domain/dtos/todos/update-todo.dto';


export class TodosController {

    //* DI 
    constructor(
        private readonly todoRepository : TodoRepository 
    ) {}

    private handleError = (res: Response, error: unknown) => {
        if(error instanceof CustomError) {
            res.status(error.statusCode).json({
                err: error.message
            });
            return;
        }
        // grabar log
        res.status(500).json({
            error: "Internal Server Error - Check logs"
        });
    }

    public getTodos = (req: Request, res: Response) => {

        new GetTodos(this.todoRepository)
            .execute()
            .then( todos => res.json(todos))
            .catch(err => this.handleError(res, err) );
        
    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(404).json({ error: `ID argument must be a number`});

        new GetTodo(this.todoRepository)
            .execute(id)
            .then( todo => res.json(todo))
            .catch(err => this.handleError(res, err) );
    }

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if( error) return res.status(400).json( { error } );
        
        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then( todo => res.status(201).json(todo))
            .catch(err => this.handleError(res, err) );
    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create( { ...req.body, id } )
        if (error) return res.status(400).json( { error } );
        
        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then( todo => res.json(todo))
            .catch(err => this.handleError(res, err) );
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(404).json({ error: `ID argument must be a number`});

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then( todo => res.json(todo))
            .catch(err => this.handleError(res, err) );

       

    }
}