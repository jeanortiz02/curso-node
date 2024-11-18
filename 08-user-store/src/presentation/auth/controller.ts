import { Request, Response } from "express"
import { RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {

    //DI
    constructor(
        public readonly authService: AuthService
    ) {}


    registerUser = (req: Request, res: Response) => {
        const [error, registeruserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error});
        
        this.authService.registerUser(registeruserDto!)
            .then( user => res.status(200).json(user))
    };

    loginUser = (req: Request, res: Response) => {
        res.json('LoginUser')
    };

    validateEmail = (req: Request, res: Response) => {
        res.json('ValidateEmail')
    };
}