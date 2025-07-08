import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#rootApp'))

const App = () => {
  return <h1>hello React</h1>
}

root.render(<App />);