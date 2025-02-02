import { Modal, ModalFooter, Button } from "flowbite-react";
import success from "../../assets/img/Group 47.svg";

function DisabledPostSuccess({ isOpen, onClose, title }) {
    return (
        <>
    <Modal show={isOpen} onClose={onClose} size="lg" popup>
        <div className="header-modal">
            Success!
        </div>

        <Modal.Body className="flex flex-col items-center justify-center mt-5">
            <img src={success} alt="success" />
            <p className="mt-5 text-md text-center">The post <span className="font-bold">{title}</span> was disabled successfully!</p>
        </Modal.Body>
        

        <ModalFooter className="flex justify-end">
            <Button color="success" onClick={onClose}>Close</Button>
        </ModalFooter>
        
    </Modal>
        </>
    );
}

export default DisabledPostSuccess;