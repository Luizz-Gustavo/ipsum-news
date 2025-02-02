import { Modal, Button } from 'flowbite-react';
import { useState } from 'react';
import disablePostService from '../../api/services/disablePostService';
import DisabledPostSuccess from '../notifications/DisabledPostSuccess';
import DisabledPostError from '../notifications/DisabledPostError';

function DisablePostModal({ isOpen, onClose, post }) {
    const [isSuccessOpen, setSuccessOpen] = useState(false);
    const [isErrorOpen, setErrorOpen] = useState(false);

    const handleDisable = async () => {
        try {
            await disablePostService(post.id);
            setSuccessOpen(true);
        } catch (error) {
            console.error('Error disabling post:', error);
            setErrorOpen(true);
        }
    };

    const handleCloseSuccess = () => {
        setSuccessOpen(false);
        onClose();
        window.location.reload();
    };

    const handleCloseError = () => {
        setErrorOpen(false);
    };

    return (
        <>
            <Modal show={isOpen} onClose={onClose} size="lg" popup>
                <div className="header-modal">Disable Post</div>
                <Modal.Body className="flex flex-col items-center justify-center mt-5">
                    <p>Are you sure you want to disable the post <span className="font-bold">{post.title}</span>?</p>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button className="button-yellow" onClick={onClose} aria-label="Cancel">Cancel</Button>
                    <Button color="gray" onClick={handleDisable} aria-label="Disable Post">Yes, Disable</Button>
                </Modal.Footer>
            </Modal>

            <DisabledPostSuccess
                isOpen={isSuccessOpen}
                onClose={handleCloseSuccess}
                title={post.title}
            />
            
            <DisabledPostError
                isOpen={isErrorOpen}
                onClose={handleCloseError}
                title={post.title}
            />
        </>
    );
}

export default DisablePostModal;