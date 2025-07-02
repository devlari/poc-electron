import { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import { TabPanel } from '@renderer/components/TabPanel'
import { ConsultaPersonalizadaPage } from './Personalizada'
import { ConsultaEstaticaPage } from './Estatica'

export function ConsultaPage(): React.JSX.Element {
  const [valueTab, setValueTab] = useState(0)

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setValueTab(newValue)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        p: 4,
        boxSizing: 'border-box'
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="flex-start" mt={4}>
        <Tabs value={valueTab} onChange={handleChangeTab} aria-label="Abas">
          <Tab label="Consulta personalizada" />
          <Tab label="Consulta estática" />
        </Tabs>
        <TabPanel value={valueTab} index={0}>
          <ConsultaPersonalizadaPage />
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          <ConsultaEstaticaPage />
        </TabPanel>
      </Box>
    </Box>
  )
}
