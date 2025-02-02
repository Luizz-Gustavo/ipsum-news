import { Modal, Button } from "flowbite-react";
import success from "../../assets/img/Group 47.svg";

function UpdatePostSuccess({ show, onClose, title, onRedirect }) {
    return (
        <Modal show={show} onClose={onClose}>
            <div className="header-modal">
                <h1 className="text-2xl font-bold">Update successful!</h1>
            </div>
            <Modal.Body className="flex flex-col items-center justify-center mt-5">
                <img src={success} alt="Success" />
                <p className="mt-5 text-md">The post <span className="font-bold">{title}</span> was updated successfully!</p>
            </Modal.Body>
            <Modal.Footer className="flex justify-end space-x-3">
                <Button color="failure" onClick={onClose}>Close</Button>
                <Button color="success" onClick={onRedirect}>Go to the post?</Button>
            </Modal.Footer>
        </Modal>    
    )
}

export default UpdatePostSuccess;