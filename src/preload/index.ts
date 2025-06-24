import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { OracleConnectionConfig } from '../types/db'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('customAPI', {
      connectToOracle: (config: OracleConnectionConfig) =>
        ipcRenderer.invoke('oracle-connect', config),
      saveDbConfig: (config: OracleConnectionConfig) =>
        ipcRenderer.invoke('save-db-config', config),
      getDbConfig: () => ipcRenderer.invoke('get-db-config'),
      runQuery: (sql: string) => ipcRenderer.invoke('oracle-query', sql)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
