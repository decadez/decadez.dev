import { join } from "node:path";
import { Module } from "@nestjs/common";
import {
  EdgeConfigModule,
  loadFeatureModules,
  RedisModule,
  SupabaseModule,
} from "@decadez/nest-infra";

@Module({
  imports: [
    EdgeConfigModule,
    RedisModule,
    SupabaseModule,
    ...loadFeatureModules(join(__dirname, "modules")),
  ],
})
export class AppModule {}
