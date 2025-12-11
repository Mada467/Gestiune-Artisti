// src/components/ConfirmDeleteModal.jsx

import React from 'react';
import './ConfirmDeleteModal.css';

function ConfirmDeleteModal({ artist, onConfirm, onCancel }) {
    if (!artist) return null;

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal-content">
                <h3>CONFIRMARE ȘTERGERE DATE</h3>
                
                <p>Ești pe cale să ștergi definitiv artistul:</p>
                
                <div className="artist-info-box">
                    <strong>{artist.numeScena}</strong>
                    <p>Gen: {artist.genMuzical}</p>
                </div>
                
                <p>Această acțiune nu poate fi anulată.</p>
                <p>Vrei să confirmi ștergerea?</p>

                <div className="confirm-actions">
                    <button onClick={onCancel} className="btn-cancel-retro">
                        Anulează
                    </button>
                    <button onClick={onConfirm} className="btn-delete-confirm-retro">
                        ȘTERGE DEFINITIV
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;