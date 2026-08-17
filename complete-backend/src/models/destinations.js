import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String }
});

const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: String, default: () => new Date().toLocaleDateString() }
});

const addOnSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State or region is required'],
      trim: true
    },
    tagline: { type: String },
    description: { type: String, required: true },
    image: { type: String, required: true },
    knownFor: { type: String },
    bestTimeToVisit: { type: String },
    urgencyText: { type: String },
    
    // Rating object matching frontend expectations
    rating: {
      score: { type: Number, default: 0 },
      reviewsCount: { type: Number, default: 0 }
    },

    // Pricing details
    pricing: {
      discountedPrice: { type: Number, required: true },
      originalPrice: { type: Number },
      discountPercentage: { type: String },
    }
  },
  {
    timestamps: true
  }
);

// Optional text index for search functionality
destinationSchema.index({ name: 'text', state: 'text', knownFor: 'text' });

const Destination = mongoose.model('destinations', destinationSchema);

export default Destination;




const seedDestinations = [
  {
    name: 'manali',
    state: 'Himachal Pradesh',
    tagline: 'Lover’s Paradise in the Himalayas',
    description: 'A high-altitude Himalayan resort town known for snow-capped peaks, adventure sports, and scenic valleys.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
    knownFor: 'Snow sports, Solang Valley, Rohtang Pass, Trekking',
    bestTimeToVisit: 'October to June',
    urgencyText: 'Selling fast for summer season!',
    rating: { score: 4.8, reviewsCount: 1240 },
    pricing: { discountedPrice: 12999, originalPrice: 18999, discountPercentage: '31% OFF' }
  },
  {
    name: 'goa',
    state: 'Goa',
    tagline: 'Sun, Sand, and Beaches',
    description: 'India’s pocket-sized paradise famous for pristine beaches, nightlife, Portuguese heritage, and seafood.',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
    knownFor: 'Beaches, Nightlife, Water Sports, Waterfalls',
    bestTimeToVisit: 'November to February',
    urgencyText: 'Limited deals on beach resorts!',
    rating: { score: 4.7, reviewsCount: 2100 },
    pricing: { discountedPrice: 9999, originalPrice: 14999, discountPercentage: '33% OFF' }
  },
  {
    name: 'kerala',
    state: 'Kerala',
    tagline: 'God’s Own Country',
    description: 'Famed for its palm-lined backwaters, tea plantations, lush greenery, and rich cultural traditions.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944',
    knownFor: 'Backwaters, Houseboats, Munnar Tea Gardens, Ayurveda',
    bestTimeToVisit: 'September to March',
    urgencyText: 'Special backwater tour discounts!',
    rating: { score: 4.9, reviewsCount: 1850 },
    pricing: { discountedPrice: 15499, originalPrice: 22000, discountPercentage: '29% OFF' }
  },
  {
    name: 'ladakh',
    state: 'Ladakh',
    tagline: 'Land of High Passes',
    description: 'A dramatic cold desert landscape featuring majestic monasteries, crystal-clear lakes, and towering mountain passes.',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2',
    knownFor: 'Pangong Lake, Khardung La, Nubra Valley, Monasteries',
    bestTimeToVisit: 'May to September',
    urgencyText: 'High demand for bike expeditions!',
    rating: { score: 4.9, reviewsCount: 980 },
    pricing: { discountedPrice: 24999, originalPrice: 32000, discountPercentage: '21% OFF' }
  },
  {
    name: 'rajasthan',
    state: 'Rajasthan',
    tagline: 'Land of Kings',
    description: 'A vibrant state filled with grand palaces, desert fortresses, rich folklore, and golden sand dunes.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
    knownFor: 'Forts, Palaces, Thar Desert, Cultural Heritage',
    bestTimeToVisit: 'October to March',
    urgencyText: 'Desert safari packages on sale!',
    rating: { score: 4.8, reviewsCount: 1650 },
    pricing: { discountedPrice: 17999, originalPrice: 25000, discountPercentage: '28% OFF' }
  },
  {
    name: 'spiti valley',
    state: 'Himachal Pradesh',
    tagline: 'The Middle Land',
    description: 'A high-altitude desert mountain valley known for ancient Tibetan Buddhist monasteries and surreal landscapes.',
    image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b',
    knownFor: 'Key Monastery, Chandratal Lake, Kaza, High altitude passes',
    bestTimeToVisit: 'June to September',
    urgencyText: 'Limited slots available for road trips!',
    rating: { score: 4.9, reviewsCount: 620 },
    pricing: { discountedPrice: 18999, originalPrice: 26000, discountPercentage: '26% OFF' }
  },
  {
    name: 'andaman',
    state: 'Andaman & Nicobar Islands',
    tagline: 'Emerald Islands of India',
    description: 'Exotic tropical islands featuring white-sand beaches, coral reefs, crystal clear water, and water sports.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3',
    knownFor: 'Radhanagar Beach, Scuba Diving, Cellular Jail, Snorkeling',
    bestTimeToVisit: 'October to May',
    urgencyText: 'Early bird offer on island tours!',
    rating: { score: 4.8, reviewsCount: 1120 },
    pricing: { discountedPrice: 22999, originalPrice: 31000, discountPercentage: '25% OFF' }
  },
  {
    name: 'meghalaya',
    state: 'Meghalaya',
    tagline: 'Abode of Clouds',
    description: 'Famed for its living root bridges, stunning waterfalls, deep caves, and clean mountain villages.',
    image: 'https://images.unsplash.com/photo-1626014903708-20898522e431',
    knownFor: 'Living Root Bridges, Cherrapunji, Dawki River, Waterfalls',
    bestTimeToVisit: 'October to April',
    urgencyText: 'Unbeatable prices for monsoon/post-monsoon!',
    rating: { score: 4.7, reviewsCount: 740 },
    pricing: { discountedPrice: 14499, originalPrice: 20000, discountPercentage: '27% OFF' }
  },
  {
    name: 'shimla',
    state: 'Himachal Pradesh',
    tagline: 'Queen of the Hills',
    description: 'A historic colonial hill station surrounded by oak and pine forests, famous for Mall Road and toy train.',
    image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358',
    knownFor: 'The Ridge, Mall Road, Kalka-Shimla Toy Train, Jakhu Temple',
    bestTimeToVisit: 'March to June, Dec to Jan',
    urgencyText: 'Hurry! Weekend packages booking fast!',
    rating: { score: 4.6, reviewsCount: 1430 },
    pricing: { discountedPrice: 8999, originalPrice: 12999, discountPercentage: '30% OFF' }
  },
  {
    name: 'jaipur',
    state: 'Rajasthan',
    tagline: 'The Pink City',
    description: 'Capital city of Rajasthan renowned for historic architecture, magnificent pink-colored heritage structures, and bustling markets.',
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a',
    knownFor: 'Hawa Mahal, Amer Fort, City Palace, Street Food',
    bestTimeToVisit: 'October to March',
    urgencyText: 'Popular weekend getaway package!',
    rating: { score: 4.7, reviewsCount: 1980 },
    pricing: { discountedPrice: 6999, originalPrice: 10500, discountPercentage: '33% OFF' }
  },
  {
    name: 'sikkim',
    state: 'Sikkim',
    tagline: 'Valley of Flowers & Monasteries',
    description: 'Nestled in the Himalayas, home to Kangchenjunga peak, glacial lakes, orchids, and serene monasteries.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
    knownFor: 'Nathula Pass, Tsomgo Lake, Gangtok, Yumthang Valley',
    bestTimeToVisit: 'March to May, Oct to Dec',
    urgencyText: 'Limited permits available!',
    rating: { score: 4.8, reviewsCount: 890 },
    pricing: { discountedPrice: 16999, originalPrice: 23000, discountPercentage: '26% OFF' }
  },
  {
    name: 'uttarakhand',
    state: 'Uttarakhand',
    tagline: 'Devbhoomi - Land of Gods',
    description: 'A sanctuary of holy rivers, sacred pilgrimage sites, trekking routes, and serene hill stations like Nainital & Mussoorie.',
    image: 'https://images.unsplash.com/photo-1600240644455-3edc55c375fe',
    knownFor: 'Pilgrimage, Trekking, Rishikesh Rafting, Wildlife',
    bestTimeToVisit: 'March to June, Sept to Nov',
    urgencyText: 'Adventure package deal ending soon!',
    rating: { score: 4.7, reviewsCount: 1560 },
    pricing: { discountedPrice: 11999, originalPrice: 16500, discountPercentage: '27% OFF' }
  },
  {
    name: 'nagaland',
    state: 'Nagaland',
    tagline: 'Land of Festivals',
    description: 'A vibrant northeastern state rich in tribal traditions, lush hills, and the world-famous Hornbill Festival.',
    image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32',
    knownFor: 'Hornbill Festival, Dzukou Valley, Tribal Culture, Kohima',
    bestTimeToVisit: 'October to May',
    urgencyText: 'Hornbill season special slots!',
    rating: { score: 4.6, reviewsCount: 410 },
    pricing: { discountedPrice: 15999, originalPrice: 21000, discountPercentage: '23% OFF' }
  },
  {
    name: 'himachal pradesh',
    state: 'Himachal Pradesh',
    tagline: 'Land of Gods & Snowy Peaks',
    description: 'A northern state blessed with breathtaking alpine landscapes, pine valleys, and popular adventure centers.',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
    knownFor: 'Valleys, Paragliding, Hill Stations, Trekking',
    bestTimeToVisit: 'March to June, Oct to Feb',
    urgencyText: 'Book now for winter/summer packages!',
    rating: { score: 4.8, reviewsCount: 2200 },
    pricing: { discountedPrice: 13999, originalPrice: 19500, discountPercentage: '28% OFF' }
  },

  // --- Other Major Indian Destinations ---
  {
    name: 'varanasi',
    state: 'Uttar Pradesh',
    tagline: 'Spiritual Capital of India',
    description: 'One of the world’s oldest continuously inhabited cities, known for its sacred Ganges river ghats and evening Ganga Aarti.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc',
    knownFor: 'Ghats, Ganga Aarti, Temples, Sarnath',
    bestTimeToVisit: 'October to March',
    urgencyText: 'Popular spiritual tour!',
    rating: { score: 4.8, reviewsCount: 1750 },
    pricing: { discountedPrice: 7999, originalPrice: 11500, discountPercentage: '30% OFF' }
  },
  {
    name: 'agra',
    state: 'Uttar Pradesh',
    tagline: 'Home of the Taj Mahal',
    description: 'Famous globally for the iconic Taj Mahal, grand Mughal monuments, and historical heritage.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
    knownFor: 'Taj Mahal, Agra Fort, Fatehpur Sikri',
    bestTimeToVisit: 'October to March',
    urgencyText: 'Daily heritage departure tours available!',
    rating: { score: 4.8, reviewsCount: 3100 },
    pricing: { discountedPrice: 4999, originalPrice: 7500, discountPercentage: '33% OFF' }
  },
  {
    name: 'kashmir',
    state: 'Jammu & Kashmir',
    tagline: 'Paradise on Earth',
    description: 'Renowned for its breathtaking valleys, serene Dal Lake houseboats, snow peaks, and tulip gardens.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d',
    knownFor: 'Srinagar, Gulmarg Skiing, Pahalgam, Dal Lake Shikara',
    bestTimeToVisit: 'March to October',
    urgencyText: 'High demand for snow season!',
    rating: { score: 4.9, reviewsCount: 2400 },
    pricing: { discountedPrice: 19999, originalPrice: 28000, discountPercentage: '28% OFF' }
  }
];








