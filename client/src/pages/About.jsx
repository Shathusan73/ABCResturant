import React from 'react';


function About() {
  return (
    <div className="bg-gray-100 p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#FBA819]">About ABC Restaurant</h1>

        {/* Continents Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Continental Presence</h2>
          <div className="flex flex-col md:flex-row items-center">
            {/* <img src={continentImage} alt="Continental Presence" className="w-full md:w-1/2 h-auto rounded-lg shadow-lg mb-6 md:mb-0 md:mr-6" /> */}
            <div className="text-lg text-gray-700">
              <p className="mb-4">
                At ABC Restaurant, we take pride in our global presence. Our establishments span across multiple continents, bringing diverse culinary experiences to food lovers everywhere. From the vibrant streets of Asia to the sophisticated dining venues in Europe, we offer a taste of excellence in every corner of the world.
              </p>
              <ul className="list-disc list-inside mt-4">
                <li>North America</li>
                <li>Europe</li>
                <li>Asia</li>
                <li>South America</li>
                <li>Africa</li>
                <li>Oceania</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <div className="flex flex-col md:flex-row items-center">
            {/* <img src={visionImage} alt="Vision" className="w-full md:w-1/2 h-auto rounded-lg shadow-lg mb-6 md:mb-0 md:mr-6" /> */}
            <p className="text-lg text-gray-700">
              Our vision is to be the premier destination for culinary excellence, where every dining experience is memorable and exceptional. We aim to set new standards in the food industry through innovation, quality, and outstanding service.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <div className="flex flex-col md:flex-row items-center">
            {/* <img src={missionImage} alt="Mission" className="w-full md:w-1/2 h-auto rounded-lg shadow-lg mb-6 md:mb-0 md:mr-6" /> */}
            <p className="text-lg text-gray-700">
              Our mission is to deliver extraordinary dining experiences by combining the finest ingredients with passionate service. We are committed to sustainability, community engagement, and continuous improvement to ensure our guests enjoy unparalleled hospitality and delicious cuisine.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
