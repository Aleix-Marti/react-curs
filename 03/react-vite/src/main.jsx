import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import MyApp from './MyApp.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


const root = createRoot(document.querySelector('#root'));
root.render(<MyApp name="Aleix"/>)
