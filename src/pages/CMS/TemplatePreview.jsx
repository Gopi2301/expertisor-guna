import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, X, Play } from 'lucide-react';
import { getTemplate } from '../../utils/cmsStorage';

const TemplatePreview = () => {
    const { id } = useParams();
    const [template, setTemplate] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const loaded = getTemplate(id);
        setTemplate(loaded);
    }, [id]);

    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsVideoPlaying(true);
        }
    };

    if (!template) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <p>Template not found</p>
            </div>
        );
    }

    const { hero, form } = template.sections;

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Preview Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-[#111]/95 backdrop-blur border-b border-neutral-800 px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            to={`/cms/edit/${id}`}
                            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Editor
                        </Link>
                        <span className="text-neutral-600">|</span>
                        <span className="text-white font-medium">{template.name}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${template.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                            {template.status}
                        </span>
                    </div>
                    <Link
                        to={`/cms/edit/${id}`}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit Template
                    </Link>
                </div>
            </div>

            {/* Hero Section Preview */}
            <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center pt-16">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1500]/30 via-transparent to-[#1a1500]/20 z-[1]"></div>

                {/* Decorative glow effects */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>

                {/* Content */}
                <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col justify-center items-center gap-6 md:gap-8 py-12 md:py-20 px-4 md:px-6">
                    {/* Badge */}
                    <div className="w-fit px-4 py-2.5 bg-[#1a1a1a]/80 rounded-full border border-neutral-700/50 backdrop-blur-sm inline-flex justify-center items-center gap-2.5">
                        <span className="text-xl">{hero.badge.emoji}</span>
                        <span className="text-white text-sm sm:text-base font-normal font-inter">
                            {hero.badge.text.split(hero.badge.highlight || '20+ years').map((part, i, arr) => (
                                <span key={i}>
                                    {part}
                                    {i < arr.length - 1 && (
                                        <span className="text-yellow-400 font-medium">{hero.badge.highlight || '20+ years'}</span>
                                    )}
                                </span>
                            ))}
                        </span>
                    </div>

                    {/* Headline with yellow highlights */}
                    <h1 className="text-center px-2 max-w-5xl">
                        {hero.headline.parts.map((part, index) => (
                            <span
                                key={index}
                                className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-clash leading-tight ${part.highlight
                                    ? 'text-yellow'
                                    : 'text-white'
                                    }`}
                            >
                                {part.text}
                            </span>
                        ))}
                    </h1>

                    {/* Subheadline */}
                    <p className="text-center text-neutral-400 text-base sm:text-lg md:text-xl font-normal font-inter max-w-3xl mx-auto px-2">
                        {hero.subheadline}
                    </p>

                    {/* Video Player */}
                    <div className="w-full max-w-2xl mx-auto mt-4">
                        <div className="relative rounded-xl overflow-hidden bg-black/50 border border-neutral-800 aspect-video">
                            <video
                                ref={videoRef}
                                src={hero.video.url}
                                className="w-full h-full object-cover"
                                playsInline
                                onEnded={() => setIsVideoPlaying(false)}
                                controls={isVideoPlaying}
                            />
                            {/* Play Button Overlay */}
                            {!isVideoPlaying && (
                                <button
                                    onClick={handlePlayVideo}
                                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                                >
                                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                        <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="w-full sm:w-fit pt-4 md:pt-8 inline-flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 px-4 sm:px-0">
                        <button
                            onClick={() => setShowFormModal(true)}
                            className="w-full sm:w-auto h-12 px-8 bg-[#FFF200] hover:bg-yellow-400 rounded-md flex justify-center items-center gap-2 transition-colors group shadow-lg shadow-yellow-500/20"
                        >
                            <span className="text-black text-base md:text-lg font-semibold font-inter">
                                {hero.buttons.primary.text}
                            </span>
                            <svg className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>

                        <button className="w-full sm:w-auto h-12 px-8 bg-[#1A1A1A] hover:bg-[#252525] rounded-md border border-neutral-700 flex justify-center items-center gap-2 transition-colors">
                            <span className="text-neutral-300 text-base md:text-lg font-normal font-inter">
                                {hero.buttons.secondary.text}
                            </span>
                            <svg className="w-5 h-5 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Form Modal */}
            {showFormModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0a0a0a] rounded-lg border border-neutral-800 w-full max-w-md p-6 relative shadow-2xl">
                        <button
                            onClick={() => setShowFormModal(false)}
                            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-xl font-bold text-white mb-6">{form.title}</h2>

                        <form className="space-y-4">
                            {form.fields.map((field, index) => (
                                <div key={index}>
                                    <label className="block text-sm text-neutral-400 mb-1.5">
                                        {field.label}{field.required && '*'}
                                    </label>
                                    {field.type === 'select' ? (
                                        <select className="w-full px-4 py-3 bg-[#1a1a1a] border border-neutral-700 rounded text-white focus:outline-none focus:border-yellow-400 appearance-none cursor-pointer">
                                            <option value="">{field.placeholder}</option>
                                            {field.options?.map((opt, i) => (
                                                <option key={i} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : field.type === 'tel' ? (
                                        <div className="flex gap-2">
                                            <div className="flex items-center gap-1 px-3 py-3 bg-[#1a1a1a] border border-neutral-700 rounded text-white text-sm">
                                                <span>🇮🇳</span>
                                                <span>+91</span>
                                                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            <input
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                className="flex-1 px-4 py-3 bg-[#1a1a1a] border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400"
                                            />
                                        </div>
                                    ) : (
                                        <input
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            required={field.required}
                                            className="w-full px-4 py-3 bg-[#1a1a1a] border border-neutral-700 rounded text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400"
                                        />
                                    )}
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded transition-colors mt-2"
                            >
                                {form.submitButton}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplatePreview;
