import { IsString, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  projectId: number;

  @IsInt()
  userId: number;

  @IsString()
  content: string;
}