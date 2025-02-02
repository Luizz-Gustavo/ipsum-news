import NavBar from "./Navbar";
import CoinSection from "./CoinSection";
import Footer from "./Footer";

function ExploreErrorComponent() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="flex-none">
                    <NavBar />
                    <CoinSection />
                </div>
                
                <div className="flex-grow flex justify-center items-center">
                    <div className="text-xl text-red-600 md:text-2xl">An error occurred, try again later!</div>
                </div>
                
                <div className="flex-none">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default ExploreErrorComponent;