import { MeasurementUnit } from "src/measurement_units/entities/measurement_unit.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('weight_products')
export class WeightProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'double'
  })
  quantity: number;

  @Column({
    type: 'double'
  })
  stock: number;

  @Column({
    type: 'double'
  })
  price: number;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn({
    name: 'product_id'
  })
  product_id;

  @ManyToOne(() => MeasurementUnit, measurementUnit => measurementUnit.id)
  @JoinColumn({
    name: 'measurement_unit_id'
  })
  measurement_unit_id;

  @Column({
    type: 'boolean',
    default: false
  })
  remove: boolean;
}
