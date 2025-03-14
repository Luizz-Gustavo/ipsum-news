import useSWR from 'swr';
import NavBar from "../components/Navbar";
import { fetchCategories } from '../api/services/fetchCategories';
import { Link } from 'react-router-dom';
import { formatRelativeDate } from '../utils/formatRelativeDate';
import Footer from '../components/Footer';
import "../assets/css/categories.css";
import ToTheTop from '../components/ToTheTop';
import Categories from "../components/Categories";
import CoinSection from "../components/CoinSection";
import TrendingNews from "../components/TrendingNews";
import ExploreErrorComponent from "../components/ExploreErrorComponent";
import ExploreLoadingComponent from "../components/ExploreLoadingComponent";

function ExplorePage() {
    const { data, error, isLoading } = useSWR('/categories', fetchCategories);

    if (error) return <ExploreErrorComponent />;

    if (isLoading) return <ExploreLoadingComponent />;
    
    const hasAnyPosts = data?.some(category => category.posts && category.posts.length > 0);

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
                        {!hasAnyPosts ? (
                            <div className="flex justify-center items-center h-[67vh]">
                                <p className="text-xl text-gray-600">
                                    No posts available, come back later!
                                </p>
                            </div>
                        ) : (
                            data.map((category) => {
                                if (!category.posts || category.posts.length === 0) return null;

                                const displayPosts = category.posts.slice(0, 3);
                                const hasMorePosts = category.posts.length > 3;

                                return (
                                    <div key={category.slug} className="mt-5 text-center mb-8 md:mb-12 container mx-auto">
                                        <div className="flex justify-between items-center mb-4 px-4 md:px-0">
                                            <h2 className="text-xl md:text-2xl font-semibold text-black">
                                                <Link to={`/categories/${category.slug}`} className="hover:text-blue-600 transition-colors">
                                                    {category.name}
                                                </Link>
                                            </h2>
                                            {hasMorePosts && (
                                                <a
                                                    href={`/categories/${category.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    See more
                                                </a>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                            {displayPosts.map(post => (
                                                <a
                                                    key={post.id}
                                                    href={`/${category.slug}/${post.slug}`}
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
                                );
                            })
                        )}
                    </div>
                    <div className="w-1/3 hidden md:block">
                        <TrendingNews />
                    </div>
                </main>
            </div>

            <ToTheTop />
            <Footer />
        </>
    );
}

export default ExplorePage;