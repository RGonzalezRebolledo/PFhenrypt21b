import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { VisitCounterService } from './VisitCounter.Service'; 

@Controller('visits')
export class VisitCounterController {
  constructor(private readonly visitCounterService: VisitCounterService) {}

  @Get()
  async getVisits() {
    const visits = await this.visitCounterService.getAllVisits();
    return visits;
  }

  @Get('total')
  async getTotalVisits(): Promise<{ total: number }> {
    const total = await this.visitCounterService.getTotalVisitCount();
    return { total };
  }

  @Post()
  async storeVisit(@Body() body: { ip: string }): Promise<void> {
    await this.visitCounterService.storeVisitIp(body.ip);
  }



  @Get('recent')
  async hasVisitedRecently(@Query('ip') ip: string): Promise<{ recent: boolean }> {
    const recent = await this.visitCounterService.hasVisitedInLast24Hours(ip);
    return { recent };
  }
  


}
