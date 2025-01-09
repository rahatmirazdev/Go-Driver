import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyCars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [editCar, setEditCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`/cars?uid=${user.uid}`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [user.uid]);

  const handleEditCar = (car) => {
    setEditCar(car);
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`/cars/${carId}`);
        setCars(cars.filter((car) => car._id !== carId));
        toast.success("Car deleted successfully");
      } catch (error) {
        console.error("Error deleting car:", error);
        toast.error("Failed to delete car");
      }
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const updatedCar = {
      carModel: e.target.carModel.value,
      dailyRentalPrice: e.target.dailyRentalPrice.value,
      availability: e.target.availability.value,
      vehicleRegistrationNumber: e.target.vehicleRegistrationNumber.value,
      features: e.target.features.value,
      description: e.target.description.value,
      location: e.target.location.value,
      photoUrl: e.target.photoUrl.value,
    };

    try {
      await axios.patch(`/cars/${editCar._id}`, updatedCar);
      setCars(cars.map((car) => (car._id === editCar._id ? { ...car, ...updatedCar } : car)));
      setEditCar(null);
      toast.success("Car updated successfully");
    } catch (error) {
      console.error("Error updating car:", error);
      toast.error("Failed to update car");
    }
  };

  if (cars.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-dark-gray mb-12">My Cars</h2>
        <div className="text-center">
          <p className="text-lg text-dark-gray mb-4">No cars found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen  pt-24">
      <h2 className="text-4xl font-bold text-center text-dark-gray mb-12">My Cars</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b font-bold">Car Image</th>
              <th className="py-2 px-4 border-b font-bold">Car Model</th>
              <th className="py-2 px-4 border-b font-bold">Price Per Day</th>
              <th className="py-2 px-4 border-b font-bold">Location</th>
              <th className="py-2 px-4 border-b font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr
                key={car._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="py-2 px-4 border-b">
                  <img src={car.photoUrl} alt={car.carModel} className="w-20 h-20 object-cover" />
                </td>
                <td className="py-2 px-4 border-b">{car.carModel}</td>
                <td className="py-2 px-4 border-b">${car.dailyRentalPrice}/day</td>
                <td className="py-2 px-4 border-b">{car.location}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEditCar(car)}
                    className="btn bg-soft-green text-white hover:bg-[#1f54c6] border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCar(car._id)}
                    className="btn bg-red-500 text-white hover:bg-red-700 border-none px-4 py-2 text-sm font-semibold rounded-none shadow-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">Edit Car</h3>
            <form onSubmit={handleSaveChanges}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Car Model</label>
                <input
                  type="text"
                  name="carModel"
                  defaultValue={editCar.carModel}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Daily Rental Price</label>
                <input
                  type="number"
                  name="dailyRentalPrice"
                  defaultValue={editCar.dailyRentalPrice}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Availability</label>
                <select
                  name="availability"
                  defaultValue={editCar.availability}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Vehicle Registration Number</label>
                <input
                  type="text"
                  name="vehicleRegistrationNumber"
                  defaultValue={editCar.vehicleRegistrationNumber}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Features</label>
                <input
                  type="text"
                  name="features"
                  defaultValue={editCar.features}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  defaultValue={editCar.description}
                  className="w-full px-3 py-2 border rounded"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editCar.location}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                <input
                  type="text"
                  name="photoUrl"
                  defaultValue={editCar.photoUrl}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <button type="submit" className="btn bg-soft-green text-white hover:bg-[#1f54c6] border-none px-6 py-3 text-lg font-semibold rounded-none shadow-lg">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditCar(null)}
                className="btn bg-red-500 text-white hover:bg-red-700 border-none px-6 py-3 text-lg font-semibold rounded-none shadow-lg ml-4"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyCars;