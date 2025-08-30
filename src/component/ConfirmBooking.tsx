import { useLocation } from "react-router-dom";

const ConfirmBooking = () => {
  const { state } = useLocation();
  console.log("Booking Data:", state);

  return (
    <div className="p-5">
      <h1>Confirm Booking</h1>
      <p>Pickup: {state.pickupLocation}</p>
      <p>Return: {state.returnLocation}</p>
      <p>Pickup Date: {state.pickupDate}</p>
      <p>Return Date: {state.returnDate}</p>
      <p>Rent Type: {state.rentType}</p>
      {state.rentType === "self" && (
        <>
          <p>License No: {state.licenseNumber}</p>
          <p>License File: {state.licenseFile?.name}</p>
        </>
      )}
    </div>
  );
};

export default ConfirmBooking;
