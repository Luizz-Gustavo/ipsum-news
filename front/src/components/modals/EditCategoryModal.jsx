import { Modal, Button, Label, TextInput, Select } from "flowbite-react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import { enableCategoryService } from "../../api/services/enableCategoryService";
import EditCategorySuccess from "../notifications/EditCategorySuccess";
import EditCategoryError from "../notifications/EditCategoryError";

function EditCategoryModal({ isOpen, onClose, initialData }) {
    const [formData, setFormData] = useState({
        name: "",
        status: false
    });
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                status: initialData.status || false
            });
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.status !== initialData.status) {
                if (formData.status) {
                    await enableCategoryService(initialData.id);
                }
            }

            if (formData.name !== initialData.name) {
                await api.put(`/categories/${initialData.id}`, {
                    name: formData.name
                });
            }

            setIsSuccessModalOpen(true);
            onClose();
        } catch (error) {
            setErrorMessage(error.message);
            setIsErrorModalOpen(true);
        }
    }

    return (
        <>
            <Modal show={isOpen} onClose={onClose} size="sm">
                <div className="header-modal text-sm">
                    Edit Category
                </div>

                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="name" value="Category Name" className="text-sm" />
                                </div>
                                <TextInput
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    sizing="sm"
                                />
                            </div>

                            <div>
                                <div className="mb-1 block">
                                    <Label htmlFor="status" value="Category Status" className="text-sm" />
                                </div>
                                <Select
                                    id="status"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ 
                                        ...formData, 
                                        status: e.target.value === 'true'
                                    })}
                                    sizing="sm"
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </Select>
                            </div>
                        </div>
                    </Modal.Body>

                    <div className="flex justify-end gap-2 p-2">
                        <Button color="gray" size="sm" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className="button-yellow" type="submit" size="sm">
                            Save
                        </Button>
                    </div>
                </form>
            </Modal>

            <EditCategorySuccess 
                isOpen={isSuccessModalOpen} 
                onClose={() => {
                    setIsSuccessModalOpen(false);
                    window.location.reload();
                }}
                category={formData}
            />
            <EditCategoryError 
                isOpen={isErrorModalOpen} 
                onClose={() => setIsErrorModalOpen(false)}
                message={errorMessage}
            />
        </>
    );
}

export default EditCategoryModal;