// db.destinations.insertMany([
//   {
//     name: "Manali",
//     state: "Himachal Pradesh",
//     tagline: "Lover’s Paradise in the Himalayas",
//     description: "A high-altitude Himalayan resort town known for snow-capped peaks, adventure sports, and scenic valleys.",
//     image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
//     knownFor: "Snow sports, Solang Valley, Rohtang Pass",
//     bestTimeToVisit: "October to June",
//     rating: { score: 4.8, reviewsCount: 1240 },
//     pricing: { discountedPrice: 12999, originalPrice: 18999, discountPercentage: "31% OFF" },
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     name: "Goa",
//     state: "Goa",
//     tagline: "Sun, Sand, and Beaches",
//     description: "India’s pocket-sized paradise famous for pristine beaches, nightlife, Portuguese heritage, and seafood.",
//     image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
//     knownFor: "Beaches, Nightlife, Water Sports",
//     bestTimeToVisit: "November to February",
//     rating: { score: 4.7, reviewsCount: 2100 },
//     pricing: { discountedPrice: 9999, originalPrice: 14999, discountPercentage: "33% OFF" },
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
//   // Add remaining objects from the JSON array above
// ]);



// {
//   name: 'bali',
//   state: 'Bali',
//   tagline: 'Island of the Gods',
//   description: 'Indonesia’s tropical paradise famous for lush rice terraces, sacred temples, iconic surf spots, and vibrant culture.',
//   image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
//   knownFor: 'Temples, Surfing, Rice Terraces, Wellness & Yoga',
//   bestTimeToVisit: 'April to October',
//   urgencyText: 'Limited deals on villa stays!',
//   rating: { score: 4.8, reviewsCount: 3400 },
//   pricing: { discountedPrice: 18999, originalPrice: 26999 }
// }

