import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../providers/AuthProvider";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useAuth();
	const [car, setCar] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [reviewText, setReviewText] = useState("");
	const [rating, setRating] = useState(0);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	useEffect(() => {
		const fetchCar = async () => {
			try {
				const response = await axios.get(`/cars/${id}`);
				setCar(response.data);
			} catch (error) {
				console.error("Error fetching car details:", error);
			}
		};

		fetchCar();
	}, [id]);

	const handleBookNow = () => {
		if (!user) {
			toast.error("Please log in first to book a car.");
			return;
		}
		setShowModal(true);
	};

	const handleConfirmBooking = async () => {
		const booking = {
			carId: car._id,
			carModel: car.carModel,
			dailyRentalPrice: car.dailyRentalPrice,
			location: car.location,
			features: car.features,
			photoUrl: car.photoUrl,
			user: {
				uid: user.uid,
				email: user.email,
			},
			bookingDate: new Date(),
			startDate: startDate,
			endDate: endDate,
		};

		try {
			await axios.post("/book-car", booking);
			setShowModal(false);
			navigate("/my-bookings");
		} catch (error) {
			console.error("Error booking car:", error);
		}
	};

	const handleAddReview = async () => {
		if (!user) {
			toast.error("Please log in first to add a review.");
			return;
		}

		const review = {
			name: user.displayName,
			profileImage: user.photoURL,
			rating,
			text: reviewText,
		};

		try {
			await axios.post(`/cars/${id}/reviews`, review);
			setCar((prevCar) => ({
				...prevCar,
				reviews: [...(prevCar.reviews || []), review],
			}));
			setReviewText("");
			setRating(0);
		} catch (error) {
			console.error("Error adding review:", error);
		}
	};

	if (!car) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto px-4 py-16 pt-28">
			<h2 className="text-4xl font-bold text-center text-dark-gray mb-12">
				{car.carModel}
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="flex justify-center items-center flex-col">
					{car.photoUrl ? (
						<div>
							<img
								src={car.photoUrl}
								alt={car.carModel}
								className="w-full object-cover mb-4"
							/>
						</div>
					) : (
						<div className="w-full h-64 bg-gray-200 mb-4 flex items-center justify-center">
							No Image
						</div>
					)}
				</div>
				<div>
					<p className="text-lg text-soft-green mb-2 font-bold">
						<span className=" text-black">Price: </span>$
						{car.dailyRentalPrice}/day
					</p>
					<p className="text-sm text-gray-800 mb-2">
						{car.availability}
					</p>
					<p className="text-base text-gray-600 mb-2">{car.features}</p>
					<p className="text-base text-gray-600 mb-2">
						{car.description}
					</p>
					<button
						onClick={handleBookNow}
						className={`btn bg-soft-green text-white hover:bg-warm-orange border-none px-4 py-2 text-sm font-semibold shadow-lg rounded-none cursor-pointer${
							car.availability === "Unavailable"
								? "opacity-70"
								: ""
						}`}
						disabled={car.availability === "Unavailable"}
					>
						Book Now
					</button>
				</div>
			</div>
			<div className="mt-8">
				<h3 className="text-2xl font-bold text-dark-gray mb-4">
					Reviews
				</h3>
				{car.reviews && car.reviews.length > 0 ? (
					car.reviews.map((review, index) => (
						<div key={index} className="mb-4">
							<div className="flex items-center mb-2">
								<img
									src={review.profileImage}
									alt={review.name}
									className="w-8 h-8 rounded-full mr-2"
								/>
								<h4 className="text-lg font-semibold text-dark-gray">
									{review.name}
								</h4>
							</div>
							<div className="flex mb-2">
								{Array.from({ length: review.rating }).map(
									(_, i) => (
										<FaStar
											key={i}
											className="text-soft-green"
										/>
									)
								)}
							</div>
							<p className="text-sm text-gray-500">
								{review.text}
							</p>
						</div>
					))
				) : (
					<p className="text-sm text-gray-500">No reviews yet.</p>
				)}
			</div>
			<div className="mt-8">
				<h3 className="text-2xl font-bold text-dark-gray mb-4">
					Add a Review
				</h3>
				<textarea
					value={reviewText}
					onChange={(e) => setReviewText(e.target.value)}
					className="w-full px-3 py-2 border rounded mb-4"
					placeholder="Write your review here..."
				></textarea>
				<div className="flex items-center mb-4">
					<span className="mr-2">Rating:</span>
					{Array.from({ length: 5 }).map((_, i) => (
						<FaStar
							key={i}
							className={`cursor-pointer ${
								i < rating ? "text-soft-green" : "text-gray-400"
							}`}
							onClick={() => setRating(i + 1)}
						/>
					))}
				</div>
				<button
					onClick={handleAddReview}
					className="btn bg-soft-green text-white hover:bg-warm-orange border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg"
				>
					Submit Review
				</button>
			</div>
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
						<h3 className="text-2xl font-bold mb-4">
							Confirm Booking
						</h3>
						<p>Car Model: {car.carModel}</p>
						<p>Price Per Day: ${car.dailyRentalPrice}</p>
						<p>Location: {car.location}</p>
						<p>Features: {car.features}</p>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Start Date
							</label>
							<input
								type="date"
								className="w-full px-3 py-2 border rounded"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								End Date
							</label>
							<input
								type="date"
								className="w-full px-3 py-2 border rounded"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
							/>
						</div>
						<div className="mt-4 flex justify-end">
							<button
								onClick={() => setShowModal(false)}
								className="btn bg-gray-500 text-white hover:bg-gray-700 border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg mr-2"
							>
								Cancel
							</button>
							<button
								onClick={handleConfirmBooking}
								className="btn bg-soft-green text-white hover:bg-warm-orange border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg"
							>
								Confirm Booking
							</button>
						</div>
					</div>
				</div>
			)}
			<ToastContainer />
		</div>
	);
};

export default CarDetails;
