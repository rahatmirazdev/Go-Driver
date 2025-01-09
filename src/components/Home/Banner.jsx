import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import image1 from "../../assets/banner/1.jpg";
import image2 from "../../assets/banner/2.jpg";
import image3 from "../../assets/banner/3.jpg";

const images = [image1, image2, image3];

const Banner = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex(
				(prevIndex) => (prevIndex + 1) % images.length
			);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className="relative w-full min-h-[80vh] bg-cover bg-center mt-[76px] flex items-center justify-center"
			style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
		>
			<div className="w-auto text-center">
				<h1 className="text-white text-5xl md:text-7xl font-bold mb-4 shadow-lg">
					Drive Your Dreams Today!
				</h1>

				<NavLink
					to="/available-cars"
					className="btn bg-soft-green text-white hover:bg-warm-orange border-none px-6 py-3 text-lg font-semibold rounded-none shadow-lg"
				>
					View Available Cars
				</NavLink>
			</div>
		</div>
	);
};

export default Banner;
