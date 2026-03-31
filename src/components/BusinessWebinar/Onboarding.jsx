import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OnboardingFormView from "./OnboardingFormView";
import OnboardingConfirmation from "./OnboardingConfirmation";
import OnboardingSuccess from "./OnboardingSuccess";
import { submitToZoho } from "../../utils/zohoApi";

const Onboarding = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine step from URL
  const pathname = location.pathname;
  let step = "FORM";
  if (pathname.includes("/checkout")) step = "CONFIRMATION";
  else if (pathname.includes("/thank-you")) step = "SUCCESS";

  // State initialization from location.state
  const { dealId, contactId, formData } = location.state || {};

  // Local UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if missing data for later steps
  useEffect(() => {
    if (step === "CONFIRMATION" && (!dealId || !contactId)) {
      navigate("/proclass/ssr/seat", { replace: true });
    }
    // ensure submission state is reset when step changes or component mounts
    setIsSubmitting(false);
  }, [step, dealId, contactId, navigate]);

  // Step 1: Submit Form -> Create CRM Contact/Deal -> Navigate to Checkout
  const handleReserveSeat = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Get form data
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());

    // Add extra context if needed
    data.st_touch_course = "Business Webinar";
    data.current_course = "Business Webinar";
    data.url_depend_course_name_hidden_filed = "Business Webinar";

    // Add Deal fields for Zoho CRM
    data.Deal_Name = `Business Webinar`;
    data.Amount = "10";
    data.Pipeline = "SSR-Webinar";
    data.Stage = "Pending";

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
      const cleanBaseUrl = API_BASE_URL.replace(/\/$/, "");

      const result = await submitToZoho(`${cleanBaseUrl}/zoho/submit-form.php`, data);

      // Extract Deal ID and Contact ID
      const responseData = result.data || result;
      const createdDealId = responseData.zoho_deal?.data?.[0]?.details?.id;
      const createdContactId =
        responseData.zoho_contact?.data?.[0]?.details?.id;

      if (!createdDealId) {
        throw new Error("Failed to create deal");
      }

      // Navigate to Confirmation (Checkout) Step with state
      navigate("/proclass/ssr/checkout", {
        state: {
          dealId: createdDealId,
          contactId: createdContactId,
          formData: data,
        },
      });
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false); // Only set false on error, success navigates away
    }
  };

  // Step 2: User Clicks "Proceed to Secure..." -> Create Order -> Open Razorpay
  const handleProceedToPayment = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
      const cleanBaseUrl = API_BASE_URL.replace(/\/$/, "");

      // Create Razorpay order
      const orderResponse = await fetch(
        `${cleanBaseUrl}/razorpay/create-order.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: formData.Amount,
            deal_id: dealId,
            contact_id: contactId,
            email: formData.email,
            phone: formData.phone,
          }),
        }
      );

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderResult.error || "Failed to create order");
      }

      // Open Razorpay checkout
      const orderData = orderResult.data || orderResult;
      openRazorpayCheckout(orderData, formData, dealId, cleanBaseUrl);
    } catch (err) {
      console.error("Payment setup error:", err);
      setError(err.message || "Failed to initiate payment.");
      setIsSubmitting(false);
    }
  };

  const openRazorpayCheckout = (orderData, formData, dealId, cleanBaseUrl) => {
    const options = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Expertisor Academy",
      description: "Business Webinar Registration",
      order_id: orderData.order_id,
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#F59E0B",
      },
      handler: async function (response) {
        await verifyPayment(response, dealId, cleanBaseUrl);
      },
      modal: {
        ondismiss: function () {
          setIsSubmitting(false);
          setError("Payment cancelled. Please try again.");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const verifyPayment = async (razorpayResponse, dealId, cleanBaseUrl) => {
    try {
      const response = await fetch(
        `${cleanBaseUrl}/razorpay/verify-payment.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_order_id: razorpayResponse.razorpay_order_id,
            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
            razorpay_signature: razorpayResponse.razorpay_signature,
            deal_id: dealId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Payment verification failed");
      }

      // Payment successful -> Navigate to Success Step
      navigate("/proclass/ssr/thank-you");
    } catch (err) {
      console.error("Payment verification error:", err);
      setError(
        err.message || "Payment verification failed. Please contact support."
      );
      setIsSubmitting(false); // Only stop submitting on error
    }
  };

  return (
    <div className="onboarding-root">
      {/* Background overlay */}
      <div className="onboarding-bg"></div>

      {step === "SUCCESS" && <OnboardingSuccess />}

      {step === "CONFIRMATION" && (
        <OnboardingConfirmation
          onProceed={handleProceedToPayment}
          isLoading={isSubmitting}
        />
      )}

      {step === "FORM" && (
        <OnboardingFormView
          onSubmit={handleReserveSeat}
          isSubmitting={isSubmitting}
          error={error}
        />
      )}
    </div>
  );
};

export default Onboarding;
