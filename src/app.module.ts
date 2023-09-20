import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Configure global environment variables
      isGlobal: true, // Make the configuration available globally
    }),
    PrismaModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
