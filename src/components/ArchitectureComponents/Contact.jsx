import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { detectCountryCode, getPhonePrefix } from '../../utils/geolocation';
import { submitToZoho } from '../../utils/zohoApi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        question: '',
        countryCode: '+91',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDetectingCountry, setIsDetectingCountry] = useState(true);

    // Detect country code on mount
    useEffect(() => {
        const detectCountry = async () => {
            setIsDetectingCountry(true);
            const countryCode = await detectCountryCode();
            const phonePrefix = getPhonePrefix(countryCode);
            setFormData(prev => ({ ...prev, countryCode: phonePrefix }));
            setIsDetectingCountry(false);
        };
        detectCountry();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast.error('Please enter your name');
            return false;
        }
        if (!formData.email.trim()) {
            toast.error('Please enter your email');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        if (!formData.phone.trim()) {
            toast.error('Please enter your phone number');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        try {
            // Combine country code and phone number
            const fullPhone = formData.countryCode + formData.phone;
            console.log('🚀 [Contact] Submitting form...', { ...formData, phone: fullPhone });

            const payload = {
                name: formData.name,
                email: formData.email,
                phone: fullPhone,
                question: formData.question,
                courseName: 'Contact Form'
            };

            const result = await submitToZoho('/api/zoho/submit-form.php', payload);
            console.log('✅ [Contact] Submission response:', result);

            toast.success('Thank you! We will contact you soon.');
            setFormData({ name: '', email: '', question: '', countryCode: '+91', phone: '' });
        } catch (error) {
            console.error('❌ [Contact] Submission error:', error);
            toast.error(error.message || 'Failed to submit form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[328] w-full max-w-7xl mx-auto py-4 px-4 overflow-hidden">
            <div className="w-full self-stretch shrink-0 relative z-[329]">
                <div className="flex w-full max-w-[935px] flex-col gap-[16px] items-center flex-nowrap relative z-[331] mt-[4px] mx-auto">
                    <div className="flex w-fit px-4 py-3 gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#1a1e00] rounded-[9px] border-solid border border-[#635e00] relative z-[332]">
                        <div className="w-[24px] h-[24px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/YwPZCy8kZe.png)] bg-[length:100%_100%] bg-no-repeat relative z-[333]" />
                        <span className="h-[19px] shrink-0 basis-auto font-inter text-[16px] font-medium leading-[19px] text-[#fff200] relative text-left uppercase whitespace-nowrap z-[334]">
                            Talk to expert
                        </span>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[335]">
                        <span className="h-[49px] self-stretch shrink-0 basis-auto font-clash text-[32px] md:text-[40px] font-semibold leading-[49px] text-[#fff] tracking-[0.8px] relative text-center uppercase whitespace-nowrap z-[336]">
                            Get Personal Guidance
                        </span>
                    </div>
                </div>

                <div className="w-full relative z-[337] mt-2">
                    <div className="hidden lg:block w-full max-w-[927px] h-[391px] bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/5Dx9gHA80S.png)] bg-cover bg-no-repeat absolute top-0 left-0 z-[330]" />

                    <div className="flex flex-col lg:flex-row w-full gap-[20px] justify-center items-start flex-nowrap relative z-[337]">
                        {/* Left Image Section */}
                        <div className="flex w-full lg:w-[630px] gap-[20px] items-start self-stretch shrink-0 flex-wrap relative z-[338]">
                            <div className="h-[500px] sm:h-[600px] lg:h-[716px] grow basis-0 rounded-[8px] relative overflow-hidden z-[339] bg-[#0A0A0A] border border-neutral-800">
                                <div className="absolute inset-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/bDDpzfCD0O.png)] bg-cover bg-center bg-no-repeat z-[340]" />
                                <div className="absolute bottom-0 left-[12px] right-[12px] sm:left-[24px] sm:right-[24px] h-full bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/3W0TwD11Bj.png)] bg-contain bg-bottom bg-no-repeat z-[343]" />
                            </div>
                        </div>

                        {/* Right Form Section */}
                        <form onSubmit={handleSubmit} className="flex p-[24px] flex-col justify-between items-start self-stretch grow shrink-0 basis-0 flex-nowrap bg-[rgba(0,0,0,0.75)] rounded-[16px] border-solid border border-[#2d2d2d] relative z-[345]">
                            <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[346]">
                                <div className="w-[91px] h-[91px] shrink-0 bg-[url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-12-02/RLpjYqRbqf.png)] bg-[length:100%_100%] bg-no-repeat relative z-[347]" />
                                <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[348]">
                                    <span className="self-stretch shrink-0 basis-auto font-inter text-[28px] md:text-[36px] font-medium leading-[1.2] text-[#fff] relative text-left z-[349]">
                                        Have Questions? Reach out to us.
                                    </span>
                                    <span className="flex w-full justify-start items-center self-stretch shrink-0 font-inter text-[16px] font-normal leading-[19px] text-[#8a8a8a] relative text-left z-[350]">
                                        Have doubts about starting or scaling your architecture firm? Ask directly.
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[351] w-full mt-8">
                                {/* Name Input */}
                                <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[352]">
                                    <span className="h-[17px] self-stretch shrink-0 basis-auto font-inter text-[14px] font-normal leading-[17px] text-[#9c9c9c] relative text-left whitespace-nowrap z-[353]">
                                        Name*
                                    </span>
                                    <div className="flex h-[40px] py-[4px] pl-[12px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[rgba(29,29,29,0.8)] rounded-[4px] relative z-[354]">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your Name"
                                            disabled={isSubmitting}
                                            className="w-full bg-transparent border-none outline-none font-inter text-[14px] font-normal text-[#fff] placeholder-[#4e4e4e] disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[356]">
                                    <span className="h-[17px] self-stretch shrink-0 basis-auto font-inter text-[14px] font-normal leading-[17px] text-[#9c9c9c] relative text-left whitespace-nowrap z-[357]">
                                        Email*
                                    </span>
                                    <div className="flex h-[40px] py-[4px] pl-[12px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[rgba(29,29,29,0.8)] rounded-[4px] relative z-[358]">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="yourname@gmail.com"
                                            disabled={isSubmitting}
                                            className="w-full bg-transparent border-none outline-none font-inter text-[14px] font-normal text-[#fff] placeholder-[#4e4e4e] disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Question Input */}
                                <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[360]">
                                    <span className="h-[17px] self-stretch shrink-0 basis-auto font-inter text-[14px] font-normal leading-[17px] text-[#9c9c9c] relative text-left whitespace-nowrap z-[361]">
                                        Your Question
                                    </span>
                                    <div className="flex h-[40px] py-[4px] pl-[12px] gap-[10px] items-center self-stretch shrink-0 flex-nowrap bg-[rgba(29,29,29,0.8)] rounded-[4px] relative z-[362]">
                                        <input
                                            type="text"
                                            name="question"
                                            value={formData.question}
                                            onChange={handleChange}
                                            placeholder="Tell me what you're struggling with"
                                            disabled={isSubmitting}
                                            className="w-full bg-transparent border-none outline-none font-inter text-[14px] font-normal text-[#fff] placeholder-[#4e4e4e] disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Phone Input with Country Picker */}
                                <div className="flex flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[364]">
                                    <span className="h-[17px] self-stretch shrink-0 basis-auto font-inter text-[14px] font-normal leading-[17px] text-[#9c9c9c] relative text-left whitespace-nowrap z-[365]">
                                        Phone Number*
                                    </span>
                                    <div className="flex gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[366]">
                                        {/* Country Code Picker */}
                                        <div className="relative" ref={dropdownRef}>
                                            <button
                                                type="button"
                                                onClick={countryCodeHook.toggleDropdown}
                                                disabled={isSubmitting}
                                                className="flex w-[85px] h-[40px] py-[4px] px-[12px] gap-[4px] items-center shrink-0 flex-nowrap bg-[rgba(29,29,29,0.8)] rounded-[4px] relative z-[367] cursor-pointer disabled:opacity-50"
                                            >
                                                {countryCodeHook.isLoading ? (
                                                    <div className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        <span className="text-base">{countryCodeHook.selectedCountry.flag}</span>
                                                        <span className="font-inter text-[14px] font-normal text-[#fff]">
                                                            {countryCodeHook.selectedCountry.code}
                                                        </span>
                                                        <ChevronDown className="w-[14px] h-[14px] text-neutral-400" />
                                                    </>
                                                )}
                                            </button>

                                            {/* Dropdown */}
                                            {countryCodeHook.isDropdownOpen && (
                                                <div className="absolute z-50 top-full left-0 mt-1 w-64 bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl overflow-hidden">
                                                    <div className="p-2 border-b border-neutral-700">
                                                        <div className="relative">
                                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                                            <input
                                                                type="text"
                                                                value={countryCodeHook.searchQuery}
                                                                onChange={(e) => countryCodeHook.setSearchQuery(e.target.value)}
                                                                placeholder="Search country..."
                                                                className="w-full pl-9 pr-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-yellow-400"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="max-h-60 overflow-y-auto">
                                                        {countryCodeHook.filteredCountries.map((country, index) => (
                                                            <button
                                                                key={`${country.iso}-${index}`}
                                                                type="button"
                                                                onClick={() => countryCodeHook.selectCountry(country)}
                                                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-neutral-800 transition-colors ${countryCodeHook.selectedCountry.iso === country.iso ? 'bg-neutral-800' : ''}`}
                                                            >
                                                                <span className="text-lg">{country.flag}</span>
                                                                <span className="text-sm text-white flex-1">{country.name}</span>
                                                                <span className="text-sm text-neutral-400">{country.code}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex h-[40px] py-[4px] pl-[12px] gap-[10px] items-center grow shrink-0 basis-0 flex-nowrap bg-[rgba(29,29,29,0.8)] rounded-[4px] relative z-[371]">
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Enter WhatsApp Number"
                                                disabled={isSubmitting}
                                                className="w-full bg-transparent border-none outline-none font-inter text-[14px] font-normal text-[#fff] placeholder-[#4e4e4e] disabled:opacity-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex pt-[16px] flex-col gap-[8px] items-start self-stretch shrink-0 flex-nowrap relative z-[373] w-full mt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex py-[13.5px] px-[21.5px] gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap bg-[#fff200] rounded-[4px] relative z-[374] hover:bg-yellow-400 transition-colors cursor-pointer border-none glow-btn disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="h-[22px] shrink-0 basis-auto font-inter text-[18px] font-semibold leading-[22px] text-[#000] relative text-left whitespace-nowrap z-[375]">
                                        {isSubmitting ? 'Submitting...' : 'Talk to an Expert'}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
