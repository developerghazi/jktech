import { Controller, Post, Get, Delete, Body, Param, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post()
  // Restricts access to users with 'editor' or 'admin' roles
  @Roles('editor', 'admin')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      // Specifies the folder where uploaded files will be stored
      destination: './uploads/',
      filename: (req, file, callback) => {
        // Generates a unique filename using timestamp and a random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  async create(@UploadedFile() file, @Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(file, createDocumentDto);
  }

  @Get()
  @Roles('viewer', 'editor', 'admin')
  async findAll() {
    return this.documentsService.findAll();
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return this.documentsService.remove(+id);
  }
}