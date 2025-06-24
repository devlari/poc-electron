import { Routes, Route } from 'react-router-dom'
import { ConexaoPage } from '../pages/Conexao'
import { ConsultaPage } from '@renderer/pages/Consulta'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ConexaoPage />} />
      <Route path="/consulta" element={<ConsultaPage />} />
    </Routes>
  )
}
