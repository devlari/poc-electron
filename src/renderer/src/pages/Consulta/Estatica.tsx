import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box
} from '@mui/material'
import { useEffect, useState } from 'react'

type Cliente = {
  CODCLI: string
  CLIENTE: string
  ENDERCOB: string
}

export function ConsultaEstaticaPage(): React.JSX.Element {
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
        boxSizing: 'border-box'
      }}
    >
      {loading && <div>Carregando...</div>}
      {erro && <div style={{ color: 'red' }}>Erro: {erro}</div>}
      {!erro && clientes.length === 0 && <div>Nenhum cliente encontrado.</div>}
      {clientes.length > 0 && (
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
    </Box>
  )
}
