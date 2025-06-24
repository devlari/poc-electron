export {}
import type { OracleConnectionConfig } from '../types/db'

declare global {
  interface Window {
    customAPI: {
      connectToOracle: (
        config: OracleConnectionConfig
      ) => Promise<{ success: boolean; data?: any; error?: string }>
      saveDbConfig: (config: OracleConnectionConfig) => void
      runQuery: (sql: string) => Promise<{ success: boolean; data?: any[]; error?: string }>
    }
  }
}
