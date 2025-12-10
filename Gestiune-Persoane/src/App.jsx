/* eslint-disable react-hooks/static-components */
// src/App.jsx - ZIUA 2: UPDATE, DELETE & SEARCH

import React, { useState } from 'react';
import './App.css'; 
import ListaArtisti from './components/ListaArtisti.jsx'; 
import AdaugaEditeazaArtist from './components/AdaugaEditeazaArtist.jsx'; 

const INITIAL_PEOPLE = [];

function App() {
    // --- 1. STĂRILE APLICAȚIEI (Reintroducem stările necesare) ---
    const [artisti, setArtisti] = useState(INITIAL_PEOPLE);
    const [artistSelectat, setArtistSelectat] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(''); 
    
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); // Reintrodus
    const [artistInLucru, setArtistInLucru] = useState(null); // Reintrodus pentru editare

    // --- 2. LOGICA CRUD ---

    /**
     * Gestionează salvarea (adăugarea SAU editarea) unei persoane.
     */
    const handleSaveArtist = (artistSalvat) => {
        // Logica de UPDATE este ACUM ACTIVĂ (verificăm id-ul intern)
        if (artistSalvat.id) {
            // * UPDATE *
            // Căutăm persoana existentă după ID și o înlocuim cu noile date
            const listaActualizata = artisti.map(a => a.id === artistSalvat.id ? artistSalvat : a);
            setArtisti(listaActualizata);
            
            // Actualizăm și selecția pentru a vedea modificările imediat în dreapta
            setArtistSelectat(artistSalvat); 
        } else {
            // * CREATE * (Logica din Ziua 1)
            const newArtist = { ...artistSalvat, id: Date.now() }; 
            setArtisti(prevArtisti => [...prevArtisti, newArtist]); 
            setArtistSelectat(newArtist); 
        }
        
        // Închidem modalul indiferent de acțiune
        setIsModalOpen(false); 
    };

    /** Activează modalul de confirmare ștergere. */
    const handleDelete = () => {
        setIsConfirmOpen(true);
    };

    /** Finalizează ștergerea (după confirmare). */
    const confirmDelete = () => {
        if (artistSelectat) {
            // Filtrăm lista pentru a exclude persoana selectată
            setArtisti(artisti.filter(a => a.id !== artistSelectat.id));
            setArtistSelectat(null); 
        }
        setIsConfirmOpen(false);
    };

    /** Activează modalul de editare și încarcă datele persoanei selectate. */
    const handleEdit = (persoana) => { 
        // Important: Setăm starea 'artistInLucru' cu datele persoanei pe care vrem s-o edităm
        setArtistInLucru(persoana); 
        setIsModalOpen(true); 
    };

    /** Funcție placeholder pentru Ziua 3. */
    const handleCopyData = () => { 
        alert("Funcționalitatea de Copiere va fi implementată în Ziua 3.");
    };


    // Componenta Modal Confirmare (Inline) - ACUM FUNCȚIONALĂ
    // Am uniformizat stilul cu cel al modalului principal
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

    // --- 3. RENDER ---
    return (
        <div className="App">
            <header className="header-container">
                <h1>Catalog Persoane (Ziua 2)</h1>
                <button 
                    onClick={() => { 
                        setArtistInLucru(null); // NULL pentru a forța Adăugarea (golim formularul)
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
                
                // Trimitem funcțiile reale pentru Editare și Ștergere
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCopyData={handleCopyData}
            />

            <AdaugaEditeazaArtist 
                isVisible={isModalOpen}
                personToEdit={artistInLucru} // Trimitem datele (sau null) către formular
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveArtist}
            />

            {isConfirmOpen && artistSelectat && <ConfirmDeleteModal />}
        </div>
    );
}

export default App;