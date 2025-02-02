import { Modal, Button, Alert } from "flowbite-react";
import { useState } from "react";
import verifyPasswordService from "../../api/services/verifyPasswordService";

const VerifyPasswordModal = ({ 
    isModalOpen, 
    setIsModalOpen, 
    verifyCurrentPassword,
    userId 
}) => {
    const [modalPassword, setModalPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = async () => {
        try {
            setError('');
            setIsLoading(true);
            
            await verifyPasswordService(userId, modalPassword);
            verifyCurrentPassword(modalPassword);
            setIsModalOpen(false);
            setModalPassword('');
            
        } catch (err) {
            setError(err.toString());
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setModalPassword('');
        setError('');
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal show={isModalOpen} onClose={handleClose} size="sm">
                <div className="header-modal">Verify</div>
                <Modal.Body>
                    <div className="space-y-4">
                        <p>Please enter your current password to proceed with changes!</p>
                        <input
                            type="password"
                            value={modalPassword}
                            onChange={(e) => setModalPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                            placeholder="Current Password"
                        />
                        {error && (
                            <Alert color="failure">
                                <p className="text-red-500 text-sm">{error}</p>
                            </Alert>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer className="flex justify-end">
                    <Button 
                        color="gray" 
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        className="button-yellow"
                        onClick={handleVerify}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Verify'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default VerifyPasswordModal;