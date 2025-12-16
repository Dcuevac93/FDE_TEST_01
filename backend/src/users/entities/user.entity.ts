import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Comment } from '../../comments/entities/comment.entity';

import * as bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'admin',
  CLIENT = 'client',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // ───────────── Relations ─────────────

  @OneToMany(() => Project, (project) => project.createdBy)
  createdProjects: Project[];

  @OneToMany(() => Project, (project) => project.client)
  clientProjects: Project[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  // ───────────── Password Hash ─────────────

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // Prevent re-hashing if already hashed
    if (!this.password) return;

    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}
