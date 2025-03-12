import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entitites/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}
  async create(file: Express.Multer.File, createDocumentDto: CreateDocumentDto) {
    if (!file) {
      throw new Error('File is required');
    }
  
    const document = this.documentsRepository.create({
      ...createDocumentDto,
      filePath: file.filename,
    });
  
    return this.documentsRepository.save(document);
  }

  async findAll() {
    return this.documentsRepository.find();
  }

  async findOne(id: number) {
    return this.documentsRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const document = await this.documentsRepository.findOne({ where: { id } });
    if (!document) {
      throw new Error(`Document with ID ${id} not found`);
    }
    // Delete the file from uploads folder
    const filePath = path.join(__dirname, '..', '..', 'uploads', document.filePath);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
    return this.documentsRepository.delete(id);
  }
}