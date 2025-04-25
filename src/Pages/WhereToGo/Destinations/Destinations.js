import React from "react";
import { useParams } from "react-router-dom";
import { destinations } from "../../../Data/DestinationCarousel";
import { Activities } from "../../../Data/Activities";

const DestinationPage = () => {
  const { id } = useParams();
  const destination = destinations.find((dest) => dest.id === parseInt(id));

  if (!destination) {
    return (
      <div className="p-8 text-center text-red-500">Destination not found</div>
    );
  }

  const mainImage = destination.image[0];

  return (
    <div className="mx-auto -mt-3">
      <div className="relative mb-6 w-screen -ml-[calc(50vw-50%)]">
        <div className="w-full overflow-hidden">
          <img
            src={mainImage.url}
            alt={destination.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
          <h1 className="absolute bottom-1 left-24 z-20 text-5xl font-medium text-white font-redressed text-center mb-6">
            {destination.title}
          </h1>
        </div>
      </div>

      {/* Content paragraphs */}
      <div className="prose lg:mx-52 text-gray-700 mb-8">
        <h2 className="text-2xl font-medium mb-4">{destination.title}</h2>
        <p className="mb-4">
          Potthast's unusual beauty has been the subject of inspiration for many
          travel writers. Its pristine air, spectacular backdrop of snowy peaks,
          blue lakes and surrounding geography make it 'the jewel in the
          Himalaya', a place of remarkable natural dimensions. With the
          magnificent Himalayan range forming the backdrop and the serenity of
          the landscape, Panchpokhari is a legacy destination.
        </p>
        <p className="mb-4">
          Panchpokhari is a great destination for a weekend getaway. It was once
          an important trade route between India and Tibet. To this day,
          merchants set up camps on the city outskirts, bringing goods from
          remote regions through Mustang and other passes. The Thakali people,
          indigenous to the Thak-Khola region of Nepal, are known to be
          entrepreneurs and many more along the trek routes to the Himalayan
          region.
        </p>
        <p className="mb-4">
          The Panchpokhari is best known for the stunning view of the Annapurna
          range. It is perhaps one of the few places on earth from where
          mountains above 8,000 m can be seen undisturbed from an altitude of
          800 m within the distance of 28 km.
        </p>
      </div>

      {destination.image.length >= 3 && (
        <div className="flex gap-4 mx-32 mb-10">
          {destination.image.slice(1, 3).map((img) => (
            <div key={img.id} className="image-container flex-1">
              <img
                src={img.url}
                alt={destination.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}

      <div className="sm:my-[30px] flex flex-col items-center justify-center py-3 px-auto bg-gray-50 mx-16">
        <p className="font-Playfair text-xl font-medium text-center mb-2 md:mb-10">
          Things to do in Panchpokhari Lake
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center md:mb-8 gap-x-32">
          {Activities.map((a) => (
            <p key={a.id} className="font-Open text-base mb-2 md:mb-10 flex">
              <span className="px-2 rounded-full bg-red-700 text-white mr-2">
                {a.id}
              </span>
              {a.activity}
            </p>
          ))}
        </div>
        <img
          src="/assets/Images/yellow-line.png"
          alt="Panchpokhari Tourism"
          className=" w-full object-contain rounded-lg p-1 mx-auto"
        />
      </div>

      <div>
        
      </div>
    </div>
  );
};

export default DestinationPage;
