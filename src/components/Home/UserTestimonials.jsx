import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";

const UserTestimonials = () => {
	const [testimonials, setTestimonials] = useState([]);

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await axios.get("/testimonials");
				setTestimonials(response.data);
			} catch (error) {
				console.error("Error fetching testimonials:", error);
			}
		};

		fetchTestimonials();
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: true,
	};

	return (
		<div className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<h2 className="text-4xl font-bold text-center text-dark-gray mb-12">
					User Testimonials
				</h2>
				<Slider {...settings}>
					{testimonials.map((testimonial, index) => (
						<div key={index} className="mx-auto p-6 max-w-96 ">
							<img
								src={testimonial.profileImage}
								alt={testimonial.name}
								className="w-24 h-24 rounded-full mb-4"
							/>
							<h3 className="text-2xl font-semibold text-dark-gray mb-2">
								{testimonial.name}
							</h3>
							<div className="flex mb-2">
								{Array.from({ length: testimonial.rating }).map(
									(_, i) => (
										<FaStar
											key={i}
											className="text-soft-green"
										/>
									)
								)}
							</div>
							<p className="text-dark-gray">
								{testimonial.review}
							</p>
							<p className="text-sm text-gray-500 mt-2">
								Car Model: {testimonial.carModel}
							</p>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
};

export default UserTestimonials;
