import Banner from "./../components/Home/Banner";
import WhyChooseUs from "./../components/Home/WhyChooseUs";
import RecentListings from "./../components/Home/RecentListings";
import UserTestimonials from "./../components/Home/UserTestimonials";
import SpecialOffers from "./../components/Home/SpecialOffers";

const Home = () => {
	return (
		<div className="w-full mx-auto overflow-x-hidden">
			<Banner />
			<WhyChooseUs />
			<RecentListings />
			<UserTestimonials />
			<SpecialOffers />
		</div>
	);
};

export default Home;
