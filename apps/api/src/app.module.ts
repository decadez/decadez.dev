import { join } from "node:path";
import { Module } from "@nestjs/common";
import { EdgeConfigModule, loadFeatureModules } from "@decadez/nest-infra";

@Module({
  imports: [EdgeConfigModule, ...loadFeatureModules(join(__dirname, "modules"))],
})
export class AppModule {}
