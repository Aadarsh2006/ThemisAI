import React from 'react';
import { ArrowLeft, Gavel, FileText, Bot } from 'lucide-react';
import CircularProgress from '../components/common/CircularProgress';

const ProfilePage = ({ onGoBack }) => {
  const recentActivities = [
    { icon: <Gavel className="w-5 h-5 text-blue-500" />, text: "Filed a new case: 'Mutual Consent Divorce'", time: "2 days ago" },
    { icon: <FileText className="w-5 h-5 text-red-500" />, text: "Analyzed document: 'Lease Agreement'", time: "5 days ago" },
    { icon: <Bot className="w-5 h-5 text-green-500" />, text: "Started a chat with Themis AI", time: "1 week ago" },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-neutral-900 text-neutral-800 dark:text-white p-4 sm:p-8 transition-colors duration-300">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">My Profile</h1>
        <button onClick={onGoBack} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="lg:col-span-1 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center">
          <img
            src="https://placehold.co/150x150/3895d3/ffffff?text=User"
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-400 object-cover mb-4"
          />
          <h2 className="text-3xl font-bold">John Doe</h2>
          <p className="text-md text-neutral-500 dark:text-neutral-400 mt-1">john.doe@example.com</p>
          <p className="mt-4 text-neutral-600 dark:text-neutral-300 text-sm">A dedicated user of Themis.</p>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Key Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg"><p className="text-4xl font-bold text-blue-500">5</p><p className="text-sm">Cases Filed</p></div>
              <div className="p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg"><p className="text-4xl font-bold text-red-500">12</p><p className="text-sm">Docs Analyzed</p></div>
              <div className="p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg"><p className="text-4xl font-bold text-green-500">28</p><p className="text-sm">AI Chats</p></div>
              <div className="p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg flex flex-col items-center justify-center"><CircularProgress percentage={80} /><p className="text-sm mt-2">Success Rate</p></div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                  <div className="flex-shrink-0">{activity.icon}</div>
                  <p className="flex-grow font-medium">{activity.text}</p>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">{activity.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
