import Store from 'electron-store'
import type { OracleConnectionConfig } from '../../types/db'

const encryptionKey = 'fcbf2d66-2556-41fc-b387-f42aecf3dca2'

type Schema = {
  oracleConfig: OracleConnectionConfig
}

export const dbConfigStore = new Store<Schema>({
  encryptionKey
})
