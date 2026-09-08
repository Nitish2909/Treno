// import React, { useState } from 'react';
// import { Star, ChevronDown, ChevronUp } from 'lucide-react';

// export default function InternationalPackages() {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div className="w-full bg-slate-50 font-sans min-h-screen pb-16">
//       {/* Hero Banner Section (Image 1) */}
//       <div className="relative w-full h-[380px] bg-slate-900 overflow-hidden flex flex-col justify-between p-6 sm:p-10">
//         {/* Background Image Overlay */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1600&auto=format&fit=crop')`,
//           }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

//         {/* Banner Content */}
//         <div className="relative z-10 max-w-4xl mt-4">
//           <div className="flex items-start gap-3">
//             <div className="w-1.5 h-16 bg-yellow-400 rounded-sm shrink-0 mt-1" />
//             <div>
//               <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
//                 International Tour Packages 2026: Best Deals on Global Holidays
//               </h1>
//             </div>
//           </div>

//           <div className="mt-4 inline-block bg-yellow-400 px-4 py-1.5 rounded-sm">
//             <p className="text-sm sm:text-base font-semibold text-slate-900">
//               Your Gateway to Exciting International Trips Starts Here
//             </p>
//           </div>
//         </div>

//         {/* Social Proof / Reviews Footer */}
//         <div className="relative z-10 flex flex-wrap items-center justify-center sm:justify-start gap-8 pt-6 border-t border-white/10">
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-blue-600">
//               G
//             </div>
//             <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
//               <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
//               <span className="font-bold">4.9</span>
//               <span className="text-slate-300">(15263 reviews)</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">
//               OO
//             </div>
//             <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
//               <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
//               <span className="font-bold">5.0</span>
//               <span className="text-slate-300">(4213 reviews)</span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
//               f
//             </div>
//             <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
//               <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
//               <span className="font-bold">4.9</span>
//               <span className="text-slate-300">(1123 reviews)</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content Card Section (Image 2 + Expanded Content) */}
//       <div className="max-w-5xl mx-auto px-4 py-10">
//         <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 sm:p-8 relative">
//           {/* Section Header */}
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-1 h-7 bg-yellow-400 rounded-sm" />
//             <h2 className="text-xl sm:text-2xl font-bold text-teal-800">
//               Best International Tour Packages
//             </h2>
//           </div>

//           {/* Initial Visible Paragraphs */}
//           <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
//             <p>
//               Planning an international trip but don’t know where to start? Treno makes it simple and actually fun. With{' '}
//               <strong className="text-slate-800">20+ iconic destinations</strong> to choose from, you can go from Bali beaches to Dubai skylines, from Europe’s dreamy streets to Thailand’s party scenes, all without the usual planning stress.
//             </p>
//             <p>
//               The best part is the flexibility. Treno international tour packages usually range from{' '}
//               <strong className="text-slate-800">5 to 15 days</strong>, which means that you can always find the right type of trip depending on how much time you have for it. Moreover, you have a choice between a group tour and a more personalised one.
//             </p>
            
//             {!isExpanded && (
//               <p className="line-clamp-1 opacity-70">
//                 Packages generally start from around ₹20,000 and can go up to ₹2,00,000+ per person depending on the destination and experiences you choose. Flights, stays...
//               </p>
//             )}
//           </div>

//           {/* Expandable Content Container */}
//           {isExpanded && (
//             <div className="mt-4 space-y-8 text-slate-600 text-sm sm:text-base leading-relaxed animate-fadeIn">
//               <p>
//                 Packages generally start from around ₹20,000 and can go up to ₹2,00,000+ per person, depending on the destination and experiences you choose. Flights, stays, experiences, everything is sorted. You just show up, explore, and enjoy. It’s basically international travel without the chaos.
//               </p>

//               {/* Why Treno Section */}
//               <div className="pt-6 border-t border-slate-100">
//                 <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
//                   Why Treno Is the Go-To for International Holiday Packages
//                 </h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
//                     <h4 className="font-semibold text-teal-800 mb-1">Great Deals on Bucket-List Destinations</h4>
//                     <p className="text-xs sm:text-sm text-slate-600">
//                       Explore places like Europe, Bali, Vietnam, Bhutan, and Thailand with exciting ongoing offers. If a trip has been on your mind, this is your sign to go for it.
//                     </p>
//                   </div>

