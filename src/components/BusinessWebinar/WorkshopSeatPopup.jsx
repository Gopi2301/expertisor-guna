import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import stepDoneIcon from "../../assets/frame.svg";
import { submitToZoho } from "../../utils/zohoApi";
import WorkshopThankYou from "./WorkshopThankYou";
import toast from "react-hot-toast";

const pricingItems = [
  {
    title: "21-Day RHCSA Crack Plan",
    subtitle: "Step-by-step study roadmap for exam clarity",
    price: 1499,
  },
  {
    title: "Live Workshop",
    subtitle: "2-hour live session + Q&A",
    price: 1299,
  },
  {
    title: "Lab Simulation Guidance",
    subtitle: "How to practice in exam-like setup",
    price: 2499,
  },
];

const formatPrice = (value) => `\u20B9${value.toLocaleString("en-IN")}`;
const yellowGradient =
  "linear-gradient(90.7deg, #FFF200 0%, #FFF876 29.76%, #FFF200 54.66%, #FFF876 78.37%, #FFF200 100%)";

const WorkshopSeatPopup = ({ isOpen, onClose, seatsLeft = 13, zohoConfig }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [creditApplied, setCreditApplied] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [dealId, setDealId] = useState(null);
  const [contactId, setContactId] = useState(null);

  const total = useMemo(
    () => pricingItems.reduce((sum, item) => sum + item.price, 0),
    []
  );
  const creditAmount = 5198;
  const finalPrice = creditApplied ? 99 : total;

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setErrors({});
      setSubmissionError(null);
      setDealId(null);
      setContactId(null);
    }
  }, [isOpen]);

  const validateStepOne = () => {
    const nextErrors = {};

    if (!fullName.trim()) nextErrors.fullName = "Enter your full name";
    if (!email.trim()) {
      nextErrors.email = "Enter your email address";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!phone.trim()) {
      nextErrors.phone = "Enter your WhatsApp number";
    } else if (phone.replace(/\D/g, "").length < 8) {
      nextErrors.phone = "Enter a valid WhatsApp number";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToStepTwo = () => {
    if (!validateStepOne()) return;
    setStep(2);
  };

  const handleSecureSeat = async () => {
    console.log("🚀 handleSecureSeat called");
    if (!zohoConfig) {
        console.warn("⚠️ No zohoConfig provided to the popup");
        navigate("/proclass/ssr/seat");
        return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = {
        name: fullName,
        email: email,
        phone: "+91" + phone,
        // Deal fields for Zoho CRM
        layout_id: zohoConfig.layoutId,
        Amount: zohoConfig.Amount,
        Course_Name_Text: zohoConfig.Course_Name_Text,
        Deal_Name: zohoConfig.Deal_Name,
        Workshop: zohoConfig.Workshop,
        Course_Name: zohoConfig.Course_Name,
        Call_Status: zohoConfig.Call_Status,
        Course_Interest: zohoConfig.Course_Interest,
        Pipeline: zohoConfig.Pipeline,
        Stage: "Lead Captured",
    };

    try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
        const cleanBaseUrl = API_BASE_URL.replace(/\/$/, "");
        
        // 1. Submit to Zoho CRM
        console.log("🚀 Starting Zoho submission...");
        const result = await submitToZoho(`${cleanBaseUrl}/zoho/submit-form.php`, payload);
        
        // Extract IDs for payment linking
        const responseData = result.data || result;
        const createdDealId = responseData.zoho_deal?.data?.[0]?.details?.id;
        const createdContactId = responseData.zoho_contact?.data?.[0]?.details?.id;

        if (!createdDealId) {
            console.error("❌ Failed to get Deal ID from Zoho response", result);
            throw new Error("Failed to create deal in CRM");
        }

        setDealId(createdDealId);
        setContactId(createdContactId);
        console.log(`✅ Zoho Lead Created! Deal ID: ${createdDealId}`);

        // 2. Create Razorpay Order
        console.log("💳 Creating Razorpay order...");
        const orderResponse = await fetch(`${cleanBaseUrl}/razorpay/create-order.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: zohoConfig.Amount || 99,
                deal_id: createdDealId,
                contact_id: createdContactId,
                email: email,
                phone: phone,
            }),
        });

        const orderResult = await orderResponse.json();
        
        if (!orderResponse.ok) {
            throw new Error(orderResult.error || "Failed to initiate payment gateway");
        }

        // 3. Open Razorpay Checkout Modal
        console.log("✨ Opening Razorpay Checkout...");
        const orderData = orderResult.data || orderResult;
        openRazorpayCheckout(orderData, createdDealId, cleanBaseUrl);

    } catch (error) {
        console.error("Submission/Payment error:", error);
        setSubmissionError(error.message || "An unexpected error occurred. Please try again.");
        toast.error("Process failed. Please try again.");
        setIsSubmitting(false);
    }
  };

  const openRazorpayCheckout = (orderData, currentDealId, cleanBaseUrl) => {
    if (!window.Razorpay) {
        console.error("❌ Razorpay SDK not loaded");
        setSubmissionError("Payment gateway not loaded. Please refresh the page.");
        setIsSubmitting(false);
        return;
    }

    const options = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Expertisor Academy",
      description: "Workshop Reserve Seat",
      order_id: orderData.order_id,
      prefill: {
        name: fullName,
        email: email,
        contact: phone,
      },
      theme: {
        color: "#FFF200",
      },
      handler: async function (response) {
        await verifyPayment(response, currentDealId, cleanBaseUrl);
      },
      modal: {
        ondismiss: function () {
          console.log("🚫 Payment cancelled by user");
          setIsSubmitting(false);
          setSubmissionError("Payment was cancelled. Secure your seat to continue.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (razorpayResponse, currentDealId, cleanBaseUrl) => {
    console.log("🔍 Verifying payment...");
    try {
      const response = await fetch(`${cleanBaseUrl}/razorpay/verify-payment.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: razorpayResponse.razorpay_order_id,
          razorpay_payment_id: razorpayResponse.razorpay_payment_id,
          razorpay_signature: razorpayResponse.razorpay_signature,
          deal_id: currentDealId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Payment verification failed");
      }

      console.log("🎉 Payment Verified Successfully!");
      toast.success("Seat Secured!");
      setStep(3); // Success Step
    } catch (err) {
      console.error("Payment verification error:", err);
      setSubmissionError(err.message || "Payment verification failed. Please contact support.");
      toast.error("Verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative z-[101] w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#050505] shadow-[0_24px_80px_rgba(0,0,0,0.6)] sm:max-w-[420px] md:max-w-[560px] lg:max-w-[534px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-[#060606] px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFF200] sm:h-8 sm:w-8">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-black sm:h-5 sm:w-5"
                aria-hidden="true"
              >
                <path d="M13.2 2 5 13h5.2L8.8 22 19 9h-5.1L13.2 2Z" />
              </svg>
            </div>
            <h2 className="font-clash text-[18px] sm:text-[20px] font-semibold leading-[24px] tracking-[0.04em] text-white">
              <span className="text-[#FFF200]">Crack RHCSA</span> Exam Faster
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-3xl leading-none text-white/90 transition hover:text-white"
            aria-label="Close popup"
          >
            &times;
          </button>
        </div>

        <div className="border-b border-white/10 bg-[#171717]">
          <div className="grid grid-cols-2">
            <div
              className={`flex items-center justify-center gap-2 border-b-[2px] px-2 py-3 sm:px-4 sm:py-4 ${
                step === 1 ? "border-[#FFF200]" : "border-transparent"
              }`}
            >
              {step >= 2 ? (
                <img
                  src={stepDoneIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
              ) : (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFF200] text-[10px] font-semibold text-black sm:h-6 sm:w-6 sm:text-xs">
                   1
                </div>
              )}
              <span className="text-[10px] text-white/90 sm:text-xs md:text-sm">
                Tell Us About You
              </span>
            </div>

            <div
              className={`flex items-center justify-center gap-2 border-b-[2px] px-2 py-3 sm:px-4 sm:py-4 ${
                step >= 2 ? "border-[#FFF200]" : "border-transparent"
              }`}
            >
              {step === 3 ? (
                <img
                  src={stepDoneIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                />
              ) : (
                <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold sm:h-6 sm:w-6 sm:text-xs ${
                    step >= 2
                        ? "bg-[#FFF200] text-black"
                        : "bg-[#4A4A4A] text-white"
                    }`}
                >
                    2
                </div>
              )}
              <span className="text-[10px] text-white/90 sm:text-xs md:text-sm">
                Confirm Seat
              </span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="bg-[#050505] px-3 py-4 sm:px-4 sm:py-5">
            <div className="mx-auto flex flex-col gap-3">
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Full Name"
                  className="h-10 w-full rounded-md border border-white/5 px-4 text-sm text-white outline-none placeholder:text-[#767676] focus:border-[#FFF200]/40 sm:h-11 sm:text-base"
                  style={{ backgroundColor: "rgba(29, 29, 29, 0.8)" }}
                />
                {errors.fullName ? (
                  <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                ) : null}
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email Address"
                  className="h-10 w-full rounded-md border border-white/5 px-4 text-sm text-white outline-none placeholder:text-[#767676] focus:border-[#FFF200]/40 sm:h-11 sm:text-base"
                  style={{ backgroundColor: "rgba(29, 29, 29, 0.8)" }}
                />
                {errors.email ? (
                  <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                ) : null}
              </div>

              <div>
                <div
                  className="flex h-10 items-center rounded-md border border-white/5 px-3 sm:h-11 sm:px-4"
                  style={{ backgroundColor: "rgba(29, 29, 29, 0.8)" }}
                >
                  <div className="flex items-center gap-2 pr-3">
                    <span className="text-base sm:text-lg">IN</span>
                    <svg
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5 fill-white/80"
                      aria-hidden="true"
                    >
                      <path d="M5.2 7.2 10 12l4.8-4.8 1.4 1.4-6.2 6.2L3.8 8.6l1.4-1.4Z" />
                    </svg>
                  </div>
                  <span className="border-l border-white/10 pl-3 text-sm text-white/90 sm:text-base">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="WhatsApp Number"
                    className="ml-3 h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-[#767676] sm:text-base"
                  />
                </div>
                {errors.phone ? (
                  <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={goToStepTwo}
                className="mt-1 h-10 rounded-md text-sm font-semibold text-black transition hover:brightness-105 sm:h-11 sm:text-base"
                style={{ background: yellowGradient }}
              >
                Go to Step #2
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-[#050505]">
            <div className="px-3 py-4 sm:px-4 sm:py-5">
              <div className="space-y-3">
                {pricingItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-white sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/45 sm:text-sm">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="pt-0.5 text-sm text-white/75 sm:text-base">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                ))}

                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white sm:text-base">Total</span>
                    <span className="text-sm text-white sm:text-base">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="rounded-md border border-dashed border-white/20 bg-black/30 px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-[#FFF200] sm:text-base">
                        Workshop VIP Credit
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/55 sm:text-xs">
                        (Valid for first 100 attendees)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-red-500 sm:text-base">
                        - {formatPrice(creditAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {submissionError && (
                <p className="px-4 py-2 text-xs text-red-500 text-center">{submissionError}</p>
            )}

            <div className="border-t border-white/10 bg-[#1D1D1D] px-3 py-3 sm:px-4">
              <div className="flex items-end gap-6">
                <button
                  type="button"
                  onClick={handleSecureSeat}
                  disabled={isSubmitting}
                  className="h-10 flex-1 rounded-md text-sm font-semibold text-black transition hover:brightness-105 sm:h-11 sm:text-base disabled:opacity-50"
                  style={{ background: yellowGradient }}
                >
                  {isSubmitting ? "Securing..." : "Secure Seat"}
                </button>

                <div className="min-w-fit text-right">
                  <div>
                    <span className="mr-1 text-xs text-white/35 line-through sm:text-sm">
                      {formatPrice(total)}
                    </span>
                    <span className="text-lg font-semibold text-[#FFF200] sm:text-[16px]">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-end gap-1 text-white/85">
                    <div className="flex h-4 w-4 items-center justify-center rounded bg-[#FFF200]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3 fill-black"
                        aria-hidden="true"
                      >
                        <path d="M7 4h10v3h3v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7h3V4Zm2 0v3h6V4H9Zm1.5 8.5H9v4h2.5l3-3H12v-1Z" />
                      </svg>
                    </div>
                    <span className="font-inter text-[10px] sm:text-xs">{seatsLeft} seats left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
            <div className="bg-[#050505]">
                <WorkshopThankYou whatsappLink="#" />
            </div>
        )}
      </div>
    </div>
  );
};

export default WorkshopSeatPopup;
