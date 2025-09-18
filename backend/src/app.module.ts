import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParfumModule } from './parfum/parfum.module';

@Module({
  imports: [ParfumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
