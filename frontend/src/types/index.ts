export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { _id: string };
};
export type TabNavigatorParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type ProductCardType = {
  _id?: string;
  image?: string;
  name: string;
  brand: string;
  average_rate: number | string;
  price: number;
  onPress?: () => void;
};
export type ItemPrice = {
  currency: '$';
  size: 'S' | 'M' | 'L';
  quantity: number;
  price: number;
  // add quantity by code....
};
export type CartProductType = {
  _id?: string;
  images: string[];
  name: string;
  brand: string;
  prices: ItemPrice[];
};

export type CartSliceType = {
  cartList: CartProductType[];
  totalPrice: number; // -> calc the total price
  totalItems: number;
};
