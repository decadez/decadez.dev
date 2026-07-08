import { Global, Module } from "@nestjs/common";
import { EdgeConfigService } from "./edge-config.service";

@Global()
@Module({
  providers: [EdgeConfigService],
  exports: [EdgeConfigService],
})
export class EdgeConfigModule {}
