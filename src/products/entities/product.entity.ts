import { Category } from "src/categories/entities/category.entity";
import { Provider } from "src/providers/entities/provider.entity";
import { Rating } from "src/ratings/entities/rating.entity";
import { WeightProduct } from "src/weight_products/entities/weight_product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 8
  })
  code: string

  @Column({type: 'varchar', length: '45'})
  name: string;

  @Column({type: 'varchar', length: 200})
  description: string;

  @Column({type: 'text'})
  img_1: string;

  @Column({type: 'text', nullable: true, default: null})
  img_2: string;

  @Column({type: 'text', nullable: true, default: null})
  img_3: string;

  @Column({type: 'text', nullable: true, default: null})
  img_4: string;

  @Column({
    type: 'boolean',
    default: false
  })
  remove: boolean;

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({
    name: 'category_id',
  })
  category_id: Category;

  @ManyToOne(() => Provider, provider => provider.id)
  @JoinColumn({
    name: 'provider_id',
  })
  provider_id: Provider;

  @OneToMany(() => WeightProduct, weightProduct => weightProduct.product_id)
  @JoinColumn({
    name: 'weight_products'
  })
  weight_products: WeightProduct[]

  @OneToMany(() => Rating, rating => rating.product_id)
  @JoinColumn({
    name: 'ratings'
  })
  ratings: Rating[]
}
