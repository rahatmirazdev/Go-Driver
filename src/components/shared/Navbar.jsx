import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../providers/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { user, logOut } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleLogout = async () => {
		await logOut();
		navigate("/login");
	};

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const generateNavItems = () => {
		const items = [
			{ to: "/", label: "Home" },
			{ to: "/available-cars", label: "Available Cars" },
		];

		if (user) {
			items.push(
				{ to: "/add-car", label: "Add Car" },
				{ to: "/my-cars", label: "My Cars" },
				{ to: "/my-bookings", label: "My Bookings" }
			);
		}

		return items.map((item) => (
			<li key={item.to} className="text-base font-medium cursor-pointer">
				<NavLink
					to={item.to}
					className={({ isActive }) =>
						isActive ? "underline text-[#4caf50]" : "text-dark-gray"
					}
					onClick={item.onClick}
				>
					{item.label}
				</NavLink>
			</li>
		));
	};

	return (
		<header
			className={`fixed w-full z-10 text-white ${
				isScrolled ? "bg-white shadow-md" : "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4 py-5 flex justify-between items-center">
				<div className="flex items-center">
					<Link to="/" className="text-xl font-bold text-soft-green">
						GoDriver
					</Link>
				</div>
				<div className="md:hidden">
					<button
						onClick={toggleMenu}
						className="text-dark-gray focus:outline-none"
					>
						{isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
					</button>
				</div>
				<nav
					className={`z-50 md:flex md:items-center ${
						isOpen
							? "absolute top-16 left-0 w-full bg-white shadow-md"
							: "hidden"
					}`}
				>
					<ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 p-4 md:p-0 items-center">
						{generateNavItems()}
						<div className=" flex">
							{!user ? (
								<>
									<li className="text-base font-medium cursor-pointer">
										<NavLink
											to="/login"
											className="mr-2 px-4 py-2 bg-green-500 text-white "
										>
											Log-in
										</NavLink>
									</li>
									<li className="text-base font-medium cursor-pointer">
										<NavLink
											to="/register"
											className="ml-2 px-4 py-2 bg-orange-500 text-white "
										>
											Sign-up
										</NavLink>
									</li>
								</>
							) : (
								<li className="text-base font-medium cursor-pointer">
									<button
										onClick={handleLogout}
										className="px-4 py-2 bg-red-500 text-white "
									>
										Logout
									</button>
								</li>
							)}
						</div>
					</ul>
				</nav>
			</div>
		</header>
	);
};

Navbar.propTypes = {
	user: PropTypes.object,
};

export default Navbar;
