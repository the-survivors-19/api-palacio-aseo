import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 45
  })
  description: string;

  @CreateDateColumn()
  date: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({
    name: 'user_id'
  })
  user_id: number;
}
