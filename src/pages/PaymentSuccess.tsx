import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdCheckCircle, MdError } from "react-icons/md";
import CryptoJS from "crypto-js";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [error, setError] = useState("");
  
  const bookingId = searchParams.get("bookingId");
  const txn = searchParams.get("txn");
  const oid = searchParams.get("oid");
  const amt = searchParams.get("amt");
  const refId = searchParams.get("refId");

  const secretKey = "8gBm/:&EnhH.1/q"; // eSewa test secret
  const productCode = "EPAYTEST";

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      // Verify eSewa signature
      if (!oid || !amt || !refId) {
        throw new Error("Missing payment verification data");
      }

      // Create verification signature
      const message = `total_amount=${amt},transaction_uuid=${oid},product_code=${productCode}`;
      const hash = CryptoJS.HmacSHA256(message, secretKey);
      const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

      // Verify payment with backend
      const response = await fetch(`http://localhost:4000/vehicle/book/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          bookingId: bookingId,
          transactionId: refId,
          amount: amt,
          signature: hashInBase64,
          oid: oid
        })
      });

      if (!response.ok) {
        throw new Error("Payment verification failed");
      }

      const result = await response.json();
      
      if (result.success) {
        setVerificationStatus('success');
        // Clear booking data from sessionStorage
        sessionStorage.removeItem("bookingData");
        
        // Auto redirect to bookings page after 5 seconds
        setTimeout(() => {
          navigate("/my-bookings");
        }, 5000);
      } else {
        throw new Error(result.message || "Payment verification failed");
      }
    } catch (err: any) {
      console.error("Payment verification error:", err);
      setError(err.message || "Payment verification failed");
      setVerificationStatus('failed');
    }
  };

  if (verificationStatus === 'verifying') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verifying Payment...
          </h2>
          <p className="text-gray-600 mb-4">
            Please wait while we verify your payment with eSewa.
          </p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
          <MdError className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Verification Failed
          </h2>
          <p className="text-gray-600 mb-4">
            {error || "We couldn't verify your payment. Please contact support."}
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate("/available-vehicles")}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/my-bookings")}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Check My Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <MdCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-4">
          Your booking has been confirmed and payment processed successfully.
        </p>
        
        {bookingId && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Booking ID:</span> {bookingId}
            </p>
            {refId && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Transaction ID:</span> {refId}
              </p>
            )}
            {amt && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Amount:</span> Rs. {amt}
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate("/my-bookings")}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/available-vehicles")}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Book Another Vehicle
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          You will be redirected to your bookings page in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
