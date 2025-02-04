import React from 'react';

// CustomerFeedback Component
const CustomerFeedback = ({ feedback }) => {
  return (
    <div className="mt-6 items-center justify-center space-y-6">
      {feedback.map((item, index) => (
        <div key={index} className="p-2 border mx-auto rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold">
                {item.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerFeedback;