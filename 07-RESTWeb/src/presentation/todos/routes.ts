
import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repository/todo.repository.impl";



export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        const dataSource = new TodoDataSourceImpl();

        const todoRepository = new TodoRepositoryImpl( dataSource );

        const todoController = new TodosController(todoRepository)

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);


        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }

}