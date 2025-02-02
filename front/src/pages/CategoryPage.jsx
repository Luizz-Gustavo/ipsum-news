import { useParams, Navigate } from 'react-router-dom';
import useSWR from 'swr';
import NavBar from '../components/Navbar';
import NoPostComponent from '../components/NoPostComponent';
import { fetchCategories } from '../api/services/fetchCategories';
import { formatRelativeDate } from '../utils/formatRelativeDate';
import "../assets/css/categories.css";
import Categories from '../components/Categories';
import TrendingNews from '../components/TrendingNews';
import CoinSection from '../components/CoinSection';
import Footer from '../components/Footer';
import ToTheTop from '../components/ToTheTop';

function CategoryPage() {
    const { category: categorySlug } = useParams();
    const { data: categories, error: categoriesError } = useSWR('/categories', fetchCategories);

    if (categoriesError) {
        return <Navigate to="/404" replace />;
    }

    if (!categories) {
        return (
            <>
                <NavBar />
                <div className="flex justify-center items-center min-h-screen">
                    <div className="text-xl md:text-2xl">Loading...</div>
                </div>
            </>
        );
    }

    const currentCategory = categories.find(cat => cat.slug === categorySlug);

    if (!currentCategory) {
        return <Navigate to="/404" replace />;
    }

    if (currentCategory.posts.length === 0) {
        return <NoPostComponent currentCategory={currentCategory} />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <NavBar />
                <CoinSection />
            </header>

            <main className="flex-grow">
                <div className="flex flex-row">
                    <div className="w-1/3 hidden lg:block">
                        <Categories />
                    </div>

                    <div className="w-full lg:w-2/3">
                        <div className="container mt-5 mx-auto px-4">
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-bold">{currentCategory.name}</h1>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {currentCategory.posts.map(post => (
                                    <a
                                        key={post.id}
                                        href={`/${post.category?.slug}/${post.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#f5f5f5] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
                                    >
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4 flex-1">
                                            <h3 className="text-lg font-semibold mb-2 text-black hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs md:text-sm">
                                                {formatRelativeDate(post.createdAt)}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 hidden md:block">
                        <TrendingNews />
                    </div>
                </div>
            </main>
            
            <footer>
                <Footer />
                <ToTheTop />
            </footer>
        </div>
    );
}

export default CategoryPage;