import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const RecentListings = () => {
  const [recentListings, setRecentListings] = useState([]);

  useEffect(() => {
    const fetchRecentListings = async () => {
      try {
        const response = await axios.get("/recent-listings");
        setRecentListings(response.data);
      } catch (error) {
        console.error("Error fetching recent listings:", error);
      }
    };

    fetchRecentListings();
  }, []);

  return (
    <div className="py-16 bg-light-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-dark-gray mb-12">
          Recent Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recentListings.map((listing, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border border-gray-200 rounded-none shadow flex flex-col justify-between"
            >
              <a href="#">
                <div className="h-48 overflow-hidden flex justify-center items-center">
                  {listing.photoUrl ? (
                    <img
                      src={listing.photoUrl}
                      alt={listing.carModel}
                      className="w-full object-cover mb-4 rounded-none"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 mb-4 flex items-center justify-center rounded-none">
                      No Image
                    </div>
                  )}
                </div>
              </a>
              <div className="p-5 flex flex-col justify-between flex-grow">
                <a href="#">
                  <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                    {listing.carModel}
                  </h3>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">
                  <span className="font-bold">Price: </span> ${listing.dailyRentalPrice}/day
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">
                  <span className="font-bold">From: </span> {listing.location}
                </p>
                <Link
                  to={`/car-details/${listing._id}`}
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-[#4caf50] rounded-none hover:bg-[#ff9800] transition duration-150 ease-in-out"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentListings;