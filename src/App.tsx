import { Greet } from './components/Greet'
import { Person } from './components/Person'
import { PersonList } from './components/PersonList'

function App() {
  const person = { first: 'Muhammad', last: 'Awais' }
  const nameList = [
    { name: { first: 'Awais', last: 'A' } },
    { name: { first: 'Ali', last: 'A' } },
    { name: { first: 'Ahmed', last: 'A' } },
  ]
  return (
    <div className='App'>
      <Greet name='Awais' count={2} isLoggedIn={false} />
      <Person name={person} />
      <PersonList names={nameList} />
    </div>
  )
}

export default App
