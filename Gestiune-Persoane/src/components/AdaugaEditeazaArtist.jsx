/* eslint-disable react-hooks/set-state-in-effect */
// src/components/AdaugaEditeazaArtist.jsx - OPTIMIZAT

import React, { useState, useEffect } from 'react';
import './AdaugaEditeazaArtist.css';

const campuriGoale = {
    nume: '', prenume: '', cnp: '', dataNasterii: '', 
    seriaCi: '', numarCi: '', dataExpirareCi: '',
    adresaDomiciliu: '', nrTelefon: '', pozaUrl: '',
};

function AdaugaEditeazaArtist({ isVisible, onClose, onSave, personToEdit }) {
    const [persoana, setPersoana] = useState(campuriGoale);
    const [errors, setErrors] = useState({});

    // Când se deschide modalul, încarcă datele persoanei (dacă editezi) sau câmpuri goale (dacă adaugi)
    useEffect(() => {
        if (isVisible) {
            setPersoana(personToEdit || campuriGoale);
            setErrors({});
        }
    }, [isVisible, personToEdit]);

    if (!isVisible) return null;

    // Când se schimbă un câmp în formular
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Doar cifre pentru CNP, Telefon, Număr CI
        const esteCampNumeric = name === 'cnp' || name === 'nrTelefon' || name === 'numarCi';
        if (esteCampNumeric && !/^\d*$/.test(value)) return;

        // Doar litere mari pentru Seria CI (max 2)
        if (name === 'seriaCi') {
            const textMare = value.toUpperCase();
            if (!/^[A-Z]*$/.test(textMare) || textMare.length > 2) return;
            setPersoana({ ...persoana, [name]: textMare });
            setErrors({ ...errors, [name]: '' });
            return;
        }

        // Pentru restul câmpurilor
        setPersoana({ ...persoana, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    // Când se încarcă o poză
    const handleFileChange = (e) => {
        const fisier = e.target.files[0];
        if (fisier) {
            const cititor = new FileReader();
            cititor.onloadend = () => {
                setPersoana({ ...persoana, pozaUrl: cititor.result });
            };
            cititor.readAsDataURL(fisier);
        }
    };
    
    // Verifică dacă formularul e completat corect
    const verificaFormular = () => {
        const eroriNoi = {};
        
        if (!persoana.nume.trim()) eroriNoi.nume = "Numele este obligatoriu";
        if (persoana.cnp.length !== 13) eroriNoi.cnp = "CNP-ul trebuie să aibă 13 cifre";
        if (persoana.nrTelefon.length !== 10) eroriNoi.nrTelefon = "Telefonul trebuie să aibă 10 cifre";
        if (persoana.seriaCi.length !== 2) eroriNoi.seriaCi = "Seria CI trebuie să aibă 2 litere";
        if (persoana.numarCi.length !== 6) eroriNoi.numarCi = "Numărul CI trebuie să aibă 6 cifre";
        if (!persoana.dataExpirareCi) eroriNoi.dataExpirareCi = "Data expirării CI este obligatorie";

        setErrors(eroriNoi);
        
        // Dacă nu sunt erori, returnează true
        return Object.keys(eroriNoi).length === 0;
    };

    // Când se apasă "Salvează"
    const handleSubmit = (e) => {
        e.preventDefault();
        if (verificaFormular()) {
            onSave(persoana);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content futurist-form">
                <h3>{personToEdit ? "Editează" : "Adaugă"} Persoană</h3>
                <form onSubmit={handleSubmit}>
                    
                    <label>Nume *</label>
                    <input 
                        type="text" 
                        name="nume" 
                        value={persoana.nume} 
                        onChange={handleChange} 
                        className={errors.nume ? 'input-error' : ''} 
                    />
                    {errors.nume && <p className="error-message">{errors.nume}</p>}
                    
                    <label>Prenume</label>
                    <input type="text" name="prenume" value={persoana.prenume} onChange={handleChange} />

                    <label>CNP (13 cifre) *</label>
                    <input 
                        type="text" 
                        name="cnp" 
                        value={persoana.cnp} 
                        onChange={handleChange} 
                        maxLength="13" 
                        className={errors.cnp ? 'input-error' : ''} 
                    />
                    {errors.cnp && <p className="error-message">{errors.cnp}</p>}
                    
                    <label>Data Nașterii</label>
                    <input type="date" name="dataNasterii" value={persoana.dataNasterii} onChange={handleChange} />

                    <label>Adresa Domiciliu</label>
                    <input type="text" name="adresaDomiciliu" value={persoana.adresaDomiciliu} onChange={handleChange} />

                    <div className="input-ci-group">
                        <div className="ci-seria">
                            <label>Seria CI (2 litere) *</label>
                            <input 
                                type="text" 
                                name="seriaCi" 
                                value={persoana.seriaCi} 
                                onChange={handleChange} 
                                maxLength="2" 
                                className={errors.seriaCi ? 'input-error' : ''} 
                            />
                            {errors.seriaCi && <p className="error-message">{errors.seriaCi}</p>}
                        </div>
                        <div className="ci-numar">
                            <label>Număr CI (6 cifre) *</label>
                            <input 
                                type="text" 
                                name="numarCi" 
                                value={persoana.numarCi} 
                                onChange={handleChange} 
                                maxLength="6" 
                                className={errors.numarCi ? 'input-error' : ''} 
                            />
                            {errors.numarCi && <p className="error-message">{errors.numarCi}</p>}
                        </div>
                    </div>
                    
                    <label>Data Expirării CI *</label>
                    <input 
                        type="date" 
                        name="dataExpirareCi" 
                        value={persoana.dataExpirareCi} 
                        onChange={handleChange} 
                        className={errors.dataExpirareCi ? 'input-error' : ''} 
                    />
                    {errors.dataExpirareCi && <p className="error-message">{errors.dataExpirareCi}</p>}

                    <label>Număr Telefon (10 cifre) *</label>
                    <input 
                        type="text" 
                        name="nrTelefon" 
                        value={persoana.nrTelefon} 
                        onChange={handleChange} 
                        maxLength="10" 
                        className={errors.nrTelefon ? 'input-error' : ''} 
                    />
                    {errors.nrTelefon && <p className="error-message">{errors.nrTelefon}</p>}
                    
                    <label className="input-file-label">Încarcă Poză/Avatar</label>
                    <input type="file" name="poza" accept="image/*" onChange={handleFileChange} className="input-file-style" />

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Anulează</button>
                        <button type="submit" className="btn-save">
                            {personToEdit ? "Salvează Modificările" : "Adaugă Persoana"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdaugaEditeazaArtist;