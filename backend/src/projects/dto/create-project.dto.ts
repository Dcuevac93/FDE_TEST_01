import { IsString, IsInt, IsEnum } from 'class-validator';
import { ProjectStatus } from '../entities/project.entity';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsInt()
  clientId: number;
}
