import React from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "./Receipt.jsx";
import clsx from "clsx";

export default function RightSideBar({ addToOrder }) {
  const date = new Date().toLocaleString();
  const componentRef = React.useRef(null);
  const [newData, setNewData] = React.useState([
    {
      customerName: "",
      paymentMethod: "",
    }
  ]);

  // Order calculations
  const totalItems = addToOrder.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = addToOrder.reduce((sum, item) => {
    const discountedPrice = item.price * (1 - item.discountPercentage / 100);
    return sum + item.quantity * discountedPrice;
  }, 0);
  const tax = totalPrice * 0.1;
  const subtotal = totalPrice + tax;

  // React to print
  const printFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "hello",
  });

  return (
      <div className="bg-gray-900/10 rounded-md p-6 fixed">
        <div className="max-h-[calc(100vh-300px)]">

        {/* Customer name and logo  */}
        <div className="flex items-center gap-x-4 justify-between">
          <input
              type="text"
              className="bg-gray-900/10 rounded-md p-2 w-full focus:outline-none"
              placeholder="Customer Name"
              value={newData.customerName}
              onChange={(prev) => setNewData({...prev, customerName: prev.target.value})}
          />
          <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
              className="h-8 w-auto"
          />
        </div>

        <hr className="my-4" />

        {/* Order placed on date  */}
        <p className="text-sm font-semibold leading-6 text-gray-700">
          Order placed on {date}
        </p>

        {/* Order summary */}
        <div className={clsx("mt-6 space-y-2 flow-root max-h-60" , addToOrder.length > 3 && "overflow-y-scroll")}>
          {addToOrder.map((item) => (
              <div key={item.id} className="bg-gray-900/10 rounded-md px-2">
                <div className="space-y-2 py-2">
                  <div className="flex items-center gap-x-4">
                    <img
                        src={item.thumbnail}
                        alt=""
                        className="h-12 w-12 flex-none rounded-md bg-gray-50"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {item.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {item.quantity} x {item.price.toFixed(2)} x {item.discountPercentage}%
                      </p>
                    </div>
                    <div>
                      <p className="flex-none text-sm font-semibold leading-6 text-gray-900">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                      <p className="flex-none text-sm font-semibold leading-6 text-gray-500">
                        ${(item.quantity * item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>

        <hr className="my-4" />

        {/* Total items and price  */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-6 text-gray-700">
            Items ({totalItems})
          </p>
          <p className="text-sm font-medium leading-6 text-gray-700">
            ${totalPrice.toFixed(2)}
          </p>
        </div>

        {/* Tax */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-medium leading-6 text-gray-700">Tax (10%)</p>
          <p className="text-sm font-medium leading-6 text-gray-700">${tax.toFixed(2)}</p>
        </div>

        <hr className="my-4" />

        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold leading-7 text-gray-700">Subtotal</p>
          <p className="text-base font-semibold leading-7 text-gray-700">${subtotal.toFixed(2)}</p>
        </div>

        {/*  Payment Method */}
          <div className="mt-6 flex items-center gap-x-4 justify-between">
            <div className="flex items-center gap-x-4">
              <input
                  type="radio"
                  id="cash"
                  name="paymentMethod"
                  value="Cash"
                  checked={newData.paymentMethod === "Cash"}
                  onChange={(e) =>
                      setNewData((prev) => ({ ...prev, paymentMethod: e.target.value }))
                  }
                  className="h-4 w-4 cursor-pointer"
              />
              <label htmlFor="cash" className="text-sm font-semibold cursor-pointer leading-6 text-gray-700">
                Cash
              </label>
            </div>

            <div className="flex items-center gap-x-4">
              <input
                  type="radio"
                  id="card"
                  name="paymentMethod"
                  value="Card"
                  checked={newData.paymentMethod === "Card"}
                  onChange={(e) =>
                      setNewData((prev) => ({ ...prev, paymentMethod: e.target.value }))
                  }
                  className="h-4 w-4 cursor-pointer"
              />
              <label htmlFor="card" className="text-sm font-semibold cursor-pointer leading-6 text-gray-700">
                Card
              </label>
            </div>
          </div>

        {/* Hidden printable content */}
        <div style={{ position: "absolute", top: "-10000px", left: "-10000px" }}>
          <Receipt
              ref={componentRef}
              cartItems={addToOrder}
              newData={newData}
          />
        </div>

        {/* Print Button */}
        <div className="mt-6">
          <button
              type="button"
              onClick={printFn}
              className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Print Receipt
          </button>
        </div>
        </div>
      </div>
  );
}
