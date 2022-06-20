import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false
  })
  full_name: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: false
  })
  email: string;

  @Column({
    type: 'text',
    nullable: false
  })
  password: string;

  @Column({
    type: 'longtext',
    nullable: true,
    default: null
  })
  photo: string;

  @Column({
    type: 'boolean',
    default: false
  })
  auth_google: boolean;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column({
    type: 'boolean',
    default: true
  })
  state: boolean;
}
