import React from 'react';

const Receipt = React.forwardRef(function Receipt(
    { cartItems, newData, shopName = "Shop Name", shopAddress = "Shop Address", manager = "John Doe", cashier = "Jane Doe" }, ref
) {


  // Calculate totals less discount
  const total =  cartItems.reduce((sum, item) => {
    const discountedPrice = item.price * (1 - item.discountPercentage / 100);
    return sum + item.quantity * discountedPrice;
  }, 0);

  const tax = total * 0.1;
  const subtotal = total + tax;


  return (
      <div ref={ref} id="receipt" className="w-96 bg-white p-4 font-mono text-sm mx-auto border border-gray-300 rounded-t">
        <h1 className="text-center font-bold text-lg mb-2">CASH RECEIPT</h1>

        {/* Shop name and address */}
        <div className="flex justify-between mb-2">
          <span>{shopName}</span>
          <span>{shopAddress}</span>
        </div>

        {/* Customer name */}
        <div className="flex justify-between mb-2">
          <span>Customer:</span>
          <span>{newData?.customerName || "Guest"}</span>
        </div>

        {/* Date and time*/}
        <div className="flex justify-between mb-2">
          <span>Date:</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>

        {/* Manager Name */}
        <div className="flex justify-between mb-2">
          <span>Manager:</span>
          <span>{manager}</span>
        </div>

        {/* Cashier Name */}
        <div className="flex justify-between mb-3">
          <span>Cashier:</span>
          <span>{cashier}</span>
        </div>

        <p className="text-center my-2 border-t border-b border-dashed py-1">==============================</p>

        {/* Items */}
        <div className="flex justify-between font-bold mb-1">
          <span>Description</span>
          <span>Price</span>
        </div>

        {/* Items with quantity */}
        {cartItems.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span>{item.title} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-1">
                <span>Discount {item.discountPercentage}%</span>
                <span>${(item.price * item.quantity - item.price * item.quantity * (item.discountPercentage / 100)).toFixed(2)}</span>
              </div>
            </div>
        ))}

        {/* Total and tax*/}
        <div className="mt-2 border-t border-gray-300 pt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        {/* Subtotal */}
        <div className="mt-2 border-t border-gray-300 pt-2">
          <div className="flex justify-between font-bold">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex justify-between mt-2">
          <span>Payment Method:</span>
          <span>{newData?.paymentMethod || "Cash"}</span>
        </div>

        <p className="text-center mt-3 border-t border-dashed pt-2">Thank you for shopping!</p>

        {/* Barcode */}
        <div className="mt-3 flex justify-center">
          <img src="https://barcode.tec-it.com/barcode.ashx?data=123456789012&code=EAN13" alt="Barcode" />
        </div>
      </div>
  );
});

export default Receipt;
