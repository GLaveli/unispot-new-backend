import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/uploads';
import SpotController from './Controllers/SpotsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/spots', SpotController.index);
routes.get('/spots/:id', SpotController.show);
routes.post('/spots', upload.array('images'), SpotController.create);

export default routes;