import { ThemeProvider } from 'styled-components'
import './App.css'
import NavBar from './layouts/NavBar'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/main/Main'
import Data from './pages/data/Data'
import Contact from './pages/contact/Contact'
import { FilterContextProvider } from './pages/data/FilterContext'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/data" element={
            <FilterContextProvider>
              <Data />
            </FilterContextProvider>
          }/>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
