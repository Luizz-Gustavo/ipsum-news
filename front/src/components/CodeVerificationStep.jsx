import { Spinner } from "flowbite-react";

function CodeVerificationStep({ code, inputRefs, isLoadingVerifyCode, handleCodeChange, handleKeyDown }) {
    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center mb-4">
                Enter the 4-digit code sent to your email
            </p>
            <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                    <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl border-2 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                        required
                        disabled={isLoadingVerifyCode}
                    />
                ))}
            </div>
            {isLoadingVerifyCode && (
                <div className="flex justify-center">
                    <Spinner size="md" className="text-white" />
                </div>
            )}
        </div>
    );
}

export default CodeVerificationStep; 