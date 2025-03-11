import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entitites/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

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
  //This will remove the document entry based on the ID.
  async remove(id: number) {
    return this.documentsRepository.delete(id);
  }
}