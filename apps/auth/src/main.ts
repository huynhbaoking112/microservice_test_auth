import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService)


  const USER = configService.get('RABBITMQ_USER')
  const PASSWORD = configService.get('RABBITMQ_PASS')
  const HOST = configService.get('RABBITMQ_HOST')
  const QUEUE = configService.get('RABBITMQ_AUTH_QUEUE')

  // await app.listen(3000);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options:{
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
      queue: 'auth_queue',
      queueOptions: {
        durable: false
      },
    }
  })
  app.startAllMicroservices()
}
bootstrap();
