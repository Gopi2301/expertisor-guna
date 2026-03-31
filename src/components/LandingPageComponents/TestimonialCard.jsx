import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';

/**
 * Testimonial Card Component
 * 
 * Displays student testimonials with photo, rating, and quote
 */
const TestimonialCard = ({
    name = 'Student Name',
    role = 'Professional',
    photo = null,
    rating = 5,
    text = 'This course changed my life!',
    company = null
}) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 hover:border-yellow-400/30 transition-all duration-300 group">
            {/* Quote Icon */}
            <div className="mb-4">
                <Quote className="w-8 h-8 text-yellow-400/20 group-hover:text-yellow-400/40 transition-colors" />
            </div>

            {/* Testimonial Text */}
            <p className="text-neutral-300 text-base leading-relaxed mb-6 italic">
                "{text}"
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                    <Star
                        key={idx}
                        className={`w-4 h-4 ${idx < rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-neutral-700'
                            }`}
                    />
                ))}
            </div>

            {/* Student Info */}
            <div className="flex items-center gap-3">
                {/* Photo */}
                <div className="w-12 h-12 rounded-full bg-neutral-800 overflow-hidden flex-shrink-0">
                    {photo && !imageError ? (
                        <img
                            src={photo}
                            alt={name}
                            className="w-full h-full object-cover"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 text-yellow-400 font-bold text-lg">
                            {name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                {/* Name and Role */}
                <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">
                        {name}
                    </p>
                    <p className="text-neutral-500 text-xs truncate">
                        {role}{company && ` at ${company}`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
