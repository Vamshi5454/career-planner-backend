import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity("resumes")
export class Resume {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.resumes, { onDelete: "CASCADE" }) // ✅ Fixed inverse relation
  user!: User;

  @Column({ type: "varchar", length: 512, unique: true })
  s3key!: string;

  @CreateDateColumn()
  upDatedAt!: Date;
}
