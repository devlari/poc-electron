import { useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert
} from '@mui/material'

type Cliente = {
  CODCLI: string
  CLIENTE: string
  ENDERCOB: string
}

export function ConsultaPage(): React.JSX.Element {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const res = await window.customAPI.runQuery(
          'SELECT CODCLI, CLIENTE, ENDERCOB FROM PCCLIENT'
        )

        if (res.success) {
          const dados = res.data?.map((row: Cliente) => ({
            CODCLI: row.CODCLI,
            CLIENTE: row.CLIENTE,
            ENDERCOB: row.ENDERCOB
          }))

          setClientes(dados ?? [])
        } else {
          setErro(res.error || 'Erro ao consultar dados')
        }
      } catch (err: any) {
        setErro(err.message)
      } finally {
        setLoading(false)
      }
    }

    buscarClientes()
  }, [])

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Consulta ao banco de dados
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : erro ? (
        <Alert severity="error">{erro}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Código</strong>
                </TableCell>
                <TableCell>
                  <strong>Cliente</strong>
                </TableCell>
                <TableCell>
                  <strong>Endereço Cobrança</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((cliente, i) => (
                <TableRow key={i}>
                  <TableCell>{cliente.CODCLI}</TableCell>
                  <TableCell>{cliente.CLIENTE}</TableCell>
                  <TableCell>{cliente.ENDERCOB}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
