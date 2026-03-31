// import React from "react";
// import Heading from "../Heading";
// import { assets } from "../../assets/assets";

// import { HiOutlineCheckBadge } from "react-icons/hi2";
// import { MdVerified } from "react-icons/md";
// import { BsShieldCheck } from "react-icons/bs";

// const PassiveIncome = ({ p_income }) => {
//     const FORM_FIELDS = [
//         { name: "name", label: "Name*", type: "text", placeholder: "Your Name" },
//         {
//             name: "email",
//             label: "Email*",
//             type: "email",
//             placeholder: "yourname@gmail.com",
//         },
//         {
//             name: "phone",
//             label: "Phone Number*",
//             type: "tel",
//             placeholder: "Enter WhatsApp Number",
//             isPhone: true,
//         },
//         {
//             name: "education",
//             label: "Educational qualification",
//             type: "text",
//             placeholder: "Bachelor of Engineering",
//         },
//         {
//             name: "profile",
//             label: "Current Profile",
//             type: "select",
//             options: ["Student", "Working Professional", "Business Owner"],
//         },
//     ];

//     /* ================= FIELD ================= */
//     const FieldRenderer = ({ field }) => {
//         const base =
//             "mt-1 w-full bg-[#141414] border border-white/10 rounded-md px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30";

//         if (field.type === "select") {
//             return (
//                 <div>
//                     <label className="text-xs text-white/70">{field.label}</label>
//                     <select className={`${base} text-white/60`}>
//                         <option>Select</option>
//                         {field.options.map((o) => (
//                             <option key={o}>{o}</option>
//                         ))}
//                     </select>
//                 </div>
//             );
//         }

//         if (field.isPhone) {
//             return (
//                 <div>
//                     <label className="text-xs text-white/70">{field.label}</label>
//                     <div className="mt-1 flex gap-2">
//                         <div className="flex items-center px-2 bg-[#141414] border border-white/10 rounded-md text-xs">
//                             🇮🇳 +91
//                         </div>
//                         <input className={`flex-1 ${base}`} placeholder={field.placeholder} />
//                     </div>
//                 </div>
//             );
//         }

//         return (
//             <div>
//                 <label className="text-xs text-white/70">{field.label}</label>
//                 <input className={base} placeholder={field.placeholder} />
//             </div>
//         );
//     };

//     return (
//         <section
//             className="px-4 sm:px-14 lg:px-24 py-12 bg-cover bg-center"
//             style={{
//                 backgroundImage: `linear-gradient(180deg, rgba(18,10,0,.85), rgba(70,48,0,.85)), url(${p_income.bg})`,
//             }}
//         >
//             <Heading {...p_income} />

//             {/* ================= GRID ================= */}
//             <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

//                 {/* ================= LEFT ================= */}
//                 <div className="lg:col-span-7 flex flex-col gap-6">
//                     {/* ================= TOP CARD ================= */}
//                     <div className="relative bg-black/80 border border-[#2D2D2D] rounded-2xl p-6 flex flex-col">
//                         {/* PRICE */}
//                         <div className="flex items-end gap-3">
//                             <h2 className="text-yellow text-[40px] font-bold">
//                                 {p_income.card?.price}
//                             </h2>
//                             <span className="line-through text-[#A7A7A7]">
//                                 {p_income.card?.original_price}
//                             </span>
//                         </div>

//                         {/* COUPON */}
//                         <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
//                             <img src={p_income.card?.token_img} alt="" />
//                             <span>Coupon Code</span>

//                             <div className="flex gap-2 border border-dashed border-white px-2 py-1 rounded">
//                                 <span className="tracking-widest">
//                                     {p_income.card?.coupon_code}
//                                 </span>
//                                 <span className="bg-yellow/20 text-yellow text-xs px-2 rounded">
//                                     {p_income.card?.discount_percent}
//                                 </span>
//                             </div>
//                         </div>

//                         {/* EXPIRY */}
//                         <div className="mt-2 text-sm">
//                             Code expires in{" "}
//                             <span className="text-red-500">
//                                 {p_income.card?.expires_in}
//                             </span>
//                         </div>

