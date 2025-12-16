import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Project } from '../projects/entities/project.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    const { projectId, userId, content } = createCommentDto;
    const comment = this.commentsRepository.create({
      content,
      project: { id: projectId } as Project,
      user: { id: userId } as User,
    });
    return this.commentsRepository.save(comment);
  }

  findAll() {
    return this.commentsRepository.find();
  }

  findAllByProject(projectId: number) {
    return this.commentsRepository.find({
      relations: {
        project: true,
      },
      where: {
        project: {
          id: projectId,
        },
      },
    });
  }

  findOne(id: number) {
    return this.commentsRepository.findOne({ where: { id } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    // return this.commentsRepository.update(id, updateCommentDto);
  }

  remove(id: number) {
    return this.commentsRepository.delete(id);
  }
}
