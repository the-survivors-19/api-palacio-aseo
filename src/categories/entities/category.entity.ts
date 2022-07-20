import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 20})
  description: string;

  @Column({type: 'boolean', default: false})
  remove: boolean;

  @OneToMany(() => Product, product => product.category_id)
  @JoinColumn({
    name: 'products'
  })
  products: Product[];
}
