import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";

interface Props {
  amount: number;
  bookingId: string;
}

const ESewaForm: React.FC<Props> = ({ amount, bookingId }) => {
  const [transactionUUID, setTransactionUUID] = useState("");
  const [signature, setSignature] = useState("");

  const secretKey = "8gBm/:&EnhH.1/q"; // eSewa test secret
  const productCode = "EPAYTEST";

  useEffect(() => {
    // Generate unique transaction UUID: combine UUID + bookingId + timestamp
    const uuid = `${uuidv4()}-${bookingId}-${Date.now()}`;
    setTransactionUUID(uuid);

    // Sign the fields for eSewa verification
    const message = `total_amount=${amount},transaction_uuid=${uuid},product_code=${productCode}`;
    const hash = CryptoJS.HmacSHA256(message, secretKey);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    setSignature(hashInBase64);
  }, [amount, bookingId]);

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="tax_amount" value="0" />
      <input type="hidden" name="total_amount" value={amount} />
      <input type="hidden" name="transaction_uuid" value={transactionUUID} />
      <input type="hidden" name="product_code" value={productCode} />
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />
      <input
        type="hidden"
        name="success_url"
        value={`${window.location.origin}/booking-successful?bookingId=${bookingId}`}
      />
      <input
        type="hidden"
        name="failure_url"
        value={`${window.location.origin}/confirm-booking/${bookingId}`}
      />
      <input
        type="hidden"
        name="signed_field_names"
        value="total_amount,transaction_uuid,product_code"
      />
      <input type="hidden" name="signature" value={signature} />

      <button
        type="submit"
        className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Pay ${amount} with eSewa
      </button>
    </form>
  );
};

export default ESewaForm;
