import React from "react";


function RestaurantServices() {
  return (
    <>
      <div className="bg-[#000000]">
        <div className="container flex mx-auto">
          <div className="flex flex-col w-full gap-[100px] py-[120px]">
            {/* Headings start */}
            <div className="headings inline-flex flex-col md:items-center items-start text-[#ffffff] gap-[16px]">
              <div className="md:px-[70px] md:py-[14px] px-[16px] flex flex-col gap-[16px]">
                <div className="heading lg:text-[40px] text-[44px] font-normal md:text-center font-Gilda leading-[50px]">
                  <h1>Exceptional Restaurant Services</h1>
                </div>
                <div className="subheading md:w-[554.774px] w-full md:text-center lg:text-[16.8px] md:text-[18px] text-[14px] font-normal leading-[26.04px] font-Raleway">
                  <p>
                    Explore our range of personalized restaurant services and facilities, ensuring a delightful dining experience every time you visit.
                  </p>
                </div>
              </div>
            </div>
            {/* Headings end */}

            {/* Restaurant Services start */}
            <div className="grid items-center text-[#ffffff] bg-black lg:px-[74px] md:px-[32px] px-[16px]">
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 md:gap-[84px] gap-[52px]">
                <div className="service-item flex flex-col gap-[32px]">
                  <div className="flex flex-col gap-[16px]">
                    <div className="icon">
                  
                    </div>
                    <div className="heading md:text-[24px] text-[28px] font-Gilda font-normal md:leading-[20.16px] leading-normal">
                      <h2>Gourmet Dining</h2>
                    </div>
                  </div>
                  <div className="paragraph flex lg:w-[360.95px] w-full text-[16.8px] font-light leading-[26.04px] tracking-[0.168px] font-Raleway">
                    <p>
                      Savor our exquisite gourmet meals, crafted by top chefs using the freshest ingredients.
                    </p>
                  </div>
                </div>

                <div className="service-item flex flex-col gap-[32px]">
                  <div className="flex flex-col gap-[16px]">
                    <div className="icon">
                 
                    </div>
                    <div className="heading md:text-[24px] text-[28px] font-Gilda font-normal md:leading-[20.16px] leading-normal">
                      <h2>Private Dining Rooms</h2>
                    </div>
                  </div>
                  <div className="paragraph flex lg:w-[360.95px] w-full text-[16.8px] font-light leading-[26.04px] tracking-[0.168px] font-Raleway">
                    <p>
                      Enjoy an intimate dining experience in our beautifully appointed private rooms.
                    </p>
                  </div>
                </div>

                <div className="service-item flex flex-col gap-[32px]">
                  <div className="flex flex-col gap-[16px]">
                    <div className="icon">
                     
                    </div>
                    <div className="heading md:text-[24px] text-[28px] font-Gilda font-normal md:leading-[20.16px] leading-normal">
                      <h2>Catering Services</h2>
                    </div>
                  </div>
                  <div className="paragraph flex lg:w-[360.95px] w-full text-[16.8px] font-light leading-[26.04px] tracking-[0.168px] font-Raleway">
                    <p>
                      Let us cater your special events with a menu tailored to your tastes and preferences.
                    </p>
                  </div>
                </div>

                <div className="service-item flex flex-col gap-[32px]">
                  <div className="flex flex-col gap-[16px]">
                    <div className="icon">
                    
                    </div>
                    <div className="heading md:text-[24px] text-[28px] font-Gilda font-normal md:leading-[20.16px] leading-normal">
                      <h2>Event Hosting</h2>
                    </div>
                  </div>
                  <div className="paragraph flex lg:w-[360.95px] w-full text-[16.8px] font-light leading-[26.04px] tracking-[0.168px] font-Raleway">
                    <p>
                      Host your events in our versatile spaces, ideal for weddings, corporate gatherings, and more.
                    </p>
                  </div>
                </div>

                <div className="service-item flex flex-col gap-[32px]">
                  <div className="flex flex-col gap-[16px]">
                    <div className="icon">
                    
                    </div>
                    <div className="heading md:text-[24px] text-[28px] font-Gilda font-normal lg:leading-[30.16px] md:leading-[32.2px] leading-normal">
                      <h2>Menu Customization</h2>
                    </div>
                  </div>
                  <div className="paragraph flex lg:w-[360.95px] w-full text-[16.8px] font-light leading-[26.04px] tracking-[0.168px] font-Raleway">
                    <p>
                      Work with our chefs to customize the perfect menu for your event, ensuring every detail is to your liking.
                    </p>
                  </div>
                </div>

                <div className="service-item flex flex-col gap-[32px]">
                  <div className="flex flex-col gap-[16px]">
                    <div className="icon">
                 
                    </div>
                    <div className="heading md:text-[24px] text-[28px] font-Gilda font-normal md:leading-[20.16px] leading-normal">
                      <h2>Reservation Management</h2>
                    </div>
                  </div>
                  <div className="paragraph flex lg:w-[360.95px] w-full text-[16.8px] font-light leading-[26.04px] tracking-[0.168px] font-Raleway">
                    <p>
                      Easily manage your reservations with our user-friendly system, ensuring a seamless dining experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Restaurant Services end */}
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantServices;
