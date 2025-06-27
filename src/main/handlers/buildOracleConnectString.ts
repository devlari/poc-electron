export type OracleConnectMode = 'SID' | 'SERVICE_NAME'

export function buildOracleConnectString({
  host,
  port = 1521,
  value,
  mode = 'SID'
}: {
  host: string
  port?: number
  value: string
  mode?: OracleConnectMode
}): string {
  const connectData = mode === 'SID' ? `(SID=${value})` : `(SERVICE_NAME=${value})`

  return `
    (DESCRIPTION=
      (ADDRESS_LIST=
        (ADDRESS=(PROTOCOL=TCP)(HOST=${host})(PORT=${port}))
      )
      (CONNECT_DATA=${connectData})
    )
  `
}
