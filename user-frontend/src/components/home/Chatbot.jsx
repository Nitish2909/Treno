import React, { useState, useRef, useEffect } from "react";
import { Send, X, RotateCcw } from "lucide-react";

const AVATAR_URL =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

const QUICK_PROMPTS = [
  "Plan a Customized Trip",
  "Browse Packages",
  "Honeymoon Packages",
  "Group / Corporate Trip",
  // "India Trip"
];

// Interactive step-by-step questionnaire options
const STEP_OPTIONS = {
  month: [
    "August 2026",
    "September 2026",
    "October 2026",
    "November 2026",
    "December 2026",
    "January 2027",
    "February 2027",
    "March 2027",
    "April 2027",
    "May 2027",
    "June 2027",
    "July 2027",
    "Not sure",
  ],
  duration: ["1–3 days", "4–7 days", "8–12 days", "12+ days"],
  budget: ["Under ₹25k", "₹25k – ₹50k", "₹50k – ₹1L", "Above ₹1L"],
  accommodation: ["3★ Budget", "4★ Comfort", "5★ Luxury", "Homestay / Resort"],
  flights: ["Yes", "No"],
  pickup: ["Yes", "No"],
  groupType: [
    "Corporate Team Outing",
    "Family Get-together",
    "Friends Group",
    "College Trip",
  ],
};

const STEP_PLACEHOLDERS = {
  name: "Type your name...",
  companyName: "Company / Organization name...",
  groupSize: "e.g. 15 adults",
  destination: "e.g. Goa, Bali, Kashmir,Manali,Agra,Thiland,Switzerland",
  travellers: "e.g. 2 adults, 1 child",
  children: "e.g. 2 kids aged 5 and 8, or No",
  departureCity: "e.g. Mumbai",
  phone: "10-digit mobile number",
};

