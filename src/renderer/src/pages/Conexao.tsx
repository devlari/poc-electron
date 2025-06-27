import { Box, Button, Typography, Paper } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function ConexaoPage(): React.JSX.Element {
  // const [formData, setFormData] = useState<OracleConnectionConfig>({
  //   host: '',
  //   port: null,
  //   serviceName: '',
  //   user: '',
  //   password: ''
  // })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
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
          <Box mt={3} sx={{ position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Conectando...' : 'Testar conexão'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  )
}
