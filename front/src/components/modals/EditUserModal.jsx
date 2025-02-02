import { useState, useEffect } from "react";
import { Modal, Button, Label, TextInput, Select, Spinner } from "flowbite-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { updateUser } from "../../api/services/UserService";
import UpdateUserSuccess from "../notifications/UpdateUserSuccess";
import UpdateUserError from "../notifications/UpdateUserError";

function EditUserModal({ isOpen, onClose, user }) {
    const [formData, setFormData] = useState({});
    const [originalData, setOriginalData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                lastName: user.lastName || "",
                nickname: user.nickname || "",
                email: user.email || "",
                roleId: user.role?.id || "",
                status: user.status,
                password: "",
                confirmPassword: ""
            });
            setOriginalData({
                name: user.name || "",
                lastName: user.lastName || "",
                nickname: user.nickname || "",
                email: user.email || "",
                roleId: user.role?.id || "",
                status: user.status,
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "status" ? (value === "true") : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const updatedFields = {};
            Object.keys(formData).forEach((key) => {
                if (key !== 'confirmPassword' && formData[key] !== originalData[key]) {
                    if (key === 'roleId') {
                        updatedFields[key] = Number(formData[key]);
                    } else {
                        updatedFields[key] = formData[key];
                    }
                }
            });
            await updateUser(user.id, updatedFields);
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error("Update error:", error);
            setError(error.message || "Failed to update user");
            setIsErrorModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal show={isOpen} onClose={onClose}>
                <div className="header-modal">Edit {formData.nickname}</div>

                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        {error && (
                            <div className="text-red-500 mb-4 text-sm">
                                {error}
                            </div>
                        )}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name" value="Name" />
                                    <TextInput 
                                        id="name" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="lastName" value="Last Name" />
                                    <TextInput 
                                        id="lastName" 
                                        value={formData.lastName} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="nickname" value="Nickname" />
                                <TextInput 
                                    id="nickname" 
                                    value={formData.nickname} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>

                            <div>
                                <Label htmlFor="email" value="Email" />
                                <TextInput 
                                    id="email" 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={handleInputChange} 
                                    required 
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Label htmlFor="password" value="New Password"/>
                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Insert new password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="relative">
                                    <Label htmlFor="confirmPassword" value="Confirm Password" />
                                    <div className="relative">
                                        <TextInput
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="roleId" value="Role" />
                                    <Select 
                                        id="roleId" 
                                        value={formData.roleId} 
                                        onChange={handleInputChange} 
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="1">Administrator</option>
                                        <option value="2">Writer</option>
                                        <option value="3">Reader</option>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="status" value="Status" />
                                    <Select 
                                        id="status" 
                                        value={formData.status ? "true" : "false"} 
                                        onChange={handleInputChange} 
                                        required
                                    >
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                    <div className="flex justify-end space-x-2 p-4">
                        <Button color="gray" onClick={onClose} aria-label="Cancel">
                            Cancel
                        </Button>
                        <Button className="button-yellow" type="submit" disabled={isLoading} aria-label="Save Changes">
                            {isLoading ? <Spinner className="text-white" size="sm" /> : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </Modal>

            <UpdateUserSuccess
                isOpen={isSuccessModalOpen}
                onClose={() => {
                    setIsSuccessModalOpen(false);
                    onClose();
                    window.location.reload();
                }}
                name={formData.name}
                lastName={formData.lastName}
            />
            <UpdateUserError
                show={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
                error={error}
            />
        </>
    );
}

export default EditUserModal;