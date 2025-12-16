import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { ProjectStatus } from '../entities/project.entity';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  name?: string | undefined;
  description?: string | undefined;
  status?: ProjectStatus | undefined;
  clientId?: number | undefined;
}
