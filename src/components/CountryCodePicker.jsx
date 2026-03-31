import React, { useState, useEffect, useRef } from 'react';

// Full list of countries with dial codes and flag emojis
const COUNTRIES = [
    { code: 'AF', name: 'Afghanistan', dial: '+93', flag: '🇦🇫' },
    { code: 'AL', name: 'Albania', dial: '+355', flag: '🇦🇱' },
    { code: 'DZ', name: 'Algeria', dial: '+213', flag: '🇩🇿' },
    { code: 'AD', name: 'Andorra', dial: '+376', flag: '🇦🇩' },
    { code: 'AO', name: 'Angola', dial: '+244', flag: '🇦🇴' },
    { code: 'AG', name: 'Antigua & Barbuda', dial: '+1268', flag: '🇦🇬' },
    { code: 'AR', name: 'Argentina', dial: '+54', flag: '🇦🇷' },
    { code: 'AM', name: 'Armenia', dial: '+374', flag: '🇦🇲' },
    { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
    { code: 'AT', name: 'Austria', dial: '+43', flag: '🇦🇹' },
    { code: 'AZ', name: 'Azerbaijan', dial: '+994', flag: '🇦🇿' },
    { code: 'BS', name: 'Bahamas', dial: '+1242', flag: '🇧🇸' },
    { code: 'BH', name: 'Bahrain', dial: '+973', flag: '🇧🇭' },
    { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
    { code: 'BB', name: 'Barbados', dial: '+1246', flag: '🇧🇧' },
    { code: 'BY', name: 'Belarus', dial: '+375', flag: '🇧🇾' },
    { code: 'BE', name: 'Belgium', dial: '+32', flag: '🇧🇪' },
    { code: 'BZ', name: 'Belize', dial: '+501', flag: '🇧🇿' },
    { code: 'BJ', name: 'Benin', dial: '+229', flag: '🇧🇯' },
    { code: 'BT', name: 'Bhutan', dial: '+975', flag: '🇧🇹' },
    { code: 'BO', name: 'Bolivia', dial: '+591', flag: '🇧🇴' },
    { code: 'BA', name: 'Bosnia', dial: '+387', flag: '🇧🇦' },
    { code: 'BW', name: 'Botswana', dial: '+267', flag: '🇧🇼' },
    { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
    { code: 'BN', name: 'Brunei', dial: '+673', flag: '🇧🇳' },
    { code: 'BG', name: 'Bulgaria', dial: '+359', flag: '🇧🇬' },
    { code: 'KH', name: 'Cambodia', dial: '+855', flag: '🇰🇭' },
    { code: 'CM', name: 'Cameroon', dial: '+237', flag: '🇨🇲' },
    { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
    { code: 'CL', name: 'Chile', dial: '+56', flag: '🇨🇱' },
    { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
    { code: 'CO', name: 'Colombia', dial: '+57', flag: '🇨🇴' },
    { code: 'CR', name: 'Costa Rica', dial: '+506', flag: '🇨🇷' },
    { code: 'HR', name: 'Croatia', dial: '+385', flag: '🇭🇷' },
    { code: 'CU', name: 'Cuba', dial: '+53', flag: '🇨🇺' },
    { code: 'CY', name: 'Cyprus', dial: '+357', flag: '🇨🇾' },
    { code: 'CZ', name: 'Czech Republic', dial: '+420', flag: '🇨🇿' },
    { code: 'DK', name: 'Denmark', dial: '+45', flag: '🇩🇰' },
    { code: 'EC', name: 'Ecuador', dial: '+593', flag: '🇪🇨' },
    { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' },
    { code: 'SV', name: 'El Salvador', dial: '+503', flag: '🇸🇻' },
    { code: 'EE', name: 'Estonia', dial: '+372', flag: '🇪🇪' },
    { code: 'ET', name: 'Ethiopia', dial: '+251', flag: '🇪🇹' },
    { code: 'FJ', name: 'Fiji', dial: '+679', flag: '🇫🇯' },
    { code: 'FI', name: 'Finland', dial: '+358', flag: '🇫🇮' },
    { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
    { code: 'GE', name: 'Georgia', dial: '+995', flag: '🇬🇪' },
    { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
    { code: 'GH', name: 'Ghana', dial: '+233', flag: '🇬🇭' },
    { code: 'GR', name: 'Greece', dial: '+30', flag: '🇬🇷' },
    { code: 'GT', name: 'Guatemala', dial: '+502', flag: '🇬🇹' },
    { code: 'HK', name: 'Hong Kong', dial: '+852', flag: '🇭🇰' },
    { code: 'HU', name: 'Hungary', dial: '+36', flag: '🇭🇺' },
    { code: 'IS', name: 'Iceland', dial: '+354', flag: '🇮🇸' },
    { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
    { code: 'ID', name: 'Indonesia', dial: '+62', flag: '🇮🇩' },
    { code: 'IR', name: 'Iran', dial: '+98', flag: '🇮🇷' },
    { code: 'IQ', name: 'Iraq', dial: '+964', flag: '🇮🇶' },
    { code: 'IE', name: 'Ireland', dial: '+353', flag: '🇮🇪' },
    { code: 'IL', name: 'Israel', dial: '+972', flag: '🇮🇱' },
    { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
    { code: 'JM', name: 'Jamaica', dial: '+1876', flag: '🇯🇲' },
    { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
    { code: 'JO', name: 'Jordan', dial: '+962', flag: '🇯🇴' },
    { code: 'KZ', name: 'Kazakhstan', dial: '+7', flag: '🇰🇿' },
    { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪' },
    { code: 'KW', name: 'Kuwait', dial: '+965', flag: '🇰🇼' },
    { code: 'KG', name: 'Kyrgyzstan', dial: '+996', flag: '🇰🇬' },
    { code: 'LA', name: 'Laos', dial: '+856', flag: '🇱🇦' },
    { code: 'LV', name: 'Latvia', dial: '+371', flag: '🇱🇻' },
    { code: 'LB', name: 'Lebanon', dial: '+961', flag: '🇱🇧' },
    { code: 'LT', name: 'Lithuania', dial: '+370', flag: '🇱🇹' },
    { code: 'LU', name: 'Luxembourg', dial: '+352', flag: '🇱🇺' },
    { code: 'MO', name: 'Macau', dial: '+853', flag: '🇲🇴' },
    { code: 'MY', name: 'Malaysia', dial: '+60', flag: '🇲🇾' },
    { code: 'MV', name: 'Maldives', dial: '+960', flag: '🇲🇻' },
    { code: 'MT', name: 'Malta', dial: '+356', flag: '🇲🇹' },
    { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
    { code: 'MD', name: 'Moldova', dial: '+373', flag: '🇲🇩' },
    { code: 'MC', name: 'Monaco', dial: '+377', flag: '🇲🇨' },
    { code: 'MN', name: 'Mongolia', dial: '+976', flag: '🇲🇳' },
    { code: 'MA', name: 'Morocco', dial: '+212', flag: '🇲🇦' },
    { code: 'MM', name: 'Myanmar', dial: '+95', flag: '🇲🇲' },
    { code: 'NP', name: 'Nepal', dial: '+977', flag: '🇳🇵' },
    { code: 'NL', name: 'Netherlands', dial: '+31', flag: '🇳🇱' },
    { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
    { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
    { code: 'NO', name: 'Norway', dial: '+47', flag: '🇳🇴' },
    { code: 'OM', name: 'Oman', dial: '+968', flag: '🇴🇲' },
    { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
    { code: 'PA', name: 'Panama', dial: '+507', flag: '🇵🇦' },
    { code: 'PY', name: 'Paraguay', dial: '+595', flag: '🇵🇾' },
    { code: 'PE', name: 'Peru', dial: '+51', flag: '🇵🇪' },
    { code: 'PH', name: 'Philippines', dial: '+63', flag: '🇵🇭' },
    { code: 'PL', name: 'Poland', dial: '+48', flag: '🇵🇱' },
    { code: 'PT', name: 'Portugal', dial: '+351', flag: '🇵🇹' },
    { code: 'QA', name: 'Qatar', dial: '+974', flag: '🇶🇦' },
    { code: 'RO', name: 'Romania', dial: '+40', flag: '🇷🇴' },
    { code: 'RU', name: 'Russia', dial: '+7', flag: '🇷🇺' },
    { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
    { code: 'RS', name: 'Serbia', dial: '+381', flag: '🇷🇸' },
    { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
    { code: 'SK', name: 'Slovakia', dial: '+421', flag: '🇸🇰' },
    { code: 'SI', name: 'Slovenia', dial: '+386', flag: '🇸🇮' },
    { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
    { code: 'KR', name: 'South Korea', dial: '+82', flag: '🇰🇷' },
    { code: 'ES', name: 'Spain', dial: '+34', flag: '🇪🇸' },
    { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: '🇱🇰' },
    { code: 'SE', name: 'Sweden', dial: '+46', flag: '🇸🇪' },
    { code: 'CH', name: 'Switzerland', dial: '+41', flag: '🇨🇭' },
    { code: 'TW', name: 'Taiwan', dial: '+886', flag: '🇹🇼' },
    { code: 'TZ', name: 'Tanzania', dial: '+255', flag: '🇹🇿' },
    { code: 'TH', name: 'Thailand', dial: '+66', flag: '🇹🇭' },
    { code: 'TR', name: 'Turkey', dial: '+90', flag: '🇹🇷' },
    { code: 'UA', name: 'Ukraine', dial: '+380', flag: '🇺🇦' },
    { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: '🇦🇪' },
    { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
    { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
    { code: 'UY', name: 'Uruguay', dial: '+598', flag: '🇺🇾' },
    { code: 'UZ', name: 'Uzbekistan', dial: '+998', flag: '🇺🇿' },
    { code: 'VE', name: 'Venezuela', dial: '+58', flag: '🇻🇪' },
    { code: 'VN', name: 'Vietnam', dial: '+84', flag: '🇻🇳' },
    { code: 'ZW', name: 'Zimbabwe', dial: '+263', flag: '🇿🇼' },
];

// Default country (India)
const DEFAULT_COUNTRY = COUNTRIES.find(c => c.code === 'IN');

/**
 * CountryCodePicker Component
 * - Auto-detects country from IP
 * - Shows searchable dropdown
 * - Returns selected dial code
 */
const CountryCodePicker = ({ value, onChange, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    // Auto-detect country from IP on mount
    useEffect(() => {
        const detectCountry = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                const countryCode = data.country_code;

                const detected = COUNTRIES.find(c => c.code === countryCode);
                if (detected) {
                    setSelectedCountry(detected);
                    onChange(detected.dial);
                }
            } catch (error) {
                console.log('Could not detect country, using default');
            }
        };

        // Only detect if no value is set
        if (!value || value === '+91') {
            detectCountry();
        } else {
            // Find country by dial code
            const found = COUNTRIES.find(c => c.dial === value);
            if (found) setSelectedCountry(found);
        }
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearch('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    // Filter countries by search
    const filteredCountries = COUNTRIES.filter(country => {
        const searchLower = search.toLowerCase();
        return (
            country.name.toLowerCase().includes(searchLower) ||
            country.dial.includes(search) ||
            country.code.toLowerCase().includes(searchLower)
        );
    });

    const handleSelect = (country) => {
        setSelectedCountry(country);
        onChange(country.dial);
        setIsOpen(false);
        setSearch('');
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {/* Selected Country Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-2 py-2.5 bg-[#141414] border border-white/10 rounded-md text-sm hover:border-yellow transition-colors min-w-[80px]"
            >
                <span className="text-base">{selectedCountry?.flag}</span>
                <span className="text-white">{selectedCountry?.dial}</span>
                <svg
                    className={`w-3 h-3 text-white/60 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                    {/* Search Input */}
                    <div className="p-2 border-b border-white/10">
                        <div className="flex items-center gap-2 px-2 py-1.5 bg-[#141414] rounded-md">
                            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search country..."
                                className="bg-transparent border-none outline-none text-sm text-white placeholder-white/40 w-full"
                            />
                        </div>
                    </div>

                    {/* Country List */}
                    <div className="max-h-48 overflow-y-auto">
                        {filteredCountries.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-white/50">No countries found</div>
                        ) : (
                            filteredCountries.map((country) => (
                                <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleSelect(country)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/5 transition-colors ${selectedCountry?.code === country.code ? 'bg-yellow/10' : ''
                                        }`}
                                >
                                    <span className="text-base">{country.flag}</span>
                                    <span className="text-sm text-white flex-1">{country.name}</span>
                                    <span className="text-xs text-white/60">{country.dial}</span>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountryCodePicker;
export { COUNTRIES, DEFAULT_COUNTRY };
