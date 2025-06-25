export type UserType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type ReviewerType = {
  name: string;
  title: string;
  rating?: number;
};

export type ProductType = {
  Brand?: string;
  title: string;
  description: string;
  category?: string;
  price: number;
  img: string;
  imgUrl: string;
  inStock?: number;
  genre?: string;
  id: number;
  rating?: number;
  reviews?: ReviewerType[];
};
/**
 * Todo: Lo de abajo debe ser borrado, pues categoría está arriba.
 */
export type ProductCategories = {
  title: string;
  products: {
    title: string;
    //price: number;
    //imgs: string[];
  }[];
};

export type ProductGenres = {
  title: string;
  products: {
    title: string;
  }[];
};
