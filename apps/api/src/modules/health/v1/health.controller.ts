import { Controller, Get, Inject } from "@nestjs/common";
import { EdgeConfigService } from "@decadez/nest-infra";

@Controller({
  path: "health",
  version: "1",
})
export class HealthController {
  constructor(
    @Inject(EdgeConfigService)
    private readonly edgeConfigService: EdgeConfigService
  ) {}

  @Get()
  health() {
    return {
      status: "ok",
      service: "api",
    };
  }

  @Get("edge-config")
  edgeConfig(): Record<string, unknown> {
    return this.edgeConfigService.getAll();
  }
}
