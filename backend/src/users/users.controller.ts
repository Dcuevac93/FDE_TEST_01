import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProjectsService } from '../projects/projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../roles/guards/roles.guard';
import { Roles } from '../roles/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('clients')
  findAllClients() {
    return this.usersService.findAllClients();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':id/projects')
  @UseGuards(JwtAuthGuard)
  findAllProjectsByUser(@Param('id') id: number) {
    return this.projectsService.findAllByUser(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
