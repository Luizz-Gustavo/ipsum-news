import NavBar from "../components/Navbar";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";
import EmailStep from "../components/EmailStep";
import CodeVerificationStep from "../components/CodeVerificationStep";
import NewPasswordStep from "../components/NewPasswordStep";
import sendMailCodeService from "../api/services/sendMailCodeService";
import verifyCodeService from "../api/services/verifyCodeService";
import resetPasswordService from "../api/services/resetPasswordService";

function NewPasswordPage() {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1);
    const [code, setCode] = useState(["", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoadingSendCode, setIsLoadingSendCode] = useState(false);
    const [isLoadingVerifyCode, setIsLoadingVerifyCode] = useState(false);
    const [isLoadingResetPassword, setIsLoadingResetPassword] = useState(false);

    const navigate = useNavigate();
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];

    const handleSendCode = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoadingSendCode(true);

        try {
            await sendMailCodeService(email);
            setSuccess("Insert the code sent to your email!");
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to send the verification code");
        } finally {
            setIsLoadingSendCode(false);
        }
    };

    const handleCodeChange = async (index, value) => {
        if (value.length > 1) value = value[0];

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to next input if there's a value
        if (value && index < 3) {
            inputRefs[index + 1].current.focus();
        }

        // If all digits are filled, verify the code
        if (index === 3 && value) {
            const completeCode = newCode.join('');
            setIsLoadingVerifyCode(true);
            try {
                await verifyCodeService(email, completeCode);
                setSuccess("Insert your new password!");
                setStep(3);
            } catch (err) {
                setError(err.response?.data?.error || "Invalid verification code");
                // Clear code inputs on error
                setCode(["", "", "", ""]);
                inputRefs[0].current.focus();
            } finally {
                setIsLoadingVerifyCode(false);
            }
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setIsLoadingResetPassword(true);
        try {
            await resetPasswordService(email, code.join(''), newPassword);
            setSuccess("Password changed successfully!, redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to change password");
        } finally {
            setIsLoadingResetPassword(false);
        }
    };

    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return (
                    <EmailStep
                        email={email}
                        setEmail={setEmail}
                        isLoadingSendCode={isLoadingSendCode}
                        onSubmit={handleSendCode}
                    />
                );
            case 2:
                return (
                    <CodeVerificationStep
                        code={code}
                        inputRefs={inputRefs}
                        isLoadingVerifyCode={isLoadingVerifyCode}
                        handleCodeChange={handleCodeChange}
                        handleKeyDown={handleKeyDown}
                    />
                );
            case 3:
                return (
                    <NewPasswordStep
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        showNewPassword={showNewPassword}
                        setShowNewPassword={setShowNewPassword}
                        showConfirmPassword={showConfirmPassword}
                        setShowConfirmPassword={setShowConfirmPassword}
                        isLoadingResetPassword={isLoadingResetPassword}
                        onSubmit={handleResetPassword}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>

                    {renderCurrentStep()}

                    {error && (
                        <Alert color="failure" className="mt-4">
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert color="success" className="mt-4">
                            {success}
                        </Alert>
                    )}

                    <div className="text-center mt-4">
                        <Link to="/login" className="text-sm text-blue-600 hover:text-blue-800">
                        I remembered!
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewPasswordPage;