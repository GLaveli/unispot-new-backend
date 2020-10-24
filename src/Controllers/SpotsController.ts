import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import spotView from '../views/spot_view';
import * as Yup from 'yup';

import Spot from '../models/Spot';

export default {
 async index(req: Request, res: Response) {
  const spotRespository = getRepository(Spot);

  const spots = await spotRespository.find({
   relations: ['images']
  });

  return res.status(200).json(spotView.renderMany(spots));
 },
 async show(req: Request, res: Response) {
  const { id } = req.params;

  const spotRespository = getRepository(Spot);

  const spot = await spotRespository.findOneOrFail(id, {
   relations: ['images']
  });

  return res.status(200).json(spotView.render(spot));
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

  const data = {
   name,
   latitude,
   longitude,
   about,
   instructions,
   opening_hours,
   open_on_weekends,
   images
  }

  const spot = spotRespository.create(data);

  await spotRespository.save(spot);

  return res.status(201).json(spot);
 }
}