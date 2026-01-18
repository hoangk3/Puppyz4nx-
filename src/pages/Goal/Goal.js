// src/pages/Goal/Goal.js
import React from "react";

function Goal() {
  const achievements = [
    "Owner of a loser website, so nothing impressive yet",
  ];

  const upcomingGoals = [
    "Try to improve school subjects",
    "From noob to pro in data structures & algorithms",
    "Touch grass more often",
    "Try-hard a few FPS games",
    "Gain some weight",
  ];

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        🎯 Goals & Achievements
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-green-600 mb-4">
            ✅ Achievements
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {achievements.map((item, index) => (
              <li key={index} className="hover:text-green-700 transition">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-600 mb-4">
            🚀 Upcoming Goals
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {upcomingGoals.map((item, index) => (
              <li key={index} className="hover:text-blue-700 transition">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Goal;
