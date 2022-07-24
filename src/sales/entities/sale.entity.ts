import { SalesDetails } from 'src/sales_details/entities/sales_details.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type States = 'PENDIENTE' | 'EMPACANDO' | 'ENVIADO' | 'ENTREGADO';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'double',
    default: 0,
  })
  total: number;

  @Column({
    type: 'text',
  })
  name_client: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'PENDIENTE',
  })
  current_state: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToMany(() => SalesDetails, salesDetails => salesDetails.sale)
  @JoinColumn({
    name: 'sales_details'
  })
  sales_details: SalesDetails[];

  @CreateDateColumn()
  date: string;
}
