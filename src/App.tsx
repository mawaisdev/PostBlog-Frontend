import { Button } from './components/Button'
import { Input } from './components/Input'

function App() {
  return (
    <div className='App'>
      <Button
        handleClick={(event, id) => {
          console.log(`clicked: ${id}`)
        }}
      />

      <Input
        value=''
        handleChange={(event) => console.log(event.target.value)}
      />
    </div>
  )
}

export default App
