export default function ProductCard({ product, hover, setHover, handleAddToOrder }) {

  return (
      <div className="group relative" onMouseEnter={() => setHover(product.id)} onMouseLeave={() => setHover(null)}>
        <div className="aspect-h-1 relative aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <span className="absolute top-2 right-2 bg-red-500 px-2 py-1.5 text-xs font-medium text-white shadow shadow-gray-900">- {product.discountPercentage}%</span>

          <img
              src={product.thumbnail}
              alt={product.title}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />

          {/* Add to order button */}
          {hover === product.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                    type="button"
                    className="text-white bg-gray-900 py-2 px-4 rounded-md cursor-pointer"
                    onClick={() => handleAddToOrder(product)}
                >
                  Add to Order
                </button>
              </div>
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{product.title}</h3>
          </div>
          <p className="text-sm font-medium text-gray-900">${product.price}.00</p>
        </div>
      </div>
  );
}
