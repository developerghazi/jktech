import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { IngestionService } from './ingestion.service';

@Controller('ingestion')
@UseGuards(JwtAuthGuard, RolesGuard)
export class IngestionController {
  constructor(private ingestionService: IngestionService) {}

  @Post('trigger')
  //Mentioned role for triggering ingestion.
  @Roles('viewer', 'admin')
  async triggerIngestion(@Body() documentIds: number[]) {
    console.log("Triggering ingestion for documents:", documentIds);
    
    return this.ingestionService.trigger(documentIds);
  }

  @Get('status')
  @Roles('editor', 'admin')
  async getStatus() {
    return this.ingestionService.getStatus();
  }
}