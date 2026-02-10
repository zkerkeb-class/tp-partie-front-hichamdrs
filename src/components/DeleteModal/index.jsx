import './DeleteModal.css';

const DeleteModal = ({ show, onClose, onConfirm, pokemonName }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>⚠️ Confirmation de suppression</h2>
                <p>
                    Êtes-vous sûr de vouloir supprimer <strong>{pokemonName}</strong> ?
                </p>
                <p className="warning-text">
                    Cette action est irréversible.
                </p>
                <div className="modal-actions">
                    <button onClick={onClose} className="btn btn-cancel">
                        Annuler
                    </button>
                    <button onClick={onConfirm} className="btn btn-confirm-delete">
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
