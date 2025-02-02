import { useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { disableUser } from '../../api/services/UserService';
import DisabledUserSuccess from '../notifications/DisabledUserSuccess';
import DisabledUserError from '../notifications/DisabledUserError';

function DisableUserModal({ isOpen, onClose, user }) {
    const [isSuccessOpen, setSuccessOpen] = useState(false);
    const [isErrorOpen, setErrorOpen] = useState(false);

    if (!user) return null;

    const handleDisable = async () => {
        try {
            await disableUser(user.id);
            onClose();
            setSuccessOpen(true);
        } catch (error) {
            console.error('Error disabling user:', error);
            setErrorOpen(true);
        }
    };

    const handleCloseSuccess = () => {
        setSuccessOpen(false);
        window.location.reload();
    };

    const handleCloseError = () => {
        setErrorOpen(false);
    };

    return (
        <>
            <Modal show={isOpen} onClose={onClose} size="lg" popup>
                <div className="header-modal">Disable User</div>

                <Modal.Body className="flex flex-col items-center justify-center mt-5">
                    <p>
                        Are you sure you want to disable the user{" "}
                        <span className="font-bold">{user.nickname}</span>?
                    </p>
                </Modal.Body>

                <Modal.Footer className="flex justify-end">
                    <Button className="button-yellow" onClick={onClose} aria-label="Cancel">
                        Cancel
                    </Button>
                    <Button color="gray" onClick={handleDisable} aria-label="Disable User">
                        Yes, Disable
                    </Button>
                </Modal.Footer>
            </Modal>

            <DisabledUserSuccess
                show={isSuccessOpen}
                onClose={handleCloseSuccess}
                user={user}
            />

            <DisabledUserError
                show={isErrorOpen}
                onClose={handleCloseError}
                user={user}
            />
        </>
    );
}

export default DisableUserModal;