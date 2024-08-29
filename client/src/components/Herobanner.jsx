import React, { useState, useEffect, useRef } from "react";
import { Gallery2, Gallery3, Homeherobanner1 } from "../constants/Data";

function Herobanner() {
  const sections = ["design and planning", "construction", "courses"];
  const [selectedSection, setSelectedSection] = useState("design and planning");
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const intervalRef = useRef(null);

 



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startProgress = () => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          switchSection();
          return 0;
        }
        return prevProgress + 1;
      });
    }, 50);
  };

  const stopProgress = () => {
    clearInterval(intervalRef.current);
  };

  const switchSection = () => {
    setSelectedSection((prevSection) => {
      const nextIndex = (sections.indexOf(prevSection) + 1) % sections.length;
      return sections[nextIndex];
    });
  };

  useEffect(() => {
    stopProgress();
    setProgress(0);
    startProgress();

    return () => stopProgress();
  }, [selectedSection]);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setProgress(0);
  };

  const getBackgroundImage = () => {
    switch (selectedSection) {
      case "design and planning":
        return Homeherobanner1;
      case "construction":
        return Gallery3;
      case "courses":
        return Gallery2;
      default:
        return Homeherobanner1;
    }
  };


  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(9, 10, 11, 1), rgba(9, 10, 11, 0.5)), url(${getBackgroundImage()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="transition-bg flex flex-col justify-end md:gap-[188px] gap-[52px] md:h-[850px] h-[650px] w-full font-Manrope text-black"
      >
        <div className="container mx-auto md:px-[24px] px-[16px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col  gap-[4px]">
              <div  className="flex flex-col justify-center items-center">
                <h3 className="md:text-[64px] font-semibold text-[48px] text-[#FBA819] uppercase">
                  ABC RESTURANT
                </h3>
                <h6 className="text-[#ffffff] md:text-[64px] font-medium text-[32px]">
                SRILANKA.
              </h6>
                <h2 className="md:text-[32px] text-[24px] text-center text-white font-bold capitalize ">
                Bringing the authentic Sri Lankan culinary experience.🌴
                </h2>
              </div>
              
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#090a0b7b] h-[80px]">
            <div className="container mx-auto md:px-[24px] px-[16px]">
              <div className="flex uppercase">
                {!isMobile &&
                  sections.map((section) => (
                    <div
                      key={section}
                      className="flex flex-col w-full"
                      onClick={() => handleSectionClick(section)}
                    >
                      <div className="container relative h-[4px]">
                        <div
                          className="h-full bg-[#FBA919] transition-width duration-100 ease-linear"
                      
                        ></div>
                      </div>
                      <div
                        className={`flex gap-[8px] py-[24px] justify-center w-full cursor-pointer ${
                          isMobile && selectedSection !== section
                            ? "hidden"
                            : ""
                        }`}
                      >
                       
                      </div>
                    </div>
                  ))}
                {isMobile && sections.includes(selectedSection) && (
                  <div
                    key={selectedSection}
                    className="flex flex-col w-full"
                    onClick={() => handleSectionClick(selectedSection)}
                  >
                    <div className="container relative h-[4px]">
                      <div
                        className="h-full bg-[#FBA919] transition-all duration-100 ease-linear"
                        style={{
                          width: selectedSection ? `${progress}%` : "0%",
                        }}
                      ></div>
                    </div>
                    
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}

export default Herobanner;
