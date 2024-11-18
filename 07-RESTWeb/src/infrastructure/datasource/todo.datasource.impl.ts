import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto, CustomError } from "../../domain";


export class TodoDataSourceImpl implements TodoDataSource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        return TodoEntity.fromObject( todo );
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany()
        return todos.map( todo => TodoEntity.fromObject( todo ));
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: { id: id }
        });

        if ( !todo ) throw new CustomError( `Todo with id ${id} not found`, 404)
        return TodoEntity.fromObject( todo );
        
    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await this.findById(updateTodoDto.id);
        
        if ( !todo ) throw `Todo with id ${updateTodoDto.id} not found`;
        
        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id},
            data: updateTodoDto!.values
        })
        
        return TodoEntity.fromObject(updatedTodo);
        
    }
    async deleteById(id: number): Promise<TodoEntity> {
        const todo = await this.findById(id);

        if ( !todo ) throw `Todo with id ${id} not found`;

        const deleted = await prisma.todo.delete({
            where: { id }
        });
        
        return TodoEntity.fromObject( deleted );
    }

}