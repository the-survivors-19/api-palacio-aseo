import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pqrs')
export class Pqrs {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 45
  })
  description: string;

  @Column({
    type: 'enum',
    enum: ['peticion', 'queja', 'reclamo', 'sugerencia']
  })
  type_pqrs: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({
    name: 'user_id'
  })
  user_id: number;
}
