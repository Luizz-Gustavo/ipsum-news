import { Modal, Button, Alert } from "flowbite-react";
import { useState } from "react";
import { disableCategoryService } from "../../api/services/disableCategoryService";
import DisableCategorySuccess from "../notifications/DisableCategorySuccess";

function DisableCategoryModal({ isOpen, onClose, category }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleDisable = async () => {
        setIsLoading(true);
        setError("");

        try {
            await disableCategoryService(category.id);
            setShowSuccessModal(true);
            onClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal show={isOpen} onClose={onClose}>
                <div className="header-modal">
                    Disable Category
                </div>

                <Modal.Body>
                    <div className="space-y-6">
                        <p>Are you sure you want to disable the category <span className="font-bold">{category?.name}</span>? all their posts will be disabled.</p>
                        {error && (
                            <Alert color="failure">
                                <span className="font-medium">Error!</span> {error}
                            </Alert>
                        )}
                    </div>
                </Modal.Body>

                <div className="flex justify-end gap-2 p-4">
                    <Button
                        className="button-yellow"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="gray"
                        onClick={handleDisable}
                        disabled={isLoading}
                    >
                        {isLoading ? "Disabling..." : "Yes, disable"}
                    </Button>
                </div>
            </Modal>

            <DisableCategorySuccess isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} category={category}/>
        </>
    );
}

export default DisableCategoryModal;