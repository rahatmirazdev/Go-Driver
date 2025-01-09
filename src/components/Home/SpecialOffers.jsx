import { Link } from "react-router-dom";

const SpecialOffers = () => {
  return (
    <div className="py-16 bg-light-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-dark-gray mb-12">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-none overflow-hidden transform transition-transform hover:scale-105">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-dark-gray mb-2">
                Get 15% off for weekend rentals!
              </h3>
              <p className="text-gray-700 mb-4">
                Enjoy a special discount on all weekend rentals.
              </p>
              <Link
                to="/available-cars"
                className="btn bg-soft-green text-white hover:bg-[#2563eb] border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-none overflow-hidden transform transition-transform hover:scale-105">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-dark-gray mb-2">
                Luxury cars at $99/day this holiday season!
              </h3>
              <p className="text-gray-700 mb-4">
                Drive in style with our luxury cars at a special rate.
              </p>
              <Link
                to="/available-cars"
                className="btn bg-soft-green text-white hover:bg-[#2563eb] border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;