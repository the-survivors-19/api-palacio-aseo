import { Category } from "src/categories/entities/category.entity";
import { Provider } from "src/providers/entities/provider.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => Category, category => category.id)
  @JoinColumn({
    name: 'category_id',
  })
  category_id: Category;

  @ManyToOne(() => Provider, provider => provider.products)
  @JoinColumn({
    name: 'provider_id',
  })
  provider_id: Provider;
}
