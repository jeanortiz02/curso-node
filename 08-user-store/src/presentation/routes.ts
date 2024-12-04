import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './products/routes';
import { FileUploadRoute } from './file-upload/routes';
import { ImageRoutes } from './images/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes );
    router.use('/api/category', CategoryRoutes.routes );
    router.use('/api/products', ProductRoutes.routes );

    router.use('/api/upload', FileUploadRoute.routes);
    router.use('/api/images', ImageRoutes.routes);




    return router;
  }


}

