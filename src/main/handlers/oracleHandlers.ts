import { ipcMain } from 'electron'
import { connectToOracle, runQuery } from '../services/oracle'
import type { OracleConnectionConfig } from '../../types/db'

let dbConfig: OracleConnectionConfig

export function registerOracleHandlers() {
  ipcMain.handle('oracle-connect', async (_event, config: OracleConnectionConfig) => {
    try {
      await connectToOracle(config)
      dbConfig = config
      return { success: true }
    } catch (err) {
      console.error('Erro ao conectar ao Oracle:', err)
      return { success: false, error: (err as Error).message }
    }
  })

  ipcMain.handle('oracle-query', async (_event, sql: string) => {
    try {
      const result = await runQuery(sql)
      return { success: true, data: result }
    } catch (err) {
      console.error('Erro na consulta:', err)
      return { success: false, error: (err as Error).message }
    }
  })

  ipcMain.handle('get-db-config', () => {
    return dbConfig
  })

  ipcMain.handle('save-db-config', (_event, config: OracleConnectionConfig) => {
    dbConfig = config
  })
}