// Distinct steps and prompts per prompt selection
const FLOW_CONFIGS = {
  "Plan a Customized Trip": [
    { step: "name", prompt: "Please type your name." },
    {
      step: "destination",
      prompt:
        "Which destination are you interested in? (e.g. Bali, Maldives, Manali, Goa)",
    },
    {
      step: "travellers",
      prompt: "How many people will be travelling? (e.g. 2 adults, 1 child)",
    },
    {
      step: "children",
      prompt:
        "Will any children be joining? If yes, please mention their ages. If no, just type 'No'.",
    },
    { step: "month", prompt: "Which month are you planning to travel?" },
    { step: "duration", prompt: "How long will your trip be?" },
    { step: "budget", prompt: "What is your approximate budget per person?" },
    {
      step: "accommodation",
      prompt: "What type of accommodation do you prefer?",
    },
    { step: "flights", prompt: "Do you need us to arrange flights as well?" },
    {
      step: "pickup",
      prompt: "Would you like pickup and drop services included?",
    },
    { step: "departureCity", prompt: "Which city will you be departing from?" },
    {
      step: "phone",
      prompt:
        "Last step — what's your WhatsApp number so our travel expert can reach you?",
    },
  ],
  "Browse Packages": [
    { step: "name", prompt: "Please type your name." },
    {
      step: "destination",
      prompt:
        "Which destination packages would you like to browse? (e.g. Europe, Thailand, Himachal)",
    },
    { step: "month", prompt: "When are you planning to travel?" },
    { step: "budget", prompt: "What is your per-person budget range?" },
    { step: "accommodation", prompt: "Preferred stay category?" },
    { step: "departureCity", prompt: "Which city will you be departing from?" },
    {
      step: "phone",
      prompt:
        "Please share your WhatsApp number so we can send curated package itineraries directly to you!",
    },
  ],
  "Honeymoon Packages": [
    { step: "name", prompt: "Congratulations! Please type your name." },
    {
      step: "destination",
      prompt:
        "Which romantic destination do you have in mind? (e.g. Maldives, Bali, Kashmir, Switzerland)",
    },
    {
      step: "month",
      prompt: "Which month is your wedding/honeymoon trip planned for?",
    },
    {
      step: "duration",
      prompt: "How many days are you planning for your getaway?",
    },
    {
      step: "budget",
      prompt: "What is your expected package budget per couple?",
    },
    {
      step: "accommodation",
      prompt: "What style of stay do you prefer for your honeymoon?",
    },
    {
      step: "flights",
      prompt: "Would you like us to include round-trip flights?",
    },
    {
      step: "departureCity",
      prompt: "Which city will you be flying out from?",
    },
    {
      step: "phone",
      prompt:
        "Please share your WhatsApp number so our romantic travel specialist can reach out with tailored packages!",
    },
  ],
  "Group / Corporate Trip": [
    { step: "name", prompt: "Please enter your name / contact person name." },
    {
      step: "companyName",
      prompt: "What is the name of your organization or group?",
    },
    { step: "groupType", prompt: "What type of group trip is this?" },
    { step: "groupSize", prompt: "How many people are expected in the group?" },
    {
      step: "destination",
      prompt:
        "Any specific destination in mind, or are you looking for recommendations?",
    },
    { step: "month", prompt: "What month are you aiming for?" },
    { step: "duration", prompt: "How many days will the trip last?" },
    { step: "budget", prompt: "Approximate budget per person?" },
    {
      step: "pickup",
      prompt: "Do you require team transportation/coaches arranged?",
    },
    {
      step: "phone",
      prompt:
        "What is your phone number so our corporate account manager can contact you?",
    },
  ],
  "India's Trip": [
    { step: "name", prompt: "Please enter your name / contact person name." },
    {
      step: "companyName",
      prompt: "What is the name of your organization or group?",
    },
    { step: "groupType", prompt: "What type of group trip is this?" },
    { step: "groupSize", prompt: "How many people are expected in the group?" },
    {
      step: "destination",
      prompt:
        "Any specific destination in mind, or are you looking for recommendations?",
    },
    { step: "month", prompt: "What month are you aiming for?" },
    { step: "duration", prompt: "How many days will the trip last?" },
    { step: "budget", prompt: "Approximate budget per person?" },
    {
      step: "pickup",
      prompt: "Do you require team transportation/coaches arranged?",
    },
    {
      step: "phone",
      prompt:
        "What is your phone number so our corporate account manager can contact you?",
    },
  ],
};

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "bot",
    text: "👋 Hey there! I'm Ira, your AI Travel assistant. How can I help you today?",
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Custom Flow State Management
  const [activeFlow, setActiveFlow] = useState(null); // 'Plan a Customized Trip', 'Browse Packages', etc.
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({});

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, stepIndex]);

  // Handle flow transitions dynamically
  const processFlowStep = (userValue, selectedFlowKey = null) => {
    const flowKey = selectedFlowKey || activeFlow;
    const flowSteps = FLOW_CONFIGS[flowKey];

    if (!flowSteps) return;

    if (selectedFlowKey) {
      // Flow Initialization
      setActiveFlow(selectedFlowKey);
      setStepIndex(0);
      setFormData({});

      const firstStep = flowSteps[0];
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: "bot", text: firstStep.prompt },
        ]);
      }, 300);
      return;
    }

    // Capture response for current step
    const currentStepConfig = flowSteps[stepIndex];
    const updatedData = { ...formData, [currentStepConfig.step]: userValue };
    setFormData(updatedData);

    const nextIndex = stepIndex + 1;

    if (nextIndex < flowSteps.length) {
      setStepIndex(nextIndex);
      const nextStepConfig = flowSteps[nextIndex];
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, sender: "bot", text: nextStepConfig.prompt },
        ]);
      }, 300);
    } else {
      // Completed Flow
      setActiveFlow(null);
      setStepIndex(0);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: "bot",
            text: "Thank you! Our travel expert will contact you shortly with personalized details. 🚀",
          },
        ]);
      }, 300);
    }
  };

  const sendMessage = async (textToSend) => {
    const userMsgText = textToSend || input;
    if (!userMsgText.trim()) return;

    const userMessage = { id: Date.now(), sender: "user", text: userMsgText };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");

    // Quick Prompt selection trigger
    if (QUICK_PROMPTS.includes(userMsgText)) {
      processFlowStep(userMsgText, userMsgText);
      return;
    }

    // Progressing active step-by-step questionnaire
    if (activeFlow) {
      processFlowStep(userMsgText);
      return;
    }

    // Fallback API call for general queries
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsgText,
          history: messages,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: data.text || "Sorry, I couldn't process that request.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Error connecting to server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setMessages(INITIAL_MESSAGES);
    setActiveFlow(null);
    setStepIndex(0);
    setFormData({});
  };

  const getCurrentStepKey = () => {
    if (!activeFlow) return null;
    return FLOW_CONFIGS[activeFlow]?.[stepIndex]?.step;
  };

  const currentStepKey = getCurrentStepKey();

  const getPlaceholder = () => {
    if (currentStepKey && STEP_PLACEHOLDERS[currentStepKey]) {
      return STEP_PLACEHOLDERS[currentStepKey];
    }
    return "Type a message...";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center w-16 h-16 bg-[#1e5629] rounded-full shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-200 border-2 border-[#2d7d3d] focus:outline-none "
        >
          <img
            src={AVATAR_URL}
            alt="Ira"
            className="w-10 h-14 rounded-full object-cover"
          />
          <span className="text-[7px] font-bold text-white bg-black/40 px-2 py-0.5 rounded-full mt-0.5">
            Talk With Ira
          </span>
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] sm:w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border  border-gray-100">
          {/* Header */}
          <div className="bg-[#1e5629] px-5 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <img
                src={AVATAR_URL}
                alt="Ira"
                className="w-14 h-10 rounded-full object-cover border border-white/20"
              />
              <div>
                <h3 className="font-bold text-base leading-tight">Ira</h3>
                <span className="text-xs text-emerald-200 flex items-center gap-1">
                  Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleStartOver}
                className="text-xs font-medium underline flex items-center gap-1 text-emerald-100 hover:text-white"
              >
                <RotateCcw className="w-3 h-3" /> Start Over
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-emerald-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#1e5629] text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Initial Quick Prompts */}
            {messages.length === 1 && !activeFlow && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {QUICK_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(prompt)}
                    className="border border-[#1e5629] text-[#1e5629] text-xs font-medium py-2 px-3 rounded-full hover:bg-[#1e5629] hover:text-white transition-colors duration-150 text-center"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Contextual Choice Option Chips */}
            {currentStepKey && STEP_OPTIONS[currentStepKey] && (
              <div className="flex flex-wrap gap-2 pt-2">
                {STEP_OPTIONS[currentStepKey].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(option)}
                    className="border border-[#1e5629] text-[#1e5629] text-xs font-medium py-1.5 px-3 rounded-full hover:bg-[#1e5629] hover:text-white transition-colors duration-150"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl shadow-sm text-xs text-gray-400 animate-pulse">
                  Ira is typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={getPlaceholder()}
                className="flex-1 px-4 py-2.5 border border-[#1e5629]/40 rounded-full text-sm focus:outline-none focus:border-[#1e5629] text-gray-700 placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 bg-[#a3c9a8] hover:bg-[#8ebf94] disabled:opacity-50 text-[#1e5629] rounded-full transition-colors duration-150"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
