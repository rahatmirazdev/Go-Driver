import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<footer className="bg-light-gray text-dark-gray py-10">
			<div className="container mx-auto px-4">
				<div className="flex flex-wrap justify-between items-start mb-8">
					<div className="w-full md:w-1/3 mb-4 md:mb-0 flex items-center">
						<h2 className="text-2xl font-bold mb-2 text-soft-green">
							GoDriver
						</h2>
					</div>
					<div className="w-full md:w-1/3 mb-4 md:mb-0">
						<h3 className="text-lg font-bold mb-2 text-[#4caf50]">
							Quick Links
						</h3>
						<div className="space-y-1">
							<p>
								<Link
									to="/"
									className="hover:underline text-dark-gray"
								>
									Home
								</Link>
							</p>
							<p>
								<Link
									to="/available-cars"
									className="hover:underline text-dark-gray"
								>
									Available Cars
								</Link>
							</p>
							<p>
								<Link
									to="/add-car"
									className="hover:underline text-dark-gray"
								>
									Add Car
								</Link>
							</p>
							<p>
								<Link
									to="/my-cars"
									className="hover:underline text-dark-gray"
								>
									My Cars
								</Link>
							</p>
							<p>
								<Link
									to="/my-bookings"
									className="hover:underline text-dark-gray"
								>
									My Bookings
								</Link>
							</p>
						</div>
					</div>
					<div className="w-full md:w-1/3">
						<h3 className="text-xl font-bold mb-2 text-[#4caf50]">
							Contact Us
						</h3>
						<p className="text-sm text-dark-gray">
							Email: support@godriver.com
						</p>
						<p className="text-sm text-dark-gray">
							Phone: +123 456 7890
						</p>
						<div className="flex space-x-4 mt-4">
							<a
								href="https://github.com/rahatmirazdev"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-gray-400"
							>
								<FaGithub
									className="text-[#4caf50]"
									size={24}
								/>
							</a>
							<a
								href="https://www.linkedin.com/in/rahatahmedmiraz/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-gray-400"
							>
								<FaLinkedin
									className="text-[#4caf50]"
									size={24}
								/>
							</a>
						</div>
					</div>
				</div>
				<div className="border-t border-gray-300 pt-4 text-center">
					<p className="text-sm text-dark-gray">
						&copy;
						{new Date().getFullYear()}{" "}
						GoDriver. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
