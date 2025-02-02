import { Spinner } from "flowbite-react";

function EmailStep({ email, setEmail, isLoadingSendCode, onSubmit }) {
    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isLoadingSendCode}
                className="w-full bg-[#FFFF00] text-black rounded-md py-2 px-4 transition-all duration-200 hover:bg-[#E3A008] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            >
                {isLoadingSendCode ? (
                    <Spinner size="md" className="mr-2 text-white" />
                ) : (
                    'Send Verification Code'
                )}
            </button>
        </form>
    );
}

export default EmailStep; 