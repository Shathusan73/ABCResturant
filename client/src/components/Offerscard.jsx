import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OffersCard = () => {
  const [offers, setOffers] = useState([]);

  // Fetch offers from the API
  const fetchOffers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/offers");
      const sortedOffers = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOffers(sortedOffers);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  return (
    <div className="px-4 pb-10 bg-black">
      <div className="container mx-auto p-6">
        <h3 className="text-center uppercase text-4xl font-semibold mb-8 text-yellow-500">Today's Special Offers</h3>
        <div className="grid grid-cols-1 gap-6">
          {offers.slice(0, 1).map((offer) => (
            <div
              key={offer.id}
              className="relative flex justify-center items-center bg-black h-[500px] border text-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(http://localhost:8080/uploads/images/${offer.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
              </div>

              {/* Content */}
              <div className="relative flex flex-col font-semibold items-center p-8 text-center">
                <div className="text-[64px] font-bold mb-4">Today's Special!</div>
                <div className="text-[32px] mb-4">
                  Enjoy{" "}
                  <span className="text-yellow-400 font-bold">
                    {offer.percentage}% OFF
                  </span>{" "}
                  on our {offer.name}
                </div>
                <div className="text-[28px] font-bold text-yellow-400 mb-2">Dish: {offer.name}</div>
                <p className="text-[20px]">Ingredients: {offer.description}</p>
                <p className="text-[20px] mt-4">Don't miss out on this limited-time offer!</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersCard;
