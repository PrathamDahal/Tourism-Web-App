import React from 'react';
import RatingStars from './../../RatingStars';

// CustomerFeedback Component
const CustomerFeedback = ({ feedback }) => {
  return (
    <div className="mt-6 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {feedback.map((item, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              {/* Fixed size for the initial circle */}
              <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold">
                  {item.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold">{item.name}</p>
                <RatingStars rating={item.reviews}/>
                <p className="text-sm text-gray-500">{item.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerFeedback;