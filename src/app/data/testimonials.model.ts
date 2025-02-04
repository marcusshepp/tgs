export interface Testimonial {
    name: string;
    content: string;
    rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
    {
        name: 'Mike Thompson',
        content:
            'The classic cheeseburger here is absolutely incredible! The patty is perfectly seasoned and juicy, and those hand-cut fries are crispy on the outside, fluffy on the inside. Best burger joint in town!',
        rating: 5,
    },
    {
        name: 'Sarah Martinez',
        content:
            'Those sliders are little bites of heaven! I tried all three varieties - the classic, BBQ bacon, and mushroom swiss. Each one was better than the last. The seasoned fries are a must-try side!',
        rating: 5,
    },
    {
        name: 'James Wilson',
        content:
            "The loaded truffle fries are a game-changer! And that signature burger with the special sauce? Mind-blowing! I've been to burger places all over the city, and this is easily in my top 3.",
        rating: 5,
    },
    {
        name: 'Emily Chen',
        content:
            "The attention to detail in every burger is impressive. The brioche buns are toasted perfectly, the meat is cooked to order, and those crispy onion strings they add? Genius! Don't even get me started on their sweet potato fries.",
        rating: 5,
    },
];
