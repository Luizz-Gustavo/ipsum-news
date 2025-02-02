import { motion, useScroll, useTransform } from "framer-motion";
import "../assets/css/trending-news.css";
import useSWR from 'swr';
import { formatRelativeDate } from "../utils/formatRelativeDate";
import { fetchAllHighlights } from "../api/services/fetchHighlights";
import { Spinner } from "flowbite-react";

function TrendingNews() {
    const { data, error } = useSWR('/highlights', fetchAllHighlights);
    const isLoading = !data && !error;

    const { scrollY } = useScroll();

    const headerY = useTransform(scrollY,
        [0, 100],
        [0, 0]
    );

    const opacity = useTransform(scrollY,
        [0, 50],
        [1, 0.97]
    );

    const trendingPosts = data?.slice(0, 10) || [];

    return (
        <>
            <motion.div
                className="trending-box"
                style={{
                    top: headerY,
                    opacity
                }}
            >
                <div className="trending-title-box flex items-center justify-center">
                    <p className="trending-title font-semibold">Most Viewed</p>
                </div>

                <div>
                    {error ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-lg text-red-600">
                                An error occurred, try again later!
                            </p>
                        </div>
                    ) : isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Spinner className="text-blue-500 text-xl"/>
                        </div>
                    ) : trendingPosts.length === 0 ? (
                        <div className="flex justify-center items-center h-[50vh]">
                            <p className="text-xl text-gray-600">
                                No trending posts available!
                            </p>
                        </div>
                    ) : (
                        <ul className="">
                            {trendingPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    className="post-item-container"
                                >
                                    <a
                                        href={`/${post.category?.slug}/${post.slug}`}
                                        className="block"
                                        target="_blank"
                                    >
                                        <div className="post-item-trending-box">
                                            <li className="post-item-trending flex flex-col p-4 text-black transition-colors duration-300">
                                                <div className="flex items-center mb-2">
                                                    <span className="mr-2 font-bold">{index + 1}.</span>
                                                    <span
                                                        className="text-md font-semibold text-gray-600 hover:text-blue-500 transition-colors duration-300"
                                                    >
                                                        {post.category?.name}
                                                    </span>
                                                </div>
                                                
                                                <div className="trending-post-title-box">
                                                    <h5 className="trending-post-title text-lg italic font-medium transition-colors duration-300 mb-2">
                                                        {post.title}
                                                    </h5>
                                                </div>

                                                <div className="flex items-center">
                                                    <span className="text-sm text-gray-600">
                                                        {formatRelativeDate(post.createdAt)}
                                                    </span>
                                                </div>
                                            </li>
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </ul>
                    )}
                </div>
            </motion.div>
        </>
    );
}

export default TrendingNews;