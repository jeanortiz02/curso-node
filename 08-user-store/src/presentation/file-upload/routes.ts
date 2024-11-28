
import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';


export class FileUploadRoute {


  static get routes(): Router {

    const router = Router();
    const fileUploadService = new FileUploadService()
    const controller = new FileUploadController(fileUploadService);
    

    // Middleware
    router.use(FileUploadMiddleware.containFiles )
    router.use(TypeMiddleware.validTypes(['users', 'categories', 'products']) )
    // Definir las rutas
    router.post('/single/:type', controller.uploadFile );
    router.post('/multiple/:type', controller.uploadMultipleFiles );



    return router;
  }


}

