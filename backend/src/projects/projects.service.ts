import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async create(createdById: number, createProjectDto: CreateProjectDto) {
    const { clientId, ...projectData } = createProjectDto;
    const project = this.projectsRepository.create({
      ...projectData,
      client: { id: clientId } as User,
      createdBy: { id: createdById } as User,
    });
    return this.projectsRepository.save(project);
  }

  findAll() {
    return this.projectsRepository.find();
  }

  findAllByUser(id: number) {
    return this.projectsRepository.find({
      relations: {
        client: true,
      },
      where: {
        client: {
          id,
        },
      },
    });
  }

  findOne(id: number) {
    return this.projectsRepository.findOne({
      relations: ['comments', 'comments.user'],
      where: { id },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      return null;
    }

    const { clientId, ...projectData } = updateProjectDto;
    const merged = this.projectsRepository.merge(project, {
      ...projectData,
      ...(clientId !== undefined
        ? ({ client: { id: clientId } as User } as const)
        : {}),
    });
    return this.projectsRepository.save(merged);
  }

  remove(id: number) {
    return this.projectsRepository.delete(id);
  }
}