//                         {/* ================= FEATURES ================= */}
//                         <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
//                             {[
//                                 {
//                                     icon: HiOutlineCheckBadge,
//                                     label: "Transparency",
//                                 },
//                                 {
//                                     icon: MdVerified,
//                                     label: "Honest value",
//                                 },
//                                 {
//                                     icon: BsShieldCheck,
//                                     label: "Guaranteed result",
//                                 },
//                             ].map((item) => (
//                                 <div
//                                     key={item.label}
//                                     className="bg-[#121212] rounded-xl py-3 sm:py-5 flex flex-col items-center gap-3 text-center"
//                                 >
//                                     <div className="w-10 h-10 rounded-full bg-yellow/10 flex items-center justify-center">
//                                         <item.icon className="text-yellow text-xl" />
//                                     </div>

//                                     <p className="text-sm text-[#A7A7A7]">
//                                         {item.label}
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* ================= PROMISE ================= */}
//                         <div className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-[#1D1400] border border-[#3A2800] rounded-xl overflow-hidden">
//                             <p className="px-4 py-4 text-sm text-center sm:text-left">
//                                 We stay with you until you achieve your career goals
//                             </p>

//                             <img
//                                 src={assets.our_promise}
//                                 alt=""
//                                 className="h-[110px] object-contain"
//                             />
//                         </div>
//                     </div>

//                     {/* ================= BOTTOM CARD ================= */}
//                     <div className="bg-[#000000BF] border border-[#2D2D2D] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
//                         <div>
//                             <h3 className="text-lg font-semibold mb-4">
//                                 What you’ll get
//                             </h3>

//                             <ul className="space-y-3 text-sm">
//                                 <li className="flex gap-2 items-center">
//                                     <img src={assets.verified} alt="" />
//                                     Lifetime access to all course resources
//                                 </li>
//                                 <li className="flex gap-2 items-center">
//                                     <img src={assets.verified} alt="" />
//                                     Get ongoing support from your mentor
//                                 </li>
//                                 <li className="flex gap-2 items-center">
//                                     <img src={assets.verified} alt="" />
//                                     Learn in your native language (Tamil)
//                                 </li>
//                             </ul>
//                         </div>

//                         <img
//                             src={assets.you_get}
//                             alt=""
//                             className="w-[140px] sm:w-[160px] mx-auto sm:mx-0"
//                         />
//                     </div>
//                 </div>

//                 {/* ================= RIGHT FORM ================= */}
//                 <div className="lg:col-span-5">
//                     <div className="h-full bg-black/80 border border-white/10 rounded-2xl p-6 flex flex-col">
//                         <h3 className="uppercase text-sm md:text-2xl font-semibold">
//                             <span className="text-yellow">Struggling</span> to figure it out
//                             alone?
//                         </h3>

//                         <div className="text-[#8A8A8A] mt-2 flex items-center gap-1 text-[11px]">
//                             <span>Get Expert</span>
//                             <span className="relative inline-flex items-center px-3 py-1">
//                                 <img
//                                     src={assets.outer_line}
//                                     alt=""
//                                     className="absolute inset-0 w-full h-full pointer-events-none"
//                                 />
//                                 <span className="relative z-10">1:1 Guidance</span>
//                             </span>
//                         </div>

//                         <form className="mt-6 space-y-6 flex-1">
//                             {FORM_FIELDS.map((f) => (
//                                 <FieldRenderer key={f.name} field={f} />
//                             ))}

//                             <button className="mt-auto w-full bg-yellow text-black font-semibold py-3 rounded-md">
//                                 Submit
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default PassiveIncome;

import React from "react";
import Heading from "../Heading";
import { assets } from "../../assets/assets";
import { getDealNameFromRoute } from "../../utils/geolocation";
import { submitToZoho } from "../../utils/zohoApi";

