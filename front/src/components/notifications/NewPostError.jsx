import { Modal, ModalBody, ModalFooter, Button } from "flowbite-react";
import error from "../../assets/img/error.svg";

const NewPostError = ({ show, onClose, message }) => (
    <Modal show={show} onClose={onClose}>
        <div className="header-modal">
            Error!
        </div>
        <ModalBody>
            <div className="flex justify-center space-x-3 mt-5">
                <img src={error} alt="erro" className="w-9" />
                <p className="text-md flex items-center">{message}</p>
            </div>
        </ModalBody>
        <ModalFooter className="flex justify-end">
            <Button color="failure" onClick={onClose}>Close</Button>
        </ModalFooter>
    </Modal>
);

export default NewPostError;