import { useState } from 'react';
import './App.css'; 
import ListaPersoane from './components/ListaPersoane';

function App() {
  const [persoane] = useState([
    { id: 1, nume: 'Rauw Alejandro' },
    { id: 2, nume: 'Lyanno' },
    { id: 3, nume: 'Bad Bunny' },
    { id: 4, nume: 'Anuel AA' }
  ]);

  return (
    <div className="app-container">
      <ListaPersoane 
        people={persoane} 
        onAddClick={() => {}} 
      />
    </div>
  );
}

export default App;