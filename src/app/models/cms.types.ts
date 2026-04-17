export interface CmsSocialUrls {
    facebook: string;
    instagram: string;
    tiktok: string;
    twitter: string;
    yelp: string;
    google: string;
    googleReviewLink: string;
}

export interface CmsBrand {
    businessName: string;
    tagline: string;
    footerText: string;
    ariaDescription: string;
    halalBadgeText: string;
    pdfTagline: string;
    menuPageTitle: string;
    siteUrl: string;
    cloudinaryBaseUrl: string;
    footerLogoUrl: string;
    heroVideoPoster: string;
    heroVideoWebm: string;
    heroVideoMp4: string;
    socialUrls: CmsSocialUrls;
}

export interface CmsGoodToKnowItem {
    text: string;
}

export interface CmsContact {
    email: string;
    phone: string;
    phoneLink: string;
    address: string;
    hours: string;
    googleMapsUrl: string;
    serviceArea: string;
    serviceAreaNote: string;
    responseTime: string;
    sectionHeading: string;
    sideImageUrl: string;
    pdfFooterLine: string;
    inquiryEmailSubject: string;
    autoReplySubject: string;
    autoReplyBody: string;
    goodToKnow: CmsGoodToKnowItem[];
}

export interface CmsHomeHero {
    ctaLabel: string;
    ctaUrl: string;
}

export interface CmsHomeMenuTeaser {
    sectionTitle: string;
    viewAllLabel: string;
    viewAllUrl: string;
    popularItemSlugs: string[];
}

export interface CmsHomeSection {
    sectionTitle: string;
    sectionBody: string;
    ctaLabel: string;
    ctaUrl: string;
}

export interface CmsHomeTrustedBy {
    sectionTitle: string;
}

export interface CmsHomeCta {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaUrl: string;
}

export interface CmsHome {
    hero: CmsHomeHero;
    homeMenuTeaser: CmsHomeMenuTeaser;
    servicesTeaser: CmsHomeSection;
    meetUsTeaser: CmsHomeSection;
    trustedBy: CmsHomeTrustedBy;
    cta: CmsHomeCta;
}

export interface CmsTeamMember {
    name: string;
    role: string;
    photoUrl: string;
    photoAlt: string;
    bio: string;
}

export interface CmsMeetUs {
    title: string;
    storyHeading: string;
    body: string;
    imageUrl: string;
    teamMembers: CmsTeamMember[];
}

export interface CmsServiceItem {
    title: string;
    description: string;
    icon: string;
}

export interface CmsServices {
    sectionTitle: string;
    items: CmsServiceItem[];
}

export interface CmsTrustedByItem {
    name: string;
    logoUrl: string;
    url: string;
}

export interface CmsTrustedBy {
    sectionTitle: string;
    items: CmsTrustedByItem[];
}

export interface CmsFooter {
    copyright: string;
    hoursLabel: string;
    hoursValue: string;
    quickLinksHeading: string;
    menuColumnHeading: string;
    hoursColumnHeading: string;
}

export interface CmsCateringFeature {
    heading: string;
    body: string;
}

export interface CmsCateringPackage {
    badge: string;
    name: string;
    popularTag: string;
    bullets: string[];
}

export interface CmsCatering {
    pageKicker: string;
    introParagraph: string;
    weddingPhotoUrl: string;
    packagesHeading: string;
    packageIncludesNote: string;
    glutenFreeNote: string;
    features: CmsCateringFeature[];
    packages: CmsCateringPackage[];
    goodToKnow: CmsGoodToKnowItem[];
}

export interface CmsReviewsPage {
    pageTitle: string;
    reviewLinkText: string;
}

export interface CmsOrderUi {
    eventsListTitle: string;
    noUpcomingEventsMessage: string;
    orderPageHeading: string;
    cartEmptyMessage: string;
    checkoutHeading: string;
    submitButtonLabel: string;
    confirmationHeading: string;
    confirmationMessage: string;
}

export interface CmsNutritionInfo {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    sodium: string;
}

export type CmsMenuItemCategory = 'beef' | 'chicken' | 'pork' | 'vegetarian' | 'other';

export interface CmsMenuItem {
    slug: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: CmsMenuItemCategory;
    popular: boolean;
    available: boolean;
    spiceLevel: number;
    isVegetarianOption: boolean;
    dietaryInfo: string[];
    ingredients: string[];
    allergens: string[];
    nutritionInfo: CmsNutritionInfo;
}

export type CmsCateringItemCategory = 'beef' | 'poultry' | 'pork' | 'vegetarian' | 'sides' | 'additional';

export interface CmsCateringItem {
    slug: string;
    name: string;
    description: string;
    servingSize: string;
    price: number;
    imageUrl: string;
    category: CmsCateringItemCategory;
    additionalCharge: boolean;
}

export type CmsEventStatus = 'upcoming' | 'active' | 'past';

export interface CmsEvent {
    slug: string;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    locationLabel: string;
    description: string;
    coverImage: string;
    badge: string;
    highlights: string[];
    menuImageUrl: string;
    menuPdfUrl: string;
    specialMenuHeading: string;
    status: CmsEventStatus;
    orderOpensAt: string;
    orderClosesAt: string;
    pickupLocation: string;
    pickupStartAt: string;
    pickupEndAt: string;
    maxOrders: number;
    linkedMenuItemSlugs: string[];
}

export type CmsReviewSource = 'google' | 'yelp' | 'facebook' | 'direct';

export interface CmsReview {
    slug: string;
    author: string;
    rating: number;
    body: string;
    source: CmsReviewSource;
    date: string;
    profilePhotoUrl: string;
}

export interface CmsSeedContent {
    brand: CmsBrand;
    contact: CmsContact;
    home: CmsHome;
    'meet-us': CmsMeetUs;
    services: CmsServices;
    'trusted-by': CmsTrustedBy;
    footer: CmsFooter;
    catering: CmsCatering;
    'reviews-page': CmsReviewsPage;
    'order-ui': CmsOrderUi;
    'menu-items': CmsMenuItem[];
    'catering-items': CmsCateringItem[];
    events: CmsEvent[];
    reviews: CmsReview[];
}
