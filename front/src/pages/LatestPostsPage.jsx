import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import LatestPosts from '../components/LatestPosts';
import TrendingNews from '../components/TrendingNews';
import ToTheTop from "../components/ToTheTop";
import CoinSection from '../components/CoinSection';

function LatestPostsPage() {
    return (
        <>
            <NavBar />
            <CoinSection />

            <div>
                <main className="flex flex-row">
                    <div className="w-1/3 hidden lg:block">
                        <Categories />
                    </div>

                    <div className="w-full lg:w-2/3">
                        <LatestPosts />
                    </div>
                    <div className="w-1/3 hidden md:block">
                        <TrendingNews />
                    </div>
                </main>
            </div>
            <Footer />
            <ToTheTop />
        </>
    )
}

export default LatestPostsPage;