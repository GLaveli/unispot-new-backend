import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Spot from '../models/Spot';

export default {
 async index(req: Request, res: Response) {
  const spotRespository = getRepository(Spot);

  const spots = await spotRespository.find();

  return res.status(200).json(spots);
 },
 async show(req: Request, res: Response) {
  const { id } = req.params;

  const spotRespository = getRepository(Spot);

  const spot = await spotRespository.findOneOrFail(id);

  return res.status(200).json(spot);
 },
 async create(req: Request, res: Response) {

  const {
   name,
   latitude,
   longitude,
   about,
   instructions,
   opening_hours,
   open_on_weekends,
  } = req.body;

  const spotRespository = getRepository(Spot);

  const requestImages = req.files as Express.Multer.File[];
  
  const images = requestImages.map(image => {
   return { path: image.filename }
  });

  const spot = spotRespository.create({
   name,
   latitude,
   longitude,
   about,
   instructions,
   opening_hours,
   open_on_weekends,
   images
  });

  await spotRespository.save(spot);

  return res.status(201).json(spot);
 }
}