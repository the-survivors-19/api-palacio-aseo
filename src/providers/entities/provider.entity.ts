import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('providers')
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  duty_manager: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'boolean', default: false })
  remove: boolean;
}
