import { Spinner } from "flowbite-react";
import NavBar from "./Navbar";
import CoinSection from "./CoinSection";
import Footer from "./Footer";

function ExploreLoadingComponent() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="flex-none">
                    <NavBar />
                    <CoinSection />
                </div>
                
                <div className="flex-grow flex justify-center items-center">
                    <Spinner className="text-blue-500 text-xl"/>
                </div>
                
                <div className="flex-none">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default ExploreLoadingComponent;