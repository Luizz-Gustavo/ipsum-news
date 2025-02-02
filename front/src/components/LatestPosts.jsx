import { useRef, useCallback } from 'react';
import { fetchLatestPosts } from "../api/services/fetchLatestPosts";
import { formatRelativeDate } from "../utils/formatRelativeDate";
import useSWRInfinite from 'swr/infinite';
import { Spinner } from 'flowbite-react';

function LatestPosts() {
	// generates the key for each page of posts
	const getKey = (pageIndex, previousPageData) => {
		// checks if it has reached the end of posts
		if (previousPageData && !previousPageData.hasMore) {
			return null;
		}

		// returns parameters for the next page (URL, page number, limit per page)
		return [`/latest-posts`, pageIndex + 1, 10];
	};

	// fetches posts with infinite pagination using SWR
	const {
		data,
		error,
		size,
		setSize,
		isLoading: isLoadingInitial,
	} = useSWRInfinite(
		getKey,
		async ([_, page, limit]) => await fetchLatestPosts(page, limit)
	);

	// prepares data for display
	const posts = data ? data.flatMap(page => page.posts) : [];
	const hasMore = data ? data[data.length - 1]?.hasMore : true;
	const isLoadingMore = size > 0 && data && typeof data[size - 1] === "undefined";

	// sets up observer for infinite scroll
	const observer = useRef();

	// function that observes the last post to load more content
	const lastPostElementRef = useCallback(node => {
		if (isLoadingMore) return;

		if (observer.current) {
			observer.current.disconnect();
		}

		observer.current = new IntersectionObserver(entries => {
			const isLastPostVisible = entries[0].isIntersecting;
			if (isLastPostVisible && hasMore) {
				setSize(currentSize => currentSize + 1);
			}
		});

		if (node) {
			observer.current.observe(node);
		}
	}, [isLoadingMore, hasMore]);

	return (
		<>
			<div className="bg-[#f8f8de] rounded-lg mt-2 pl-4 pr-4 mb-3">
				{isLoadingInitial ? (
					<div className="w-full h-[100vh] flex items-center justify-center">
						<Spinner size="xl" className="text-blue-400" />
					</div>
				) : error ? (
					<div className="flex justify-center items-center h-full">
						<p className="text-xl text-red-600">
							An error occurred, try again later!
						</p>
					</div>
				) : posts.length === 0 ? (
					<div className="flex justify-center items-center h-[65vh]">
						<p className="text-xl text-gray-600">
							No posts available, come back later!
						</p>
					</div>
				) : (
					<div className="grid gap-6">
						{posts.map((post, index) => (
							<div
								key={post.id}
								ref={posts.length === index + 1 ? lastPostElementRef : null}
								className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
							>
								<a
									href={`/${post.category?.slug}/${post.slug}`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col md:flex-row"
								>
									<div className="md:w-1/3">
										<img
											src={post.imageUrl}
											alt={post.title}
											className="w-full h-64 md:h-full object-cover"
										/>
									</div>
									<div className="p-6 md:w-2/3">
										<a
											href={`/categorias/${post.category?.slug}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm font-semibold text-black hover:text-blue-500 transition-colors duration-300"
										>
											{post.category?.name}
										</a>
										<h3 className="mt-2 text-xl font-bold text-black transition-colors duration-300">
											{post.title}
										</h3>
										<p className="mt-4 text-sm text-gray-600 italic">
											{formatRelativeDate(post.createdAt)}
										</p>
									</div>
								</a>
							</div>
						))}
					</div>
				)}
			</div>

			{isLoadingMore && (
				<div className="w-full p-4 flex items-center justify-center">
					<Spinner size="xl" className="text-blue-400" />
				</div>
			)}
		</>
	);
}

export default LatestPosts;