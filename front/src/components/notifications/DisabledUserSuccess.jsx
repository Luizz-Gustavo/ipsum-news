import { Modal, Button } from "flowbite-react";
import success from "../../assets/img/Group 47.svg";

const DisabledUserSuccess = ({ show, onClose, user }) => (
    <Modal show={show} onClose={onClose}>
        <div className="header-modal">
            Sucesso!
        </div>

        <Modal.Body className="flex flex-col items-center justify-center mt-5">
            <img src={success} alt="sucesso" className="" />
            <p className="mt-5 text-md">
                User <span className="font-bold">{user.nickname}</span> disabled successfully!
            </p>
        </Modal.Body>
        
        <Modal.Footer className="flex justify-end">
            <Button color="success" onClick={onClose}>OK</Button>
        </Modal.Footer>
    </Modal>
);

export default DisabledUserSuccess;