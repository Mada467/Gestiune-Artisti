/* eslint-disable react-hooks/static-components */
// src/App.jsx - FINAL: Cu localStorage pentru persistență date

import React, { useState, useEffect } from 'react';
import './App.css'; 
import ListaArtisti from './components/ListaArtisti.jsx'; 
import AdaugaEditeazaArtist from './components/AdaugaEditeazaArtist.jsx'; 

const STORAGE_KEY = 'catalogPersoane';

function App() {
    // 1. STĂRILE APLICAȚIEI - Inițializare din localStorage
    const [artisti, setArtisti] = useState(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : [];
    });
    
    const [artistSelectat, setArtistSelectat] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(''); 
    
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); 
    const [artistInLucru, setArtistInLucru] = useState(null); 

    // 2. SALVARE AUTOMATĂ în localStorage la fiecare modificare
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(artisti));
    }, [artisti]);

    // 3. LOGICA CRUD (UPDATE & CREATE)
    const handleSaveArtist = (artistSalvat) => {
        if (artistSalvat.id) {
            // * UPDATE *
            const listaActualizata = artisti.map(a => a.id === artistSalvat.id ? artistSalvat : a);
            setArtisti(listaActualizata);
            // Actualizăm și selecția pentru a vedea modificările imediat
            setArtistSelectat(artistSalvat); 
        } else {
            // * CREATE (Adăugare) *
            const newArtist = { ...artistSalvat, id: Date.now() }; 
            setArtisti(prevArtisti => [...prevArtisti, newArtist]); 
            setArtistSelectat(newArtist); 
        }
        setIsModalOpen(false); 
    };

    // LOGICA DELETE
    const confirmDelete = () => {
        if (artistSelectat) {
            setArtisti(artisti.filter(a => a.id !== artistSelectat.id));
            setArtistSelectat(null); 
        }
        setIsConfirmOpen(false);
    };

    // LOGICA COPY (Task Final)
    const handleCopyData = (artistToCopy) => {
        if (artistToCopy) {
            const data = `Nume: ${artistToCopy.nume} ${artistToCopy.prenume}\nCNP: ${artistToCopy.cnp}\nCI: ${artistToCopy.seriaCi} ${artistToCopy.numarCi}\nTelefon: ${artistToCopy.nrTelefon}`;
                
            navigator.clipboard.writeText(data)
                .then(() => alert(`Datele persoanei ${artistToCopy.nume} au fost copiate!`));
        }
    };

    // 4. MODAL CONFIRMARE (Simplificat, Inline)
    const ConfirmDeleteModal = () => (
        <div className="modal-overlay">
            <div className="modal-content futurist-form" style={{ textAlign: 'center' }}>
                <h3>Confirmă Ștergerea</h3>
                <p>Sigur vrei să ștergi pe <strong>{artistSelectat?.nume} {artistSelectat?.prenume}</strong>?</p>
                <div className="form-actions" style={{ justifyContent: 'center', marginTop: '20px' }}>
                    <button onClick={confirmDelete} className="btn-save" style={{ backgroundColor: '#ff4d4d' }}>DA, ȘTERGE</button>
                    <button onClick={() => setIsConfirmOpen(false)} className="btn-cancel">ANULEAZĂ</button>
                </div>
            </div>
        </div>
    );

    // 5. INTERFAȚA 
    return (
        <div className="App">
            <header className="header-container">
                <h1>Catalog Persoane</h1>
                <button 
                    onClick={() => { 
                        setArtistInLucru(null); 
                        setIsModalOpen(true); 
                    }}
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
                
                onEdit={(artist) => { setArtistInLucru(artist); setIsModalOpen(true); }}
                onDelete={() => setIsConfirmOpen(true)}
                onCopyData={handleCopyData}
            />

            <AdaugaEditeazaArtist 
                isVisible={isModalOpen}
                personToEdit={artistInLucru}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveArtist}
            />

            {isConfirmOpen && artistSelectat && <ConfirmDeleteModal />}
        </div>
    );
}

export default App;