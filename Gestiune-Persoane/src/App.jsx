

import React, { useState } from 'react';
import './App.css'; 
import ListaArtisti from './components/ListaArtisti.jsx'; 
import AdaugaEditeazaArtist from './components/AdaugaEditeazaArtist.jsx'; 

const INITIAL_PEOPLE = [];

function App() {
    // --- 1. STĂRILE APLICAȚIEI ---
    const [artisti, setArtisti] = useState(INITIAL_PEOPLE);
    const [artistSelectat, setArtistSelectat] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    
    // --- 2. LOGICA CRUD (Doar CREATE este activă) ---
    
    const handleSaveArtist = (artistSalvat) => {
       
        const newArtist = { ...artistSalvat, id: Date.now() }; 
        
        
        setArtisti(prevArtisti => [...prevArtisti, newArtist]); 
        
        // Selectăm automat noua persoană pentru a vedea datele în dreapta
        setArtistSelectat(newArtist); 
        
        // Închidem fereastra
        setIsModalOpen(false); 
    };

   
    const handleEdit = () => {  };
    const handleDelete = () => { };
    const handleCopyData = () => { };


    return (
        <div className="App">
            <header className="header-container">
                <h1>Catalog Persoane</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="adauga-nou-btn">
                    ➕ ADAUGĂ NOU
                </button>
            </header>

            <ListaArtisti 
                artisti={artisti}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                artistSelectat={artistSelectat}
                onSelectArtist={setArtistSelectat}
                
              
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCopyData={handleCopyData}
            />

            <AdaugaEditeazaArtist 
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveArtist}
                personToEdit={null} 
            />
            
            {}
        </div>
    );
}

export default App;