import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import VerifyPasswordModal from "./modals/VerifyPasswordModal";
import { Alert } from "flowbite-react";
import { changePasswordService } from "../api/services/changePasswordService";

function ProfileCard({ profileData, user, nickname }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordVerified, setIsPasswordVerified] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleEdit = () => {
        setEditedData(profileData);
        setIsEditing(true);
        setPassword('');
        setConfirmPassword('');
        setCurrentPassword('');
        setIsPasswordVerified(false);
    };

    const handleSave = async () => {
        try {
            setPasswordError('');
            setSuccessMessage('');

            if (!currentPassword) {
                setPasswordError('Please verify your current password first');
                return;
            }

            if (password && password !== confirmPassword) {
                setPasswordError("The passwords don't match!");
                return;
            }

            if (password) {
                await changePasswordService(user.id, currentPassword, password);
                setSuccessMessage('Password changed successfully!');
            }

            // Reset states after successful save
            setIsEditing(false);
            setPassword('');
            setConfirmPassword('');
            setCurrentPassword('');
            setIsPasswordVerified(false);

        } catch (error) {
            setPasswordError(error.toString());
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(null);
        setPassword('');
        setConfirmPassword('');
        setCurrentPassword('');
        setPasswordError('');
        setIsPasswordVerified(false);
    };

    const handleChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value
        });
    };

    const verifyCurrentPassword = (verifiedPassword) => {
        setCurrentPassword(verifiedPassword);
        setIsPasswordVerified(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
            <VerifyPasswordModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                verifyCurrentPassword={verifyCurrentPassword}
                userId={user?.id}
            />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden"
            >
                {/* toDo: implement profile pic */}
                <div className="bg-yellow-400 p-6">
                    <div className="w-40 h-40 mx-auto bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <span className="text-5xl font-bold text-yellow-400">
                            {/* temporaly initials name and last name */}
                            {profileData.name[0]}{profileData.lastName[0]}
                        </span>
                    </div>
                </div>

                <div className="p-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">{profileData.nickname}</h1>
                        {user?.nickname === nickname && !isEditing && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleEdit}
                                className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md"
                            >
                                +
                            </motion.button>
                        )}
                    </div>
                    {profileData && (
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <AnimatePresence mode="wait">
                                    {isEditing ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex gap-2"
                                        >
                                            <input
                                                placeholder="Name"
                                                type="text"
                                                name="name"
                                                value={editedData.name}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5"
                                            />
                                            <input
                                                placeholder="Last Name"
                                                type="text"
                                                name="lastName"
                                                value={editedData.lastName}
                                                onChange={handleChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5"
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-gray-700 text-lg"
                                        >
                                            {profileData.name} {profileData.lastName}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="flex items-center space-x-4">
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <AnimatePresence mode="wait">
                                    {isEditing ? (
                                        <motion.input
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            placeholder="Email"
                                            type="email"
                                            name="email"
                                            value={editedData.email}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                                        />
                                    ) : (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-gray-700 text-lg"
                                        >
                                            {profileData.email}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="flex items-center space-x-4">
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-gray-700 text-lg"
                                >
                                    {profileData.role}
                                </motion.p>
                            </div>

                            <AnimatePresence>
                                {isEditing && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <div className="relative flex-1">
                                                <input
                                                    type={isPasswordVerified ? "text" : "password"}
                                                    value={currentPassword || "************"}
                                                    readOnly
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                                                    onClick={() => !isPasswordVerified && setIsModalOpen(true)}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                                    onClick={() => !isPasswordVerified && setIsModalOpen(true)}
                                                >
                                                    {isPasswordVerified ? "Verified" : "Verify"}
                                                </button>
                                            </div>
                                        </div>

                                        {isPasswordVerified && (
                                            <>
                                                <div className="flex items-center space-x-4 mt-4">
                                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                    <div className="relative flex-1">
                                                        <input
                                                            type={showNewPassword ? "text" : "password"}
                                                            placeholder="New Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                                        >
                                                            {showNewPassword ? <FaEyeSlash className="text-gray-400 w-5 h-5" /> : <FaEye className="text-gray-400 w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4 mt-4">
                                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                    <div className="relative flex-1">
                                                        <input
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            placeholder="Confirm New Password"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        >
                                                            {showConfirmPassword ? <FaEyeSlash className="text-gray-400 w-5 h-5" /> : <FaEye className="text-gray-400 w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {passwordError && (
                                            <Alert color="failure" className="mt-4">
                                                <p className="text-red-500">{passwordError}</p>
                                            </Alert>
                                        )}

                                        <div className="flex justify-end space-x-4 mt-6">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleCancel}
                                                className="bg-gray-100 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                                            >
                                                Cancel
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleSave}
                                                className="button-yellow px-4 py-2 rounded-md"
                                            >
                                                Save Changes
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </motion.div>
            {successMessage && (
                <Alert color="success" className="mt-4">
                    <p>{successMessage}</p>
                </Alert>
            )}
        </div>
    );
}

export default ProfileCard;