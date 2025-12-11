/* eslint-disable react-hooks/static-components */
// src/App.jsx - OPTIMIZAT & UȘOR DE ÎNȚELES

import React, { useState, useEffect } from 'react';
import './App.css'; 
import ListaArtisti from './components/ListaArtisti.jsx'; 
import AdaugaEditeazaArtist from './components/AdaugaEditeazaArtist.jsx'; 

const STORAGE_KEY = 'catalogPersoane';

function App() {
    // STĂRI (STATE) - unde ținem datele în memorie
    const [artisti, setArtisti] = useState(() => {
        const dateSalvate = localStorage.getItem(STORAGE_KEY);
        return dateSalvate ? JSON.parse(dateSalvate) : [];
    });
    
    const [artistSelectat, setArtistSelectat] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); 
    const [artistInLucru, setArtistInLucru] = useState(null); 

    // Salvăm automat în localStorage când se modifică lista
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(artisti));
    }, [artisti]);

    // FUNCȚIE: Salvare persoană (ADAUGĂ sau EDITEAZĂ)
    const handleSaveArtist = (persoana) => {
        // Dacă persoana are ID = EDITARE
        if (persoana.id) {
            const listaNoua = artisti.map(artist => {
                if (artist.id === persoana.id) {
                    return persoana; // Înlocuim cu versiunea editată
                }
                return artist; // Păstrăm restul neschimbat
            });
            setArtisti(listaNoua);
            setArtistSelectat(persoana); 
        } 
        // Dacă NU are ID = ADĂUGARE
        else {
            const persoanaNoua = { 
                ...persoana, 
                id: Date.now() // Generăm un ID unic
            }; 
            setArtisti([...artisti, persoanaNoua]); 
            setArtistSelectat(persoanaNoua); 
        }
        setIsModalOpen(false); 
    };

    // FUNCȚIE: Ștergere persoană
    const confirmDelete = () => {
        if (artistSelectat) {
            // Păstrăm doar persoanele care NU au ID-ul celui selectat
            const listaNoua = artisti.filter(artist => artist.id !== artistSelectat.id);
            setArtisti(listaNoua);
            setArtistSelectat(null); 
        }
        setIsConfirmOpen(false);
    };

    // FUNCȚIE: Copiere date în clipboard
    const handleCopyData = (persoana) => {
        if (!persoana) return;
        
        const text = `Nume: ${persoana.nume} ${persoana.prenume}\nCNP: ${persoana.cnp}\nCI: ${persoana.seriaCi} ${persoana.numarCi}\nTelefon: ${persoana.nrTelefon}`;
        
        navigator.clipboard.writeText(text)
            .then(() => alert(`Datele persoanei ${persoana.nume} au fost copiate!`));
    };

    // COMPONENT: Modal pentru confirmare ștergere
    const ConfirmDeleteModal = () => (
        <div className="modal-overlay">
            <div className="modal-content futurist-form" style={{ textAlign: 'center' }}>
                <h3>Confirmă Ștergerea</h3>
                <p>
                    Sigur vrei să ștergi pe <strong>{artistSelectat?.nume} {artistSelectat?.prenume}</strong>?
                </p>
                <div className="form-actions" style={{ justifyContent: 'center', marginTop: '20px' }}>
                    <button 
                        onClick={confirmDelete} 
                        className="btn-save" 
                        style={{ backgroundColor: '#c00000' }}>
                        DA, ȘTERGE
                    </button>
                    <button onClick={() => setIsConfirmOpen(false)} className="btn-cancel">
                        ANULEAZĂ
                    </button>
                </div>
            </div>
        </div>
    );

    // INTERFAȚĂ (ce se vede pe ecran)
    return (
        <div className="App">
            {/* Header cu titlu și buton adăugare */}
            <header className="header-container">
                <h1>Catalog Persoane</h1>
                <button 
                    onClick={() => { 
                        setArtistInLucru(null); // Resetăm persoana în lucru
                        setIsModalOpen(true); // Deschidem modalul
                    }}
                    className="adauga-nou-btn">
                    ➕ ADAUGĂ NOU
                </button>
            </header>

            {/* Lista cu persoane și detalii */}
            <ListaArtisti 
                artisti={artisti}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                artistSelectat={artistSelectat}
                onSelectArtist={setArtistSelectat}
                onEdit={(persoana) => { 
                    setArtistInLucru(persoana); 
                    setIsModalOpen(true); 
                }}
                onDelete={() => setIsConfirmOpen(true)}
                onCopyData={handleCopyData}
            />

            {/* Modal pentru adăugare/editare */}
            <AdaugaEditeazaArtist 
                isVisible={isModalOpen}
                personToEdit={artistInLucru}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveArtist}
            />

            {/* Modal pentru confirmare ștergere (apare doar când e nevoie) */}
            {isConfirmOpen && artistSelectat && <ConfirmDeleteModal />}
        </div>
    );
}

export default App;