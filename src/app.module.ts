import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { Attendance } from './entities/Attendance';
import { AttendanceModule } from './modules/attendance.module';
import { LoggingPublisherService } from './logging/loggingpublisher.service';

@Module({
  imports: [
    AuthModule,
    AttendanceModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // can use process.env too if has multiple db type
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Attendance],
      autoLoadEntities: true,
      synchronize: false,
    }),
    ClientsModule.register([
      {
        name: 'LOG_QUEUE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'system_logs',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, LoggingPublisherService],
})
export class AppModule { }
