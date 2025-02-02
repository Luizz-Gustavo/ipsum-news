import { Modal, Button } from "flowbite-react";
import success from "../../assets/img/Group 47.svg";

function CreateCategorySuccess({ isOpen, onClose, name }) {
    return (
        <>
            <Modal show={isOpen} onClose={onClose} size="lg" popup>
                <div className="header-modal">
                    Success!
                </div>

                <Modal.Body className="flex flex-col items-center justify-center mt-5">
                    <img src={success} alt="success" />
                    <p className="mt-5 text-md text-center">
                        The category <span className="font-bold">{name}</span> was created successfully!
                    </p>
                </Modal.Body>

                <Modal.Footer className="flex justify-end">
                    <Button color="success" onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </> 
    );
}

export default CreateCategorySuccess;