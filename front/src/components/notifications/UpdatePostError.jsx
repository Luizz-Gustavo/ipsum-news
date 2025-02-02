import { Modal, Button } from "flowbite-react";
import error from "../../assets/img/error.svg";

function UpdatePostError({ show, onClose, message }) {
    return (
        <>
            <Modal show={show} onClose={onClose}>
                <div className="header-modal px-4 py-2 border-b border-gray-200">
                    <h1 className="text-2xl font-bold">Error!</h1>
                </div>
                <Modal.Body>
                    <div className="flex justify-center space-x-3 mt-5">
                        <img src={error} alt="Erro" className="w-9" />
                        <p className="text-md flex items-center">{message}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button color="failure" onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default UpdatePostError;