//                   <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
//                     <h4 className="font-semibold text-teal-800 mb-1">Group Trips with Amazing Trip Captains</h4>
//                     <p className="text-xs sm:text-sm text-slate-600">
//                       Our international trips from India are designed to be social, fun, and stress-free. Travel with like-minded people while our trip captains handle everything behind the scenes.
//                     </p>
//                   </div>

//                   <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
//                     <h4 className="font-semibold text-teal-800 mb-1">Curated Itineraries That Just Make Sense</h4>
//                     <p className="text-xs sm:text-sm text-slate-600">
//                       There will be no unplanned itinerary in our packages; each one provides a balanced blend of sightseeing, local flavor, relaxation, and adventure.
//                     </p>
//                   </div>

//                   <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
//                     <h4 className="font-semibold text-teal-800 mb-1">End-to-End Travel Support</h4>
//                     <p className="text-xs sm:text-sm text-slate-600">
//                       Flights, visas, stays, transfers, experiences, it’s all taken care of. Plus, you get 24/7 assistance throughout the trip.
//                     </p>
//                   </div>

//                   <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
//                     <h4 className="font-semibold text-teal-800 mb-1">Custom International Trips</h4>
//                     <p className="text-xs sm:text-sm text-slate-600">
//                       Choose group trips to meet new people or a customized itinerary for personal flexibility. Great options for couples, families, honeymoons, and corporate getaways.
//                     </p>
//                   </div>

//                   <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
//                     <h4 className="font-semibold text-teal-800 mb-1">Safe and Transparent Travel</h4>
//                     <p className="text-xs sm:text-sm text-slate-600">
//                       No hidden costs, no last-minute surprises. Just verified stays, reliable support, and a trip you can trust from start to finish.
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Top Destinations Accordion / Cards */}
//               <div className="pt-6 border-t border-slate-100">
//                 <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
//                   Top Places to Visit With Our International Tours
//                 </h3>

