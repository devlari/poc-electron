import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material'
import { useState } from 'react'
import type { OracleConnectionConfig } from '../../../types/db'
import { useNavigate } from 'react-router-dom'

export function ConexaoPage(): React.JSX.Element {
  const [formData, setFormData] = useState<OracleConnectionConfig>({
    host: '',
    port: null,
    serviceName: '',
    user: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const conn = await window.customAPI.connectToOracle(formData)

      if (!conn.success) {
        alert(conn.error || 'Erro desconhecido ao conectar ao banco de dados')
        return
      }

      window.customAPI.saveDbConfig(formData)

      alert('Conexão bem-sucedida!')
      navigate('/consulta')
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido ao executar a operação'
      alert(`Erro ao executar operação no banco: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
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
        <Typography variant="h5" gutterBottom>
          Conexão ao banco de dados
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <TextField
              label="Host"
              name="host"
              value={formData.host}
              onChange={handleChange}
              disabled={isLoading}
              fullWidth
              required
            />
            <TextField
              label="Porta"
              name="port"
              value={formData.port || ''}
              onChange={handleChange}
              disabled={isLoading}
              fullWidth
              required
              type="number"
            />
            <TextField
              label="Service Name ou SID"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              disabled={isLoading}
              fullWidth
              required
            />
            <TextField
              label="Usuário"
              name="user"
              value={formData.user}
              onChange={handleChange}
              disabled={isLoading}
              fullWidth
              required
            />
            <TextField
              label="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              fullWidth
              required
              type="password"
            />
          </Grid>
          <Box mt={3} sx={{ position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Conectando...' : 'Conectar'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}
