import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ratings')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    width: 1,
    default: 3
  })
  stars: number;

  @Column({
    type: 'varchar',
    length: 200,
    default: null
  })
  description: string;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn({
    name: 'product_id'
  })
  product_id: Product;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({
    name: 'user_id'
  })
  user_id: User;

  @CreateDateColumn()
  created_at: string;
}
