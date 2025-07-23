const COLORS = {
  // Primary Colors
  primaryRed: '#DC3535', // Strong Red
  primaryOrange: '#D17842', // Warm Orange
  primaryBlack: '#0C0F14', // Deep Black
  primaryDarkGrey: '#141921', // Dark Charcoal Grey
  primaryGrey: '#252A32', // Charcoal Grey
  primaryLightGrey: '#52555A', // Light Grey
  primaryWhite: '#F3F3F3', // Soft White
  primaryVeryWhite: '#FFFFFF', // Pure White

  // Secondary Colors
  secondaryDarkGrey: '#21262E', // Dark Slate Grey
  secondaryGrey: '#252A32', // Charcoal Slate
  secondaryLightGrey: '#AEAEAE', // Light Silver Grey

  // RGBA Colors
  primaryBlackRGBA: 'rgba(12,15,20,0.5)', // Semi-transparent Black (50% opacity)
  secondaryBlackRGBA: 'rgba(0,0,0,0.7)', // Semi-transparent Black (70% opacity)
  BlackRGBA30: 'rgba(12,15,20,0.03)', // Semi-transparent Black (10% opacity)
};

const FONT_FAMILY = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
};
const homeTitle = `Find Your Next Favorite Fit And Wear It Now`;

const ProductDataSample = [
  // T-Shirts (4 items) ?auto=format&fit=crop&w=800&q=80
  {
    _id: '1',
    name: 'Classic Crew Cotton Tee',
    description:
      'A soft, breathable 100% organic cotton crew-neck T‑shirt—ideal for casual wear, layering or gym days with unmatched comfort.',
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', // black tee
      'https://images.unsplash.com/photo-1520975907543-8cf4f9eeff29',
    ],
    prices: [
      { size: 'S', price: 19.99 },
      { size: 'M', price: 21.99 },
      { size: 'L', price: 24.99 },
    ],
    category: 'T-Shirts',
    brand: 'Uniqlo',
    average_rating: 4.5,
    ratings_count: '320',
    quantity: 120,
  },
  {
    _id: '2',
    name: 'Graphic Print Tee',
    description:
      'Bold graphic tee with high-quality print that stays vibrant wash after wash—perfect statement piece for casual outings.',
    images: [
      'https://www.intotheam.com/cdn/shop/files/GalacticGroovesII_Mens_Tee_1512x.jpg',
      'https://www.intotheam.com/cdn/shop/files/GalacticGroovesII_Mens_Tee_Nico_Front_1512x.jpg',
    ],
    prices: [
      { size: 'S', price: 22.99 },
      { size: 'M', price: 24.99 },
      { size: 'L', price: 27.99 },
    ],
    category: 'T-Shirts',
    brand: 'H&M',
    average_rating: 4.2,
    ratings_count: '210',
    quantity: 75,
  },
  {
    _id: '3',
    name: 'Longline Oversize Tee',
    description:
      'Relaxed-fit longline tee crafted from heavyweight cotton, great for layering or streetwear styles.',
    images: [
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb',
      'https://images.unsplash.com/photo-1593032465172-4d2dab9a4b52',
    ],
    prices: [
      { size: 'S', price: 23.99 },
      { size: 'M', price: 25.99 },
      { size: 'L', price: 28.99 },
    ],
    category: 'T-Shirts',
    brand: 'ASOS',
    average_rating: 4.6,
    ratings_count: '145',
    quantity: 60,
  },
  {
    _id: '4',
    name: 'Pocket Essential Tee',
    description:
      'Essential tee with a subtle chest pocket and soft-touch cotton, made for everyday comfort.',
    images: [
      'https://www.outdoorresearch.com/cdn/shop/files/3002450730E1.png',
      'https://m.media-amazon.com/images/I/61m1o1V+1SL._AC_SX679_.jpg',
    ],
    prices: [
      { size: 'S', price: 20.99 },
      { size: 'M', price: 22.99 },
      { size: 'L', price: 25.99 },
    ],
    category: 'T-Shirts',
    brand: 'GAP',
    average_rating: 4.4,
    ratings_count: '98',
    quantity: 90,
  },

  // Shirts (3 items)
  {
    _id: '5',
    name: 'Slim Oxford Shirt',
    description:
      'Refined slim-fit oxford shirt with button-down collar, perfect for both business casual and weekend wear.',
    images: [
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRI2rDktzlBIPV7aLR2NH_UxthifAwtfGA4cwcdL5SM4dnlh5GrFcJwS88UOujhYdeQTjFKNleayPjMNv4KH_878kqbqXbmAYg95GZDXFUIKDhFW7yswzK8VCx-',
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQAEao0vA6xN78jasyc1Qn4VR8UWkZOLW09_3Tl3Bxn9c2LBkDRqf_S3QwRnIXvkFWqHL7OfpVDzqcG-2HQ1ZJBhrSTLaD9qUBcMt5q0ZKBM9mgpjz0_DK2PrU',
    ],
    prices: [
      { size: 'S', price: 34.99 },
      { size: 'M', price: 36.99 },
      { size: 'L', price: 39.99 },
    ],
    category: 'Shirts',
    brand: 'Banana Republic',
    average_rating: 4.7,
    ratings_count: '180',
    quantity: 55,
  },
  {
    _id: '6',
    name: 'Casual Chambray Shirt',
    description:
      'Soft chambray denim shirt designed for everyday comfort, with relaxed fit and dual chest pockets.',
    images: [
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRWoe5rM9ukEf4Jyy9MoZCiXMwTa3z_GaXeO2qdgC7yp0HToQNtWRtEbS4UfDfLbS-ASFcTwQq4T1KfRVpSgxJac9kkLXXY0zYHYUXJ6vi62KSdVZQnXZ44',
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ7K85jwwTD3nZXRtPuTLgRCQTroCOH-A0Y-n1ExV894WSyneEL_rmawQu8TRkxrXjkCh--cJucMRYoEBupKTW23b23v8yifP9YDvQSD_1PTrTO05ysa8xE',
    ],
    prices: [
      { size: 'S', price: 32.99 },
      { size: 'M', price: 34.99 },
      { size: 'L', price: 37.99 },
    ],
    category: 'Shirts',
    brand: 'Levi’s',
    average_rating: 4.3,
    ratings_count: '120',
    quantity: 40,
  },
  {
    _id: '7',
    name: 'Striped Relaxed Shirt',
    description:
      'Comfortable striped shirt in lightweight fabric with a relaxed silhouette—ideal for smart-casual occasions.',
    images: [
      'https://i5.walmartimages.com/seo/Mens-Dress-Shirts-Striped-Relaxed-Fit-Men-s-Casual-Vertical-Stripe-Shirt-Short-Sleeve-Button-Turn-Down-Collar-Khaki_ca0d1ed5-9a63-4708-a572-5397606f6131.04823f7f490b9d1360cbfdd4b085658c.jpeg',
      'https://media.cos.com/assets/001/88/e5/88e585b4a6d29babc34a14e6b5223663536b6caa_xxl-1.jpg',
    ],
    prices: [
      { size: 'S', price: 30.99 },
      { size: 'M', price: 33.99 },
      { size: 'L', price: 36.99 },
    ],
    category: 'Shirts',
    brand: 'J. Crew',
    average_rating: 4.2,
    ratings_count: '75',
    quantity: 65,
  },

  // Hoodies (3 items)
  {
    _id: '8',
    name: 'Pullover Fleece Hoodie',
    description:
      'Cozy fleece hoodie with kangaroo pocket and drawcord hood—ideal for lounging or quick errands.',
    images: [
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT_BOlBl-ffvXH36aFnF4TKfM3eY5KTfQVgW_muxPsOo_qbAd4GfHH8zh2xOITET8zshBXvsWGAzLzPRg0hYBb4kH7XewEkjvSZyEK0t8hiN9o5WHdd0vz0YrE',
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSwdd3jHocSe2kDwB30lxhYO57QC74dR9tYlD4HJyDv0_EOzAJ8GRUAcIFXo9zG7NQ0Ylgt0tlFDVi5JrRwhhNLYwotMB4m48gBIS4iqhK88LbYDKR6qQGFGQ',
    ],
    prices: [
      { size: 'S', price: 44.99 },
      { size: 'M', price: 46.99 },
      { size: 'L', price: 49.99 },
    ],
    category: 'Hoodies',
    brand: 'Champion',
    average_rating: 4.6,
    ratings_count: '210',
    quantity: 80,
  },
  {
    _id: '9',
    name: 'Zip-Up Tech Hoodie',
    description:
      'Lightweight, quick-dry tech hoodie with full zip and side pockets—perfect for active mornings.',
    images: [
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR5CD7MbJQYDqjH8LzwC88QRVesKPt4DHhIlw0kKAOOiAli6D1TzoT91eHQsdu8nTUzbthgLo2XIae7qc1SVUQr5RA6YjgrCLrYbd9tmEmMbCiywgxV2_NCM2Y',
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSz1YjUKM-CyGYJtzhyIYwhBkDtTNAIVUBHE6c0dj-vfLg_AFy5pZyxeYSzYdJG1F2icgZDG1u3SOS6wccAHalPzKfijroZl9iwT-ruMHzhsWetfjmUC6gMQLA',
    ],
    prices: [
      { size: 'S', price: 48.99 },
      { size: 'M', price: 50.99 },
      { size: 'L', price: 54.99 },
    ],
    category: 'Hoodies',
    brand: 'Nike',
    average_rating: 4.7,
    ratings_count: '130',
    quantity: 60,
  },
  {
    _id: '12',
    name: 'Heavyweight Pullover Hoodie',
    description:
      'Thick cotton-blend hoodie with reinforced seams and soft-brushed interior—built to last and stay warm.',
    images: [
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSkFbgMUMmoL9U2C8qMG7ESXQ3RjDvLSkSjUW9PhhtjQVHIWTOEMK5A41I-Ek5O-4yr_TmIF2B-A2T51gZGQ_x6AGDz2Y6TlNPT9aM8oxIawKRrfsj5n3SG',
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRyKwEXUAHGMnWP14JgbvJ6ckxig6n4Bz2-VNoTysO037rWiFG0T2I_uaeS35qvqM3NqVBVpBn34rPLewVAZIviYUtRrGHQDVmMekeDuQh91PPViFyjb2QSnQ',
    ],
    prices: [
      { size: 'S', price: 52.99 },
      { size: 'M', price: 54.99 },
      { size: 'L', price: 59.99 },
    ],
    category: 'Hoodies',
    brand: 'Patagonia',
    average_rating: 4.8,
    ratings_count: '95',
    quantity: 55,
  },

  // Sweatshirts (1 item)
  {
    _id: '13',
    name: 'Crewneck Pullover Sweatshirt',
    description:
      'Soft terry cotton crewneck sweatshirt with ribbed cuffs and hem—perfect blend of comfort and durability.',
    images: [
      'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQSkablOX0_M2aERFVzM6X6l2_DG5a3cI2HXFC6sEiGzdtyKTLIwVgncn8wzFC_MdVQ4TT_yNvNjKrngEQLInJOyoUM1mmxTcARMbyuPt2VZuOTXbvfaP0-DQ',
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTmBV_MgLZMPth1MZhdCzwchu8Q84ecv0rV5tpOc5TFjX49JzpWc-brWaI8HhliQRrKEUHA3aD6-ZBNVJIXXI9k01chSjzSmVlYv0ojwmY',
    ],
    prices: [
      { size: 'S', price: 39.99 },
      { size: 'M', price: 42.99 },
      { size: 'L', price: 45.99 },
    ],
    category: 'Sweatshirts',
    brand: 'Hanes',
    average_rating: 4.4,
    ratings_count: '110',
    quantity: 70,
  },
];

const categories = [
  'All',
  'T-Shirts',
  'Shirts',
  'Hoodies',
  'Sweatshirts',
  'Jackets',
  'Pants',
  'Jeans',
  'Shorts',
  'Suits',
  'Traditional Wear',
  'Shoes',
  'Accessories',
];

const lottieUrl = `https://lottie.host/1ab06b3e-0271-4ed9-8fc0-ee720b39b005/0YMByi583s.lottie`;

export {
  COLORS,
  homeTitle,
  ProductDataSample,
  categories,
  FONT_FAMILY,
  lottieUrl,
};
