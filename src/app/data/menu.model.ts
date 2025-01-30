export interface MenuItem {
  id: string; // unique identifier for each item
  title: string;
  description: string;
  imageUrl?: string;
  category: "beef" | "chicken" | "other";
  isSeasonal?: boolean;
  isVegetarianOption?: boolean;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "not-so-basic",
    title: "The NOT! So Basic",
    description:
      "Our most popular slider that's a fan favorite. American cheese, caramelized onions, lettuce, tomato, and our famous NOT! So Basic Sauce.",
    imageUrl: "/wp-content/uploads/file.webp",
    category: "beef",
  },
  {
    id: "techno",
    title: "The Techno",
    description:
      "The perfect marriage of heat and sweet that will have you wanting to do the slide. American cheese, caramelized onions, sweet honey barbeque, and our spicy NOT! So Basic Sauce.",
    imageUrl: "/wp-content/uploads/Dripping-jpg.webp",
    category: "beef",
  },
  {
    id: "steak-house",
    title: "Steak House",
    description:
      "All the intense flavors and texture you would expect from a high-end steak restaurant in the palm of your hand. Special steakhouse seasoning, Swiss cheese, fried onion and mayonnaise",
    imageUrl: "/wp-content/uploads/file-1.webp",
    category: "beef",
  },
  {
    id: "sweet-savory",
    title: "Sweet and Savory",
    description:
      "For the true burger enthusiast we bring you the perfect balance of sweet and savory. Swiss cheese, caramelized onion, pepper jam and applewood bacon.",
    imageUrl: "/wp-content/uploads/file1.webp",
    category: "beef",
  },
  {
    id: "extra-cheese",
    title: "Extra Cheese Please",
    description:
      "Where this one lacks on toppings it makes up with big flavor thats sure to please. Extra American cheese, seasoned prime patty on a brioche bun.",
    imageUrl: "/wp-content/uploads/IMG_7538.jpg",
    category: "beef",
  },
  {
    id: "whiskey",
    title: "Whiskey",
    description:
      "This one has it all...sweet, savory and a touch of heat. American cheese, applewood bacon, fried onion and our signature truck made whiskey sauce.",
    imageUrl: "/wp-content/uploads/file-5-1-jpg.webp",
    category: "beef",
  },
  {
    id: "double-bacon",
    title: "Double Bacon With Cheese",
    description:
      "Stacked with 8oz of our prime beef, double smoked bacon, double cheese",
    imageUrl: "/wp-content/uploads/file-10.webp",
    category: "beef",
  },
  {
    id: "monte-cristo",
    title: "Monte Cristo",
    description:
      "Fresh ground turkey, honey ham, Swiss, truck made raspberry jam, caramelized onions, cinnamon butter and powdered sugar.",
    imageUrl: "/wp-content/uploads/monte-scaled.webp",
    category: "beef",
    isSeasonal: true,
  },
  {
    id: "vegetarian",
    title: "Vegetarian options",
    description:
      "All of our sliders can be substituted with impossible meat at an additional cost",
    imageUrl: "/wp-content/uploads/vegitarian-options-scaled.webp",
    category: "beef",
    isVegetarianOption: true,
  },
  {
    id: "very-basic",
    title: "VERY! Basic Sliders",
    description:
      "Our prime beef sliders topped with American cheese and caramelized onions",
    category: "beef",
  },
  {
    id: "bacon-cheese",
    title: "Bacon and Cheese Sliders",
    description:
      "Our prime beef sliders topped with smoked bacon and double American cheese",
    category: "beef",
  },
  {
    id: "spicy-chicken",
    title: "Spicy Chicken",
    description:
      "Hand breaded crispy chicken, pepper jack cheese, chipotle mayonnaise, fresh jalapeños, pickle",
    imageUrl: "/wp-content/uploads/IMG_7582-1.jpg",
    category: "chicken",
  },
  {
    id: "honey-mustard",
    title: "Honey Mustard Chicken",
    description:
      "Crispy chicken fried to golden perfection, topped with our tangy truck made honey mustard sauce.",
    imageUrl: "/wp-content/uploads/honey-mustard-chicken-jpg.webp",
    category: "chicken",
  },
  {
    id: "buffalo-chicken",
    title: "Buffalo Chicken Sliders",
    description:
      "Hand-battered crispy chicken, truck-made buffalo sauce drizzled with ranch and finished with bleu cheese crumbles",
    imageUrl:
      "/wp-content/uploads/82BEFDA4-B9F1-4467-B6A4-53309612016E-jpeg.webp",
    category: "chicken",
  },
  {
    id: "chicken-tenders",
    title: "Premium Chicken Tenders and Fries",
    description:
      "Fried to golden perfection and served with your favorite dipping sauce.",
    imageUrl: "/wp-content/uploads/tenders-and-fries-jpg.webp",
    category: "other",
  },
  {
    id: "fries",
    title: "Fries",
    description: "Our famous crispy fries seasoned to perfection.",
    imageUrl: "/wp-content/uploads/fries-1-jpg.webp",
    category: "other",
  },
];
