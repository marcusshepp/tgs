import { CLOUDINARY_URL } from './cloudinary.model';

export interface MenuItem {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    category: 'pork' | 'beef' | 'chicken' | 'other';
    isSeasonal?: boolean;
    isVegetarianOption?: boolean;
    price?: number;
    active?: boolean;
    featured?: boolean;
    popular?: boolean;
    spiceLevel?: number; // Scale of 1-5
    dietaryInfo?: string[];
    nutritionInfo?: {
        calories?: number;
        protein?: string;
        carbs?: string;
        fat?: string;
        sodium?: string;
    };
    ingredients?: string[];
    allergens?: string[];
    prepTime?: string;
}

export const MENU_ITEMS: MenuItem[] = [
    {
        id: 'not-so-basic',
        title: 'The NOT! So Basic',
        description:
            "Our most popular slider that's a fan favorite. American cheese, caramelized onions, lettuce, tomato, and our famous NOT! So Basic Sauce.",
        imageUrl: `${CLOUDINARY_URL}not-so-basic_fiqbf8.webp`,
        category: 'beef',
        active: true,
        popular: false, // Changed from true to false
        spiceLevel: 0,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 450,
            protein: '22g',
            carbs: '35g',
            fat: '25g',
            sodium: '780mg',
        },
        ingredients: [
            'Prime Beef Patty',
            'American Cheese',
            'Caramelized Onions',
            'Lettuce',
            'Tomato',
            'NOT! So Basic Sauce',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten'],
    },
    {
        id: 'bbq-bacon-cheese',
        title: 'BBQ Bacon Cheese',
        description:
            'Our juicy prime beef slider topped with smoky BBQ sauce, crispy applewood smoked bacon, and melted American cheese for a perfect blend of savory and sweet.',
        imageUrl: `${CLOUDINARY_URL}bbq-bacon-cheese_pahhpv.webp`,
        category: 'beef',
        active: true,
        spiceLevel: 1,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 520,
            protein: '24g',
            carbs: '38g',
            fat: '28g',
            sodium: '920mg',
        },
        ingredients: [
            'Prime Beef Patty',
            'BBQ Sauce',
            'Applewood Smoked Bacon',
            'American Cheese',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten'],
    },
    {
        id: 'black-and-blue',
        title: 'Black and Blue',
        description:
            'A steakhouse classic in slider form. Our prime beef topped with blue cheese crumbles, caramelized onions, and a dash of cracked black pepper for a bold, sophisticated flavor profile.',
        imageUrl: `${CLOUDINARY_URL}black-and-blue_gzuzos.webp`,
        category: 'beef',
        active: true,
        spiceLevel: 0,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 490,
            protein: '23g',
            carbs: '32g',
            fat: '29g',
            sodium: '840mg',
        },
        ingredients: [
            'Prime Beef Patty',
            'Blue Cheese Crumbles',
            'Caramelized Onions',
            'Cracked Black Pepper',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten'],
    },
    {
        id: 'classic',
        title: 'The Classic',
        description:
            'Sometimes simple is best. Our perfectly seasoned prime beef slider with lettuce, tomato, pickle, and our signature sauce on a toasted brioche bun.',
        imageUrl: `${CLOUDINARY_URL}classic_mz6jzy.webp`,
        category: 'beef',
        active: true,
        popular: false, // Changed from true to false
        spiceLevel: 0,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 420,
            protein: '21g',
            carbs: '30g',
            fat: '22g',
            sodium: '680mg',
        },
        ingredients: [
            'Prime Beef Patty',
            'Lettuce',
            'Tomato',
            'Pickle',
            'Signature Sauce',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten'],
    },
    {
        id: 'famous-fried-chicken',
        title: 'Famous Fried Chicken',
        description:
            'Our hand-breaded chicken slider fried to golden perfection. Topped with fresh lettuce, tomato, and our house-made mayo on a toasted brioche bun.',
        imageUrl: `${CLOUDINARY_URL}famous-fried-chicken_ggfvk7.webp`,
        category: 'chicken',
        active: true,
        popular: false, // Changed from true to false
        spiceLevel: 1,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 480,
            protein: '24g',
            carbs: '42g',
            fat: '24g',
            sodium: '760mg',
        },
        ingredients: [
            'Hand-Breaded Chicken',
            'Lettuce',
            'Tomato',
            'House-made Mayo',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten', 'Egg'],
    },
    {
        id: 'porky-pig',
        title: 'Porky Pig',
        description:
            'For the pork lovers! Slow-roasted pulled pork topped with our homemade coleslaw and tangy BBQ sauce, served on a toasted brioche bun.',
        imageUrl: `${CLOUDINARY_URL}porky-pig_axfv6q.webp`,
        category: 'pork',
        active: true,
        spiceLevel: 0,
        dietaryInfo: ['Contains Gluten'],
        nutritionInfo: {
            calories: 510,
            protein: '26g',
            carbs: '45g',
            fat: '25g',
            sodium: '880mg',
        },
        ingredients: [
            'Slow-Roasted Pulled Pork',
            'Homemade Coleslaw',
            'Tangy BBQ Sauce',
            'Brioche Bun',
        ],
        allergens: ['Gluten'],
    },
    {
        id: 'sweet-savory',
        title: 'Sweet and Savory',
        description:
            'For the true burger enthusiast we bring you the perfect balance of sweet and savory. Swiss cheese, caramelized onion, pepper jam and applewood bacon.',
        imageUrl: `${CLOUDINARY_URL}sweet-savory2_iof3t7.webp`,
        category: 'beef',
        active: true,
        popular: true, // Added popular flag
        spiceLevel: 0,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 530,
            protein: '24g',
            carbs: '40g',
            fat: '30g',
            sodium: '790mg',
        },
        ingredients: [
            'Prime Beef Patty',
            'Swiss Cheese',
            'Caramelized Onion',
            'Pepper Jam',
            'Applewood Bacon',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten'],
    },
    {
        id: 'extra-cheese',
        title: 'Extra Cheese Please',
        description:
            'Where this one lacks on toppings it makes up with big flavor thats sure to please. Extra American cheese, seasoned prime patty on a brioche bun.',
        imageUrl: `${CLOUDINARY_URL}extra-cheese-please_kagia5.webp`,
        category: 'beef',
        active: true,
        spiceLevel: 0,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 480,
            protein: '23g',
            carbs: '30g',
            fat: '30g',
            sodium: '920mg',
        },
        ingredients: [
            'Prime Beef Patty',
            'Double American Cheese',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten'],
    },
    {
        id: 'whiskey',
        title: 'Whiskey',
        description:
            'This one has it all...sweet, savory and a touch of heat. American cheese, applewood bacon, fried onion and our signature truck made whiskey sauce.',
        imageUrl: `${CLOUDINARY_URL}whiskey_zbkelp.webp`,
        category: 'beef',
        active: true,
        popular: true, // Added popular flag
        spiceLevel: 1,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 550,
            protein: '25g',
            carbs: '40g',
            fat: '32g',
            sodium: '880mg',
        },
        ingredients: [
            'Prime Beef Patty',
            'American Cheese',
            'Applewood Bacon',
            'Fried Onion',
            'Whiskey Sauce',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten'],
    },
    {
        id: 'double-bacon',
        title: 'Double Bacon With Cheese',
        description:
            'Stacked with 8oz of our prime beef, double smoked bacon, double cheese',
        imageUrl: `${CLOUDINARY_URL}double-bacon_i4crrj.webp`,
        category: 'beef',
        active: true,
        popular: true, // Kept as true
        spiceLevel: 0,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 780,
            protein: '45g',
            carbs: '40g',
            fat: '50g',
            sodium: '1250mg',
        },
        ingredients: [
            'Double Prime Beef Patty',
            'Double Smoked Bacon',
            'Double American Cheese',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten'],
    },
    {
        id: 'vegetarian',
        title: 'Impossible Sliders',
        description:
            'All of our sliders can be substituted with impossible meat at an additional cost',
        imageUrl: `${CLOUDINARY_URL}impossible-slider_jigkrl.webp`,
        category: 'beef',
        isVegetarianOption: true,
        active: true,
        spiceLevel: 0,
        dietaryInfo: ['Vegetarian', 'Contains Gluten'],
        nutritionInfo: {
            calories: 420,
            protein: '19g',
            carbs: '38g',
            fat: '20g',
            sodium: '580mg',
        },
        ingredients: [
            'Impossible Patty',
            'Your Choice of Toppings',
            'Brioche Bun',
        ],
        allergens: ['Gluten'],
    },
    {
        id: 'very-basic',
        title: 'VERY! Basic Sliders',
        description:
            'Our prime beef sliders topped with American cheese and caramelized onions',
        imageUrl: `${CLOUDINARY_URL}very-basic_mplsma.webp`,
        category: 'beef',
        active: true,
        spiceLevel: 0,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 380,
            protein: '18g',
            carbs: '28g',
            fat: '22g',
            sodium: '650mg',
        },
        ingredients: [
            'Prime Beef Patty',
            'American Cheese',
            'Caramelized Onions',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten'],
    },
    {
        id: 'spicy-chicken',
        title: 'Spicy Chicken',
        description:
            'Hand breaded crispy chicken, pepper jack cheese, chipotle mayonnaise, fresh jalapeños, pickle',
        imageUrl: `${CLOUDINARY_URL}spicy-chicken2_xydqkj.webp`,
        category: 'chicken',
        active: true,
        popular: true, // Added popular flag
        spiceLevel: 3,
        dietaryInfo: ['Contains Dairy', 'Contains Gluten'],
        nutritionInfo: {
            calories: 510,
            protein: '26g',
            carbs: '42g',
            fat: '26g',
            sodium: '820mg',
        },
        ingredients: [
            'Hand Breaded Crispy Chicken',
            'Pepper Jack Cheese',
            'Chipotle Mayonnaise',
            'Fresh Jalapeños',
            'Pickle',
            'Brioche Bun',
        ],
        allergens: ['Dairy', 'Gluten', 'Egg'],
    },
    {
        id: 'honey-mustard',
        title: 'Honey Mustard Chicken',
        description:
            'Crispy chicken fried to golden perfection, topped with our tangy truck made honey mustard sauce.',
        imageUrl: `${CLOUDINARY_URL}honey-mustard_ixdy9c.webp`,
        category: 'chicken',
        active: true,
        spiceLevel: 1,
        dietaryInfo: ['Contains Gluten'],
        nutritionInfo: {
            calories: 490,
            protein: '25g',
            carbs: '44g',
            fat: '23g',
            sodium: '780mg',
        },
        ingredients: ['Crispy Chicken', 'Honey Mustard Sauce', 'Brioche Bun'],
        allergens: ['Gluten', 'Egg'],
    },
    {
        id: 'fries',
        title: 'Fries',
        description: 'Our famous crispy fries seasoned to perfection.',
        imageUrl: `${CLOUDINARY_URL}Famous-crispy-golden-fries-232x230_tkxc4v.webp`,
        category: 'other',
        active: true,
        popular: false, // Changed from true to false
        spiceLevel: 0,
        dietaryInfo: ['Vegetarian', 'Vegan'],
        nutritionInfo: {
            calories: 320,
            protein: '4g',
            carbs: '42g',
            fat: '16g',
            sodium: '380mg',
        },
        ingredients: ['Idaho Potatoes', 'House Seasoning', 'Sea Salt'],
        allergens: [],
    },
];
