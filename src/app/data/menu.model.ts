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
}

export const MENU_ITEMS: MenuItem[] = [
    {
        id: 'not-so-basic',
        title: 'The NOT! So Basic',
        description:
            "Our most popular slider that's a fan favorite. American cheese, caramelized onions, lettuce, tomato, and our famous NOT! So Basic Sauce.",
        imageUrl: 'img/new/not-so-basic.jpg',
        category: 'beef',
    },
    {
        id: 'bbq-bacon-cheese',
        title: 'BBQ Bacon Cheese',
        description:
            'Our juicy prime beef slider topped with smoky BBQ sauce, crispy applewood smoked bacon, and melted American cheese for a perfect blend of savory and sweet.',
        imageUrl: 'img/new/bbq-bacon-cheese.jpg',
        category: 'beef',
    },
    {
        id: 'black-and-blue',
        title: 'Black and Blue',
        description:
            'A steakhouse classic in slider form. Our prime beef topped with blue cheese crumbles, caramelized onions, and a dash of cracked black pepper for a bold, sophisticated flavor profile.',
        imageUrl: 'img/new/black-and-blue.jpg',
        category: 'beef',
    },
    {
        id: 'classic',
        title: 'The Classic',
        description:
            'Sometimes simple is best. Our perfectly seasoned prime beef slider with lettuce, tomato, pickle, and our signature sauce on a toasted brioche bun.',
        imageUrl: 'img/new/classic.jpg',
        category: 'beef',
    },
    {
        id: 'famous-fried-chicken',
        title: 'Famous Fried Chicken',
        description:
            'Our hand-breaded chicken slider fried to golden perfection. Topped with fresh lettuce, tomato, and our house-made mayo on a toasted brioche bun.',
        imageUrl: 'img/new/famous-fried-chicken.jpg',
        category: 'chicken',
    },
    {
        id: 'porky-pig',
        title: 'Porky Pig',
        description:
            'For the pork lovers! Slow-roasted pulled pork topped with our homemade coleslaw and tangy BBQ sauce, served on a toasted brioche bun.',
        imageUrl: 'img/new/porky-pig.jpg',
        category: 'other',
    },
    //{
    //    id: 'techno',
    //    title: 'The Techno',
    //    description:
    //        'The perfect marriage of heat and sweet that will have you wanting to do the slide. American cheese, caramelized onions, sweet honey barbeque, and our spicy NOT! So Basic Sauce.',
    //    imageUrl: 'img/old/Dripping-jpg.webp',
    //    category: 'beef',
    //}, // none
    //{
    //    id: 'steak-house',
    //    title: 'Steak House',
    //    description:
    //        'All the intense flavors and texture you would expect from a high-end steak restaurant in the palm of your hand. Special steakhouse seasoning, Swiss cheese, fried onion and mayonnaise',
    //    imageUrl: 'img/old/file-1.webp',
    //    category: 'beef',
    //},
    {
        id: 'sweet-savory',
        title: 'Sweet and Savory',
        description:
            'For the true burger enthusiast we bring you the perfect balance of sweet and savory. Swiss cheese, caramelized onion, pepper jam and applewood bacon.',
        imageUrl: 'img/new/sweet-and-savery.jpg',
        category: 'beef',
    },
    {
        id: 'extra-cheese',
        title: 'Extra Cheese Please',
        description:
            'Where this one lacks on toppings it makes up with big flavor thats sure to please. Extra American cheese, seasoned prime patty on a brioche bun.',
        imageUrl: 'img/new/extra-cheese-please.jpg',
        category: 'beef',
    },
    {
        id: 'whiskey',
        title: 'Whiskey',
        description:
            'This one has it all...sweet, savory and a touch of heat. American cheese, applewood bacon, fried onion and our signature truck made whiskey sauce.',
        imageUrl: 'img/new/whiskey.jpg',
        category: 'beef',
    },
    {
        id: 'double-bacon',
        title: 'Double Bacon With Cheese',
        description:
            'Stacked with 8oz of our prime beef, double smoked bacon, double cheese',
        imageUrl: 'img/new/double-bacon.jpg',
        category: 'beef',
    },
    //{
    //    id: 'monte-cristo',
    //    title: 'Monte Cristo',
    //    description:
    //        'Fresh ground turkey, honey ham, Swiss, truck made raspberry jam, caramelized onions, cinnamon butter and powdered sugar.',
    //    imageUrl: 'img/old/monte-scaled.webp',
    //    category: 'beef',
    //    isSeasonal: true,
    //},
    {
        id: 'vegetarian',
        title: 'Vegetarian options',
        description:
            'All of our sliders can be substituted with impossible meat at an additional cost',
        imageUrl: 'img/new/impossible-slider.jpg',
        category: 'beef',
        isVegetarianOption: true,
    },
    {
        id: 'very-basic',
        title: 'VERY! Basic Sliders',
        description:
            'Our prime beef sliders topped with American cheese and caramelized onions',
        imageUrl: 'img/new/very-basic.jpg',
        category: 'beef',
    },
    //{
    //    id: 'bacon-cheese',
    //    title: 'Bacon and Cheese Sliders',
    //    description:
    //        'Our prime beef sliders topped with smoked bacon and double American cheese',
    //    imageUrl: 'img/new/very-basic.jpg',
    //    category: 'beef',
    //},
    {
        id: 'spicy-chicken',
        title: 'Spicy Chicken',
        description:
            'Hand breaded crispy chicken, pepper jack cheese, chipotle mayonnaise, fresh jalapeños, pickle',
        imageUrl: 'img/new/spicy-chicken2.jpg',
        category: 'chicken',
    },
    {
        id: 'honey-mustard',
        title: 'Honey Mustard Chicken',
        description:
            'Crispy chicken fried to golden perfection, topped with our tangy truck made honey mustard sauce.',
        imageUrl: 'img/new/honey-mustard.jpg',
        category: 'chicken',
    },
    //{
    //    id: 'buffalo-chicken',
    //    title: 'Buffalo Chicken Sliders',
    //    description:
    //        'Hand-battered crispy chicken, truck-made buffalo sauce drizzled with ranch and finished with bleu cheese crumbles',
    //    imageUrl: 'img/old/82BEFDA4-B9F1-4467-B6A4-53309612016E-jpeg.webp',
    //    category: 'chicken',
    //},
    //{
    //    id: 'chicken-tenders',
    //    title: 'Premium Chicken Tenders and Fries',
    //    description:
    //        'Fried to golden perfection and served with your favorite dipping sauce.',
    //    imageUrl: 'img/old/tenders-and-fries-jpg.webp',
    //    category: 'other',
    //},
    {
        id: 'fries',
        title: 'Fries',
        description: 'Our famous crispy fries seasoned to perfection.',
        imageUrl: 'img/old/fries-1-jpg.webp',
        category: 'other',
    },
];
