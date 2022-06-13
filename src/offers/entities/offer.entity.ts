import { Product } from "src/products/entities/product.entity";
import { Column, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    type: 'enum',
    enum: ['percent', 'fix']
  })
  type: string;

  @Column({
    type: 'double'
  })
  value: number;

  @Column({
    type: 'boolean',
    default: true
  })
  visible: boolean;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn({
    name: 'product_id'
  })
  product_id: number;
}
