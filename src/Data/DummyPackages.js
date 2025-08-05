// src/data/dummyPackages.js

const dummyPackages = [
  {
    id: 1,
    title: "5-Day Mountain Trek",
    description: "Brief Description (one-liner selling point)",
    price: "Rs. 499",
    duration: "5 days / 4 Nights",
    image: "https://source.unsplash.com/random/400x300?mountain",
    itinerary: [
      "Day 1: Begin trek",
      "Day 2: Continue ascent",
      "Day 3: Midpoint rest",
      "Day 4: Summit trek",
      "Day 5: Return trek",
    ],
    included: ["Guide", "Accommodation", "Breakfast", "Permits"],
    notIncluded: ["Tips", "Snacks", "Gear"],
  },
  {
    id: 2,
    title: "3-Day Forest Hike",
    description: "Nature escape and tranquil views",
    price: "Rs. 299",
    duration: "3 days / 2 Nights",
    image: "https://source.unsplash.com/random/400x300?forest",
    itinerary: [
      "Day 1: Forest Entry & Hike",
      "Day 2: Camp in woods",
      "Day 3: Return trek",
    ],
    included: ["Camp gear", "Guide", "Permits"],
    notIncluded: ["Meals", "Travel insurance"],
  },
  // Add more if needed
];

export default dummyPackages;
