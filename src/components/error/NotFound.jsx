import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import notFoundAnimation from "../../assets/errorAni.json";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-light-gray text-center">
			<Lottie
				animationData={notFoundAnimation}
				style={{ height: "300px", width: "300px" }}
				className="mb-8"
			/>
			<h1 className="text-6xl font-bold text-dark-gray mb-4">404</h1>
			<p className="text-2xl text-dark-gray mb-8">Page Not Found</p>
			<NavLink
				to="/"
				className="btn rounded-none bg-warm-orange text-white hover:bg-soft-green border-none px-4 py-2"
			>
				Back to Home
			</NavLink>
		</div>
	);
};

export default NotFound;
