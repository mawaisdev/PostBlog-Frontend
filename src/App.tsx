import { MuiResponsiveness } from './components/MuiResponsiveness'
import { createTheme, colors, ThemeProvider } from '@mui/material'

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    secondary: {
      main: colors.orange[500],
    },
    neutral: {
      main: colors.blueGrey[500],
      darker: colors.blueGrey[900],
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <MuiResponsiveness />
      </div>
    </ThemeProvider>
  )
}

export default App
