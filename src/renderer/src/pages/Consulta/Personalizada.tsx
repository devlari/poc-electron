import {
  Typography,
  TextareaAutosize,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box
} from '@mui/material'
import { useState } from 'react'

export function ConsultaPersonalizadaPage(): React.JSX.Element {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [columns, setColumns] = useState<string[]>([])

  const handleQuery = async () => {
    try {
      const response = await window.customAPI.runQuery(query)

      console.log(response)

      if (response.success && response.data) {
        const data = response.data
        setResults(data)
        if (data.length > 0) {
          setColumns(Object.keys(data[0]))

          return
        }

        alert('Erro: ' + response.error)
        setColumns([])
        setResults([])
      }
    } catch (err) {
      console.error(err)
      alert('Erro ao executar a consulta.')
      setResults([])
      setColumns([])
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        p: 4,
        boxSizing: 'border-box'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Escreva sua consulta SQL:
      </Typography>

      <TextareaAutosize
        minRows={5}
        style={{ width: '600px', marginBottom: '1rem' }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite sua consulta SQL aqui..."
      />

      <Button variant="contained" onClick={handleQuery}>
        Consultar
      </Button>

      {results.length > 0 && (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((col) => (
                    <TableCell key={col}>{row[col]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}
