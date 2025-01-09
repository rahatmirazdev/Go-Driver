import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AvailableCars = () => {
	const [cars, setCars] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [view, setView] = useState("grid");
	const [sortOption, setSortOption] = useState("dateAddedDesc");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await axios.get("/available-cars");
				setCars(response.data);
			} catch (error) {
				console.error("Error fetching available cars:", error);
			}
		};

		fetchCars();
	}, []);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const filteredCars = cars.filter(
		(car) =>
			car.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
			car.features.toLowerCase().includes(searchTerm.toLowerCase()) ||
			car.location.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const sortedCars = [...filteredCars].sort((a, b) => {
		if (sortOption === "dateAddedDesc") {
			return new Date(b.dateAdded) - new Date(a.dateAdded);
		} else if (sortOption === "dateAddedAsc") {
			return new Date(a.dateAdded) - new Date(b.dateAdded);
		} else if (sortOption === "priceAsc") {
			return a.dailyRentalPrice - b.dailyRentalPrice;
		} else if (sortOption === "priceDesc") {
			return b.dailyRentalPrice - a.dailyRentalPrice;
		}
		return 0;
	});

	return (
		<div className="container mx-auto px-4 py-16 pt-24">
  <h2 className="text-4xl font-bold text-center text-black mb-12">
    Available Cars
  </h2>
  <div className="mb-4 flex justify-between items-center flex-wrap">
    <input
      type="text"
      placeholder="Search by model, features, or location"
      value={searchTerm}
      onChange={handleSearch}
      className="w-full px-3 py-2 border rounded"
    />
  </div>
  <div className="flex justify-between items-center my-4 flex-wrap">
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="px-3 py-2 border rounded"
    >
      <option value="dateAddedDesc">Date Added (Newest First)</option>
      <option value="dateAddedAsc">Date Added (Oldest First)</option>
      <option value="priceAsc">Price (Lowest First)</option>
      <option value="priceDesc">Price (Highest First)</option>
    </select>
    <button
      onClick={() => setView(view === "grid" ? "list" : "grid")}
      className="px-3 py-2 rounded-none text-white"
    >
      {view === "grid" ? "List View" : "Grid View"}
    </button>
  </div>
  <div
    className={
      view === "grid"
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        : "list"
    }
  >
    {sortedCars.map((car) => (
      <div key={car._id} className="max-w-sm bg-white border border-gray-200 rounded-none shadow flex flex-col justify-between">
        <a href="#">
          <div className="h-48 overflow-hidden flex justify-center items-center">
            {car.photoUrl ? (
              <img
                src={car.photoUrl}
                alt={car.carModel}
                className="w-full object-cover mb-4 rounded-t-lg"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 mb-4 flex items-center justify-center rounded-t-lg">
                No Image
              </div>
            )}
          </div>
        </a>
        <div className="p-5 flex flex-col justify-between flex-grow">
          <a href="#">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              {car.carModel}
            </h3>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">
            <span className="font-bold">Price: </span> ${car.dailyRentalPrice}/day
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">
            <span className="font-bold">From: </span> {car.location}
          </p>
          <button
            onClick={() => navigate(`/car-details/${car._id}`)}
            className="px-3 py-2 text-sm font-medium text-center text-white bg-[#4caf50] rounded-none hover:bg-[#2563eb] transition duration-150 ease-in-out"
          >
            Book Now
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
	);
};

export default AvailableCars;
