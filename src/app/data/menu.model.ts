export interface MenuItem {
    id: string; // unique identifier for each item
    title: string;
    description: string;
    imageUrl?: string;
    category: 'beef' | 'chicken' | 'other';
    isSeasonal?: boolean;
    isVegetarianOption?: boolean;
    price?: number;
    active?: boolean;
    featured?: boolean;
    popular?: boolean;
    spiceLevel?: number; // Scale of 1-5
    dietaryInfo?: string[]; // e.g., ['Gluten-Free', 'Dairy-Free', 'Vegan']
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
        imageUrl: 'img/new/not-so-basic.jpg',
        category: 'beef',
        price: 5.99,
        active: true,
        popular: true,
        spiceLevel: 2,
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
        imageUrl: 'img/new/bbq-bacon-cheese.jpg',
        category: 'beef',
        price: 6.49,
        active: true,
        spiceLevel: 2,
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
        imageUrl: 'img/new/black-and-blue.jpg',
        category: 'beef',
        price: 6.99,
        active: true,
        spiceLevel: 3,
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
        imageUrl: 'img/new/classic.jpg',
        category: 'beef',
        price: 5.49,
        active: true,
        popular: true,
        spiceLevel: 1,
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
        imageUrl: 'img/new/famous-fried-chicken.jpg',
        category: 'chicken',
        price: 5.99,
        active: true,
        popular: true,
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
        imageUrl: 'img/new/porky-pig.jpg',
        category: 'other',
        price: 6.49,
        active: true,
        spiceLevel: 2,
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
        imageUrl: 'img/new/sweet-and-savery.jpg',
        category: 'beef',
        price: 6.99,
        active: true,
        spiceLevel: 2,
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
        imageUrl: 'img/new/extra-cheese-please.jpg',
        category: 'beef',
        price: 5.99,
        active: true,
        spiceLevel: 1,
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
        imageUrl: 'img/new/whiskey.jpg',
        category: 'beef',
        price: 6.99,
        active: true,
        spiceLevel: 3,
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
        imageUrl: 'img/new/double-bacon.jpg',
        category: 'beef',
        price: 8.99,
        active: true,
        popular: true,
        spiceLevel: 2,
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
        title: 'Vegetarian options',
        description:
            'All of our sliders can be substituted with impossible meat at an additional cost',
        imageUrl: 'img/new/impossible-slider.jpg',
        category: 'beef',
        isVegetarianOption: true,
        price: 7.49,
        active: true,
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
        imageUrl: 'img/new/very-basic.jpg',
        category: 'beef',
        price: 4.99,
        active: true,
        spiceLevel: 1,
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
        imageUrl: 'img/new/spicy-chicken2.jpg',
        category: 'chicken',
        price: 6.49,
        active: true,
        spiceLevel: 4,
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
        imageUrl: 'img/new/honey-mustard.jpg',
        category: 'chicken',
        price: 6.49,
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
        imageUrl: 'img/old/fries-1-jpg.webp',
        category: 'other',
        price: 3.49,
        active: true,
        popular: true,
        spiceLevel: 1,
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
