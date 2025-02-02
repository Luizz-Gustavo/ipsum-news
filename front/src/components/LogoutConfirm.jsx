import { Modal, Button } from "flowbite-react";

function LogoutConfirm({ isOpen, onClose, onConfirm }) {
    return (
        <Modal show={isOpen} onClose={onClose} size="sm" popup>
            <div className="header-modal">
                Logout
            </div>

            <Modal.Body>
                <p className="text-center">Are you sure you want to logout?</p>
            </Modal.Body>

            <div className="flex justify-end gap-2 p-4">
                <Button
                    className="button-yellow"
                    onClick={onClose}
                    size="sm"
                >
                    No, i will stay.
                </Button>
                <Button
                    color="gray"
                    onClick={onConfirm}
                    size="sm"
                >
                    Yes, logout!
                </Button>
            </div>
        </Modal>
    );
}

export default LogoutConfirm;