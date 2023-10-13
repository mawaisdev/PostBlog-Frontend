import { Greet } from './components/Greet'
import { Person } from './components/Person'

function App() {
  const person = { first: 'Muhammad', last: 'Awais' }
  return (
    <div className='App'>
      <Greet name='Awais' count={2} isLoggedIn={false} />
      <Person name={person} />
    </div>
  )
}

export default App
