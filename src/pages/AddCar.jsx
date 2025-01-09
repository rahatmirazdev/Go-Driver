import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [carModel, setCarModel] = useState("");
  const [dailyRentalPrice, setDailyRentalPrice] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCar = {
      carModel,
      dailyRentalPrice,
      availability,
      vehicleRegistrationNumber,
      features,
      description,
      location,
      photoUrl,
      user: {
        uid: user.uid,
        email: user.email,
      },
      dateAdded: new Date(),
    };

    try {
      await axios.post("/cars", newCar);
      toast.success("Car added successfully");
      navigate("/my-cars");
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Failed to add car");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16  pt-24">
      <h2 className="text-4xl font-bold text-center text-dark-gray mb-12">Add Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-dark-gray font-bold mb-2">Car Model</label>
          <input
            type="text"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-dark-gray font-bold mb-2">Daily Rental Price</label>
          <input
            type="number"
            value={dailyRentalPrice}
            onChange={(e) => setDailyRentalPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-dark-gray font-bold mb-2">Availability</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-dark-gray font-bold mb-2">Vehicle Registration Number</label>
          <input
            type="text"
            value={vehicleRegistrationNumber}
            onChange={(e) => setVehicleRegistrationNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-dark-gray font-bold mb-2">Features</label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-dark-gray font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-dark-gray font-bold mb-2">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-dark-gray font-bold mb-2">Photo URL</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="btn bg-soft-green text-white hover:bg-warm-orange border-none px-6 py-3 text-lg font-semibold rounded-none shadow-lg">
          Add Car
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCar;