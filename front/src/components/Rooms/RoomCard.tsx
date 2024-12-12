import React from "react";
import Image from "next/image"; // Import the Next.js Image component
import { FaStar } from "react-icons/fa";
import { Room } from "@/interfaces";
import Link from "next/link";

const RoomCard: React.FC<Room> = ({ roomType, title, size, beds, rating = 0, image, price, id }) => {
  return (
    <div className="w-80 h-96 bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <Link href={`/rooms/${id}`}>
      <div className="relative h-1/2">
        <Image
          src={image}
          alt={title}
          layout="fill" // Use fill to cover the container
          objectFit="cover" // Ensure the image is properly scaled and cropped
          className="rounded-t-lg"
        />
        <div className="absolute top-2 right-2 bg-tertiary text-white text-sm font-semibold py-1 px-2 rounded-lg shadow-md">
          ${price} / noche
        </div>
      </div>
      <div className="flex-grow p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-text text-sm uppercase tracking-wide">{roomType}</h2>
          <h1 className="text-gray-900 font-bold text-lg mt-1 truncate">{title}</h1>
          <p className="text-text text-sm mt-2">{size}</p>
        </div>
        <div className="mt-4 border-t pt-4 flex items-center justify-between">
          <p className="text-text text-sm">{beds} camas</p>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`text-lg ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default RoomCard;
