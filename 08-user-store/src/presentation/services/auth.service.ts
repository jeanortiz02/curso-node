import { bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain';


export class AuthService {
    constructor (){}


    public async registerUser(registerUserDto : RegisterUserDto) {

        const existUser = await UserModel.findOne({email: registerUserDto.email } );

        if (existUser) throw CustomError.badRequest('Email already exits');


       try {
        const user = new UserModel(registerUserDto);
        // Encriptar password 
        user.password = bcryptAdapter.hash(registerUserDto.password)
        await user.save();

        // JWT --- Authentication para mantener la authentication

        // Email de confirmacion

        const { password, ...userEntity} = UserEntity.fromObject(user)

        return {
            user: userEntity,
            token: 'ABC'
        };
        
       } catch (error) {
            throw CustomError.internalServer(`${error}`)
       }
    }

    public async loginUser(loginUserDto : LoginUserDto) {

        
        const user = await UserModel.findOne({email: loginUserDto.email } );
        if (!user) throw CustomError.badRequest('Email not exist');

        const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password!);
        if (!isMatch) throw CustomError.badRequest('Password is not valid');

            const { password, ...userEntity } = UserEntity.fromObject(user!);

            return {
                user: userEntity ,
                token: 'ABC'
            }


    }
}