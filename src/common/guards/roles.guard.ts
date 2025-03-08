import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log("Incoming Request Headers:", request.headers);
    console.log("Incoming Request User:", request.user);

    if (!request.user) {
      console.log("No user found in request.");
      return false;
    }

    const hasRole = requiredRoles.includes(request.user.role);
    console.log("Required Roles:", requiredRoles);
    console.log("User Role:", request.user.role);
    console.log("Has Required Role:", hasRole);

    return hasRole;
  }
}
