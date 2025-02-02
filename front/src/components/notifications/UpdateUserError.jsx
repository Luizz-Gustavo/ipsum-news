import { Modal, Button } from "flowbite-react";
import error from "../../assets/img/error.svg";

function UpdateUserError({ isOpen, onClose, title }) {
    return (
        <>
            <Modal show={isOpen} onClose={onClose} size="lg" popup>
                <div className="header-modal">
                    Error!
                </div>

                <Modal.Body className="flex flex-col items-center justify-center mt-5">
                    <img src={error} alt="error" />
                    <p className="mt-5 text-md text-center">An error occurred while updating the user <span className="font-bold">{title}</span>.</p>
                </Modal.Body>

                <Modal.Footer className="flex justify-end">
                    <Button color="failure" onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateUserError;