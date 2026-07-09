import "reflect-metadata";
import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { loadEnvFiles, ResponseInterceptor } from "@decadez/nest-infra";
import { AppModule } from "./app.module";

async function bootstrap() {
  loadEnvFiles();

  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 3001;
  const corsOrigins = process.env.CORS_ORIGIN?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });
  app.enableCors({
    origin: corsOrigins?.length
      ? corsOrigins
      : ["http://localhost:3000", "https://decadez.github.io"],
  });
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.init();
  await app.listen(port);
}

void bootstrap();
