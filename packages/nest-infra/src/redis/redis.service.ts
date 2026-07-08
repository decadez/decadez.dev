import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import Redis from "ioredis";

export interface RedisConnectionStatus {
  configured: boolean;
  connected: boolean;
  lruModeEnabled: boolean;
  status: string | null;
}

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly url = process.env.REDIS_URL;
  private readonly client?: Redis;
  private lruModeEnabled = false;

  constructor() {
    if (this.url) {
      this.client = new Redis(this.url, {
        lazyConnect: true,
        maxRetriesPerRequest: 1,
      });
      return;
    }

    this.logger.warn("REDIS_URL is not set. Redis client is disabled.");
  }

  async onModuleInit() {
    if (!this.client) {
      return;
    }

    await this.client.connect();
  }

  async onModuleDestroy() {
    if (this.client) {
      this.client.disconnect();
    }
  }

  isConfigured() {
    return Boolean(this.client && this.url);
  }

  getClient() {
    if (!this.client) {
      throw new Error("Redis client is not configured.");
    }

    return this.client;
  }

  async checkConnection(): Promise<RedisConnectionStatus> {
    if (!this.client) {
      return {
        configured: false,
        connected: false,
        lruModeEnabled: false,
        status: null,
      };
    }

    const status = await this.client.ping();

    return {
      configured: true,
      connected: status === "PONG",
      lruModeEnabled: this.lruModeEnabled,
      status,
    };
  }
}
