import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";

import { User } from "./User";
import { DateFilterList } from "aws-sdk/clients/securityhub";

@Entity("resumes")
export class Resume {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user!: User;

  @Column({ type: "varchar", length: 512, unique: true })
  s3key!: string;

  @CreateDateColumn()
  upDatedAt!: Date;
}
