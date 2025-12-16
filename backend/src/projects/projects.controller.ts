import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { Roles } from '../roles/decorators/roles.decorator';
import { CommentsService } from '../comments/comments.service';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import type { Request } from 'express';

type AuthenticatedRequest = Request & {
  user?: {
    sub?: number | string;
  };
};

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Post()
  @Roles(['admin'])
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const sub = req.user?.sub;
    if (sub === undefined) {
      throw new UnauthorizedException();
    }

    const createdById = typeof sub === 'string' ? Number(sub) : sub;
    if (!Number.isFinite(createdById)) {
      throw new UnauthorizedException();
    }

    return this.projectsService.create(createdById, createProjectDto);
  }

  @Get()
  @Roles(['admin'])
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @Roles(['admin', 'client'])
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }

  // ───────────── Comments ─────────────

  @Post(':id/comments')
  createComment(
    @Param('id') id: number,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const sub = req.user?.sub;
    if (sub === undefined) {
      throw new UnauthorizedException();
    }

    const userId = typeof sub === 'string' ? Number(sub) : sub;
    if (!Number.isFinite(userId)) {
      throw new UnauthorizedException();
    }
    createCommentDto = {
      ...createCommentDto,
      projectId: id,
      userId,
    };
    return this.commentsService.create(createCommentDto);
  }

  @Get(':id/comments')
  findAllComments(@Param('id') id: number) {
    return this.commentsService.findAllByProject(id);
  }
}
