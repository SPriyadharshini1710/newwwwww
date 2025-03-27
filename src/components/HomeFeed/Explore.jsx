import React from "react";
import "./Explore.css";
import { FaCloudSun, FaPaintBrush, FaCalendarDay } from "react-icons/fa";

const Explore = () => {
  return (
    <div className="w-[350px] p-5  rounded-2xl  space-y-5">

      {/* <h3 className="text-2xl font-bold text-center text-gray-900">✨ Explore</h3> */}

      {/* Weather & Air Quality */}
      <div className="relative rounded-xl shadow-md transition hover:scale-105 hover:shadow-lg bg-white">
        <img
          src="/images/sky-5907605_1280.jpg"
          alt="Weather"
          className="w-full h-32 object-cover rounded-t-xl"
        />
        <div className="p-4">
          <h4 className="text-lg font-semibold flex items-center gap-2 text-yellow-600">
            <FaCloudSun /> Weather & Air Quality
          </h4>
          <p className="text-sm text-gray-600">🌡️ 28°C | AQI: Moderate</p>
        </div>
      </div>

      {/* Designer News */}
      <div className="relative rounded-xl shadow-md transition hover:scale-105 hover:shadow-lg bg-white">
        <img
          src="/images/designer-791199_1280.jpg"
          alt="Designer News"
          className="w-full h-32 object-cover rounded-t-xl"
        />
        <div className="p-4">
          <h4 className="text-lg font-semibold flex items-center gap-2 text-blue-600">
            <FaPaintBrush /> Designer News
          </h4>
          <p className="text-sm text-gray-600">"Top UX Trends of 2025"</p>
        </div>
      </div>

      {/* On This Day */}
      <div className="relative rounded-xl shadow-md transition hover:scale-105 hover:shadow-lg bg-white">
        <img
           src="/images/women.jfif"
          alt="On This Day"
          className="w-full h-32 object-cover rounded-t-xl"
        />
        <div className="p-4">
          <h4 className="text-lg font-semibold flex items-center gap-2 text-pink-600">
            <FaCalendarDay /> On This Day
          </h4>
          <p className="text-sm text-gray-600">International Women's Day 🌸</p>
        </div>
      </div>

    </div>
  );
};

export default Explore;
