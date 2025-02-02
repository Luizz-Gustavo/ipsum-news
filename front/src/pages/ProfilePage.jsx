import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CoinSection from "../components/CoinSection";
import { useParams } from "react-router-dom";
import { fetchUserbyNickName } from "../api/services/fetchUserbyNickName";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import ProfileCard from "../components/ProfileCard";
import useSWR from "swr";

function ProfilePage() {
    const { nickname } = useParams();
    const { user } = useAuth();
    
    const { data: profileData, error, isLoading } = useSWR(
        nickname,
        fetchUserbyNickName
    );
    
    if (isLoading) {
        return (
            <>
                <Navbar />                
                <div className="flex flex-col items-center justify-center w-full h-screen">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg animate-pulse"
                    >
                        <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full"></div>
                        <div className="w-3/4 h-4 mx-auto mt-4 bg-gray-200 rounded"></div>
                        <div className="space-y-3 mt-4">
                            <div className="w-full h-4 bg-gray-200 rounded"></div>
                            <div className="w-full h-4 bg-gray-200 rounded"></div>
                            <div className="w-full h-4 bg-gray-200 rounded"></div>
                        </div>
                    </motion.div>
                </div>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="flex flex-col items-center justify-center h-screen">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
                    >
                        <p className="text-red-500 text-center">Failed to load profile</p>
                    </motion.div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <CoinSection />
            <ProfileCard profileData={profileData} user={user} nickname={nickname} />
            <Footer />
        </>
    );
}

export default ProfilePage;