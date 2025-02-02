import { Modal, Button } from "flowbite-react";
import success from "../../assets/img/Group 47.svg";

function DisableCategorySuccess({ isOpen, onClose, category }) {
    const handleClose = () => {
        onClose();
        window.location.reload();
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="lg" popup>
            <div className="header-modal">
                Success!
            </div>

            <Modal.Body className="flex flex-col items-center justify-center mt-5">
                <img src={success} alt="success" />
                <p className="mt-5 text-md text-center">The category <span className="font-bold">{category?.name}</span> was disabled successfully!</p>
            </Modal.Body>

            <Modal.Footer className="flex justify-end">
                <Button color="success" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DisableCategorySuccess;