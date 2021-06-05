export enum Environment {
  local = 'local',
  production = 'production',
  staging = 'staging',
  test = 'test'
}

export enum Strategy {
  ClientId = 'x-sojo-client-id',
  ClientSecret = 'x-sojo-client-secret',
  ClientDevice = 'x-sojo-device',
}

export enum ServiceOption {
  AUTH = 'auth',
  NOTIFY = 'notify',
  CORE = 'core'
}

export enum Headers {
  ContentType = 'Content-Type',
  Authorization = 'Authorization'
}
