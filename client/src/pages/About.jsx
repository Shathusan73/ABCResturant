import React, { useState } from 'react';
import { Gallery2, Gallery3 } from '../constants/Data';

const facilitiesData = [
  { id: 1, name: 'Free Wi-Fi', description: 'Enjoy free high-speed internet while dining with us.' },
  { id: 2, name: 'Outdoor Seating', description: 'Relax and dine in our beautiful outdoor seating area.' },
  { id: 3, name: 'Private Dining Rooms', description: 'Exclusive rooms available for private gatherings.' },
  { id: 4, name: 'Kids Play Area', description: 'A safe and fun area for children to play.' },
  { id: 5, name: 'Wheelchair Accessible', description: 'Our restaurant is fully accessible for all guests.' },
  { id: 6, name: 'Valet Parking', description: 'Convenient valet parking service available.' },
];

function About() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFacilities = facilitiesData.filter(facility =>
    facility.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 py-[150px] px-8">
      <div className="container mx-auto max-w-5xl">
        
        {/* Background Image Section */}
        <div 
          className="rounded-lg shadow-lg mb-8 w-full h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url(${Gallery3})` }}
        />
        
        <h1 className="text-5xl font-bold mb-12 text-center text-[#FBA819]">About ABC Restaurant</h1>

        {/* Sri Lanka Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-6 text-center">Our Roots in Sri Lanka</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center">
            Located in the heart of Sri Lanka, ABC Restaurant embodies the rich culinary heritage of the island. We bring the flavors of Sri Lankan cuisine to life, offering our guests an authentic dining experience that celebrates the country's vibrant food culture.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center items-start text-lg text-gray-700">
              <p className="mb-4">
                Our menu is a tribute to the diversity of Sri Lanka's regions, featuring dishes that showcase the freshest local ingredients. Whether you're savoring a spicy seafood curry from the southern coast or enjoying a fragrant rice and curry platter, each meal is crafted with care and passion.
              </p>
              <ul className="list-disc list-inside mt-4">
                <li>Signature Sri Lankan Dishes</li>
                <li>Locally Sourced Ingredients</li>
                <li>Traditional Cooking Methods</li>
              </ul>
            </div>
            <img src={Gallery2} alt="Sri Lankan Cuisine" className="rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-6 text-center">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            Our vision is to become the most beloved restaurant in Sri Lanka, known for delivering an exceptional culinary experience that reflects the essence of Sri Lankan hospitality. We aspire to be a place where every meal is a celebration of our culture, our people, and our island.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            Our mission is to provide our guests with unforgettable dining experiences by combining traditional Sri Lankan flavors with contemporary culinary techniques. We are dedicated to excellence in service, quality, and sustainability, ensuring that every visit to ABC Restaurant is a memorable one.
          </p>
        </section>

        {/* Facilities and Services Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-6 text-center">Our Facilities and Services</h2>

          {/* Search Input */}
          <div className="mb-8 flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search facilities and services..."
              className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Facilities List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredFacilities.length > 0 ? (
              filteredFacilities.map((facility) => (
                <div key={facility.id} className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-yellow-600">{facility.name}</h3>
                  <p className="text-gray-700">{facility.description}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No facilities or services found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
