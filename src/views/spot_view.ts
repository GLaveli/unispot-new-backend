import Spot from '../models/Spot';
import imagesView from './images_view';

export default {
 render(spot: Spot) {
  return {
   id: spot.id,
   name: spot.name,
   about: spot.about,
   latitude: spot.latitude,
   longitude: spot.longitude,
   instructions: spot.instructions,
   opening_hours: spot.opening_hours,
   open_on_weekends: spot.open_on_weekends,
   images: imagesView.renderMany(spot.images)
  };
 },
 renderMany(spots: Spot[]) {
  return spots.map(spot => this.render(spot));
 }
};