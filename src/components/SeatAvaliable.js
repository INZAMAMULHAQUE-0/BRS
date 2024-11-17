import React from "react";

const SeatAvailable = ({ buses, selectBus }) => {

    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {buses.map((bus) => (
        <div key={bus.id} className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">
              {bus.from} to {bus.to}
            </h3>
            <span>{bus.date}</span>
          </div>
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Departure</p>
              <p className="font-bold">{bus.departure}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Arrival</p>
              <p className="font-bold">{bus.arrival}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price</p>
              <p className="font-bold">₹{bus.price}</p>
            </div>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={() => selectBus(bus)}
          >
            Select Seats
          </button>
        </div>
      ))}
    </div>
  );
};

export default SeatAvailable;
