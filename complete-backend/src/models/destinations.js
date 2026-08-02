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