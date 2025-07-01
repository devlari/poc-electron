import { ipcMain } from 'electron'
import { connectToOracle, runQuery } from '../services/oracle'
import type { OracleConnectionConfig } from '../../types/db'

let dbConfig: OracleConnectionConfig

export function registerOracleHandlers() {
  const dev = process.env.NODE_ENV === 'development'
  const [, user, host, connectValue, password] = process.argv

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

  ipcMain.handle('get-oracle-args', () => {
    if (dev) {
      return {
        user: 'prounion',
        host: '172.19.43.154',
        connectValue: 'XE',
        password: 'prounion'
      }
    }
    return {
      user,
      host,
      connectValue,
      password
    }
  })
}