//                 <div className="space-y-6">
//                   {destinations.map((item, index) => (
//                     <div key={index} className="p-5 rounded-lg border border-slate-200 hover:border-teal-300 transition-colors">
//                       <h4 className="text-base sm:text-lg font-bold text-teal-800 mb-2">
//                         {index + 1}. {item.name}
//                       </h4>
//                       <p className="text-xs sm:text-sm text-slate-600 mb-3">{item.description}</p>
                      
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-md">
//                         <div>
//                           <strong className="text-slate-800">Places to Visit:</strong> {item.places}
//                         </div>
//                         <div>
//                           <strong className="text-slate-800">Best Time:</strong> {item.bestTime}
//                         </div>
//                         {item.thingsToDo && (
//                           <div className="sm:col-span-2 mt-1">
//                             <strong className="text-slate-800">Things to Do:</strong> {item.thingsToDo}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Read More / Show Less Toggle Button */}
//           <div className="mt-6 flex justify-end">
//             <button 
//               onClick={() => setIsExpanded(!isExpanded)}
//               className="inline-flex items-center gap-1.5 px-5 py-2 border border-teal-700 text-teal-700 font-medium text-sm rounded-md hover:bg-teal-50 transition-colors duration-150"
//             >
//               {isExpanded ? (
//                 <>
//                   Show Less <ChevronUp className="w-4 h-4" />
//                 </>
//               ) : (
//                 <>
//                   Read More <ChevronDown className="w-4 h-4" />
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Destination dataset extracted from prompt text
// const destinations = [
//   {
//     name: "Europe",
//     description: "Europe is that classic dream trip where every country feels completely different but still easy to combine in one plan.",
//     places: "France, Switzerland, Spain, Italy, Austria, Netherlands",
//     bestTime: "April to June and September to October",
//     thingsToDo: "Explore iconic cities, visit museums, scenic train rides, Oktoberfest"
//   },
//   {
//     name: "Bali",
//     description: "Bali feels like multiple trips in one. From sunrise hikes on Mount Batur to beach clubs in Seminyak.",
//     places: "Ubud, Seminyak, Uluwatu, Nusa Penida, Gili Islands",
//     bestTime: "April to October",
//     thingsToDo: "Sunrise trek on Mount Batur, temple visits, cultural dance shows"
//   },
//   {
//     name: "Vietnam",
//     description: "Vietnam keeps changing as you move through it, offering Buddhist temples and 8 UNESCO World Heritage Sites.",
//     places: "Halong Bay, Ninh Binh, Hanoi, Ho Chi Minh City, Phu Quoc",
//     bestTime: "March to April, October to December",
//     thingsToDo: "Boat cruises, lantern streets walk, cave exploration"
//   },
//   {
//     name: "Bhutan",
//     description: "Bhutan limits tourists so the country stays peaceful. It's the only carbon-negative country in the world.",
//     places: "Paro Taktsang, Thimphu, Paro, Punakha, Bhumthang Valley",
//     bestTime: "March-May & September-November",
//     thingsToDo: "Explore Monasteries, Attend a Tsechu, Try Archery"
//   },
//   {
//     name: "Thailand",
//     description: "Thailand is easy to travel and hard to get bored in. Merges entertainment with culture and traditions.",
//     places: "Krabi, Phi Phi Islands, Bangkok, Phuket, Koh Samui, Chiang Mai",
//     bestTime: "November to February",
//     thingsToDo: "Exploring Historical Sites, Vibrant Markets, Relaxing beside Pristine Beaches"
//   },
//   {
//     name: "Japan",
//     description: "A place where old temples and modern skyscrapers coexist seamlessly alongside tech and anime attractions.",
//     places: "Tokyo, Osaka, Himeji Castle, Mount Fuji, Nara, Shirakawa-go",
//     bestTime: "March-May & September-November",
//     thingsToDo: "Explore Beaches, Visit Museums, Skiing & Snowboard, Hiking"
//   },
//   {
//     name: "Singapore",
//     description: "Small but packed with exciting activities, known for being clean, modern, and super easy to explore.",
//     places: "Gardens by the Bay, Universal Studios, Marina Bay Sands, Merlion Park",
//     bestTime: "February-April",
//     thingsToDo: "Shopping, Jurong Bird Park, Night Safari at Singapore Zoo"
//   },
//   {
//     name: "Kenya",
//     description: "All about wildlife and raw nature. Home to the great migration taking place in Masai Mara.",
//     places: "Maasai Mara National Reserve, Diani Beach, Lamu Island, Mombasa",
//     bestTime: "January-October",
//     thingsToDo: "Wildlife Safari, Enjoy Beaches, Wildlife Photography"
//   },
//   {
//     name: "Georgia",
//     description: "Sits between Europe and Asia, known for mountains, old towns, and ancient wine culture.",
//     places: "Tbilisi, Kazbegi, Kakheti wine region",
//     bestTime: "May to June, September to October",
//     thingsToDo: "Hike Caucasus Mountains, visit monasteries, try local khachapuri"
//   },
//   {
//     name: "Turkey",
//     description: "Feels like two continents in one trip with rich cultural heritage and dream-like scenery in Cappadocia.",
//     places: "Istanbul, Cappadocia, Pamukkale",
//     bestTime: "April to May, September to November",
//     thingsToDo: "Hot air balloon ride, Bosphorus cruise, explore Grand Bazaar"
//   },
//   {
//     name: "Maldives",
//     description: "Clear blue water, overwater villas, and effortless relaxation with both luxury and budget options.",
//     places: "Sun Island, Vaadhoo Island, No Bikini Beach, Male City, Baa Atoll",
//     bestTime: "November-April",
//     thingsToDo: "Diving, Snorkeling, Dolphin Watching, Jet Skiing"
//   },
//   {
//     name: "Malaysia",
//     description: "A blend of vibrant cultures, iconic skyscrapers, ancient rainforests, and island beaches.",
//     places: "Kuala Lumpur, Penang, Melaka, Langkawi, Cameron Highlands",
//     bestTime: "December-March & April-November",
//     thingsToDo: "Visit Beaches & Temples, Adventure Activities, Waterfalls"
//   },
//   {
//     name: "Dubai",
//     description: "Where everything feels bigger and more dramatic—from the Burj Khalifa to desert safaris.",
//     places: "Burj Khalifa, Museum of the Future, Global Village, Dubai Frame",
//     bestTime: "November-March",
//     thingsToDo: "Desert Safari, Skydiving, Yacht Partying, Luxury Shopping"
//   },
//   {
//     name: "Australia",
//     description: "Big landscapes and iconic landmarks ranging from the Sydney Opera House to the Great Barrier Reef.",
//     places: "Sydney Opera House, Bondi Beach, Uluru, Kangaroo Islands",
//     bestTime: "March-May & September-November",
//     thingsToDo: "Snorkeling, Scuba Diving, Sailing, Walking Trails"
//   },
//   {
//     name: "New Zealand",
//     description: "Clean air, massive mountain ranges, and surreal blue lakes perfect for road trips.",
//     places: "Queenstown, Abel Tasman, Wellington, Auckland, Hobbiton",
//     bestTime: "December to February",
//     thingsToDo: "Hiking, Kayaking, Bungee Jumping, Whale Watching"
//   },
//   {
//     name: "South Africa",
//     description: "Offers a bit of everything: wildlife safaris, ocean coastlines, vibrant cities, and wine valleys.",
//     places: "Kruger National Park, Cape Town, Garden Route, Drakensberg",
//     bestTime: "May-September & November-March",
//     thingsToDo: "Wildlife Safari, Explore Beaches, Wine Tasting"
//   },
//   {
//     name: "Philippines",
//     description: "Over 7,000 islands featuring crystal waters, coral reefs, and laid-back tropical vibes.",
//     places: "Palawan, Boracay, Cebu",
//     bestTime: "December to February",
//     thingsToDo: "Diving, island hopping tours, beach relaxation"
//   },
//   {
//     name: "Egypt",
//     description: "Historic sights that feel larger than life: ancient Pyramids of Giza, the Sphinx, and Nile cruises.",
//     places: "Cairo, Luxor, Aswan, Red Sea resorts",
//     bestTime: "October to April",
//     thingsToDo: "Nile cruise, explore ancient tombs, Red Sea snorkeling"
//   },
//   {
//     name: "Almaty (Kazakhstan)",
//     description: "Underrated destination with mountain vistas, clean cities, and distinct seasonal transformations.",
//     places: "Kok Tobe Hill, Ascension Cathedral, Shymbulak, Big Almaty Lake",
//     bestTime: "June-September",
//     thingsToDo: "Cable Cars, Skiing at Shymbulak, Green Bazaar Tour"
//   },
//   {
//     name: "Mauritius",
//     description: "Calm and premium beach breaks featuring white sand, tropical forests, and luxury resorts.",
//     places: "Flic en Flac, Black River Gorges, Le Morne Beach",
//     bestTime: "May-December",
//     thingsToDo: "Hiking, Parasailing, Snorkeling, Jet Skiing"
//   },
//   {
//     name: "Sri Lanka",
//     description: "Compact island packed with tea plantations, ancient temples, beaches, and scenic train routes.",
//     places: "Colombo, Kandy, Ella, Sigiriya, Dambulla, Yala",
//     bestTime: "December-Mid April",
//     thingsToDo: "Tea factory tours, Wildlife Safari, Scenic Train Ride, Hiking"
//   }
// ];




