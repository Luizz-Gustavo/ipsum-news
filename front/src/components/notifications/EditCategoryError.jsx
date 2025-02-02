import { Modal, Button } from "flowbite-react";
import error from "../../assets/img/error.svg";

function EditCategoryError({ isOpen, onClose, errorMessage }) {
    return (
        <Modal show={isOpen} onClose={onClose} size="lg" popup>
            <div className="header-modal">
                Error!
            </div>

            <Modal.Body className="flex flex-col items-center justify-center mt-5">
                <img src={error} alt="error" />
                <p className="mt-5 text-md text-center">
                    {errorMessage || "An error occurred while editing the category."}
                </p>
            </Modal.Body>

            <Modal.Footer className="flex justify-end">
                <Button color="failure" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditCategoryError;