import { Box, Typography, Paper, Button, Stack } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function ConexaoPage(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  async function getOracleArgs() {
    return await window.electron.ipcRenderer.invoke('get-oracle-args')
  }

  async function testarConexao() {
    setIsLoading(true)
    try {
      const args = await getOracleArgs()

      const result = await window.electron.ipcRenderer.invoke('oracle-connect', {
        user: args.user,
        password: args.password,
        connectString: `${args.host}/${args.connectValue}`
      })

      if (result.success) {
        alert('Conexão bem-sucedida!')
        navigate('/consulta')
      } else {
        alert(`Erro ao conectar: ${result.error || 'Erro desconhecido'}`)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro inesperado'
      alert(`Erro inesperado: ${msg}`)
    } finally {
      setIsLoading(false)
    }
  }

  async function limparParametros() {
    await window.electron.ipcRenderer.invoke('clear-db-config')
    alert('Parâmetros limpos com sucesso!')
  }
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
        <Stack spacing={2} direction="row" mt={4}>
          <Button variant="contained" onClick={testarConexao} disabled={isLoading}>
            Testar conexão
          </Button>
          <Button variant="outlined" color="error" onClick={limparParametros} disabled={isLoading}>
            Limpar parâmetros
          </Button>
        </Stack>
        {isLoading && <Typography mt={2}>Verificando conexão, aguarde...</Typography>}
      </Paper>
    </Box>
  )
}
