import { join } from "node:path";
import { Module } from "@nestjs/common";
import {
  EdgeConfigModule,
  loadFeatureModules,
  SupabaseModule,
} from "@decadez/nest-infra";

@Module({
  imports: [
    EdgeConfigModule,
    SupabaseModule,
    ...loadFeatureModules(join(__dirname, "modules")),
  ],
})
export class AppModule {}
