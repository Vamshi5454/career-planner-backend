import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Resume } from "./Resume";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: String;

  @Column()
  email?: String;

  @Column()
  password?: String;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes!: Resume[];
}
