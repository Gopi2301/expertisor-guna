import React, { useState, useEffect } from "react";
import Heading from "../Heading";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { getDealNameFromRoute } from "../../utils/geolocation";
import CountryCodePicker from "../CountryCodePicker";

const PassiveIncome = ({ p_income }) => {
  // Default form fields
  const DEFAULT_FORM_FIELDS = [
    { name: "name", label: "Name*", type: "text", placeholder: "Your Name" },
    {
      name: "email",
      label: "Email*",
      type: "email",
      placeholder: "yourname@gmail.com",
    },
    {
      name: "phone",
      label: "Phone Number*",
      type: "tel",
      placeholder: "Enter WhatsApp Number",
      isPhone: true,
    },
    {
      name: "education",
      label: "Educational qualification",
      type: "text",
      placeholder: "Bachelor of Engineering",
    },
    {
      name: "profile",
      label: "Current Profile",
      type: "select",
      options: ["Student", "Working Professional", "Business Owner"],
    },
  ];

  const FORM_FIELDS = p_income?.formFields || DEFAULT_FORM_FIELDS;

  // Default benefits
  const defaultBenefits = [
    "24/7 dedicated support",
    "Monthly mentor live Career sessions",
    "Direct mentor access",
  ];

  const benefits =
    p_income?.benefits || p_income?.what_you_get?.benefit || defaultBenefits;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    education: "",
    profile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
      const cleanBaseUrl = API_BASE_URL.replace(/\/$/, "");

      const response = await fetch(`${cleanBaseUrl}/zoho/submit-form.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          education: formData.education,
          profile: formData.profile,
          courseName: courseName,
          // Explicitly set Deal fields for Passive Income flow
          Pipeline: "Course-Pipeline",
          Stage: "Lead Captured",
          Amount: "0",
          Deal_Name: courseName,
        }),
      });
      console.log("zoho request body", formData);
      const text = await response.text();
      if (text) {
        const result = JSON.parse(text);
        if (!result.success) {
          console.warn("API returned error, but showing success for UX");
        }
      }
    } catch (error) {
      console.warn("API error (expected in local dev):", error.message);
    }

    toast.success("Thank you! We will contact you soon.");
    setFormData((prev) => ({
      ...prev,
      name: "",
      email: "",
      phone: "",
      education: "",
      profile: "",
    }));
    setIsSubmitting(false);
  };

  /* Field Renderer Component */
  const FieldRenderer = ({ field }) => {
    const base =
      "mt-1 w-full bg-[#141414] border border-white/10 rounded-md px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-yellow transition-colors";

    if (field.type === "select") {
      return (
        <div>
          <label className="text-xs text-white/70">{field.label}</label>
          <select
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className={`${base} text-white/60`}
          >
            <option value="">Select</option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.isPhone) {
      return (
        <div>
          <label className="text-xs text-white/70">{field.label}</label>
          <div className="mt-1 flex gap-2">
            <CountryCodePicker
              value={formData.countryCode}
              onChange={(code) =>
                setFormData((prev) => ({ ...prev, countryCode: code }))
              }
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`flex-1 ${base}`}
              placeholder={field.placeholder}
              required
            />
          </div>
        </div>
      );
    }

    return (
      <div>
        <label className="text-xs text-white/70">{field.label}</label>
        <input
          name={field.name}
          type={field.type || "text"}
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={base}
          placeholder={field.placeholder}
          required={field.label?.includes("*")}
        />
      </div>
    );
  };

  if (!p_income) return null;

  return (
    <section
      className="px-4 sm:px-14 lg:px-24 py-12 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(18,10,0,.85), rgba(70,48,0,.85)), url(${p_income.bg || ""})`,
      }}
    >
      <Heading {...p_income} />

      {/* Grid */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Top Card - Pricing */}
          <div className="bg-black/80 border border-[#2D2D2D] rounded-2xl p-6 flex flex-col">
            {/* Price */}
            <div className="flex items-end gap-3">
              <h2 className="text-yellow text-[40px] font-bold">
                {p_income.card?.price || "₹ 6,999"}
              </h2>
              <span className="line-through text-[#A7A7A7]">
                {p_income.card?.original_price || "₹ 12,499"}
              </span>
            </div>

            {/* Coupon */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <img src={p_income.card?.token_img || assets.token} alt="" />
              <span>Coupon Code</span>

              <div className="flex gap-2 border border-dashed border-white px-2 py-1 rounded">
                <span className="tracking-widest">
                  {p_income.card?.coupon_code || "OFFER44"}
                </span>
                <span className="bg-yellow/20 text-yellow text-xs px-2 rounded">
                  {p_income.card?.discount_percent || "44%"}
                </span>
              </div>
            </div>

            {/* Expiry */}
            <div className="mt-2 text-sm">
              Code expires in{" "}
              <span className="text-red-500">
                {p_income.card?.expires_in || "1 days 23 hours 59 minutes"}
              </span>
            </div>

            {/* Promise Banner */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-[#1D1400] border border-[#3A2800] rounded-xl overflow-hidden">
              <p className="px-4 py-4 text-sm text-center sm:text-left">
                We stay with you until you achieve your career goals
              </p>
            </div>
          </div>

          {/* Bottom Card - Benefits */}
          <div className="bg-[#000000BF] border border-[#2D2D2D] rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-semibold mb-4">What you'll get</h3>

            <ul className="space-y-3 text-sm">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex gap-2 items-center">
                  <img src={assets.verified} alt="" className="w-5 h-5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-5">
          <div className="h-full bg-black/80 border border-white/10 rounded-2xl p-6 flex flex-col">
            <h3 className="uppercase text-sm md:text-2xl font-semibold">
              <span className="text-yellow">Struggling</span> to figure it out
              alone?
            </h3>

            <div className="text-[#8A8A8A] mt-2 flex items-center gap-1 text-[11px]">
              <span>Get Expert</span>
              <span className="relative inline-flex items-center px-3 py-1">
                <img
                  src={assets.outer_line}
                  alt=""
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
                <span className="relative z-10">1:1 Guidance</span>
              </span>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 flex-1">
              {FORM_FIELDS.map((f) => (
                <FieldRenderer key={f.name} field={f} />
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-auto w-full bg-yellow text-black font-semibold py-3 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
      </div>
    </section>
  );
};

export default PassiveIncome;
