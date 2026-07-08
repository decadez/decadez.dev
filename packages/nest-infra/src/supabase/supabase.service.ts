import { Injectable, Logger } from "@nestjs/common";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface SupabaseConnectionStatus {
  configured: boolean;
  connected: boolean;
  status: number | null;
}

@Injectable()
export class SupabaseService {
  private readonly logger = new Logger(SupabaseService.name);
  private readonly url = process.env.SUPABASE_URL;
  private readonly serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  private readonly client?: SupabaseClient;

  constructor() {
    if (this.url && this.serviceRoleKey) {
      this.client = createClient(this.url, this.serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
      return;
    }

    this.logger.warn(
      "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. Supabase client is disabled."
    );
  }

  isConfigured() {
    return Boolean(this.client && this.url && this.serviceRoleKey);
  }

  getClient() {
    if (!this.client) {
      throw new Error("Supabase client is not configured.");
    }

    return this.client;
  }

  async checkConnection(): Promise<SupabaseConnectionStatus> {
    if (!this.url || !this.serviceRoleKey) {
      return {
        configured: false,
        connected: false,
        status: null,
      };
    }

    const response = await fetch(`${this.url}/rest/v1/`, {
      headers: {
        apikey: this.serviceRoleKey,
        Authorization: `Bearer ${this.serviceRoleKey}`,
      },
    });

    return {
      configured: true,
      connected: response.ok,
      status: response.status,
    };
  }
}
