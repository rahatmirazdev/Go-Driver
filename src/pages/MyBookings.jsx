import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyBookings = () => {
	const { user } = useAuth();
	const [bookings, setBookings] = useState([]);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [showModifyModal, setShowModifyModal] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [newStartDate, setNewStartDate] = useState(new Date());
	const [newEndDate, setNewEndDate] = useState(new Date());

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await axios.get(`/bookings?uid=${user.uid}`);
				setBookings(response.data);
			} catch {
				toast.error("Failed to fetch bookings");
			}
		};

		fetchBookings();
	}, [user.uid]);

	const handleRemoveBooking = async (bookingId) => {
		setShowCancelModal(true);
		setSelectedBooking(bookingId);
	};

	const confirmRemoveBooking = async () => {
		try {
			await axios.delete(`/bookings/${selectedBooking}`);
			setBookings(
				bookings.filter((booking) => booking._id !== selectedBooking)
			);
			toast.success("Booking removed successfully");
		} catch (error) {
			console.error("Error removing booking:", error);
			toast.error("Failed to remove booking");
		}
		setShowCancelModal(false);
		setSelectedBooking(null);
	};

	const handleModifyBooking = (booking) => {
		setSelectedBooking(booking);
		setNewStartDate(new Date(booking.startDate));
		setNewEndDate(new Date(booking.endDate));
		setShowModifyModal(true);
	};

	const confirmModifyBooking = async () => {
		try {
			await axios.patch(`/bookings/${selectedBooking._id}`, {
				startDate: newStartDate,
				endDate: newEndDate,
			});
			setBookings(
				bookings.map((booking) =>
					booking._id === selectedBooking._id
						? {
								...booking,
								startDate: newStartDate,
								endDate: newEndDate,
						  }
						: booking
				)
			);
			toast.success("Booking date modified successfully");
		} catch (error) {
			console.error("Error modifying booking date:", error);
			toast.error("Failed to modify booking date");
		}
		setShowModifyModal(false);
		setSelectedBooking(null);
	};

	if (bookings.length === 0) {
		return (
			<div className="container mx-auto px-4 py-16">
				<h2 className="text-4xl font-bold text-center text-dark-gray mb-12">
					My Bookings
				</h2>
				<div className="text-center">
					<p className="text-lg text-dark-gray mb-4">
						No bookings found.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-16 min-h-screen">
			<h2 className="text-4xl font-bold text-center text-dark-gray mb-12">
				My Bookings
			</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white">
					<thead>
						<tr className="bg-gray-100">
							<th className="py-2 px-4 border-b font-bold">
								Car Image
							</th>
							<th className="py-2 px-4 border-b font-bold">
								Car Model
							</th>
							<th className="py-2 px-4 border-b font-bold">
								Booking Date
							</th>
							<th className="py-2 px-4 border-b font-bold">
								Price Per Day
							</th>
							<th className="py-2 px-4 border-b font-bold">
								Location
							</th>
							<th className="py-2 px-4 border-b font-bold">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map((booking, index) => (
							<tr
								key={booking._id}
								className={`${
									index % 2 === 0 ? "bg-gray-50" : "bg-white"
								} hover:bg-gray-200`}
							>
								<td className="py-2 px-4 border-b">
									<img
										src={booking.photoUrl}
										alt={booking.carModel}
										className="w-20 h-20 object-cover"
									/>
								</td>
								<td className="py-2 px-4 border-b">
									{booking.carModel}
								</td>
								<td className="py-2 px-4 border-b">
									{new Date(
										booking.bookingDate
									).toLocaleDateString()}
								</td>
								<td className="py-2 px-4 border-b">
									${booking.dailyRentalPrice}/day
								</td>
								<td className="py-2 px-4 border-b">
									{booking.location}
								</td>
								<td className="py-2 px-4 border-b">
									<button
										onClick={() =>
											handleModifyBooking(booking)
										}
										className="btn bg-blue-500 text-white hover:bg-blue-700 border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg mr-2"
									>
										<FaCalendarAlt className="inline mr-1" />{" "}
										Modify Date
									</button>
									<button
										onClick={() =>
											handleRemoveBooking(booking._id)
										}
										className="btn bg-red-500 text-white hover:bg-red-700 border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg"
									>
										<FaTrash className="inline mr-1" />{" "}
										Cancel
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{showCancelModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
						<h3 className="text-2xl font-bold mb-4">
							Cancel Booking
						</h3>
						<p>Are you sure you want to cancel this booking?</p>
						<div className="mt-4 flex justify-end">
							<button
								onClick={() => setShowCancelModal(false)}
								className="btn bg-gray-500 text-white hover:bg-gray-700 border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg mr-2"
							>
								No
							</button>
							<button
								onClick={confirmRemoveBooking}
								className="btn bg-red-500 text-white hover:bg-red-700 border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg"
							>
								Yes
							</button>
						</div>
					</div>
				</div>
			)}
			{showModifyModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
						<h3 className="text-2xl font-bold mb-4">
							Modify Booking Date
						</h3>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Start Date
							</label>
							<DatePicker
								selected={newStartDate}
								onChange={(date) => setNewStartDate(date)}
								className="w-full px-3 py-2 border rounded"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								End Date
							</label>
							<DatePicker
								selected={newEndDate}
								onChange={(date) => setNewEndDate(date)}
								className="w-full px-3 py-2 border rounded"
							/>
						</div>
						<div className="mt-4 flex justify-end">
							<button
								onClick={() => setShowModifyModal(false)}
								className="btn bg-gray-500 text-white hover:bg-gray-700 border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg mr-2"
							>
								Cancel
							</button>
							<button
								onClick={confirmModifyBooking}
								className="btn bg-blue-500 text-white hover:bg-blue-700 border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
			<ToastContainer />
		</div>
	);
};

export default MyBookings;
