import { Button } from './components/Button'

function App() {
  return (
    <div className='App'>
      <Button
        handleClick={(event, id) => {
          console.log(`clicked: ${id}`, event)
        }}
      />
    </div>
  )
}

export default App
