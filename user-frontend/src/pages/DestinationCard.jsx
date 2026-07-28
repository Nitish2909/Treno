import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const DestinationCard = ({ destination }) => {
    console.log(destination)
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(`/destinations/${destination.id}`,{
            state:destination
        })
    }
  return (
    <div
    //   to={`/destinations/${destination.id}`}
    onClick={handleClick}
      className="group relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
          {destination.state || 'India'}
        </div>
      </div>
      
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <MapPin className="w-4 h-4" />
            <span className="text-xs font-semibold tracking-wide uppercase">Destination</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{destination.description}</p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">Best time: {destination.bestTimeToVisit}</span>
          <span className="text-amber-600 font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Explore <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;