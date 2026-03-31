import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { assets } from "../../assets/assets";
import { useFormContext } from "../../context/FormContext";

const OfferBanner = ({ offer_detail }) => {
    const { setShowApplyModal } = useFormContext();

    // Default to 2 days if not specified
    const DURATION = (offer_detail?.no_days || 2) * 24 * 60 * 60;
    const [timeLeft, setTimeLeft] = useState(DURATION);

    useEffect(() => {
        // Get expiry time from localStorage (if exists)
        const storageKey = `offer_expiry_${offer_detail?.coupen_code || 'default'}`;
        let expiry = localStorage.getItem(storageKey);

        if (!expiry) {
            // If not found, create a new expiry
            expiry = Date.now() + DURATION * 1000;
            localStorage.setItem(storageKey, expiry);
        } else {
            expiry = parseInt(expiry, 10);
        }

        const interval = setInterval(() => {
            const now = Date.now();
            let diff = Math.floor((expiry - now) / 1000);

            if (diff <= 0) {
                // Reset cycle when expired
                expiry = Date.now() + DURATION * 1000;
                localStorage.setItem(storageKey, expiry);
                diff = DURATION;
            }

            setTimeLeft(diff);
        }, 1000);

        return () => clearInterval(interval);
    }, [DURATION, offer_detail?.coupen_code]);

    // Convert seconds → d/h/m/s
    const formatTime = (seconds) => {
        const d = Math.floor(seconds / (24 * 3600));
        const h = Math.floor((seconds % (24 * 3600)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return { d, h, m, s };
    };

    const { d, h, m, s } = formatTime(timeLeft);

    const Coupon = () => (
        <div className="flex gap-2 items-center">
            <img src={assets.token} alt="coupon" />
            <p className="lg:block hidden text-[#8A8A8A] font-inter font-normal text-[14px] leading-[16px]">Coupon Code</p>
            <div className="inline-flex gap-1 border border-dashed border-[#383838] items-center p-1">
                <p className="font-inter font-semibold text-[12px] text-white">
                    {offer_detail?.coupen_code}
                </p>
                <p className="text-yellow bg-[#FFF2001A] font-inter text-[12px] py-[2px] px-2">
                    -{offer_detail?.discount_percent}%
                </p>
            </div>
        </div>
    );

    const Actions = () => (
        <div className="flex items-center gap-2">
            <div
                onClick={() => setShowApplyModal(true)}
                className="bg-yellow cursor-pointer text-black text-[14px] lg:text-[18px] font-semibold px-4 lg:px-5 py-2 lg:py-3 rounded"
            >
                Join Now
            </div>

            {offer_detail?.d_broucher && (
                <a
                    href={offer_detail.d_broucher}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="flex items-center gap-2 bg-[#F2F2F21A] border border-[#FFFFFF33] p-[8px] lg:px-5 lg:py-3 rounded"
                >
                    <span className="hidden md:block text-[14px] lg:text-[18px]">Brochure</span>
                    <Download size={18} />
                </a>
            )}
        </div>
    );

    if (!offer_detail) return null;

    return (
        <div>
            {/* Desktop Banner */}
            <div className="hidden lg:flex w-full bg-[#000000CC] text-white px-[70px] py-[23px] items-center justify-between gap-4">
                {/* Left Section */}
                <div className="flex flex-col">
                    <h4 className="font-inter font-semibold text-[20px]">
                        {offer_detail.title}
                    </h4>
                    <div className="mt-2">
                        <Coupon />
                    </div>
                </div>

                {/* Middle Section */}
                <div className="flex flex-col gap-1 items-center">
                    <p className="text-[14px]">Coupon code expires in</p>
                    <div className="flex gap-2 mt-1">
                        {[
                            { value: d, label: "d" },
                            { value: String(h).padStart(2, "0"), label: "h" },
                            { value: String(m).padStart(2, "0"), label: "m" },
                            { value: String(s).padStart(2, "0"), label: "s" },
                        ].map((item, idx) => (
                            <span
                                key={idx}
                                className="bg-[#4A0000] border border-[#870000] w-10 h-10 rounded font-semibold text-[16px] flex items-center justify-center"
                            >
                                {item.value}
                                <span className="text-[14px]">{item.label}</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right Section */}
                <Actions />
            </div>

            {/* Mobile Banner */}
            <div className="lg:hidden w-full bg-[#000000CC] text-white flex justify-between items-center gap-3 px-3 py-[10px]">
                {/* Left Section */}
                <div className="flex flex-col">
                    <div className="mt-2">
                        <Coupon />
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={assets.clock_icon} alt="clock" />
                        <p className="text-[12px] text-[#FF4343]">
                            {d} days {String(h).padStart(2, "0")} hours {String(m).padStart(2, "0")} minutes
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <Actions />
            </div>
        </div>
    );
};

export default OfferBanner;
