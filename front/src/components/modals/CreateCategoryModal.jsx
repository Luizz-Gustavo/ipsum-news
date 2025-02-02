import { useState } from "react";
import { Modal, Button, Label, TextInput, Alert } from "flowbite-react";
import { createCategoryService } from "../../api/services/createCategoryService";
import CreateCategorySuccess from "../notifications/CreateCategorySuccess";

function CreateCategoryModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({ name: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successCategoryName, setSuccessCategoryName] = useState("");

    const resetForm = () => {
        setFormData({ name: "" });
        setError("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError("Category name is required");
            return false;
        }

        if (formData.name.length > 50) {
            setError("Category name must be less than 50 characters");
            return false;
        }

        if (formData.name.length < 3) {
            setError("Category name must be at least 3 characters");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await createCategoryService(formData);
            setSuccessCategoryName(formData.name);
            setShowSuccessModal(true);
            handleClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal show={isOpen} onClose={handleClose} size="sm" popup>
                <div className="header-modal">
                    Create Category
                </div>

                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="name" value="Category Name" />
                                </div>
                                <TextInput
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                {error && (
                                    <Alert color="failure" className="mt-2">
                                        <span className="font-medium">{error}</span>
                                    </Alert>
                                )}
                            </div>
                        </div>
                    </Modal.Body>

                    <div className="flex justify-end gap-2 p-3">
                        <Button color="gray" onClick={handleClose} size="sm">
                            Cancel
                        </Button>
                        <Button className="button-yellow" type="submit" disabled={isLoading} size="sm">
                            {isLoading ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </form>
            </Modal>

            <CreateCategorySuccess
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    window.location.reload();
                }}
                name={successCategoryName}
            />
        </>
    );
}

export default CreateCategoryModal;