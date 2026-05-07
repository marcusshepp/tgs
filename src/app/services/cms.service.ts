import { Injectable, PLATFORM_ID, Inject, makeStateKey, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import seedContent from '../../../cms/seed-content.json';
import {
    CmsBrand,
    CmsCatering,
    CmsCateringItem,
    CmsContact,
    CmsEvent,
    CmsFooter,
    CmsHomeCta,
    CmsHomeHero,
    CmsHomeMenuTeaser,
    CmsHomeSection,
    CmsHomeTrustedBy,
    CmsMeetUs,
    CmsMenuItem,
    CmsOrderUi,
    CmsReview,
    CmsReviewsPage,
    CmsSeedContent,
    CmsServices,
    CmsTrustedBy,
} from '../models/cms.types';

const fixture = seedContent as unknown as CmsSeedContent;

const EMPTY_BRAND: CmsBrand = {
    businessName: '',
    tagline: '',
    footerText: '',
    ariaDescription: '',
    halalBadgeText: '',
    pdfTagline: '',
    menuPageTitle: '',
    siteUrl: '',
    cloudinaryBaseUrl: '',
    footerLogoUrl: '',
    heroVideoPoster: '',
    heroVideoWebm: '',
    heroVideoMp4: '',
    socialUrls: { facebook: '', instagram: '', tiktok: '', twitter: '', yelp: '', google: '', googleReviewLink: '' },
};

const EMPTY_CONTACT: CmsContact = {
    email: '',
    phone: '',
    phoneLink: '',
    address: '',
    hours: '',
    googleMapsUrl: '',
    serviceArea: '',
    serviceAreaNote: '',
    responseTime: '',
    sectionHeading: '',
    sideImageUrl: '',
    pdfFooterLine: '',
    inquiryEmailSubject: '',
    autoReplySubject: '',
    autoReplyBody: '',
    goodToKnow: [],
};

const EMPTY_HERO: CmsHomeHero = { ctaLabel: '', ctaUrl: '' };
const EMPTY_HOME_MENU_TEASER: CmsHomeMenuTeaser = { sectionTitle: '', viewAllLabel: '', viewAllUrl: '', popularItemSlugs: [] };
const EMPTY_HOME_SECTION: CmsHomeSection = { sectionTitle: '', sectionBody: '', ctaLabel: '', ctaUrl: '' };
const EMPTY_HOME_TRUSTED_BY: CmsHomeTrustedBy = { sectionTitle: '' };
const EMPTY_HOME_CTA: CmsHomeCta = { heading: '', body: '', ctaLabel: '', ctaUrl: '' };

const EMPTY_MEET_US: CmsMeetUs = {
    title: '',
    storyHeading: '',
    body: '',
    imageUrl: '',
    teamMembers: [],
};

const EMPTY_SERVICES: CmsServices = { sectionTitle: '', items: [] };

const EMPTY_TRUSTED_BY: CmsTrustedBy = { sectionTitle: '', items: [] };

const EMPTY_FOOTER: CmsFooter = {
    copyright: '',
    hoursLabel: '',
    hoursValue: '',
    quickLinksHeading: '',
    menuColumnHeading: '',
    hoursColumnHeading: '',
};

const EMPTY_CATERING: CmsCatering = {
    pageKicker: '',
    introParagraph: '',
    weddingPhotoUrl: '',
    packagesHeading: '',
    packageIncludesNote: '',
    glutenFreeNote: '',
    features: [],
    packages: [],
    goodToKnow: [],
};

const EMPTY_REVIEWS_PAGE: CmsReviewsPage = { pageTitle: '', reviewLinkText: '' };

const EMPTY_ORDER_UI: CmsOrderUi = {
    eventsListTitle: '',
    noUpcomingEventsMessage: '',
    orderPageHeading: '',
    cartEmptyMessage: '',
    checkoutHeading: '',
    submitButtonLabel: '',
    confirmationHeading: '',
    confirmationMessage: '',
};

@Injectable({ providedIn: 'root' })
export class CmsService {
    private readonly apiBase = `${environment.cmsApiBase}/content/${environment.cmsTenant}`;
    private readonly collectionBase = `${environment.cmsApiBase}/collection/${environment.cmsTenant}`;

    constructor(
        private http: HttpClient,
        private transferState: TransferState,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {}

    private fetchSection<T>(sectionKey: string, fallback: T): Observable<T> {
        if (environment.cmsMode === 'fixture') {
            return of(fallback);
        }

        const stateKey = makeStateKey<T>(`cms_section_${sectionKey}`);

        if (isPlatformBrowser(this.platformId) && this.transferState.hasKey(stateKey)) {
            const cached = this.transferState.get(stateKey, fallback);
            this.transferState.remove(stateKey);
            return of(cached);
        }

        return this.http.get<{ content: T }>(`${this.apiBase}/${sectionKey}`).pipe(
            map(res => res.content),
            tap(data => {
                if (isPlatformServer(this.platformId)) {
                    this.transferState.set(stateKey, data);
                }
            }),
            catchError(err => {
                console.error(`CmsService: section fetch failed for "${sectionKey}"`, err);
                return of(fallback);
            }),
        );
    }

    private fetchCollection<T>(collectionKey: string, fallback: T[]): Observable<T[]> {
        if (environment.cmsMode === 'fixture') {
            return of(fallback);
        }

        const stateKey = makeStateKey<T[]>(`cms_collection_${collectionKey}`);

        if (isPlatformBrowser(this.platformId) && this.transferState.hasKey(stateKey)) {
            const cached = this.transferState.get(stateKey, fallback);
            this.transferState.remove(stateKey);
            return of(cached);
        }

        return this.http.get<{ items: Array<{ content: T }> }>(`${this.collectionBase}/${collectionKey}`).pipe(
            map(res => res.items.map(i => i.content)),
            tap(data => {
                if (isPlatformServer(this.platformId)) {
                    this.transferState.set(stateKey, data);
                }
            }),
            catchError(err => {
                console.error(`CmsService: collection fetch failed for "${collectionKey}"`, err);
                return of(fallback);
            }),
        );
    }

    private fetchCollectionItem<T extends { slug: string }>(
        collectionKey: string,
        slug: string,
        fixtureItems: T[],
    ): Observable<T> {
        if (environment.cmsMode === 'fixture') {
            const item = fixtureItems.find(i => i.slug === slug);
            if (!item) {
                return throwError(() => new Error(`CmsService: fixture item not found — ${collectionKey}/${slug}`));
            }
            return of(item);
        }

        const stateKey = makeStateKey<T>(`cms_item_${collectionKey}_${slug}`);

        if (isPlatformBrowser(this.platformId) && this.transferState.hasKey(stateKey)) {
            const cached = this.transferState.get(stateKey, null as unknown as T);
            this.transferState.remove(stateKey);
            return of(cached);
        }

        return this.http.get<{ content: T }>(`${this.collectionBase}/${collectionKey}/${slug}`).pipe(
            map(res => res.content),
            tap(data => {
                if (isPlatformServer(this.platformId)) {
                    this.transferState.set(stateKey, data);
                }
            }),
            catchError(err => {
                // No bundled-fixture fallback here: the slug may have been deleted, renamed,
                // or typo'd, and seed-content is frozen at build time. Falling back would
                // resurrect dead events with stale orderingActive/dates and defeat the
                // CMS kill-switch. Propagate so callers can show a not-found state.
                console.error(`CmsService: item fetch failed for "${collectionKey}/${slug}"`, err);
                return throwError(() => err);
            }),
        );
    }

    getBrand(): Observable<CmsBrand> {
        return this.fetchSection('brand', fixture.brand ?? EMPTY_BRAND);
    }

    getContact(): Observable<CmsContact> {
        return this.fetchSection('contact', fixture.contact ?? EMPTY_CONTACT);
    }

    getHero(): Observable<CmsHomeHero> {
        return this.fetchSection('hero', fixture.home?.hero ?? EMPTY_HERO);
    }

    getHomeMenuTeaser(): Observable<CmsHomeMenuTeaser> {
        return this.fetchSection('homeMenuTeaser', fixture.home?.homeMenuTeaser ?? EMPTY_HOME_MENU_TEASER);
    }

    getServicesTeaser(): Observable<CmsHomeSection> {
        return this.fetchSection('servicesTeaser', fixture.home?.servicesTeaser ?? EMPTY_HOME_SECTION);
    }

    getMeetUsTeaser(): Observable<CmsHomeSection> {
        return this.fetchSection('meetUsTeaser', fixture.home?.meetUsTeaser ?? EMPTY_HOME_SECTION);
    }

    getHomeTrustedBy(): Observable<CmsHomeTrustedBy> {
        return this.fetchSection('homeTrustedBy', fixture.home?.trustedBy ?? EMPTY_HOME_TRUSTED_BY);
    }

    getCta(): Observable<CmsHomeCta> {
        return this.fetchSection('cta', fixture.home?.cta ?? EMPTY_HOME_CTA);
    }

    getMeetUs(): Observable<CmsMeetUs> {
        return this.fetchSection('meetUs', fixture['meet-us'] ?? EMPTY_MEET_US);
    }

    getServices(): Observable<CmsServices> {
        return this.fetchSection('services', fixture.services ?? EMPTY_SERVICES);
    }

    getTrustedBy(): Observable<CmsTrustedBy> {
        return this.fetchSection('trustedBy', fixture['trusted-by'] ?? EMPTY_TRUSTED_BY);
    }

    getFooter(): Observable<CmsFooter> {
        return this.fetchSection('footer', fixture.footer ?? EMPTY_FOOTER);
    }

    getCatering(): Observable<CmsCatering> {
        return this.fetchSection('catering', fixture.catering ?? EMPTY_CATERING);
    }

    getReviewsPage(): Observable<CmsReviewsPage> {
        return this.fetchSection('reviewsPage', fixture['reviews-page'] ?? EMPTY_REVIEWS_PAGE);
    }

    getOrderUi(): Observable<CmsOrderUi> {
        return this.fetchSection('orderUi', fixture['order-ui'] ?? EMPTY_ORDER_UI);
    }

    getMenuItems(): Observable<CmsMenuItem[]> {
        return this.fetchCollection<CmsMenuItem>('menuItems', fixture['menu-items'] ?? []);
    }

    getMenuItemBySlug(slug: string): Observable<CmsMenuItem> {
        return this.fetchCollectionItem<CmsMenuItem>('menuItems', slug, fixture['menu-items'] ?? []);
    }

    getCateringItems(): Observable<CmsCateringItem[]> {
        return this.fetchCollection<CmsCateringItem>('cateringItems', fixture['catering-items'] ?? []);
    }

    getEvents(): Observable<CmsEvent[]> {
        return this.fetchCollection<CmsEvent>('events', fixture.events ?? []);
    }

    getEventBySlug(slug: string): Observable<CmsEvent> {
        return this.fetchCollectionItem<CmsEvent>('events', slug, fixture.events ?? []);
    }

    getReviews(): Observable<CmsReview[]> {
        return this.fetchCollection<CmsReview>('reviews', fixture.reviews ?? []);
    }
}
