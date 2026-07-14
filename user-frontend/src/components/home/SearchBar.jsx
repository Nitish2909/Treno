// import React, { useState, useRef, useEffect } from 'react';
// import { MapPin, Calendar, Users, Search } from 'lucide-react';
// import DatePicker from 'react-datepicker';
// import { useNavigate } from 'react-router-dom';
// import 'react-datepicker/dist/react-datepicker.css';

// const ALL_DESTINATIONS = [
//   'Delhi', 'Mumbai', 'Goa', 'Manali', 'Ladakh',
//   'Kerala', 'Rajasthan', 'Spiti', 'Andaman', 'Meghalaya',
//   'Coorg', 'Rishikesh',
// ];

// export default function SearchBar() {
//   const navigate = useNavigate();

//   const [destination, setDestination] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [date, setDate] = useState(null);
//   const [travelers, setTravelers] = useState(2);
//   const destRef = useRef(null);

//   // Filter suggestions on input change
//   const handleDestinationChange = (e) => {
//     const val = e.target.value;
//     setDestination(val);
//     if (val.trim().length > 0) {
//       const filtered = ALL_DESTINATIONS.filter((d) =>
//         d.toLowerCase().startsWith(val.toLowerCase())
//       );
//       setSuggestions(filtered);
//       setShowSuggestions(true);
//     } else {
//       setSuggestions(ALL_DESTINATIONS);
//       setShowSuggestions(true);
//     }
//   };

//   const handleDestinationFocus = () => {
//     setSuggestions(
//       destination.trim().length > 0
//         ? ALL_DESTINATIONS.filter((d) =>
//             d.toLowerCase().startsWith(destination.toLowerCase())
//           )
//         : ALL_DESTINATIONS
//     );
//     setShowSuggestions(true);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setDestination(suggestion);
//     setShowSuggestions(false);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClick = (e) => {
//       if (destRef.current && !destRef.current.contains(e.target)) {
//         setShowSuggestions(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClick);
//     return () => document.removeEventListener('mousedown', handleClick);
//   }, []);

//   const handleTravelersChange = (delta) => {
//     setTravelers((prev) => Math.min(20, Math.max(1, prev + delta)));
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const params = new URLSearchParams();
//     if (destination) params.set('destination', destination);
//     if (date) params.set('date', date.toISOString().split('T')[0]);
//     if (travelers) params.set('travelers', travelers);
//     navigate(`/trips?${params.toString()}`);
//   };

//   return (
//     <form
//       onSubmit={handleSearch}
//       className="mx-auto w-full max-w-4xl rounded-2xl bg-white/95 shadow-2xl backdrop-blur-md"
//     >
//       <div className="flex flex-col divide-y divide-gray-100 sm:flex-row sm:divide-x sm:divide-y-0">
//         {/* Destination Field */}
//         <div ref={destRef} className="relative flex-1 px-4 py-3 sm:px-5 sm:py-4">
//           <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
//             <MapPin size={13} className="text-amber-500" />
//             Destination
//           </label>
//           <input
//             type="text"
//             value={destination}
//             onChange={handleDestinationChange}
//             onFocus={handleDestinationFocus}
//             placeholder="Where do you want to go?"
//             className="w-full border-none bg-transparent text-sm font-medium text-gray-800 placeholder-gray-400 outline-none"
//             autoComplete="off"
//           />
//           {showSuggestions && suggestions.length > 0 && (
//             <ul className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
//               {suggestions.map((s) => (
//                 <li
//                   key={s}
//                   onMouseDown={() => handleSuggestionClick(s)}
//                   className="flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-amber-50 hover:text-amber-600"
//                 >
//                   <MapPin size={13} className="shrink-0 text-amber-400" />
//                   {s}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Date Field */}
//         <div className="flex-1 px-4 py-3 sm:px-5 sm:py-4 [&_.react-datepicker-wrapper]:w-full">
//           <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
//             <Calendar size={13} className="text-amber-500" />
//             Travel Date
//           </label>
//           <DatePicker
//             selected={date}
//             onChange={(d) => setDate(d)}
//             minDate={new Date()}
//             placeholderText="Select a date"
//             dateFormat="dd MMM yyyy"
//             className="w-full border-none bg-transparent text-sm font-medium text-gray-800 placeholder-gray-400 outline-none cursor-pointer"
//             wrapperClassName="w-full"
//             popperPlacement="bottom-start"
//           />
//         </div>

//         {/* Travelers Field */}
//         <div className="flex-1 px-4 py-3 sm:px-5 sm:py-4">
//           <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500">
//             <Users size={13} className="text-amber-500" />
//             Travelers
//           </label>
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={() => handleTravelersChange(-1)}
//               disabled={travelers <= 1}
//               className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               −
//             </button>
//             <span className="min-w-[2rem] text-center text-sm font-semibold text-gray-800">
//               {travelers}
//             </span>
//             <button
//               type="button"
//               onClick={() => handleTravelersChange(1)}
//               disabled={travelers >= 20}
//               className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               +
//             </button>
//             <span className="text-xs text-gray-400">
//               {travelers === 1 ? 'person' : 'people'}
//             </span>
//           </div>
//         </div>

//         {/* Search Button */}
//         <div className="flex items-center px-4 py-3 sm:px-4 sm:py-4">
//           <button
//             type="submit"
//             className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-amber-400 hover:shadow-amber-400/40 hover:shadow-xl active:scale-95 sm:w-auto sm:rounded-xl"
//           >
//             <Search size={16} />
//             Search
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

export default function SearchBar(){
  return (
    <h1></h1>
  )
}
