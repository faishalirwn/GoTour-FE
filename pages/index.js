import { Icon } from '@iconify/react';
import { Button } from '@mantine/core';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardHome from '../components/elements/cardHome';
import Layout from '../components/layout';

export default function Home() {
	const [focusedItem, setFocusedItem] = useState(0);
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get(`${process.env.BE_API_URL}/place?sort_by=rating`)
			.then((response) => {
				const places = response.data.data.data;
				setData(places.slice(0, 3));
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Layout navbarStyle="dark">
			{data.length !== 0 && (
				<>
					<div className="absolute top-0 -z-10 bg-black/70 min-w-full min-h-screen"></div>
					<div
						className="absolute top-0 -z-20 min-w-full min-h-screen bg-cover transition-all duration-300"
						style={{ backgroundImage: `url(${data[focusedItem].img_urls[0]})` }}
					></div>
					<main className="flex flex-col-reverse lg:flex-row justify-between items-center self-center lg:py-28 px-10 lg:px-20 xl:px-36 text-white">
						<div className="w-full md:w-3/4 lg:w-2/4 md:mr-10 mt-6 lg:mt-0">
							<h1 className="font-bold text-4xl md:text-6xl mb-3 truncate">
								{data[focusedItem].name}
							</h1>
							<p className="font-thin text-sm line-clamp-2 sm:line-clamp-5">
								{data[focusedItem].description}
							</p>
							<Link href="/explore" passHref>
								<Button
									className="my-5"
									type="submit"
									size="lg"
									variant="filled"
									rightIcon={<Icon icon="eva:arrow-right-fill" />}
								>
									Explore
								</Button>
								{/* <a className="bg-teal-800 flex items-center justify-between py-2 px-4 mt-5 w-28 rounded shadow text-sm">
									<span>Explore</span>
									<Icon icon="eva:arrow-right-fill" />
								</a> */}
							</Link>
						</div>
						<Swiper
							centeredSlides={true}
							slidesPerView={2}
							spaceBetween={10}
							grabCursor={true}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
							onSlideChange={(swiper) => setFocusedItem(swiper.activeIndex)}
							modules={[Autoplay, Pagination]}
							className="w-full sm:w-2/4"
						>
							{data.map((item, i) => (
								<SwiperSlide key={i} className="self-center">
									<CardHome
										id={item.id}
										name={item.name}
										rating={item.rating}
										img_urls={item.img_urls[0]}
										focused={i === focusedItem}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</main>
				</>
			)}
		</Layout>
	);
}
