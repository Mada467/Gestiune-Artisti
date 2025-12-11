// src/components/ListaArtisti.jsx - FINAL: Cu Logica de Valabilitate CI

import React from 'react';
import './ListaArtisti.css'; 

// --- Logica de Verificare Valabilitate CI ---
function getValabilitateCI(dataExpirareStr) {
    if (!dataExpirareStr) {
        return { status: 'Necunoscut', message: 'Data de expirare lipsește.', class: 'status-gray' };
    }

    const dataExpirare = new Date(dataExpirareStr);
    const azi = new Date();
    azi.setHours(0, 0, 0, 0); 
    dataExpirare.setHours(0, 0, 0, 0);

    const diferentaInTimp = dataExpirare.getTime() - azi.getTime();
    // Transformăm milisecundele în zile
    const zileRamase = Math.ceil(diferentaInTimp / (1000 * 3600 * 24));

    if (zileRamase < 0) {
        return { status: 'Expirat', message: 'ACT EXPIRAT!', class: 'status-red' };
    } else if (zileRamase <= 90) { 
        
        return { status: 'Avertizare', message: `Expiră în ${zileRamase} zile.`, class: 'status-orange' };
    } else {
        return { status: 'Valabil', message: 'Valabil.', class: 'status-green' };
    }
}
// ------------------------------------------

function ListaArtisti({ 
    artisti, searchTerm, setSearchTerm, artistSelectat, 
    onSelectArtist, onEdit, onDelete, onCopyData 
}) {
    // Logica de filtrare (Actualizată pentru Persoane)
    const artistiFiltrati = artisti.filter(person => {
        const term = searchTerm.toLowerCase();
        return (
            person.nume?.toLowerCase().includes(term) ||
            person.prenume?.toLowerCase().includes(term) ||
            person.cnp?.toLowerCase().includes(term)
        );
    });
    
    return (
        <div className="lista-detalii-container">
            {/* 1. Coloana Lista și Search */}
            <div className="lista-coloana">
                <input
                    type="text"
                    placeholder="Caută după nume, prenume sau CNP..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input-futurist"
                />

                <div className="lista-artisti-scroll">
                    {artistiFiltrati.length === 0 ? (
                        <p className="no-results">Nu există persoane adăugate sau nu s-a găsit nimic.</p>
                    ) : (
                        artistiFiltrati.map(a => (
                            <div
                                key={a.id}
                                className={`artist-card ${artistSelectat && artistSelectat.id === a.id ? 'selectat-neon' : ''}`}
                                onClick={() => onSelectArtist(a)}
                            >
                                <div className="card-header">
                                    <span className="nume-scena">{a.nume} {a.prenume}</span>
                                    {/* Badge pentru statusul CI direct în listă */}
                                    {(() => {
                                        const valabilitate = getValabilitateCI(a.dataExpirareCi);
                                        return <span className={`status-tag ${valabilitate.class}`}>{valabilitate.status}</span>;
                                    })()}
                                </div>
                                <p className="nume-real">CNP: {a.cnp}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 2. Coloana Detalii Persoană */}
            <div className="detalii-coloana">
                <h3 className="detalii-titlu">Informații Card</h3>
                {artistSelectat ? (
                    <div className="detalii-card-futurist">
                        
                        {/* Poză Avatar (Opțional) */}
                        {artistSelectat.pozaUrl && (
                             <img src={artistSelectat.pozaUrl} alt="Avatar" className="artist-avatar-detalii" />
                        )}

                        {/* Detalii Persoană */}
                        <p><strong>Nume Complet:</strong> {artistSelectat.nume} {artistSelectat.prenume}</p>
                        <p><strong>CNP:</strong> {artistSelectat.cnp}</p>
                        <p><strong>Data Nașterii:</strong> {artistSelectat.dataNasterii}</p>
                        <p><strong>CI:</strong> {artistSelectat.seriaCi} {artistSelectat.numarCi}</p>
                        <p><strong>Data Expirării CI:</strong> {artistSelectat.dataExpirareCi}</p>
                        <p><strong>Adresă:</strong> {artistSelectat.adresaDomiciliu || 'N/A'}</p>
                        <p><strong>Telefon:</strong> {artistSelectat.nrTelefon}</p>

                        {/* AFISARE VALABILITATE CI */}
                        {(() => {
                            const valabilitate = getValabilitateCI(artistSelectat.dataExpirareCi);
                            return (
                                <p>
                                    <strong>Valabilitate: </strong> 
                                    <span className={`status-text ${valabilitate.class} status-bold`}> 
                                        {valabilitate.message}
                                    </span>
                                </p>
                            );
                        })()}

                        <div className="detalii-actions">
                            <button onClick={() => onEdit(artistSelectat)} className="btn-action btn-edit">Editează</button>
                            <button onClick={() => onCopyData(artistSelectat)} className="btn-action btn-copy">Copiază Date</button>
                            <button onClick={onDelete} className="btn-action btn-delete">Șterge</button>
                        </div>
                    </div>
                ) : (
                    <p className="no-selection">Selectează o persoană din listă pentru a vedea detaliile.</p>
                )}
            </div>
        </div>
    );
}

export default ListaArtisti;