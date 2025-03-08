import { Controller, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UsersService } from './users.service';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('users')
// Protects all routes in this controller using JWT and role-based guards
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put(':id/role')
  // Ensures only admin users can access this route
  @Roles('admin')
  async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Request() req) {
    console.log("Updating Role for ID:", id, "to:", updateRoleDto.role);    
    return this.usersService.updateRole(+id, updateRoleDto.role); // Convert ID to a number before passing it to the service function
  }
}