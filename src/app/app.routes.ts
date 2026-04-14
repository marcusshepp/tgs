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
        path: 'special-events',
        loadComponent: () => import('./special-events/special-events.component').then(m => m.SpecialEventsComponent),
        data: {
            title: 'Special Events',
            description:
                "Catch Tim's Gourmet Sliders at upcoming special events across Michigan. Limited-time menus, live entertainment, and our signature sliders.",
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
    {
        path: 'menu-pdf',
        loadComponent: () => import('./menu-pdf/menu-pdf.component').then(m => m.MenuPdfComponent),
        data: {
            title: 'Menu PDF Export',
            description:
                "Export Tim's Gourmet Sliders menu to PDF. Choose between our public menu or catering menu for easy printing.",
        },
    },
    {
        path: 'menu-pdf/public',
        loadComponent: () => import('./menu-pdf/public/menu-pdf-public.component').then(m => m.MenuPdfPublicComponent),
        data: {
            title: 'Public Menu PDF',
            description:
                "Tim's Gourmet Sliders public menu - ready to print or export to PDF.",
        },
    },
    {
        path: 'menu-pdf/catering',
        loadComponent: () => import('./menu-pdf/catering/menu-pdf-catering.component').then(m => m.MenuPdfCateringComponent),
        data: {
            title: 'Catering Menu PDF',
            description:
                "Tim's Gourmet Sliders catering menu - ready to print or export to PDF.",
        },
    },
    {
        path: 'qr',
        loadComponent: () => import('./qr/qr.component').then(m => m.QrComponent),
        data: {
            title: 'QR Code',
            description:
                "Tim's Gourmet Sliders QR code for marketing materials.",
        },
    },
    {
        path: 'events/:slug/order',
        loadComponent: () => import('./events/order/event-order.component').then(m => m.EventOrderComponent),
        data: {
            title: 'Order Sliders',
            description:
                "Pre-order sliders from Tim's Gourmet Sliders for this event. Pick up fresh off the truck.",
        },
    },
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
        data: {
            title: 'Your Cart',
            description:
                "Review your Tim's Gourmet Sliders order before checkout. Adjust quantities or remove items.",
        },
    },
    {
        path: 'checkout',
        loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent),
        data: {
            title: 'Checkout',
            description:
                "Complete your Tim's Gourmet Sliders order. Enter your contact info for pickup.",
        },
    },
    {
        path: 'order-confirmation',
        loadComponent: () => import('./order-confirmation/order-confirmation.component').then(m => m.OrderConfirmationComponent),
        data: {
            title: 'Order Confirmed',
            description:
                "Your Tim's Gourmet Sliders order has been placed. See you at pickup!",
        },
    },
];
