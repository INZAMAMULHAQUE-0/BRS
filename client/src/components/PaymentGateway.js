import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Use QRCodeCanvas instead of QRCode
import "./PaymentGateway.css"

const PaymentGateway = () => {
  const [paymentMethod, setPaymentMethod] = useState("qr"); // Default is QR payment
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePayment = () => {
    if (paymentMethod === "qr") {
      alert("Payment via QR Code has been initiated. Please scan the QR code to complete the payment.");
    } else if (paymentMethod === "card") {
      // Replace this logic with your payment gateway's API
      if (
        cardDetails.cardNumber &&
        cardDetails.expiryDate &&
        cardDetails.cvv &&
        cardDetails.cardHolder
      ) {
        alert("Card Payment Successful!");
      } else {
        alert("Please fill in all card details.");
      }
    }
  };

  return (
    <div className="payment-gateway-container">
      <h2 className="text-2xl font-bold mb-4">Choose Your Payment Method</h2>
      <div className="flex space-x-4 mb-6">
        <button
          className={`payment-method-button ${paymentMethod === "qr" ? "active" : ""}`}
          onClick={() => setPaymentMethod("qr")}
        >
          Pay via QR Code
        </button>
        <button
          className={`payment-method-button ${paymentMethod === "card" ? "active" : ""}`}
          onClick={() => setPaymentMethod("card")}
        >
          Pay via Credit/Debit Card
        </button>
      </div>

      {paymentMethod === "qr" && (
        <div className="qr-payment-section">
          <h3 className="text-xl font-semibold mb-4">Scan the QR Code to Pay</h3>
          <p className="mb-4 text-gray-600">
            Use your payment app to scan the QR code below and complete the transaction securely.
          </p>
          <QRCodeCanvas value="https://yourpaymentlink.com" size={200} />
          <p className="mt-4 text-gray-600">
            If you haven't already, download a QR code scanner or payment app to scan this code and confirm the payment.
          </p>
        </div>
      )}

      {paymentMethod === "card" && (
        <div className="card-payment-section">
          <h3 className="text-xl font-semibold mb-4">Enter Your Card Details</h3>
          <p className="mb-4 text-gray-600">
            Please enter your card details below to proceed with the payment. Your information will be securely processed.
          </p>
          <form>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="w-full p-2 border border-gray-300 rounded"
                value={cardDetails.cardNumber}
                onChange={handleCardInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            <div className="flex space-x-4 mb-4">
              <div>
                <label htmlFor="expiryDate" className="block text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={cardDetails.expiryDate}
                  onChange={handleCardInputChange}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-gray-700">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={cardDetails.cvv}
                  onChange={handleCardInputChange}
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="cardHolder" className="block text-gray-700">Cardholder Name</label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                className="w-full p-2 border border-gray-300 rounded"
                value={cardDetails.cardHolder}
                onChange={handleCardInputChange}
                placeholder="John Doe"
              />
            </div>
          </form>
          <p className="mt-4 text-gray-600">
            Double-check your details before submitting. Your card details will be securely processed to complete the payment.
          </p>
        </div>
      )}

      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handlePayment}
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentGateway;
