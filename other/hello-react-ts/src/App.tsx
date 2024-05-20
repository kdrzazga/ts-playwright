import './App.css';
import { Greet } from './components/Greet'
import { Person } from './components/Person'
import { PersonList } from './components/PersonList'

function App() {
  const personName = {
    first: 'Andrzej',
	last: 'Kowalski',
  }
  
  const nameList = [
	{
		first: 'Jan',
		last: 'Kos'
	},
	{
		first: 'Hans',
		last: 'Kloss'
	},
	{
		first: 'Tolek',
		last: 'Banan'
	}
  ]
  return (
    <div className='App'>
		<Greet name='Zbychu' messageCount = {20} loggedIn= {true}/>
		<Person name ={personName}/>	
        <PersonList names={nameList} />
    </div>
  );
}

export default App;
