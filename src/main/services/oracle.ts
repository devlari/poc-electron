import oracledb from 'oracledb'
import type { OracleConnectionConfig } from '../../types/db'

let connection: oracledb.Connection | null = null

export async function connectToOracle(config: OracleConnectionConfig): Promise<void> {
  oracledb.initOracleClient({ libDir: 'C:\\devtools\\instantclient64' })

  connection = await oracledb.getConnection(config)

  await connection.execute('SELECT 1 FROM DUAL')
}

export async function runQuery(sql: string, binds: any[] = []): Promise<any[]> {
  if (!connection) throw new Error('Não conectado ao Oracle.')

  const result = await connection.execute(sql, binds, { outFormat: oracledb.OUT_FORMAT_OBJECT })
  return result.rows ?? []
}

export async function closeConnection(): Promise<void> {
  if (connection) {
    await connection.close()
    connection = null
  }
}
