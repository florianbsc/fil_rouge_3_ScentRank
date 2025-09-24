import { Module } from '@nestjs/common';
import { ParfumsController } from './parfums.controller';
import { ParfumsService } from './parfums.service';

@Module({
  controllers: [ParfumsController],
  providers: [ParfumsService]
})
export class ParfumsModule {}
