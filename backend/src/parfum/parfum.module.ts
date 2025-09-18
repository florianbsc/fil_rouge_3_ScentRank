import { Module } from '@nestjs/common';
import { ParfumController } from './parfum.controller';
import { ParfumService } from './parfum.service';

@Module({
  controllers: [ParfumController],
  providers: [ParfumService]
})
export class ParfumModule {}
