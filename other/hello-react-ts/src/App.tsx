import './App.css';
import { Greet } from './components/Greet'

function App() {
  return (
    <div className='App'>
		<Greet name='Zbychu' messageCount = {20} loggedIn= {true}/>
    </div>
  );
}

export default App;
