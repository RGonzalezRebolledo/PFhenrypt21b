import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Role } from './Role.entity';

@Entity({ name: "employees" })
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dni: number;

  @Column()
  birthdate: Date;

  @Column()
  phone: number;

  @ManyToOne(() => Role, (role) => role.employees)
  role: Role;
}