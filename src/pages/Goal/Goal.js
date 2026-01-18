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
    <div className="p-8 glass-panel shadow-lg max-w-4xl mx-auto mt-12 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center text-slate-800 mb-10 animate-fadeInUp">
        🎯 Goals & Achievements
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="animate-fadeInUp" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
          <h3 className="text-xl font-bold text-emerald-600 mb-6 flex items-center gap-2">
            <span className="bg-emerald-500 w-2 h-6 rounded-full inline-block"></span>
            Achievements
          </h3>
          <ul className="space-y-4">
            {achievements.map((item, index) => (
              <li key={index} className="p-4 glass-card shadow-sm hover:shadow-md transition-all duration-300 text-slate-700 font-medium border-l-4 border-emerald-400">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="animate-fadeInUp" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
          <h3 className="text-xl font-bold text-cyan-600 mb-6 flex items-center gap-2">
            <span className="bg-cyan-500 w-2 h-6 rounded-full inline-block"></span>
            Upcoming Goals
          </h3>
          <ul className="space-y-4">
            {upcomingGoals.map((item, index) => (
              <li key={index} className="p-4 glass-card shadow-sm hover:shadow-md transition-all duration-300 text-slate-700 font-medium border-l-4 border-cyan-400">
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
