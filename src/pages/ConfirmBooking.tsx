import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdCalendarToday,
  MdErrorOutline,
  MdKeyboardArrowLeft,
  MdNavigateNext,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../component/navigate";
import { FiMail, FiPhone, FiUser } from "react-icons/fi";

interface BookingData {
  vehicle: {
    id: string | number;
    title: string;
    image: string[];
    pricePerDay: number;
  };
  locationData: {
    pickupLocation: string;
    returnLocation: string;
    pickupDate: string;
    returnDate: string;
  };
  licenseNumber: string;
  licenseFile: File | null;
  totalPrice: number;
}

const ConfirmBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingData = state as BookingData;

  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardholder: "",
    agreed: false,
  });

  const pickup = new Date(bookingData.locationData.pickupDate);
  const ret = new Date(bookingData.locationData.returnDate);

  const days = Math.max(
    1,
    Math.ceil((ret.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24))
  );

  // ✅ Use existing totalPrice if available, otherwise recalc
  const totalPrice =
    bookingData.totalPrice ?? bookingData.vehicle.pricePerDay * days;
  // Validation logic for each step
  const validateStep = () => {
    if (step === 1) {
      return !!(
        bookingData?.vehicle &&
        bookingData?.locationData.pickupDate &&
        bookingData?.locationData.returnDate &&
        bookingData?.licenseNumber &&
        bookingData?.licenseFile
      );
    }
    if (step === 2) {
      return (
        contactInfo.firstName &&
        contactInfo.lastName &&
        contactInfo.email &&
        contactInfo.phone
      );
    }
    if (step === 3) {
      return (
        paymentInfo.method &&
        paymentInfo.cardNumber &&
        paymentInfo.expiry &&
        paymentInfo.cvv &&
        paymentInfo.cardholder &&
        paymentInfo.agreed
      );
    }
    return false;
  };

  const nextStep = () => {
    if (validateStep()) {
      // mark this step as completed before moving
      setCompletedSteps((prev) =>
        prev.includes(step) ? prev : [...prev, step]
      );
      setStep((prev) => Math.min(prev + 1, 3));
    } else {
      alert("Please fill all required fields before continuing.");
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCompleteBooking = () => {
    if (!validateStep()) {
      alert("Please complete payment details first.");
      return;
    }

    const finalBooking = {
      ...bookingData,
      contactInfo,
      paymentInfo,
    };

    console.log("Booking Confirmed:", finalBooking);
    navigate("/booking-success", { state: finalBooking });
  };

  if (!bookingData) {
    return (
      <p className="text-center py-20 text-red-500">No booking data found.</p>
    );
  }

  return (
    <div className="bg-light-gray">
      <div className="max-w-7xl mx-auto py-10 px-5 ">
        <BackButton />
        <div className="flex lg:flex-row  flex-col gap-6 ">
          {/* Left Section - Steps */}
          <div className="flex-1">
            {/* Step Indicators */}
            <div className="flex bg-white p-6 rounded-2xl justify-around mb-6">
              {["Review Booking", "Contact Info", "Payment"].map(
                (label, index) => {
                  const stepNumber = index + 1;
                  const isActive = step === stepNumber;
                  const isCompleted = completedSteps.includes(stepNumber);

                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center ${
                        isActive
                          ? "text-red"
                          : isCompleted
                          ? "text-gray-400"
                          : ""
                      }`}
                    >
                      <div
                        className={`w-10 h-10 font-bold flex items-center justify-center rounded-full border-2 ${
                          isActive
                            ? "border-red bg-red text-white"
                            : isCompleted
                            ? "border-red bg-red text-white"
                            : "border-light-gray bg-light-gray"
                        }`}
                      >
                        {isCompleted ? "✓" : stepNumber}
                      </div>
                      <p className="text-sm mt-2 text-center">{label}</p>
                    </div>
                  );
                }
              )}
            </div>

            {/* Step Content */}
            <div className="bg-white p-6 rounded-2xl">
              {/* STEP 1 - Review */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Review Your Booking
                  </h2>
                  <div className="flex  flex-wrap items-center mb-5 gap-5 p-5 border rounded-2xl border-gray-300">
                    <img
                      src={bookingData.vehicle.image[0]}
                      alt={bookingData.vehicle.title}
                      className="h-20"
                    />
                    <div>
                      <p className="text-xl font-semibold">
                        {bookingData.vehicle.title}
                      </p>
                      <p className="text-xl font-semibold text-red">
                        ${bookingData.vehicle.pricePerDay}/day
                      </p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 space-y-5">
                    <div className="space-y-5">
                      <p className="flex justify-start items-center gap-2">
                        <MdCalendarToday size={24} className="text-red" />
                        <div>
                          <p className="text-lg font-medium">Pickup</p>
                          {bookingData.locationData.pickupDate}
                        </div>
                      </p>
                      <p className="flex justify-start items-center gap-2">
                        <MdCalendarToday size={24} className="text-red" />
                        <div>
                          <p className="text-lg font-medium">Return</p>
                          {bookingData.locationData.returnDate}
                        </div>
                      </p>
                    </div>
                    <div className="space-y-5">
                      <p className="flex justify-start items-center gap-2">
                        <IoLocationOutline size={24} className="text-red" />
                        <div>
                          <p className="text-lg font-medium">Pickup Location</p>
                          {bookingData.locationData.pickupLocation}
                        </div>
                      </p>
                      <p className="flex justify-start items-center gap-2">
                        <IoLocationOutline size={24} className="text-red" />
                        <div>
                          <p className="text-lg font-medium">Return Location</p>
                          {bookingData.locationData.returnLocation}
                        </div>
                      </p>
                    </div>
                  </div>
                  <p className="mb-5">
                    <strong>License Number:</strong> {bookingData.licenseNumber}
                  </p>
                  <div className="p-5 bg-light-gray flex justify-between items-center rounded-2xl">
                    <div>
                      <p className="text-lg font-semibold">Self Drive</p>
                      <p className="text-sm text-gray-500">
                        You will drive the vehicle yourself
                      </p>
                    </div>
                    <p className="text-lg font-semibold">Included</p>
                  </div>
                </div>
              )}

              {/* STEP 2 - Contact */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Contact Information
                  </h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 mb-5 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={contactInfo.firstName}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
                          required
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={contactInfo.lastName}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={contactInfo.email}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              email: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={contactInfo.phone}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              phone: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
                          required
                        />
                      </div>
                    </div>

                    {/* Emergency Contact Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact Name
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={contactInfo.emergencyName}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              emergencyName: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
                        />
                      </div>
                    </div>

                    {/* Emergency Contact Phone */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact Phone
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={contactInfo.emergencyPhone}
                          onChange={(e) =>
                            setContactInfo({
                              ...contactInfo,
                              emergencyPhone: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
                        />
                      </div>
                    </div>
                  </form>
                  <div className="w-full flex gap-2 text-red bg-red/20 p-5 rounded-2xl border">
                    <MdErrorOutline size={24} />
                    <div>
                      <p>Important Information</p>
                      <p>
                        Please ensure all contact information is accurate. We'll
                        use this information to contact you regarding your
                        rental and for emergency purposes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 - Payment */}
              {/* STEP 3 - Payment */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Payment Information
                  </h2>

                  {/* Payment Options */}
                  <div className="flex gap-4 mb-6">
                    {["esewa", "khalti"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        className={`border rounded-lg p-3 w-1/2 transition ${
                          paymentInfo.method === method
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={() =>
                          setPaymentInfo({ ...paymentInfo, method })
                        }
                      >
                        {method === "esewa" ? "eSewa" : "Khalti"}
                      </button>
                    ))}
                  </div>

                  {/* eSewa Payment */}
                  {paymentInfo.method === "esewa" && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <p className="mb-4 text-gray-700">
                        You’ll be redirected to{" "}
                        <span className="font-semibold">eSewa</span> to complete
                        your payment securely.
                      </p>
                      <button
                        onClick={() => {
                          const params = {
                            amt: bookingData.totalPrice,
                            psc: 0,
                            pdc: 0,
                            txAmt: 0,
                            tAmt: bookingData.totalPrice,
                            pid: "BOOKING_" + Date.now(),
                            scd: "EPAYTEST", // Test Merchant Code
                            su: "http://localhost:5173/success",
                            fu: "http://localhost:5173/failure",
                          };

                          const form = document.createElement("form");
                          form.method = "POST";
                          form.action =
                            "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

                          Object.keys(params).forEach((key) => {
                            const input = document.createElement("input");
                            input.type = "hidden";
                            input.name = key;
                            input.value = (params as any)[key];
                            form.appendChild(input);
                          });

                          document.body.appendChild(form);
                          form.submit();
                        }}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
                      >
                        Pay with eSewa
                      </button>
                    </div>
                  )}

                  {/* Khalti Payment */}
                  {paymentInfo.method === "khalti" && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <p className="mb-4 text-gray-700">
                        You’ll be redirected to{" "}
                        <span className="font-semibold">Khalti</span> to
                        complete your payment securely.
                      </p>
                      <button
                        onClick={() => {
                          // Example Khalti integration call (SDK needed for real)
                          alert("Redirecting to Khalti payment gateway...");
                        }}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition"
                      >
                        Pay with Khalti
                      </button>
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <label className="flex items-center gap-2 mt-6 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={paymentInfo.agreed}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          agreed: e.target.checked,
                        })
                      }
                    />
                    I agree to Terms and Conditions
                  </label>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between  bg-white p-5 rounded-2xl mt-6">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 flex justify-center items-center rounded bg-gray-200 hover:bg-gray-300"
                >
                  <MdKeyboardArrowLeft size={24} /> Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="ml-auto px-4 flex justify-center items-center py-2 rounded bg-red text-white hover:bg-gradient-red"
                >
                  Next <MdNavigateNext size={24} />
                </button>
              ) : (
                <button
                  onClick={handleCompleteBooking}
                  className="ml-auto px-4 py-2 rounded bg-red text-white hover:bg-gradient-red"
                >
                  Complete Booking
                </button>
              )}
            </div>
          </div>

          {/* Right Section - Booking Summary */}
          <div className="lg:w-[25rem] bg-white rounded-2xl shadow-sm p-6 border h-fit sticky top-20 border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Booking Summary
            </h2>

            {/* Vehicle Image */}
            <div className="overflow-hidden rounded-xl mb-4">
              <img
                src={bookingData.vehicle.image[0]}
                alt={bookingData.vehicle.title}
                className="w-full h-40 object-cover transition-transform hover:scale-105"
              />
            </div>

            {/* Vehicle Title & Price */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-medium text-gray-800">
                {bookingData.vehicle.title}
              </p>
              <p className="text-lg font-semibold text-red-500">
                ${bookingData.vehicle.pricePerDay}/day
              </p>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm text-gray-700">
              <p className="flex  justify-between">
                <span className="text-gray-500">Pickup Date</span>
                <span>{bookingData.locationData.pickupDate}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Return Date</span>
                <span>{bookingData.locationData.returnDate}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Pickup Location</span>
                <span className="text-right">
                  {bookingData.locationData.pickupLocation}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Return Location</span>
                <span className="text-right">
                  {bookingData.locationData.returnLocation}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Rental Type</span>
                <span>Self Drive</span>
              </p>
            </div>

            {/* Divider */}
            <hr className="my-4" />

            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-xl font-semibold text-gray-900">
                ${totalPrice}
              </span>
            </div>

            {/* Perks */}
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                ✔ Secure payment processing
              </p>
              <p className="flex items-center gap-2">
                ✔ Free cancellation up to 24h
              </p>
              <p className="flex items-center gap-2">✔ Instant confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
