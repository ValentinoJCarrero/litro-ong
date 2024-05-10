import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const configDocumentation = new DocumentBuilder()
    .setTitle('El litro - ONG')
    .setDescription('ponerse de acuerdo con el grupo sobre la descripción')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configDocumentation);
  SwaggerModule.setup('api', app, document);
}
