import { CateogryModel } from "../../data";
import { CreateCategoryDto, CustomError, UserEntity } from "../../domain";


export class CategoryService {

    // DI
    constructor() {}


    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {

        const categoryExists = await CateogryModel.findOne({ name: createCategoryDto.name});
        if (categoryExists) throw CustomError.badRequest('Category already exists');


        try {
            const category = new CateogryModel({
                ...createCategoryDto,
                user: user.id
            });

            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available,
                
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}