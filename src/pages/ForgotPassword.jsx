import { useContext, useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { sendPasswordResetEmail, signOutUser } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(email)
      .then(() => {
        signOutUser().then(() => {
          window.location.href = "https://mail.google.com";
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#778DA9]">
      <div className="mx-2 max-w-[500px] max-h-[600px] bg-[#1B263B] text-white card-body rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="input text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Reset Password
            </button>
          </div>
          <div className="mt-2">
            <NavLink to="/login" className="text-white">
              Back to Login
            </NavLink>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;