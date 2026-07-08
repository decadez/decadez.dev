import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { createClient, type EdgeConfigClient, type EdgeConfigItems } from "@vercel/edge-config";

@Injectable()
export class EdgeConfigService implements OnModuleInit {
  private readonly logger = new Logger(EdgeConfigService.name);
  private readonly client?: EdgeConfigClient;
  private items: EdgeConfigItems = {};

  constructor() {
    if (process.env.EDGE_CONFIG) {
      this.client = createClient(process.env.EDGE_CONFIG);
    }
  }

  async onModuleInit() {
    if (!this.client) {
      this.logger.warn("EDGE_CONFIG is not set. Skipping Edge Config preload.");
      return;
    }

    this.items = await this.client.getAll();
    this.logger.log(`Loaded ${Object.keys(this.items).length} Edge Config item(s).`);
  }

  getAll<T extends EdgeConfigItems = EdgeConfigItems>() {
    return this.items as T;
  }

  get<T = unknown>(key: string) {
    return this.items[key] as T | undefined;
  }
}
