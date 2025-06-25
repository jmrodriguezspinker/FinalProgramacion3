// Home.tsx
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/spinner/Spinner";
import { StoreItem } from "../../components/storeItem/StoreItem";
import type { ProductType } from "../../types/types";
import axios from "axios";
import "./home.scss";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([]);
  const [error, setError] = useState<string>("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      const data = response.data;

      console.log("Response:", data);

      if (!data?.products) {
        console.error("❌ 'products' no está definido en la respuesta del backend.");
        return;
      }

      // Shuffle y selección (si lo deseas)
      const shuffledProducts = data.products.sort(() => Math.random() - 0.5);
      const selectedProducts = shuffledProducts.slice(0,8);

      setFeaturedProducts(selectedProducts);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
      console.error("❌ Error al obtener productos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleImgClicked = () => {
    navigate("/store");
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="landing-page">
      <header className="header">
        <div className="svg-padding">
          <div className="call-to-action">
            <h1>A & E Boutique</h1>
            <h2>Reconectándote con tus deseos, de una prenda a la vez.</h2>
            <button aria-label="Get started" onClick={() => navigate("/store")}>
              Comienza Aquí
            </button>
          </div>
        </div>
        
      </header>

      <section className="featured-products">
        <h2>Productos Destacados</h2>
        {error && <p className="errorText">{error}</p>}
        {loading && <Spinner />}
        <div className="featured-productsContainer">
          {featuredProducts.map((product: ProductType, index) => (
            <div key={index} className="store-item">
              <StoreItem
                onClickImg={handleImgClicked}
                id={Number(product.id)}
                name={product.title}
                price={product.price}
                imgUrl={product.img}
                title={product.description}
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Home;