const PassiveIncome = ({ p_income }) => {
  // Form state for inline form
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    qualification: "",
    profile: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
      const fullPhone = formData.phone; // Assuming user enters full phone or logic needed

      const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
      const cleanBaseUrl = API_BASE_URL.replace(/\/$/, "");

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        qualification: formData.qualification,
        profile: formData.profile,
        courseName: courseName,
        // Hardcoded Deal Fields
        Pipeline: "Course-Pipeline",
        Stage: "Lead Captured",
        Amount: "0",
        Deal_Name: courseName,
      };

      await submitToZoho(`${cleanBaseUrl}/zoho/submit-form.php`, payload);
      // toast.success("Thank you!");
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  const FORM_FIELDS = p_income.formFields || [];

  /* ================= FIELD ================= */
  const FieldRenderer = ({ field }) => {
    const base =
      "mt-1 w-full bg-[#141414] border border-white/10 rounded-md px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30";

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
            <div className="flex items-center mt-1 px-2 bg-[#141414] border border-white/10 rounded-md text-xs">
              🇮🇳 +91
            </div>
            <input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className={`flex-1 ${base}`}
              placeholder={field.placeholder}
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
          value={formData[field.name] || ""}
          onChange={handleChange}
          className={base}
          placeholder={field.placeholder}
        />
      </div>
    );
  };

  return (
    <section
      className="px-4 sm:px-14 lg:px-24 py-12 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(18,10,0,.85), rgba(70,48,0,.85)), url(${p_income.bg})`,
      }}
    >
      <Heading {...p_income} />

      {/* ================= GRID ================= */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* ================= TOP CARD ================= */}
          <div className="bg-black/80 border border-[#2D2D2D] rounded-2xl p-6 flex flex-col">
            {/* PRICE */}
            <div className="flex items-end gap-3">
              <h2 className="text-yellow text-[40px] font-bold">
                {p_income.card?.price}
              </h2>
              <span className="line-through text-[#A7A7A7]">
                {p_income.card?.original_price}
              </span>
            </div>

            {/* COUPON */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              <img src={p_income.card?.token_img} alt="" />
              <span>Coupon Code</span>

              <div className="flex gap-2 border border-dashed border-white px-2 py-1 rounded">
                <span className="tracking-widest">
                  {p_income.card?.coupon_code}
                </span>
                <span className="bg-yellow/20 text-yellow text-xs px-2 rounded">
                  {p_income.card?.discount_percent}
                </span>
              </div>
            </div>

            {/* EXPIRY */}
            <div className="mt-2 text-sm">
              Code expires in{" "}
              <span className="text-red-500">{p_income.card?.expires_in}</span>
            </div>

            {/* ================= FEATURES ================= */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {p_income.features?.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#121212] rounded-xl py-3 sm:py-5 flex flex-col items-center gap-2 text-center"
                >
                  <div className="w-10 h-10  flex items-center justify-center">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-[24px] h-[24px]"
                    />
                  </div>

                  <p className="text-sm text-[#A7A7A7]">{item.label}</p>
                </div>
              ))}
            </div>

            {/* ================= PROMISE ================= */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-[#1D1400] border border-[#3A2800] rounded-xl overflow-hidden">
              <p className="px-4 py-4 text-sm text-center sm:text-left">
                We stay with you until you achieve your career goals
              </p>

              <img
                src={assets.our_promise}
                alt=""
                className="h-[110px] object-contain"
              />
            </div>
          </div>

          {/* ================= BOTTOM CARD ================= */}
          <div className="bg-[#000000BF] border border-[#2D2D2D] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">What you’ll get</h3>

              <ul className="space-y-3 text-sm">
                {p_income.benefits?.map((benefit, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <img src={assets.verified} alt="" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <img
              src={assets.you_get}
              alt=""
              className="w-[140px] sm:w-[160px] mx-auto sm:mx-0"
            />
          </div>
        </div>

        {/* ================= RIGHT FORM ================= */}
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

            <form className="mt-6 space-y-6 flex-1" onSubmit={handleSubmit}>
              {FORM_FIELDS.map((f) => (
                <FieldRenderer key={f.name} field={f} />
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-auto w-full bg-yellow text-black font-semibold py-3 rounded-md disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassiveIncome;
