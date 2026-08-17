import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TripCard from "../components/trip/TripCard";
import { useGetDestinationByIdQuery } from "../store/api/destinationApi";

const GroupTourDetails = () => {
  const { name: slug } = useParams();
  const { data, isLoading, isError, error } = useGetDestinationByIdQuery(slug);
  const trips = data?.data?.trips ?? [];
  const destination = data?.data?.destination ?? {};

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50/50">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 border-t-blue-600"></div>
          <div className="absolute text-xs font-semibold text-blue-600">
            Loading
          </div>
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">
          Fetching destination and trip details...
        </p>
      </div>
    );
  }

  if (isError || (!destination.name && trips.length === 0)) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white border border-red-100 shadow-xl shadow-red-500/5 rounded-2xl text-center">
        <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Destination Not Found
        </h2>
        <p className="text-slate-600">
          {error?.data?.message || "No trips or destination details found."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 font-sans text-slate-800 antialiased">
      {/* Hero Banner Container */}
      <div className="w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] relative w-full h-[420px] md:h-[400px]  overflow-hidden shadow-2xl bg-slate-900 mb-10 ">
        {/* Background Image */}
        <img
          src={destination.image || "https://via.placeholder.com/1200x600"}
          alt={destination.name || "Destination"}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Left Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        {/* Carousel Dots Indicator */}
        {/* <div className="absolute top-6 left-6 md:left-12 flex items-center gap-2 z-10">
          <span className="w-8 h-2 bg-white rounded-full"></span>
          <span className="w-2 h-2 bg-white/50 rounded-full"></span>
          <span className="w-2 h-2 bg-white/50 rounded-full"></span>
          <span className="w-2 h-2 bg-white/50 rounded-full"></span>
        </div> */}

        {/* Carousel Navigation Arrows */}
        {/* <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition z-10">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition z-10">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button> */}

        {/* Hero Content Overlay */}
        <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-12 pb-8 max-w-3xl text-white">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 leading-tight">
            <span style={{ textTransform: "capitalize" }}>
              {`${destination.name || slug} Group Tour Packages 2026`}
            </span>
          </h1>

          {/* Subtitle / Tagline */}
          {destination.tagline && (
            <p className="text-sm md:text-base text-slate-200 font-medium mb-6 leading-relaxed">
              {destination.tagline}
            </p>
          )}

          {/* Starting Price Badge */}
          <div className="flex items-center gap-2.5 mb-6 text-sm md:text-base">
            <span className="flex items-center justify-center w-7 h-7 bg-white/20 backdrop-blur-md rounded-md border border-white/30 text-white font-bold text-xs">
              %
            </span>
            <span className="font-semibold text-slate-100">
              Starting Price:{" "}
              {/* <strong className="text-yellow-400 font-bold">
                {destination.startingPrice || "Rs. 15,800/-"} Per Person
              </strong> */}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Callback Button */}
            <button className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-full transition-colors shadow-lg text-sm md:text-base">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Request a Callback
            </button>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/918816942362"
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-full transition-colors shadow-lg text-sm md:text-base"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              Chat With Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="space-y-10">
        {/* Quick Info Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
          <div className="border-r border-slate-100 px-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Rating
            </span>
            <span className="font-extrabold text-amber-500 text-lg flex items-center justify-center gap-1">
              ★ {destination.rating?.score ?? "N/A"}
              <span className="text-xs text-slate-400 font-normal">
                ({destination.rating?.reviewsCount ?? 0})
              </span>
            </span>
          </div>

          <div className="border-r sm:border-r border-slate-100 px-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Best Time to Visit
            </span>
            <span className="font-bold text-slate-800 text-sm md:text-base">
              {destination.bestTimeToVisit || "Year-round"}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 px-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Known For
            </span>
            <span className="font-semibold text-slate-700 text-sm truncate block">
              {destination.knownFor || "Sightseeing"}
            </span>
          </div>
        </div>

        {/* Destination Description */}
        {destination.description && (
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              About {destination.name}
            </h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
              {destination.description}
            </p>
          </section>
        )}

        {/* Available Trip Packages Section */}
        <section className="space-y-6 pt-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <span>Available Packages</span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-extrabold">
              {trips.length}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.length > 0 ? (
              trips.map((trip) => (
                <div
                  key={trip._id}
                  className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <TripCard trip={trip} />
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white p-6 rounded-2xl border border-slate-100 text-center text-slate-500 text-sm">
                No active trip packages available for this destination.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default GroupTourDetails;
