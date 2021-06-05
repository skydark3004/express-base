import { CorsOptions } from 'cors';

export class SessionConfig {
  /**
   * @method corsConfig
   * @description config cross resources original
   * @summary accept cross domain cookie, origin whitelist not config (Reason: apply config whitelist in infrastructure [KONG GATEWAY])
   * @return {e.CorsOptions}
   */
  public static corsConfig(): CorsOptions {
    return {
      origin: true,
      credentials: true
    };
  }
}
