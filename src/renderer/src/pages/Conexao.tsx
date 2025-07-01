import { Box, Typography, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function ConexaoPage(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const [oracleArgs, setOracleArgs] = useState({
    user: '',
    host: '',
    connectValue: '',
    password: ''
  })
  const navigate = useNavigate()

  async function getOracleArgs() {
    return await window.electron.ipcRenderer.invoke('get-oracle-args')
  }

  useEffect(() => {
    const testarConexao = async () => {
      setIsLoading(true)
      try {
        const args = await getOracleArgs()
        setOracleArgs(args)

        const result = await window.electron.ipcRenderer.invoke('oracle-connect', {
          user: args.user,
          password: args.password,
          connectString: `${args.host}/${args.connectValue}`
        })

        if (result.success) {
          alert('✅ Conexão bem-sucedida!')
          navigate('/consulta')
        } else {
          alert(`❌ Erro ao conectar: ${result}`)
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro desconhecido'
        alert(`❌ Erro inesperado: ${msg}`)
      } finally {
        setIsLoading(false)
      }
    }

    testarConexao()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Conectando ao banco... user: {oracleArgs.user}, host: {oracleArgs.host}, connectValue:{' '}
          {oracleArgs.connectValue}
        </Typography>
        {isLoading && <Typography>Verificando conexão, aguarde...</Typography>}
      </Paper>
    </Box>
  )
}
