import { FaCar, FaDollarSign, FaRegCalendarCheck, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const points = [
    {
      icon: <FaCar size={40} className="text-soft-green" />,
      title: "Wide Variety of Cars",
      description: "From budget-friendly options to luxury vehicles.",
    },
    {
      icon: <FaDollarSign size={40} className="text-soft-green" />,
      title: "Affordable Prices",
      description: "Competitive daily rates you can count on.",
    },
    {
      icon: <FaRegCalendarCheck size={40} className="text-soft-green" />,
      title: "Easy Booking Process",
      description: "Seamlessly book your ride in just a few clicks.",
    },
    {
      icon: <FaHeadset size={40} className="text-soft-green" />,
      title: "Customer Support",
      description: "24/7 assistance for all your queries.",
    },
  ];

  return (
    <div className="py-16 bg-light-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-dark-gray mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg">
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-2xl font-semibold text-dark-gray mb-2">{point.title}</h3>
              <p className="text-dark-gray">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;