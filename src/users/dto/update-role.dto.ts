import { IsEnum } from 'class-validator';


export class UpdateRoleDto {
  @IsEnum(['admin', 'editor', 'viewer'], { message: 'Role must be either admin, editor, or viewer' })
  role: 'admin' | 'editor' | 'viewer';
}