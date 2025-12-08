import './ListaPersoane.css';

function ListaPersoane({ people, onAddClick }) {
  return (
    <div className="main-view">
      <div className="view-header">
        <h2>Artiști / Persoane</h2>
        <button onClick={onAddClick} className="btn-add-hero">+ Adaugă Nou</button>
      </div>

      <div className="cards-grid">
        {people.map((om) => (
          <div key={om.id} className="person-card">
            <div className="card-banner"></div>
            
            <div className="card-info">
              <h3>{om.nume}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPersoane;