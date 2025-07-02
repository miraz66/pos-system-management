import Header from "./components/Header.jsx";
import {useEffect, useState} from "react";
import ProductCard from "./components/ProductCard.jsx";
import RightSideBar from "./components/RightSideBar.jsx";
import SideBanner from "../public/Brown Women's Fashion Instagram Story.png";
import {getBeautyProducts} from "./api/products.js";

function App() {
  const [hover, setHover] = useState();
  const [addToOrder, setAddToOrder] = useState([]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getBeautyProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching beauty products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  const handleAddToOrder = (product) => {
    const exists = addToOrder.find(item => item.id === product.id);

    if (exists) {
      const updatedOrder = addToOrder.map(item =>
          item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
      );
      setAddToOrder(updatedOrder);
    } else {
      setAddToOrder(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  return (
      <div className="bg-gray-200 min-h-screen">
        <div className="container mx-auto">
          <div className="sticky top-0 z-50 bg-gray-200"><Header /></div>

          <div className="grid grid-cols-8 gap-8 px-4 md:px-8">
            <div className="col-span-6">
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        hover={hover}
                        setHover={setHover}
                        addToOrder={addToOrder}
                        handleAddToOrder={handleAddToOrder}
                    />
                ))}
              </div>
            </div>

            <div className="col-span-2 py-6">
              {addToOrder.length > 0 ? (
                  <RightSideBar addToOrder={addToOrder} setAddToOrder={setAddToOrder} />
              ) : (
                  <img src={SideBanner} alt="sideBanner" className="w-full" />
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
