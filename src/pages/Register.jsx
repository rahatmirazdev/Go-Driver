import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validatePassword } from "../utils/validation";
import { updateProfile } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { register, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      toast.error(passwordValidationError);
      return;
    }

    register(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          toast.success("Registration successful!");
          navigate("/login");
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="mx-2 max-w-[500px] max-h-[690px] bg-[#1B263B] text-white card-body rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Create a new account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="input text-black"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              name="photoURL"
              type="text"
              placeholder="Photo URL"
              className="input text-black"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input text-black"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="input text-black"
              required
            />
            <span
              className="absolute right-3 top-[52px] cursor-pointer text-black"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </form>
        <button
          className="btn btn-secondary mt-4"
          onClick={() => signInWithGoogle().then(() => navigate("/"))}
        >
          Register with Google
        </button>
        <div className="mt-4">
          <NavLink to="/login" className="link link-hover">
            Already have an account? Login
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;