import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreItem } from "../../components/storeItem/StoreItem";
import { Pagination } from "../../hooks/pagination/Pagination";
import { BreadCrumbTrail } from "../../components/breadCrumbs/BreadCrumbTail";
import { Spinner } from "../../components/spinner/Spinner";
import SingleProductDetails from "../../components/singleProductDetails/SingleProductDetails";
import type { ProductType, ProductCategories } from "../../types/types";
import useWindowDimensions from "../../hooks/WindowDimension";
import "./store.scss";

const Store: React.FC = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [categories, setCategories] = useState<ProductCategories[]>([]);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<ProductType[]>([]);
  const [singleProductDetails, setSingleProductDetails] = useState<ProductType>();
  const [whatToDisplay, setWhatToDisplay] = useState<string>("allProducts");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const PageSize = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Aquí creamos fetchData como un callback para evitar problemas con las dependencias
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      const { products } = response.data;

      if (!products) {
        throw new Error("No se encontraron productos en la respuesta.");
      }

      // Filtrar categorías para evitar valores undefined
      const categorySet: Set<string> = new Set(
        products.map((p: ProductType) => p.category).filter((cat: any) => cat !== undefined)
      );

      // Agrupar las categorías
      const uniqueCategories: ProductCategories[] = Array.from(categorySet).map(
        (cat) => ({
          title: cat,
          products: products.filter((p: ProductType) => p.category === cat),
        })
      );

      setCategories(uniqueCategories);
      setAllProducts(products);
      
    } catch (err: any) {
      setError(err.message || "Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtrar productos por categoría y ordenar por precio
  useEffect(() => {
    fetchData();  // Esto asegura que fetchData se ejecute cuando el componente se monte
  }, [fetchData]); // fetchData es una dependencia que no cambia

  useEffect(() => {
    const filteredProducts = allProducts.filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

    // Ordenar los productos según el 'sortOrder'
    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setSelectedProducts(sortedProducts);
  }, [selectedCategory, allProducts, sortOrder]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return selectedProducts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, selectedProducts]);

  const handleImgClicked = (product: ProductType) => {
    setSingleProductDetails(product);
    setWhatToDisplay("singleProduct");
  };

  return (
    <section className="container">
      <div className="shopContainer">
        {error && <p className="errorText">{error}</p>}
        {loading && <Spinner />}

        <div className="categoriesContainer">
          {width > 751 ? (
            <>
              <h3>Ordenar por precio</h3>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>

              <h3>Categorías</h3>
              <button
                className={selectedCategory === "" ? "active-category" : ""}
                onClick={() => {
                  setSelectedCategory("");
                  setWhatToDisplay("allProducts");
                }}
              >
                Todas
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.title}
                  className={selectedCategory === cat.title ? "active-category" : ""}
                  onClick={() => {
                    setSelectedCategory(cat.title);
                    setWhatToDisplay("allProducts");
                  }}
                >
                  {cat.title}
                </button>
              ))}

              

            </>
          ) : (
            <>
              <div>
                <h3>Categoría</h3>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Todas</option>
                  {categories.map((cat) => (
                    <option key={cat.title} value={cat.title}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <div className="productsWrapper">
          {whatToDisplay === "allProducts" ? (
            <>
              <div className="productsContainer">
                {currentTableData.map((product, index) => (
                  <div key={index} className="store-item">
                    <StoreItem
                      onClickImg={() => handleImgClicked(product)}
                      id={product.id}
                      name={product.title}
                      price={product.price}
                      imgUrl={product.img}
                      title={product.description}
                    />
                  </div>
                ))}
              </div>
              <div className="paginationWrapper">
                <Pagination
                  currentPage={currentPage}
                  totalCount={selectedProducts.length}
                  pageSize={PageSize}
                  onPageChange={(page: number) => setCurrentPage(page)}
                  siblingCount={1}
                />
              </div>
            </>
          ) : (
            <div className="singleProduct">
              <BreadCrumbTrail
                productTitle={singleProductDetails?.title || ""}
                onClickHome={() => navigate("/")}
                onClickProducts={() => setWhatToDisplay("allProducts")}
              />
              <img
                src={singleProductDetails?.img}
                alt={singleProductDetails?.title}
              />
              <SingleProductDetails {...singleProductDetails!} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Store;