import React, { useState, useRef } from 'react';
import { 
  Star, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetFeaturedTripsQuery } from '../../store/api/tripApi';

export default function InternationalPackages() {
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollContainerRef = useRef(null);

  const { data, isLoading, isError } = useGetFeaturedTripsQuery(6);
  const trips = data?.data || [];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full bg-slate-50 font-sans min-h-screen pb-16">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[380px] bg-slate-900 overflow-hidden flex flex-col justify-between p-6 sm:p-10">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1600&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        <div className="relative z-10 max-w-4xl mt-4">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-16 bg-yellow-400 rounded-sm shrink-0 mt-1" />
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                International Tour Packages 2026: Best Deals on Global Holidays
              </h1>
            </div>
          </div>

          <div className="mt-4 inline-block bg-yellow-400 px-4 py-1.5 rounded-sm">
            <p className="text-sm sm:text-base font-semibold text-slate-900">
              Your Gateway to Exciting International Trips Starts Here
            </p>
          </div>
        </div>

        {/* Reviews Footer */}
        <div className="relative z-10 flex flex-wrap items-center justify-center sm:justify-start gap-8 pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-blue-600">
              G
            </div>
            <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">4.9</span>
              <span className="text-slate-300">(15263 reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">
              OO
            </div>
            <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">5.0</span>
              <span className="text-slate-300">(4213 reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
              f
            </div>
            <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">4.9</span>
              <span className="text-slate-300">(1123 reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Content Section */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 sm:p-8 relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-7 bg-yellow-400 rounded-sm" />
            <h2 className="text-xl sm:text-2xl font-bold text-teal-800">
              Best International Tour Packages
            </h2>
          </div>

          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              Planning an international trip but don’t know where to start? WanderOn makes it simple and actually fun. With{' '}
              <strong className="text-slate-800">20+ iconic destinations</strong> to choose from, you can go from Bali beaches to Dubai skylines, from Europe’s dreamy streets to Thailand’s party scenes, all without the usual planning stress.
            </p>
            <p>
              The best part is the flexibility. WanderOn’s international tour packages usually range from{' '}
              <strong className="text-slate-800">5 to 15 days</strong>, which means that you can always find the right type of trip depending on how much time you have for it. Moreover, you have a choice between a group tour and a more personalised one.
            </p>
            
            {!isExpanded && (
              <p className="line-clamp-1 opacity-70">
                Packages generally start from around ₹20,000 and can go up to ₹2,00,000+ per person depending on the destination and experiences you choose. Flights, stays...
              </p>
            )}
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-8 text-slate-600 text-sm sm:text-base leading-relaxed animate-fadeIn">
              <p>
                Packages generally start from around ₹20,000 and can go up to ₹2,00,000+ per person, depending on the destination and experiences you choose. Flights, stays, experiences, everything is sorted. You just show up, explore, and enjoy. It’s basically international travel without the chaos.
              </p>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
                  Why WanderOn Is the Go-To for International Holiday Packages
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <h4 className="font-semibold text-teal-800 mb-1">Great Deals on Bucket-List Destinations</h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Explore places like Europe, Bali, Vietnam, Bhutan, and Thailand with exciting ongoing offers. If a trip has been on your mind, this is your sign to go for it.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <h4 className="font-semibold text-teal-800 mb-1">Group Trips with Amazing Trip Captains</h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Our international trips from India are designed to be social, fun, and stress-free. Travel with like-minded people while our trip captains handle everything behind the scenes.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <h4 className="font-semibold text-teal-800 mb-1">Curated Itineraries That Just Make Sense</h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      There will be no unplanned itinerary in our packages; each one provides a balanced blend of sightseeing, local flavor, relaxation, and adventure.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <h4 className="font-semibold text-teal-800 mb-1">End-to-End Travel Support</h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Flights, visas, stays, transfers, experiences, it’s all taken care of. Plus, you get 24/7 assistance throughout the trip.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <h4 className="font-semibold text-teal-800 mb-1">Custom International Trips</h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Choose group trips to meet new people or a customized itinerary for personal flexibility. Great options for couples, families, honeymoons, and corporate getaways.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                    <h4 className="font-semibold text-teal-800 mb-1">Safe and Transparent Travel</h4>
                    <p className="text-xs sm:text-sm text-slate-600">
                      No hidden costs, no last-minute surprises. Just verified stays, reliable support, and a trip you can trust from start to finish.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
                  Top Places to Visit With Our International Tours
                </h3>

                <div className="space-y-6">
                  {destinationsDetail.map((item, index) => (
                    <div key={index} className="p-5 rounded-lg border border-slate-200 hover:border-teal-300 transition-colors">
                      <h4 className="text-base sm:text-lg font-bold text-teal-800 mb-2">
                        {index + 1}. {item.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mb-3">{item.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-md">
                        <div>
                          <strong className="text-slate-800">Places to Visit:</strong> {item.places}
                        </div>
                        <div>
                          <strong className="text-slate-800">Best Time:</strong> {item.bestTime}
                        </div>
                        {item.thingsToDo && (
                          <div className="sm:col-span-2 mt-1">
                            <strong className="text-slate-800">Things to Do:</strong> {item.thingsToDo}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-5 py-2 border border-teal-700 text-teal-700 font-medium text-sm rounded-md hover:bg-teal-50 transition-colors duration-150"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Read More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Destinations Poster Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
        <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 text-center mb-8">
          Destinations
        </h2>

        {/* Carousel Controls */}
        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            onClick={() => scroll('left')}
            className="p-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm transition-all active:scale-95"
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm transition-all active:scale-95"
            aria-label="Next Slide"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Poster Cards Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-6 pt-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {isLoading && (
            <div className="text-slate-400 py-10 w-full text-center">Loading Destinations...</div>
          )}

          {isError && (
            <div className="text-red-400 py-10 w-full text-center">Failed to load destinations.</div>
          )}

          {!isLoading && !isError && trips.filter(trip => trip.type === "international").map((trip) => {
            const imageUrl = trip.images[0]?.url || trip.thumbnail?.url || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop';
            const tagline = trip.subtitle || trip.tagline || 'Unforgettable Journeys';

            return (
              <Link
                key={trip._id}
                to={`/trips/${trip.slug}`}
                className="group relative min-w-[260px] sm:min-w-[280px] h-[380px] rounded-2xl overflow-hidden bg-white shadow-md snap-start shrink-0 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-400 z-20" />

                {/* Card Cover Image */}
                <img
                  src={imageUrl}
                  alt={trip.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Vignette Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60" />

                {/* Top Stylized Tagline */}
                <div className="absolute top-6 left-0 right-0 text-center px-4 z-10">
                  <p className="text-xs sm:text-sm font-medium tracking-wide text-white/90 drop-shadow-md italic">
                    {tagline}
                  </p>
                </div>

                {/* Bottom Main Title Banner */}
                <div className="absolute bottom-6 left-0 right-0 text-center px-4 z-10">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider uppercase drop-shadow-lg">
                    {trip.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

const destinationsDetail = [
  {
    name: "Europe",
    description: "Europe is that classic dream trip where every country feels completely different but still easy to combine in one plan.",
    places: "France, Switzerland, Spain, Italy, Austria, Netherlands",
    bestTime: "April to June and September to October",
    thingsToDo: "Explore iconic cities, visit museums, scenic train rides, Oktoberfest"
  },
  {
    name: "Bali",
    description: "Bali feels like multiple trips in one. From sunrise hikes on Mount Batur to beach clubs in Seminyak.",
    places: "Ubud, Seminyak, Uluwatu, Nusa Penida, Gili Islands",
    bestTime: "April to October",
    thingsToDo: "Sunrise trek on Mount Batur, temple visits, cultural dance shows"
  },
  {
    name: "Vietnam",
    description: "Vietnam keeps changing as you move through it, offering Buddhist temples and 8 UNESCO World Heritage Sites.",
    places: "Halong Bay, Ninh Binh, Hanoi, Ho Chi Minh City, Phu Quoc",
    bestTime: "March to April, October to December",
    thingsToDo: "Boat cruises, lantern streets walk, cave exploration"
  },
  {
    name: "Bhutan",
    description: "Bhutan limits tourists so the country stays peaceful. It's the only carbon-negative country in the world.",
    places: "Paro Taktsang, Thimphu, Paro, Punakha, Bhumthang Valley",
    bestTime: "March-May & September-November",
    thingsToDo: "Explore Monasteries, Attend a Tsechu, Try Archery"
  },
  {
    name: "Thailand",
    description: "Thailand is easy to travel and hard to get bored in. Merges entertainment with culture and traditions.",
    places: "Krabi, Phi Phi Islands, Bangkok, Phuket, Koh Samui, Chiang Mai",
    bestTime: "November to February",
    thingsToDo: "Exploring Historical Sites, Vibrant Markets, Relaxing beside Pristine Beaches"
  },
  {
    name: "Japan",
    description: "A place where old temples and modern skyscrapers coexist seamlessly alongside tech and anime attractions.",
    places: "Tokyo, Osaka, Himeji Castle, Mount Fuji, Nara, Shirakawa-go",
    bestTime: "March-May & September-November",
    thingsToDo: "Explore Beaches, Visit Museums, Skiing & Snowboard, Hiking"
  },
  {
    name: "Singapore",
    description: "Small but packed with exciting activities, known for being clean, modern, and super easy to explore.",
    places: "Gardens by the Bay, Universal Studios, Marina Bay Sands, Merlion Park",
    bestTime: "February-April",
    thingsToDo: "Shopping, Jurong Bird Park, Night Safari at Singapore Zoo"
  },
  {
    name: "Kenya",
    description: "All about wildlife and raw nature. Home to the great migration taking place in Masai Mara.",
    places: "Maasai Mara National Reserve, Diani Beach, Lamu Island, Mombasa",
    bestTime: "January-October",
    thingsToDo: "Wildlife Safari, Enjoy Beaches, Wildlife Photography"
  },
  {
    name: "Georgia",
    description: "Sits between Europe and Asia, known for mountains, old towns, and ancient wine culture.",
    places: "Tbilisi, Kazbegi, Kakheti wine region",
    bestTime: "May to June, September to October",
    thingsToDo: "Hike Caucasus Mountains, visit monasteries, try local khachapuri"
  },
  {
    name: "Turkey",
    description: "Feels like two continents in one trip with rich cultural heritage and dream-like scenery in Cappadocia.",
    places: "Istanbul, Cappadocia, Pamukkale",
    bestTime: "April to May, September to November",
    thingsToDo: "Hot air balloon ride, Bosphorus cruise, explore Grand Bazaar"
  },
  {
    name: "Maldives",
    description: "Clear blue water, overwater villas, and effortless relaxation with both luxury and budget options.",
    places: "Sun Island, Vaadhoo Island, No Bikini Beach, Male City, Baa Atoll",
    bestTime: "November-April",
    thingsToDo: "Diving, Snorkeling, Dolphin Watching, Jet Skiing"
  },
  {
    name: "Malaysia",
    description: "A blend of vibrant cultures, iconic skyscrapers, ancient rainforests, and island beaches.",
    places: "Kuala Lumpur, Penang, Melaka, Langkawi, Cameron Highlands",
    bestTime: "December-March & April-November",
    thingsToDo: "Visit Beaches & Temples, Adventure Activities, Waterfalls"
  },
  {
    name: "Dubai",
    description: "Where everything feels bigger and more dramatic—from the Burj Khalifa to desert safaris.",
    places: "Burj Khalifa, Museum of the Future, Global Village, Dubai Frame",
    bestTime: "November-March",
    thingsToDo: "Desert Safari, Skydiving, Yacht Partying, Luxury Shopping"
  },
  {
    name: "Australia",
    description: "Big landscapes and iconic landmarks ranging from the Sydney Opera House to the Great Barrier Reef.",
    places: "Sydney Opera House, Bondi Beach, Uluru, Kangaroo Islands",
    bestTime: "March-May & September-November",
    thingsToDo: "Snorkeling, Scuba Diving, Sailing, Walking Trails"
  },
  {
    name: "New Zealand",
    description: "Clean air, massive mountain ranges, and surreal blue lakes perfect for road trips.",
    places: "Queenstown, Abel Tasman, Wellington, Auckland, Hobbiton",
    bestTime: "December to February",
    thingsToDo: "Hiking, Kayaking, Bungee Jumping, Whale Watching"
  },
  {
    name: "South Africa",
    description: "Offers a bit of everything: wildlife safaris, ocean coastlines, vibrant cities, and wine valleys.",
    places: "Kruger National Park, Cape Town, Garden Route, Drakensberg",
    bestTime: "May-September & November-March",
    thingsToDo: "Wildlife Safari, Explore Beaches, Wine Tasting"
  },
  {
    name: "Philippines",
    description: "Over 7,000 islands featuring crystal waters, coral reefs, and laid-back tropical vibes.",
    places: "Palawan, Boracay, Cebu",
    bestTime: "December to February",
    thingsToDo: "Diving, island hopping tours, beach relaxation"
  },
  {
    name: "Egypt",
    description: "Historic sights that feel larger than life: ancient Pyramids of Giza, the Sphinx, and Nile cruises.",
    places: "Cairo, Luxor, Aswan, Red Sea resorts",
    bestTime: "October to April",
    thingsToDo: "Nile cruise, explore ancient tombs, Red Sea snorkeling"
  },
  {
    name: "Almaty (Kazakhstan)",
    description: "Underrated destination with mountain vistas, clean cities, and distinct seasonal transformations.",
    places: "Kok Tobe Hill, Ascension Cathedral, Shymbulak, Big Almaty Lake",
    bestTime: "June-September",
    thingsToDo: "Cable Cars, Skiing at Shymbulak, Green Bazaar Tour"
  },
  {
    name: "Mauritius",
    description: "Calm and premium beach breaks featuring white sand, tropical forests, and luxury resorts.",
    places: "Flic en Flac, Black River Gorges, Le Morne Beach",
    bestTime: "May-December",
    thingsToDo: "Hiking, Parasailing, Snorkeling, Jet Skiing"
  },
  {
    name: "Sri Lanka",
    description: "Compact island packed with tea plantations, ancient temples, beaches, and scenic train routes.",
    places: "Colombo, Kandy, Ella, Sigiriya, Dambulla, Yala",
    bestTime: "December-Mid April",
    thingsToDo: "Tea factory tours, Wildlife Safari, Scenic Train Ride, Hiking"
  }
];