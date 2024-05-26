/**
 * Este código configura a renderização inicial de uma aplicação React,
 *  utilizando o Chakra UI para estilização e o React.StrictMode para 
 * ajudar a identificar problemas durante o desenvolvimento.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
);