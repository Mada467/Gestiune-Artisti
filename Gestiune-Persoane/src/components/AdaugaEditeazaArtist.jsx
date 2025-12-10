// src/components/AdaugaEditeazaArtist.jsx - ZIUA 2: Editare Activă

import React, { useState, useEffect } from 'react';
import './AdaugaEditeazaArtist.css';

const initialPersonState = {
    nume: '',
    prenume: '',
    cnp: '', 
    dataNasterii: '', 
    seriaCi: '', 
    numarCi: '', 
    dataExpirareCi: '', 
    adresaDomiciliu: '',
    nrTelefon: '', 
    pozaUrl: '',
};

function AdaugaEditeazaArtist({ isVisible, onClose, onSave, personToEdit }) {
    const [persoana, setPersoana] = useState(initialPersonState);
    const [errors, setErrors] = useState({});

    // EFFECT: Încarcă datele persoanei dacă suntem pe modul Editare
    useEffect(() => {
        const personState = personToEdit ? personToEdit : initialPersonState;
        setPersoana(personState);
        setErrors({});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [personToEdit, isVisible]);

    if (!isVisible) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Validare cifre
        if ((name === 'cnp' || name === 'nrTelefon' || name === 'numarCi') && !/^\d*$/.test(value)) {
            return;
        }

        // Validare Seria CI (Uppercase, max 2 chars)
        if (name === 'seriaCi') {
            const upperValue = value.toUpperCase();
            if (!/^[A-Z]*$/.test(upperValue) || upperValue.length > 2) return;
            setPersoana({ ...persoana, [name]: upperValue });
        } else {
            setPersoana({ ...persoana, [name]: value });
        }
        
        setErrors({ ...errors, [name]: '' });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPersoana(prev => ({ ...prev, pozaUrl: reader.result }));
            reader.readAsDataURL(file);
        }
    };
    
    const validate = () => {
        let newErrors = {};
        let isValid = true;
        
        // Validări (Acum cu ghilimele corecte!)
        if (!persoana.nume.trim()) { newErrors.nume = "Numele este obligatoriu."; isValid = false; }
        if (persoana.cnp.length !== 13) { newErrors.cnp = "CNP-ul trebuie să aibă exact 13 cifre."; isValid = false; }
        if (persoana.nrTelefon.length !== 10) { newErrors.nrTelefon = "Telefonul trebuie să aibă exact 10 cifre."; isValid = false; }
        if (persoana.seriaCi.length !== 2) { newErrors.seriaCi = "Seria CI trebuie să aibă 2 litere."; isValid = false; }
        if (persoana.numarCi.length !== 6) { newErrors.numarCi = "Numărul CI trebuie să aibă 6 cifre."; isValid = false; }
        if (!persoana.dataExpirareCi) { newErrors.dataExpirareCi = "Data expirării CI este obligatorie."; isValid = false; }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(persoana);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content futurist-form">
                {/* TITLU DINAMIC: Editează vs Adaugă */}
                <h3>{personToEdit ? "Editează" : "Adaugă"} Persoană</h3>
                
                <form onSubmit={handleSubmit}>
                    
                    {/* INPUTURI */}
                    <label>Nume *</label>
                    <input type="text" name="nume" value={persoana.nume} onChange={handleChange} className={errors.nume ? 'input-error' : ''} />
                    {errors.nume && <p className="error-message">{errors.nume}</p>}
                    
                    <label>Prenume</label>
                    <input type="text" name="prenume" value={persoana.prenume} onChange={handleChange} />

                    <label>CNP (13 cifre) *</label>
                    <input type="text" name="cnp" value={persoana.cnp} onChange={handleChange} maxLength="13" className={errors.cnp ? 'input-error' : ''} />
                    {errors.cnp && <p className="error-message">{errors.cnp}</p>}
                    
                    <label>Data Nașterii</label>
                    <input type="date" name="dataNasterii" value={persoana.dataNasterii} onChange={handleChange} />

                    <label>Adresa Domiciliu</label>
                    <input type="text" name="adresaDomiciliu" value={persoana.adresaDomiciliu} onChange={handleChange} />

                    {/* Grup CI */}
                    <div className="input-ci-group" style={{ display: 'flex', gap: '10px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Seria CI *</label>
                            <input type="text" name="seriaCi" value={persoana.seriaCi} onChange={handleChange} maxLength="2" className={errors.seriaCi ? 'input-error' : ''} />
                            {errors.seriaCi && <p className="error-message">{errors.seriaCi}</p>}
                        </div>
                        <div style={{ flex: 2 }}>
                            <label>Număr CI *</label>
                            <input type="text" name="numarCi" value={persoana.numarCi} onChange={handleChange} maxLength="6" className={errors.numarCi ? 'input-error' : ''} />
                            {errors.numarCi && <p className="error-message">{errors.numarCi}</p>}
                        </div>
                    </div>
                    
                    <label>Data Expirării CI *</label>
                    <input type="date" name="dataExpirareCi" value={persoana.dataExpirareCi} onChange={handleChange} className={errors.dataExpirareCi ? 'input-error' : ''} />
                    {errors.dataExpirareCi && <p className="error-message">{errors.dataExpirareCi}</p>}

                    <label>Număr Telefon (10 cifre) *</label>
                    <input type="text" name="nrTelefon" value={persoana.nrTelefon} onChange={handleChange} maxLength="10" className={errors.nrTelefon ? 'input-error' : ''} />
                    {errors.nrTelefon && <p className="error-message">{errors.nrTelefon}</p>}
                    
                    <label style={{ marginTop: '20px' }} className="input-file-label">Încarcă Poză/Avatar</label>
                    <input type="file" name="poza" accept="image/*" onChange={handleFileChange} className="input-file-style" style={{ marginBottom: '15px' }} />

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-cancel">Anulează</button>
                        <button type="submit" className="btn-save">
                            {/* BUTON DINAMIC: Salvează vs Adaugă */}
                            {personToEdit ? "Salvează Modificările" : "Adaugă Persoana"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdaugaEditeazaArtist;