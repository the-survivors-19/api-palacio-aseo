import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('measurement_units')
export class MeasurementUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 20
  })
  unit: string;

  @Column({
    type: 'varchar',
    length: 3
  })
  abbreviation: string;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false
  })
  remove: boolean;
}
