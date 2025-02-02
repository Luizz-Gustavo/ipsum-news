import { useState } from "react";
import { Modal, Button, Label, TextInput, Select, Spinner } from "flowbite-react";
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Api from "../../api/api";
import CreateUserSuccess from "../notifications/CreateUserSuccess";
import CreateUserError from "../notifications/CreateUserError";

function CreateUserModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        nickname: "",
        email: "",
        password: "",
        confirmPassword: "",
        roleId: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isFormFilled = () => {
        return Object.values(formData).some(value => value !== "");
    };

    const handleClose = () => {
        if (isFormFilled()) {
            const confirmClose = window.confirm("Are you sure you want to close? All form data will be lost.");

            if (confirmClose) {
                setFormData({
                    name: "",
                    lastName: "",
                    nickname: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    roleId: ""
                });
                onClose();
            }
        } else {
            onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords don't match");
            setIsErrorModalOpen(true);
            return;
        }

        if (formData.roleId === "") {
            setErrorMessage("Please select a role");
            setIsErrorModalOpen(true);
            return;
        }

        const { confirmPassword, ...dataToSend } = formData;

        try {
            setIsLoading(true);
            await Api.post('/create-user', dataToSend);
            setIsSuccessModalOpen(true);
        } catch (error) {
            setErrorMessage("An error occurred while creating the user");
            setIsErrorModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: id === "roleId" ? parseInt(value, 10) : value
        }));
    };

    const handleCloseSuccessModal = () => {
        setFormData({
            name: "",
            lastName: "",
            nickname: "",
            email: "",
            password: "",
            confirmPassword: "",
            roleId: ""
        });
        setIsSuccessModalOpen(false);
        onClose();
        window.location.reload();
    };

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
    };

    return (
        <>
            <Modal show={isOpen} onClose={handleClose} size="lg" popup>
                <div className="header-modal">
                    Create User
                </div>

                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                                <div className="w-full">
                                    <Label htmlFor="name" value="Name" />
                                    <TextInput id="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="w-full">
                                    <Label htmlFor="lastName" value="Last Name" />
                                    <TextInput id="lastName" value={formData.lastName} onChange={handleInputChange} required />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="nickname" value="Nickname" />
                                <TextInput id="nickname" value={formData.nickname} onChange={handleInputChange} required minLength={6} maxLength={30} placeholder="Only letters, numbers, dots and underscores" />
                            </div>

                            <div>
                                <Label htmlFor="email" value="Email" />
                                <TextInput id="email" type="email" value={formData.email} onChange={handleInputChange} required />
                            </div>

                            <div>
                                <Label htmlFor="roleId" value="Role" />
                                <Select id="roleId" value={formData.roleId} onChange={handleInputChange} required>
                                    <option>Select a role</option>
                                    <option value="1">Administrator</option>
                                    <option value="2">Writer</option>
                                    <option value="3">Reader</option>
                                </Select>
                            </div>

                            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                                <div className="w-full relative">
                                    <Label htmlFor="password" value="Password" />
                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
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

                                <div className="w-full relative">
                                    <Label htmlFor="confirmPassword" value="Confirm Password" />
                                    <div className="relative">
                                        <TextInput
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
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
                        </div>
                    </Modal.Body>
                    
                    <div className="flex justify-end space-x-2 p-4">
                        <Button color="gray" onClick={handleClose} aria-label="Cancel">Cancel</Button>
                        <Button className="button-yellow" type="submit" disabled={isLoading} aria-label="Create User">
                            {isLoading ? <Spinner className="text-white" size="sm" /> : "Create"}
                        </Button>
                    </div>

                </form>
            </Modal>

            <CreateUserSuccess isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal} name={formData.name} lastName={formData.lastName} />
            <CreateUserError isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} errorMessage={errorMessage} />
        </>
    );
}

export default CreateUserModal;