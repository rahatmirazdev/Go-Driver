import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then(() => {
        setError("");
        navigate("/");
      })
      .catch(() => {
        const errorMessage = "Wrong email or password";
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };

  const handlePasswordReset = () => {
    navigate("/forgot-password", { state: { email } });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="mx-2 max-w-[500px] max-h-[600px] text-black card-body rounded-md border-green-600 border">
        <h2 className="text-2xl font-bold mb-4 text-black">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input text-black rounded-md border-green-600 border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="input text-black rounded-md border-green-600 border"
              required
            />
            <span
              className="absolute right-3 top-[52px] cursor-pointer text-black"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
            <NavLink
              to="#"
              className="text-black mt-2"
              onClick={handlePasswordReset}
            >
              Forgot password?
            </NavLink>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="form-control mt-6">
            <button className="btn bg-green-600 hover:bg-green-700 text-white" type="submit">
              Login
            </button>
          </div>
        </form>
        <button
          className="btn bg-[#2563eb] hover:bg-[#1f54c6] text-white mt-4 border-none"
          onClick={() => signInWithGoogle().then(() => navigate("/"))}
        >
          Sign in with Google
        </button>
        <div className="mt-4">
          <NavLink to="/register" className="text-black">
            Don&apos;t have an account? Register
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;