import { useState, useEffect } from "react";
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentListings.map((listing, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <img
                src={listing.photoUrl}
                alt={listing.carModel}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-dark-gray mb-2">
                  {listing.carModel}
                </h3>
                <p className="text-lg text-soft-green mb-2">{listing.dailyRentalPrice}</p>
                <p
                  className={`text-sm font-semibold mb-2 ${
                    listing.availability === "Available"
                      ? "text-soft-green"
                      : "text-red-500"
                  }`}
                >
                  {listing.availability}
                </p>
                <p className="text-sm text-gray-500">{new Date(listing.dateAdded).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentListings;