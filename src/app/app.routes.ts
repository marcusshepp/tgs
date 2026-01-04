import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            title: "Tim's Gourmet Sliders",
            description:
                "Tim's Gourmet Sliders serves delicious handcrafted sliders in Detroit & Redford, Michigan. Fresh ingredients, unique flavors, and catering available. Order now!",
            keywords:
                'gourmet sliders, food truck, Detroit food, Redford Michigan, burger sliders, catering, food truck catering',
        },
    },
    {
        path: 'reviews',
        loadComponent: () => import('./reviews/reviews.component').then(m => m.ReviewsComponent),
        data: {
            title: 'Customer Reviews',
            description:
                "See what our customers are saying about Tim's Gourmet Sliders. Read reviews from satisfied customers in Detroit and Redford, Michigan.",
        },
    },
    {
        path: 'catering',
        loadComponent: () => import('./catering/catering.component').then(m => m.CateringComponent),
        data: {
            title: 'Catering Services',
            description:
                "Tim's Gourmet Sliders offers professional catering for weddings, corporate events, and parties in Detroit & Redford. Get a free quote today!",
        },
    },
    {
        path: 'menu',
        loadComponent: () => import('./full-menu/full-menu.component').then(m => m.FullMenuComponent),
        data: {
            title: 'Our Menu',
            description:
                "Explore Tim's Gourmet Sliders full menu. Classic sliders, specialty burgers, sides, and more. Fresh ingredients and unique flavor combinations.",
        },
    },
    {
        path: 'contact-us',
        loadComponent: () => import('./contact/contact-us/contact-us.component').then(m => m.ContactUsComponent),
        data: {
            title: 'Contact Us',
            description:
                "Contact Tim's Gourmet Sliders for catering inquiries, location info, or questions. We serve Detroit and Redford, Michigan.",
        },
    },
    {
        path: 'meet-us',
        loadComponent: () => import('./meet-us/meet-us.component').then(m => m.MeetUsComponent),
        data: {
            title: 'Meet Us',
            description:
                "Meet the team behind Tim's Gourmet Sliders. Learn about our story and passion for creating the best gourmet sliders in Michigan.",
        },
    },
    {
        path: 'menu-item/:id',
        loadComponent: () => import('./menu-item-details/menu-item-details.component').then(m => m.MenuItemDetailsComponent),
        data: {
            title: 'Menu Item Details',
            description:
                "View details about this delicious menu item from Tim's Gourmet Sliders. Premium ingredients and unique flavor combinations.",
        },
    },
];
