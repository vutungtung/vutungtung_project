

// const test = () => {
//   return <div>
//              <div>
//   {/* STEP 2 */}
//   {step === 2 && (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
//       <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
//         {/* First Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             First Name *
//           </label>
//           <div className="relative">
//             <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Pyarjan"
//               value={contactInfo.firstName}
//               onChange={(e) =>
//                 setContactInfo({ ...contactInfo, firstName: e.target.value })
//               }
//               className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
//               required
//             />
//           </div>
//         </div>

//         {/* Last Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Last Name *
//           </label>
//           <div className="relative">
//             <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Thapa"
//               value={contactInfo.lastName}
//               onChange={(e) =>
//                 setContactInfo({ ...contactInfo, lastName: e.target.value })
//               }
//               className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
//               required
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email Address *
//           </label>
//           <div className="relative">
//             <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="email"
//               placeholder="pyarjan@example.com"
//               value={contactInfo.email}
//               onChange={(e) =>
//                 setContactInfo({ ...contactInfo, email: e.target.value })
//               }
//               className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
//               required
//             />
//           </div>
//         </div>

//         {/* Phone Number */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Phone Number *
//           </label>
//           <div className="relative">
//             <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="+977-9800000000"
//               value={contactInfo.phone}
//               onChange={(e) =>
//                 setContactInfo({ ...contactInfo, phone: e.target.value })
//               }
//               className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
//               required
//             />
//           </div>
//         </div>

//         {/* Emergency Contact Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Emergency Contact Name
//           </label>
//           <div className="relative">
//             <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Suman Thapa"
//               value={contactInfo.emergencyName}
//               onChange={(e) =>
//                 setContactInfo({ ...contactInfo, emergencyName: e.target.value })
//               }
//               className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
//             />
//           </div>
//         </div>

//         {/* Emergency Contact Phone */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Emergency Contact Phone
//           </label>
//           <div className="relative">
//             <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="+977-9811111111"
//               value={contactInfo.emergencyPhone}
//               onChange={(e) =>
//                 setContactInfo({ ...contactInfo, emergencyPhone: e.target.value })
//               }
//               className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-skillprompt-primary"
//             />
//           </div>
//         </div>
//       </form>

//       <div className="w-full flex gap-2 text-red bg-red/20 p-5 rounded-2xl border">
//         <MdErrorOutline size={24} />
//         <div>
//           <p>Important Information</p>
//           <p>
//             Please ensure all contact information is accurate. We'll use this
//             information to contact you regarding your rental and for emergency purposes.
//           </p>
//         </div>
//       </div>
//     </div>
//   )}

//   {/* STEP 3 */}
//   {step === 3 && (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Payment Information</h2>

//       {/* Payment Options */}
//       <div className="flex gap-4 mb-6">
//         {["esewa", "khalti"].map((method) => (
//           <button
//             key={method}
//             type="button"
//             className={`border rounded-lg p-3 w-1/2 transition ${
//               paymentInfo.method === method
//                 ? "bg-green-500 text-white border-green-500"
//                 : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
//             }`}
//             onClick={() => setPaymentInfo({ ...paymentInfo, method })}
//           >
//             {method === "esewa" ? "eSewa" : "Khalti"}
//           </button>
//         ))}
//       </div>

//       {/* Payment Instructions */}
//       {paymentInfo.method === "esewa" && (
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
//           <p className="mb-4 text-gray-700">
//             You’ll be redirected to <span className="font-semibold">eSewa</span> to
//             complete your payment securely.
//           </p>
//           <button
//             onClick={() => {
//               if (!paymentInfo.agreed) {
//                 alert(
//                   "Please agree to Terms and Conditions before proceeding."
//                 );
//                 return;
//               }
//               const esewaUrl = `https://esewa.com.np/#/pay?amt=${totalPrice}&pid=BOOKING_${Date.now()}`;
//               window.open(esewaUrl, "_blank");
//             }}
//             className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
//           >
//             Pay with eSewa
//           </button>
//         </div>
//       )}

//       {paymentInfo.method === "khalti" && (
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
//           <p className="mb-4 text-gray-700">
//             You’ll be redirected to <span className="font-semibold">Khalti</span> to
//             complete your payment securely.
//           </p>
//           <button
//             onClick={() => {
//               if (!paymentInfo.agreed) {
//                 alert(
//                   "Please agree to Terms and Conditions before proceeding."
//                 );
//                 return;
//               }
//               const khaltiUrl = `https://khalti.com/#/pay?amount=${totalPrice}&product_identity=BOOKING_${Date.now()}`;
//               window.open(khaltiUrl, "_blank");
//             }}
//             className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transition"
//           >
//             Pay with Khalti
//           </button>
//         </div>
//       )}
//     </div>
//   )}
// </div>

                  
//   </div>;
// };

// export default test;
