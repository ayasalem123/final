import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EditTreatment from './input';
function Model({ el, setShowEditForm }) {
  return (
    <div
      className="modal show"
      style={{
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton onClick={() => setShowEditForm(false)}>
          <Modal.Title>edit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditTreatment el={el} setShowEditForm={setShowEditForm} />
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Model;
