import React, { useState, useEffect } from "react";
import { pages } from "../../constants/pages";
import StartButton from "../StartButton";
import Heading from "../Heading";
import toast from "react-hot-toast";
import {
  detectCountryCode,
  getPhonePrefix,
  getDealNameFromRoute,
} from "../../utils/geolocation";
import { submitToZoho } from "../../utils/zohoApi";
import { assets } from "../../assets/assets";
import ApplyModal from "../Simple_elite_temp_Components.jsx/ApplyModal";
import CountryCodePicker from "../CountryCodePicker";

const PassiveIncome = ({ p_income, courseId }) => {
  // Form state for inline form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    qualification: "",
    profile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Detect country code on mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const countryCode = await detectCountryCode();
        const phonePrefix = getPhonePrefix(countryCode);
        setFormData((prev) => ({ ...prev, countryCode: phonePrefix }));
      } catch (e) {
        // Keep default +91
      }
    };
    detectCountry();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Resolve deal name from shared mapping utility
      const courseName = getDealNameFromRoute();
      const fullPhone = formData.countryCode + formData.phone;

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: fullPhone,
        qualification: formData.qualification,
        profile: formData.profile,
        courseName: courseName,
        // Explicitly set Deal fields - this seems to be the active component
        Pipeline: "Course-Pipeline",
        Stage: "Lead Captured",
        Amount: "0",
        Deal_Name: courseName,
        Course_ID: courseId, // Zoho lookup field for the Course record
      };

      const result = await submitToZoho("/api/zoho/submit-form.php", payload);
    } catch (error) {
      console.warn("API error (expected in local dev):", error.message);
    }

    toast.success("Thank you! We will contact you soon.");
    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      countryCode: "+91",
      phone: "",
      qualification: "",
      profile: "",
    });
  };

  return (
    <>
      <div>
        <div
          className="px-3 sm:px-14 lg:px-20 py-10 md:py-20 bg-cover bg-center"
          style={{
            backgroundImage: p_income.bg
              ? `linear-gradient(180deg, rgba(18,10,0,0.8) 0%, rgba(70,48,0,0.8) 100%), url(${p_income.bg})`
              : "none",
            backgroundColor: p_income.bg ? "transparent" : "black",
          }}
        >
          <div>
            <Heading
              head={p_income.head}
              highlights={p_income.highlights}
              {...(p_income.p1 ? { p1: p_income.p1 } : {})}
              {...(p_income.p2 ? { p2: p_income.p2 } : {})}
            />

            <div className="mt-10 lg:mt-20 md:grid grid-cols-2 gap-8 flex flex-col">
              {/* LEFT SIDE: Card + Image with pointers */}
              <div className="flex flex-col gap-6">
                {/* Card */}
                <div className="flex flex-col gap-3 lg:gap-4 p-6 bg-[#000000BF] border border-[#2D2D2D] rounded-2xl">
                  <div className="flex gap-1 items-end">
                    <h5 className="font-inter font-bold text-[40px] leading-[100%] tracking-[0] text-yellow">
                      {p_income.card?.price}
                    </h5>
                    <h6 className="font-inter font-normal text-[18px] leading-[100%] tracking-[0] line-through text-[#A7A7A7]">
                      {p_income.card?.original_price}
                    </h6>
                  </div>

                  <h3 className="font-clash font-semibold text-[24px] sm:text-[28px] leading-tight tracking-[0] text-[#FFFFFF]">
                    {p_income.card?.name}
                  </h3>

                  <div className=" lg:flex gap-1 items-center">
                    <div className="flex gap-1 items-center">
                      <img src={p_income.card?.token_img} alt="" />
                      <p className="font-inter font-normal text-[16px] leading-[100%] tracking-[0] text-[#FFFFFF]">
                        Coupon Code
                      </p>
                    </div>
                    <div className="inline-flex gap-1 border border-dashed border-[#ffff] [border-dasharray:5_2] items-center p-1 mt-2 lg:mt-0">
                      <p className="font-inter font-semibold text-[14px] leading-[16px] tracking-[10%] align-middle text-[#FFFFFF]">
                        {p_income.card?.coupon_code}
                      </p>
                      <p className="text-yellow bg-[#FFF2001A] font-inter font-normal text-[12px] leading-[16px] tracking-[0%] align-middle py-[2px] px-2">
                        {p_income.card?.discount_percent}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 items-center mb-2">
                    <img src={p_income.card?.time} alt="" />
                    <p className="text-[#fffff] font-inter font-normal text-[14px] leading-[16px] align-middle tracking-[0]">
                      Code expires in{" "}
                      <span className="text-[#FF4343]">
                        {p_income.card?.expires_in}
                      </span>
                    </p>
                  </div>

                  <StartButton
                    data={p_income.start_button}
                    onClick={() => setShowApplyModal(true)}
                  />
                </div>

                {/* Pointers below card */}
                {p_income.what_you_get && (
                  <div className="p-4 bg-[#1a1a1a] rounded-xl border border-[#2D2D2D]">
                    <h5 className="font-inter font-semibold text-[16px] leading-[100%] tracking-[0] text-[#FFFFFF] mb-4">
                      {p_income.what_you_get?.head}
                    </h5>
                    <div className="flex flex-col gap-2">
                      {p_income.what_you_get?.benefit?.map((data, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <img
                            src={p_income.what_you_get?.tick_img}
                            alt=""
                            className="w-5 h-5"
                          />
                          <p className="text-white text-[14px]">{data}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: Inline Form */}
              {p_income.show_form && (
                <div className="flex md:justify-start">
                  <div className="w-full max-w-[380px] p-4 sm:p-5 bg-black border border-white/10 rounded-xl">
                    {/* Header matching guna-dev */}
                    <h2 className="font-semibold text-[13px] md:text-[15px] leading-tight uppercase">
                      <span className="text-yellow">Struggling</span> to figure
                      it out alone?
                    </h2>

                    <div className="text-[#8A8A8A] mt-1">
                      <span className="text-[11px]">Get Expert</span>
                      <span className="relative inline-flex items-center px-3 py-1">
                        <img
                          src={assets.outer_line}
                          alt=""
                          className="absolute inset-0 w-full h-full pointer-events-none"
                        />
                        <span className="relative z-10 text-[11px]">
                          1:1 Guidance
                        </span>
                      </span>
                    </div>

                    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
                      {/* Name */}
                      <div>
                        <label className="text-xs text-white/70">Name*</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your Name"
                          className="mt-1 w-full bg-[#141414] border border-white/10
                                                       rounded-md px-3 py-2.5 text-sm outline-none
                                                       placeholder:text-white/30 focus:border-yellow transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="text-xs text-white/70">Email*</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="yourname@gmail.com"
                          className="mt-1 w-full bg-[#141414] border border-white/10
                                                       rounded-md px-3 py-2.5 text-sm outline-none
                                                       placeholder:text-white/30 focus:border-yellow transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="text-xs text-white/70">
                          Phone Number*
                        </label>
                        <div className="mt-1 flex gap-2">
                          <CountryCodePicker
                            value={formData.countryCode}
                            onChange={(code) =>
                              setFormData((prev) => ({
                                ...prev,
                                countryCode: code,
                              }))
                            }
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="Enter WhatsApp Number"
                            className="flex-1 bg-[#141414] border border-white/10
                                                       rounded-md px-3 py-2.5 text-sm outline-none
                                                       placeholder:text-white/30 focus:border-yellow transition-colors"
                          />
                        </div>
                      </div>

                      {/* Education */}
                      <div>
                        <label className="text-xs text-white/70">
                          Educational qualification
                        </label>
                        <input
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                          placeholder="Bachelor of Engineering"
                          className="mt-1 w-full bg-[#141414] border border-white/10
                                                     rounded-md px-3 py-2.5 text-sm outline-none
                                                     placeholder:text-white/30 focus:border-yellow transition-colors"
                        />
                      </div>

                      {/* Profile */}
                      <div>
                        <label className="text-xs text-white/70">
                          Current Profile
                        </label>
                        <select
                          name="profile"
                          value={formData.profile}
                          onChange={handleChange}
                          className="mt-1 w-full bg-[#141414] border border-white/10
                                                     rounded-md px-3 py-2.5 text-sm outline-none text-white/60 focus:border-yellow transition-colors"
                        >
                          <option value="">Select</option>
                          <option value="Student">Student</option>
                          <option value="Working Professional">
                            Working Professional
                          </option>
                          <option value="Business Owner">Business Owner</option>
                        </select>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 w-full bg-yellow text-black font-semibold
                                                   py-2.5 rounded-md text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </>
                        ) : (
                          "Get Fast Help"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* If no form, show original what_you_get layout on right */}
              {!p_income.show_form && p_income.what_you_get && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div>
                    <h5 className="font-inter font-semibold text-[18px] leading-[100%] tracking-[0] text-[#FFFFFF] mb-5">
                      {p_income.what_you_get?.head}
                    </h5>
                    <div className="flex flex-col gap-2">
                      {p_income.what_you_get?.benefit?.map((data, i) => (
                        <div key={i} className="flex gap-2">
                          <img src={p_income.what_you_get?.tick_img} alt="" />
                          <p>{data}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {p_income.what_you_get?.img && (
                    <img
                      src={p_income.what_you_get.img}
                      alt="What you get"
                      className="w-[140px] sm:w-[180px] object-contain"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        open={showApplyModal}
        onClose={() => setShowApplyModal(false)}
        courseId={courseId}
      />
    </>
  );
};

export default PassiveIncome;
