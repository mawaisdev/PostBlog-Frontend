import { Heading } from './components/Heading'
import { Oscar } from './components/Oscar'
import { Status } from './components/Status'

function App() {
  return (
    <div className='App'>
      <Status status='success' />
      <Heading>Placeholder Text</Heading>
      <Oscar>
        <Heading>Oscar goes to london</Heading>
      </Oscar>
    </div>
  )
}

export default App
