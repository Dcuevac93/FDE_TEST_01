import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';

export enum ProjectStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  ON_HOLD = 'on-hold',
}

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /** Relations */

  // Client (user)
  @ManyToOne(() => User, (user) => user.clientProjects, { nullable: false })
  @JoinColumn({ name: 'client_id' })
  client: User;

  // Creator (admin or user)
  @ManyToOne(() => User, (user) => user.createdProjects, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @OneToMany(() => Comment, (comment) => comment.project)
  comments: Comment[];

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
