import banner from "../assets/img/journal.avif";
import { useState } from "react";
import "../assets/css/banner.css";
import "../assets/css/highlights.css";
import { Tooltip } from "flowbite-react";
import { fetchHighlights } from "../api/services/fetchHighlights";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { SiPolestar } from "react-icons/si";
import useSWR from "swr";

function Banner() {
	// fetches highlights using SWR for cache and automatic revalidation
	const { data, error, isLoading } = useSWR('/highlights', fetchHighlights);

	// state to control the selected video and banner image
	const [currentVideo, setCurrentVideo] = useState(null);
	const [showVideo, setShowVideo] = useState(false);

	// function to convert YouTube URL to embedding format
	const updateVideo = (urlVideo) => {
		let embedUrl = urlVideo;

		if (urlVideo.includes('watch?v=')) {
			const videoId = urlVideo.split('watch?v=')[1];
			embedUrl = `https://www.youtube.com/embed/${videoId}`;
		}
		setCurrentVideo(embedUrl);
		setShowVideo(true);
	};

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">
				<div className="bg-gray-800 flex justify-center items-center">
					{showVideo && currentVideo ? (
						<iframe
							className="banner-intro-video"
							src={currentVideo}
							title="Featured Video"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					) : (
						<img 
							src={banner}
							alt="Banner"
							className="banner-intro-video object-cover"
						/>
					)}
				</div>

				<div className="lgpd-section flex justify-center items-center h-full">
					<div className="text-center mb-3 banner_lgpd text-black">
						<p className="text-lgpd text-4xl font-bold">IPSUM NEWS</p>

						<h2 id="description-lgpd" className="text-xl mt-2">
							Welcome to our informative news playground, designed to provide concise and objective information about the most relevant current events. Perfect for those who want to stay updated in just a few minutes, where we strive to combine agility and precision to deliver relevant content in a direct and impactful way for you
						</h2>

						<div className="mt-4">
							<span className="text-sm">
								Below you will find information about Brazilian Law No. 13,709 of August 14,
								2018 (LGPD - Lei Geral de Proteção de Dados), governing the
								security of your personal data.
							</span>
						</div>

						<Tooltip
							content="Click here to learn more about the LGPD!"
							style="light"
							placement="bottom"
						>
							<a
								id="button_lgpd"
								href="https://lgpd-brasil.info/"
								target="_blank"
								rel="noreferrer"
								className="inline-block text-blue-950 font-semibold py-2 px-4 rounded hover:bg-gray-200"
							>
								more
							</a>
						</Tooltip>
					</div>
				</div>
			</div>

			<div className="mt-4">
				<div className="highlight-link">
					<h4 className="highlights flex items-center gap-2">
						<SiPolestar className="highlight-icon text-4xl" />
						<span className="highlight-text">HIGHLIGHTS</span>
					</h4>
				</div>
			</div>

			<div className="swiper-box">
				{error ? (
					<div className="text-2xl text-center text-red-600 py-4">
						An error occurred, try again later!
					</div>
				) : isLoading ? (
					<div className="text-center py-4">
						<div className="animate-pulse">
							<div className="h-64 bg-gray-200 rounded"></div>
						</div>
					</div>
				) : data && data.length > 0 ? (
					<Swiper
						className="swiper-container"
						spaceBetween={50}
						slidesPerView={1}
						pagination={{ clickable: true }}
						autoplay={{
							delay: 3000,
							disableOnInteraction: false,
						}}
						modules={[Pagination, Autoplay]}
						loop={true}
						speed={700}
						breakpoints={{
							768: {
								slidesPerView: 2,
							},
						}}
					>
						{data.map((destaque) => (
							<SwiperSlide className="swiper-item-box" key={destaque.id}>
								<div className="relative group cursor-pointer" onClick={() => updateVideo(destaque.videoLink)}>
									<img
										src={destaque.imageUrl}
										alt={destaque.title}
										className="w-full h-64 object-cover cursor-pointer hover:opacity-80 hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
										<h3 className="text-white text-xl font-semibold text-center px-4">
											{destaque.title}
										</h3>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<div className="text-center text-xl py-4 text-gray-600">
						No highlights available, come back later!
					</div>
				)}
			</div>
		</div>
	);
}

export default Banner;