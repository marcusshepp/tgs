export interface MenuItem {
    title: string;
    description: string;
    additionalCharge?: boolean;
    portionSize?: string;
}

export interface MenuSection {
    id: string;
    label: string;
    items: MenuItem[];
}

export const MENU_SECTIONS: MenuSection[] = [
    {
        id: 'beef',
        label: 'Beef',
        items: [
            {
                title: 'Classic Sliders',
                description: 'Our prime beef sliders topped with ketchup, mustard, American cheese, caramelized onions and pickles'
            },
            {
                title: 'Very! Basic Sliders',
                description: 'Our prime beef sliders topped with American cheese and caramelized onions'
            },
            {
                title: 'The Not! So Basic Sliders',
                description: 'Our prime beef sliders topped with American cheese, grilled onions, Not! So Basic Sauce, lettuce and tomato'
            },
            {
                title: 'Whiskey Sliders',
                description: 'Our prime beef sliders topped with American cheese, smoked bacon, fried onions, and truck made whiskey sauce'
            },
            {
                title: 'Steak House Sliders',
                description: 'Our prime beef sliders topped with swiss cheese, fried onions and garlic aioli',
            },
            {
                title: 'Black and Blue Sliders',
                description: 'Our prime beef sliders topped with gorgonzola aioli, smoked bacon, and caramelized onions'
            },
            {
                title: 'Sweet and Savory Sliders',
                description: 'Our prime beef sliders topped with Swiss cheese, truck made pepper bacon jam and caramelized onions'
            },
            {
                title: 'Extra Cheese Please! Sliders',
                description: 'Our prime beef sliders topped with double the American cheese'
            },
            {
                title: 'Bacon Cheese Sliders',
                description: 'Our prime beef sliders topped with smoked bacon, and American cheese'
            }
        ]
    },
    {
        id: 'poultry',
        label: 'Poultry',
        items: [
            {
                title: 'Honey Mustard Chicken Sliders',
                description: 'Hand battered crispy chicken topped with honey mustard sauce, lettuce, and tomato'
            },
            {
                title: 'Buffalo Chicken Sliders',
                description: 'Hand battered crispy chicken, truck made buffalo sauce, drizzled with buttermilk ranch',
            },
            {
                title: 'Spicy Chicken Sliders',
                description: 'Hand battered crispy chicken topped with white American cheese, pickles and chipotle mayo'
            },
            {
                title: 'Monte Cristo Sliders',
                description: 'Fresh ground turkey, honey ham, Swiss cheese, caramelized onions, truck made raspberry jam, on cinnamon butter brioche buns and dusted with powdered sugar'
            },
            {
                title: 'Grilled Garlic Chicken Sliders',
                description: 'Pesto marinade, garlic aioli, spring greens, tomato'
            },
            {
                title: 'General Chicken Sliders',
                description: 'Crispy, fried thigh meat prepared to golden perfection, tossed in a sweet and spicy General Tso sauce, drizzled with sriracha and green onions'
            },
            {
                title: 'Tim\'s Famous Fried Chicken Sliders',
                description: 'Crispy fried chicken topped with pickles, Not! So Basic Sauce and white American cheese'
            }
        ]
    },
    {
        id: 'vegetarian',
        label: 'Vegetarian',
        items: [
            {
                title: 'The Imposter',
                description: 'Plant based protein patty topped with garlic aioli, grilled wild mushrooms, Swiss cheese, and caramelized onions',
            },
            {
                title: 'Ultimate Grilled Cheese',
                description: 'American and Swiss cheese, caramelized onions, roasted tomatoes, pesto and olive oil drizzle on grilled sourdough'
            }
        ]
    },
    {
        id: 'pork',
        label: 'Pork',
        items: [
            {
                title: 'Techno Sliders',
                description: 'Our truck smoked pulled pork nestled on top of our prime beef, pickles, fried onions, and drizzled with bbq sauce and chipotle mayo',
                additionalCharge: true
            }
        ]
    },
    {
        id: 'additional',
        label: 'Additional',
        items: [
            {
                title: 'Premium Chicken Tenders',
                description: 'Crispy, delicious chicken paired with your choice of dipping sauce'
            }
        ]
    },
    {
        id: 'sides',
        label: 'Sides',
        items: [
            {
                title: 'Cole Slaw',
                description: ''
            },
            {
                title: 'Pasta Salad',
                description: ''
            },
            {
                title: 'Hot crispy fries',
                description: 'Upgrade your fry game with your choice of our premium cajun or truffle seasoning',
            },
            {
                title: 'Beverages Available',
                description: '',
                additionalCharge: true
            }
        ]
    }
];

export interface GoodToKnowItem {
    text: string;
}

export const GOOD_TO_KNOW_ITEMS: GoodToKnowItem[] = [
    {
        text: 'Food truck fee will apply'
    },
    {
        text: 'Catering contract and deposit required to hold'
    },
    {
        text: 'Our trucks are licensed and insured, and are held to a high standard of cleanliness and sanitation. We aim to exceed the local and state requirements and provide our guests an outstanding experience'
    },
    {
        text: 'Looking to stream your favorite playlist during the event? Let us know and we will be delighted to stream your playlist on our Bluetooth speakers'
    }
];

export interface ContactInfo {
    email: string;
    phone: string;
}

export const CONTACT_INFO: ContactInfo = {
    email: 'timsfoodtruckdetroit@gmail.com',
    phone: '(248) 251-5781'
};
