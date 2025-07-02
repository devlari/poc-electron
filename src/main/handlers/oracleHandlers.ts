import { ipcMain } from 'electron'
import { connectToOracle, runQuery } from '../services/oracle'
import type { OracleConnectionConfig } from '../../types/db'
import { dbConfigStore } from '../store/dbConfigStore'

let dbConfig: OracleConnectionConfig = dbConfigStore.get('oracleConfig') || {
  user: '',
  host: '',
  connectValue: '',
  password: ''
}

export function registerOracleHandlers() {
  const [, user, host, connectValue, password] = process.argv

  ipcMain.handle('oracle-connect', async (_event, config: OracleConnectionConfig) => {
    try {
      const storedConfig = dbConfigStore.get('oracleConfig')

      let finalConfig = config

      console.log(storedConfig)

      if (
        storedConfig &&
        storedConfig.user &&
        storedConfig.password &&
        storedConfig.connectString
      ) {
        console.log('Configuracao existente encontrada')
        finalConfig = storedConfig
      } else {
        console.log('Salvando nova configuracao do Oracle')
        dbConfigStore.set('oracleConfig', config)
      }

      await connectToOracle(finalConfig)
      dbConfig = finalConfig

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
    dbConfigStore.set('oracleConfig', config)
  })

  ipcMain.handle('clear-db-config', () => {
    dbConfig = {
      user: '',
      connectString: '',
      password: ''
    }
    dbConfigStore.set('oracleConfig', dbConfig)
  })

  ipcMain.handle('get-oracle-args', () => {
    return {
      user,
      host,
      connectValue,
      password
    }
  })
}
