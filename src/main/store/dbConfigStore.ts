import type { OracleConnectionConfig } from '../../types/db'

let dbConfig: OracleConnectionConfig | null = null

export function setDbConfig(config: OracleConnectionConfig) {
  dbConfig = config
}

export function getDbConfig(): OracleConnectionConfig | null {
  return dbConfig
}
