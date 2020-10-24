import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Spot from './Spot';

@Entity('images')
export default class Image {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @Column()
 path: string;

 @ManyToOne(() => Spot, spot => spot.images)
 @JoinColumn({ name: 'spot_id' })
 spot: Spot;

}