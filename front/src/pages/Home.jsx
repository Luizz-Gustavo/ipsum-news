import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Waves from "../components/Waves";
import Banner from "../components/Banner";
import ScrollToTopButton from "../components/ToTheTop";
import CoinSection from "../components/CoinSection.jsx";

function Home() {    
    return (
        <div className="min-h-screen flex flex-col">
            <header className="fixed top-0 left-0 right-0 z-50">
                <NavBar />
                <CoinSection />
            </header>
            
            <main className="flex-grow mt-28">
                <Banner />
            </main>
            
            <footer className="relative">
                <Waves />
                <Footer />
                <ScrollToTopButton />
            </footer>
        </div>
    );
}

export default Home;