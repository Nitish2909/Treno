// import { MessageCircle } from "lucide-react";

// const Whatsapp = () => {
//   return (
//     <a
//       href="https://wa.me/918816942362"
//       target="_blank"
//       rel="noreferrer"
//       className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center text-white transition-colors"
//       aria-label="Chat on WhatsApp"
//     >
//       <MessageCircle size={26} />
//     </a>
//   );
// };

// export default Whatsapp;


import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-30">
      {/* <Link
        to="/applyforloan"
        className="bg-amber-500 text-white px-5 py-3 rounded-full font-bold text-sm shadow-xl transition-all hover:-translate-y-0.5"
      >
        Apply for Loan
      </Link> */}

      <div className="flex flex-col gap-3">
        {/* Phone */}
        <a
          href="tel:+91 88169 42362"
          className="w-14 h-14 bg-blue-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-blue-700 transition-all hover:-translate-y-0.5"
          aria-label="Call us"
        >
          <Phone size={28} />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/918816942362"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-green-600 transition-all hover:-translate-y-0.5"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={30} />
        </a>
      </div>
    </div>
  );
}