// export default BookingSuccessful;
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

// Define TypeScript interfaces
interface EsewaData {
  transaction_code: string;
  status: string;
  total_amount: string;
  transaction_uuid: string;
  product_code: string;
  signed_field_names: string;
  signature: string;
}

interface Vehicle {
  id: string | number;
  title: string;
  image: string[];
  pricePerDay: number;
  description: string;
  features?: string[];
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyName?: string;
  emergencyPhone?: string;
}

interface LocationData {
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
}

interface PaymentInfo {
  method: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  cardholder?: string;
  agreed: boolean;
}

interface BookingData {
  vehicle: Vehicle;
  licenseNumber: string;
  locationData: LocationData;
  contactInfo: ContactInfo;
  paymentInfo: PaymentInfo;
  totalPrice: number;
}

const BookingSuccessful = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [esewaData, setEsewaData] = useState<EsewaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // API function to save booking data
  const saveBookingToAPI = async (
    booking: BookingData,
    paymentData: EsewaData | null
  ) => {
    setApiStatus("loading");
    try {
      const bookingPayload = {
        ...booking,
        paymentStatus: paymentData ? paymentData.status : "pending",
        transactionId: paymentData ? paymentData.transaction_uuid : null,
        bookingDate: new Date().toISOString(),
        status: "confirmed",
      };

      // Replace with your actual API endpoint
      const response = await fetch("https://your-api-endpoint.com/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to save booking");
      }

      setApiStatus("success");
      console.log("Booking saved successfully:", bookingPayload);
    } catch (error) {
      console.error("Error saving booking:", error);
      setApiStatus("error");
    }
  };

  useEffect(() => {
    // Check for eSewa data in URL parameters
    const encodedData = searchParams.get("data");

    if (encodedData) {
      try {
        // Decode the base64 encoded data from eSewa
        const decodedData = JSON.parse(atob(encodedData)) as EsewaData;
        setEsewaData(decodedData);
      } catch (error) {
        console.error("Failed to decode eSewa data:", error);
      }
    }

    // Check for booking data in location state (if coming from ConfirmBooking)
    if (location.state) {
      const data = location.state as BookingData;
      setBookingData(data);

      // Save booking data to API
      saveBookingToAPI(
        data,
        encodedData ? JSON.parse(atob(encodedData)) : null
      );
    }

    setLoading(false);
  }, [searchParams, location.state]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Use either the booking data from state or create from eSewa data
  const booking = bookingData || {
    vehicle: {
      id: "",
      title: "Vehicle",
      image: [""],
      pricePerDay: 0,
      description: "",
    },
    licenseNumber: searchParams.get("licenseNumber") || "N/A",
    contactInfo: {
      firstName: "Customer",
      lastName: "",
      email: "",
      phone: "",
    },
    locationData: {
      pickupLocation: searchParams.get("pickupLocation") || "Unknown Location",
      returnLocation: searchParams.get("returnLocation") || "Unknown Location",
      pickupDate: searchParams.get("pickupDate") || "Unknown Date",
      returnDate: searchParams.get("returnDate") || "Unknown Date",
    },
    paymentInfo: {
      method: "esewa",
      agreed: true,
    },
    totalPrice: esewaData ? parseFloat(esewaData.total_amount) : 0,
  };

  const bookingId = esewaData?.transaction_uuid
    ? esewaData.transaction_uuid.split("-")[1]
    : `VT${Math.floor(Math.random() * 10000000)}`;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-100 text-red-600 rounded-full p-4">
              <FaCheckCircle size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your vehicle rental has been successfully booked
          </p>
          {esewaData && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
              <p>Payment Status: {esewaData.status}</p>
              <p>Transaction Code: {esewaData.transaction_code}</p>
            </div>
          )}
          {apiStatus === "loading" && (
            <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg">
              <p>Saving your booking details...</p>
            </div>
          )}
          {apiStatus === "success" && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
              <p>Booking details saved successfully!</p>
            </div>
          )}
          {apiStatus === "error" && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
              <p>Failed to save booking details. Please contact support.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Booking Details */}
          <div className="bg-white shadow rounded-lg p-6 md:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Booking Details
              </h2>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                Confirmed
              </span>
            </div>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Booking ID:</span>{" "}
                <span className="text-red-600">{bookingId}</span>
              </p>
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {booking.contactInfo.firstName} {booking.contactInfo.lastName}
              </p>
              <p>Email: {booking.contactInfo.email}</p>
              <p>Phone: {booking.contactInfo.phone}</p>
              {booking.contactInfo.emergencyName && (
                <p>
                  Emergency Contact: {booking.contactInfo.emergencyName} (
                  {booking.contactInfo.emergencyPhone})
                </p>
              )}
              <p>
                <span className="font-semibold">License Number:</span>{" "}
                {booking.licenseNumber}
              </p>
              <p>
                <span className="font-semibold">Payment Method:</span>{" "}
                {booking.paymentInfo.method}
              </p>
            </div>

            {/* Vehicle Info */}
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <img
                src={booking.vehicle.image[0] || "/placeholder-vehicle.jpg"}
                alt={booking.vehicle.title}
                className="w-24 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {booking.vehicle.title}
                </h3>
                <p className="text-gray-500">
                  <FaMapMarkerAlt className="inline mr-1" />{" "}
                  {booking.locationData.pickupLocation}
                </p>
                <p className="text-red-600 font-bold">
                  ${booking.totalPrice}{" "}
                  <span className="text-gray-500 font-normal">total</span>
                </p>
                <span className="text-sm text-gray-500">Self Drive</span>
              </div>
            </div>

            {/* Rental Schedule */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-red-600" />
                <div>
                  <p className="text-gray-500 text-sm">Pickup</p>
                  <p className="text-gray-900 font-semibold">
                    {booking.locationData.pickupDate}
                  </p>
                  <p className="text-gray-500 text-sm">10:00 AM</p>
                  <p className="text-gray-500 text-sm">
                    {booking.locationData.pickupLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-red-600" />
                <div>
                  <p className="text-gray-500 text-sm">Return</p>
                  <p className="text-gray-900 font-semibold">
                    {booking.locationData.returnDate}
                  </p>
                  <p className="text-gray-500 text-sm">10:00 AM</p>
                  <p className="text-gray-500 text-sm">
                    {booking.locationData.returnLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-600">
                <li>
                  Confirmation Email - You'll receive a confirmation email with
                  all details within 5 minutes
                </li>
                <li>
                  Vehicle Preparation - Our team will prepare your vehicle and
                  ensure it's ready for pickup
                </li>
                <li>
                  Pickup Day - Arrive at the pickup location with your ID and
                  any required documents
                </li>
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-gray-900 mb-2">
                Quick Actions
              </h3>
              <button className="w-full bg-red-600 text-white py-2 rounded-lg">
                Download Confirmation
              </button>
              <button className="w-full border border-red-600 text-red-600 py-2 rounded-lg">
                Add to Calendar
              </button>
              <button className="w-full border border-red-600 text-red-600 py-2 rounded-lg">
                Share Booking
              </button>
              <button
                className="w-full bg-red-600 text-white py-2 rounded-lg"
                onClick={() => (window.location.href = "/")}
              >
                Book Another Vehicle
              </button>
            </div>

            {/* Need Help */}
            <div className="bg-white shadow rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p>Call Us: +1 (555) 123-4567</p>
              <p>Email Support: support@vutungtung.com</p>
              <p>24/7 Support - We're here to help anytime</p>
            </div>

            {/* Payment Summary */}
            <div className="bg-white shadow rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-gray-900 mb-2">
                Payment Summary
              </h3>
              <p>Total Paid: ${booking.totalPrice}</p>
              <p className="text-green-600 text-sm">
                Payment processed successfully
              </p>
              {esewaData && (
                <div className="mt-2 text-xs text-gray-500">
                  <p>Transaction ID: {esewaData.transaction_uuid}</p>
                  <p>Method: eSewa</p>
                </div>
              )}
            </div>

            {/* Important Reminders */}
            <div className="bg-red-50 border-l-4 border-red-600 p-4 text-red-700 text-sm space-y-1">
              <h3 className="font-semibold text-red-800">
                Important Reminders
              </h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Bring a valid driver's license and credit card for security
                  deposit
                </li>
                <li>
                  Arrive 15 minutes early for vehicle inspection and paperwork
                </li>
                <li>
                  Contact us immediately if you need to modify or cancel your
                  booking
                </li>
                <li>Keep your booking confirmation handy during pickup</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 bg-red-50 p-6 rounded-lg text-center text-red-700">
          <p className="font-semibold">Thank You for Choosing VuTungTung!</p>
          <p>
            We're excited to be part of your journey. Have a safe and enjoyable
            trip!
          </p>
          <div className="flex justify-center space-x-6 mt-2 text-sm">
            <span>Premium Service</span>
            <span>Fully Insured</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessful;
