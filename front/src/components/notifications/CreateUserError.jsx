import { Modal, ModalFooter, Button } from "flowbite-react";
import error from "../../assets/img/error.svg";

function CreateUserError({ isOpen, onClose, errorMessage }) {
    return (
        <>
            <Modal show={isOpen} onClose={onClose} size="lg" popup>
                <div className="header-modal">
                    Error!
                </div>

                <Modal.Body className="flex flex-col items-center justify-center mt-5">
                    <img src={error} alt="error" />
                    <p className="mt-5 text-md text-center">{errorMessage}</p>
                </Modal.Body>

                <ModalFooter className="flex justify-end">
                    <Button color="failure" onClick={onClose}>Close</Button>
                </ModalFooter>

            </Modal>
        </>
    );
}

export default CreateUserError;