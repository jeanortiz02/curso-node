import { Request, Response, NextFunction } from "express";




export class FileUploadMiddleware {

    static containFiles (req: Request, res: Response, next: NextFunction) {
        // console.log(req);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(404).json({error: 'No files were selected'});
        }

        if ( !Array.isArray( req.files.file ) ) {
            req.body.files = [req.files.file]
        } else {
            req.body.files = req.files.file
        }

        next();
    }
}