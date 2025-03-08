import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      return null;
    }

    try {
      const user = await this.usersRepository.findOne({ 
        where: { email },
      });

      return user || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async findById(id: number): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOne({ 
        where: { id },
        select: ['id', 'email', 'name', 'role', 'created_at', 'updated_at']
      });

      return user || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }
  }

  async updateRole(id: number, role: 'admin' | 'editor' | 'viewer'): Promise<User> {
    // Find the user before updating the role
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("User not found!");
    }
  
    console.log(`Found user: ${user.email}, current role: ${user.role}`);
    // Updates the user's role in the database
    await this.usersRepository.update(id, { role });
    // Fetch the updated user from the database
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    console.log("Role updated successfully:", updatedUser);
  
    return updatedUser;
  } 
}