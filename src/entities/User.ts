import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Resume from "./Resume";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string; // ✅ Fixed type

  @Column({ nullable: true, unique: true }) // ✅ Allows NULL in DB
  email?: string;

  @Column({ nullable: true }) // ✅ Allows NULL in DB
  password?: string;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes!: Resume[];
}
export default User;