// same schema generate for 
// Iceland, sri-lanka, Georgia, bhutan,Kazakhstan,Mauritius, kenya,spain,egypt,switzerland,philipines







[
{
name: 'thailand',
state: 'Bangkok & Islands',
tagline: 'Land of Smiles',
description: 'A vibrant mix of ornate temples, bustling floating markets, world-famous street food, and pristine tropical beaches.',
image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa',
knownFor: 'Street Food, Beaches, Nightlife, Buddhist Temples',
bestTimeToVisit: 'November to April',
urgencyText: 'Popular island tours booking fast!',
rating: { score: 4.7, reviewsCount: 4120 },
pricing: { discountedPrice: 21999, originalPrice: 29999 }
},
{
name: 'europe',
state: 'Schengen Area',
tagline: 'Continent of Dreams',
description: 'Immerse yourself in historic landmarks, world-class art, fairytale castles, and diverse culinary capitals.',
image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
knownFor: 'Architecture, History, Fine Dining, Alpine Landscapes',
bestTimeToVisit: 'May to September',
urgencyText: 'Early bird summer packages on sale!',
rating: { score: 4.9, reviewsCount: 5800 },
pricing: { discountedPrice: 89999, originalPrice: 115000 }
},
{
name: 'vietnam',
state: 'Hanoi & Beyond',
tagline: 'Timeless Charm',
description: 'Discover dramatic emerald bays, historic French-colonial towns, rich heritage, and unbeatable local cuisine.',
image: 'https://images.unsplash.com/photo-1528127269322-539801943592',
knownFor: 'Ha Long Bay, Coffee Culture, Street Food, Rich History',
bestTimeToVisit: 'December to April',
urgencyText: 'Save big on Ha Long Bay cruises!',
rating: { score: 4.7, reviewsCount: 2150 },
pricing: { discountedPrice: 16999, originalPrice: 23999 }
},
{
name: 'dubai',
state: 'Dubai',
tagline: 'City of Gold',
description: 'A futuristic oasis known for ultra-modern architecture, luxury shopping, desert safaris, and high-octane nightlife.',
image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
knownFor: 'Burj Khalifa, Desert Safaris, Luxury Shopping, Theme Parks',
bestTimeToVisit: 'November to March',
urgencyText: 'Exclusive hotel upgrades available!',
rating: { score: 4.8, reviewsCount: 4900 },
pricing: { discountedPrice: 34999, originalPrice: 48999 }
},
{
name: 'singapore',
state: 'Singapore',
tagline: 'The Garden City',
description: 'A futuristic city-state blending lush green spaces, iconic skyline views, world-class shopping, and multicultural flavors.',
image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
knownFor: 'Gardens by the Bay, Marina Bay Sands, Street Food, Luxury Shopping',
bestTimeToVisit: 'February to October',
urgencyText: 'Family pass discounts ending soon!',
rating: { score: 4.8, reviewsCount: 3800 },
pricing: { discountedPrice: 29999, originalPrice: 39999 }
},
{
name: 'maldives',
state: 'Male Atoll',
tagline: 'Sunny Side of Life',
description: 'An idyllic tropical paradise featuring private overwater bungalows, crystal-clear turquoise lagoons, and vibrant coral reefs.',
image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
knownFor: 'Overwater Villas, Scuba Diving, Honeymoons, White Sand Beaches',
bestTimeToVisit: 'November to April',
urgencyText: 'Complimentary speedboat transfers included!',
rating: { score: 4.9, reviewsCount: 2950 },
pricing: { discountedPrice: 45999, originalPrice: 62999 }
},
{
name: 'australia',
state: 'New South Wales & Beyond',
tagline: 'There is Nothing Like Australia',
description: 'Experience dramatic outback landscapes, pristine ocean beaches, iconic coastal cities, and extraordinary wildlife.',
image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
knownFor: 'Great Barrier Reef, Sydney Opera House, Wildlife, Surf Beaches',
bestTimeToVisit: 'September to November & March to May',
urgencyText: 'Flight-inclusive package deals closing!',
rating: { score: 4.8, reviewsCount: 3100 },
pricing: { discountedPrice: 79999, originalPrice: 105000 }
},
{
name: 'spain',
state: 'Madrid & Catalonia',
tagline: 'Passionate by Nature',
description: 'Feel the energy of vibrant flamenco, breathtaking Gothic and Gaudi architecture, sun-drenched coasts, and legendary tapas.',
image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325',
knownFor: 'Tapas, Sagrada Familia, Flamenco, Mediterranean Coast',
bestTimeToVisit: 'April to June & September to October',
urgencyText: 'High demand for Barcelona city breaks!',
rating: { score: 4.7, reviewsCount: 2750 },
pricing: { discountedPrice: 54999, originalPrice: 72999 }
},
{
name: 'france',
state: 'Île-de-France & Provence',
tagline: 'Rendez-vous en France',
description: 'Indulge in high fashion, iconic romance, world-famous wines, idyllic lavender fields, and unmatched culinary art.',
image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
knownFor: 'Eiffel Tower, Fine Wine, Art Museums, French Riviera',
bestTimeToVisit: 'April to May & September to October',
urgencyText: 'Paris romantic getaway deals selling out!',
rating: { score: 4.8, reviewsCount: 4600 },
pricing: { discountedPrice: 59999, originalPrice: 79999 }
},
{
name: 'south africa',
state: 'Western Cape & Gauteng',
tagline: 'Inspiring New Ways',
description: 'A country of dramatic contrasts featuring thrilling wildlife safaris, magnificent winelands, and stunning coastal cliffs.',
image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
knownFor: 'Big Five Safaris, Table Mountain, Wine Tasting, Coastal Drives',
bestTimeToVisit: 'May to September (Safaris) & November to March (Cape Town)',
urgencyText: 'Limited safari lodge slots left!',
rating: { score: 4.8, reviewsCount: 1890 },
pricing: { discountedPrice: 49999, originalPrice: 68999 }
},
{
name: 'malaysia',
state: 'Kuala Lumpur & Islands',
tagline: 'Truly Asia',
description: 'A dynamic fusion of modern skyscrapers, ancient rainforests, tropical islands, and rich multicultural traditions.',
image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07',
knownFor: 'Petronas Towers, Batu Caves, Rainforests, Langkawi Beaches',
bestTimeToVisit: 'December to April',
urgencyText: 'Special discounts on island resort stays!',
rating: { score: 4.6, reviewsCount: 2400 },
pricing: { discountedPrice: 19999, originalPrice: 27999 }
},
{
name: 'turkey',
state: 'Marmara & Cappadocia',
tagline: 'Where East Meets West',
description: 'Explore the historic crossroads of continents with ancient ruins, surreal fairy chimneys, bustling bazaars, and hot air balloons.',
image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200',
knownFor: 'Cappadocia Balloons, Grand Bazaar, Hagia Sophia, Turkish Baths',
bestTimeToVisit: 'April to May & September to October',
urgencyText: 'Cappadocia balloon slot offers active!',
rating: { score: 4.8, reviewsCount: 3650 },
pricing: { discountedPrice: 38999, originalPrice: 52999 }
},
{
name: 'new zealand',
state: 'North & South Islands',
tagline: '100% Pure New Zealand',
description: 'An adventurer’s dream filled with epic glaciers, geothermal wonderlands, majestic fjords, and scenic rolling hills.',
image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
knownFor: 'Fjords, Adventure Sports, Hobbiton, Glaciers & Lakes',
bestTimeToVisit: 'December to March',
urgencyText: 'Self-drive campervan slots filling up!',
rating: { score: 4.9, reviewsCount: 2100 },
pricing: { discountedPrice: 84999, originalPrice: 110000 }
},
{
name: 'japan',
state: 'Kanto & Kansai',
tagline: 'Endless Discovery',
description: 'A seamless blend of ultra-modern technology, timeless shinto shrines, serene cherry blossoms, and world-renowned gastronomy.',
image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
knownFor: 'Mount Fuji, Cherry Blossoms, Bullet Trains, Historic Temples',
bestTimeToVisit: 'March to May & September to November',
urgencyText: 'Cherry Blossom season deals open!',
rating: { score: 4.9, reviewsCount: 5100 },
pricing: { discountedPrice: 64999, originalPrice: 85999 }
}
]