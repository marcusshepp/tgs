import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CmsService } from './cms.service';
import { CmsMenuItem, CmsEvent } from '../models/cms.types';

describe('CmsService (fixture mode)', () => {
    let service: CmsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CmsService,
                provideHttpClient(),
                provideHttpClientTesting(),
            ],
        });
        service = TestBed.inject(CmsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getHero() returns hero ctaLabel from fixture', (done: DoneFn) => {
        service.getHero().subscribe(hero => {
            expect(hero).toBeTruthy();
            expect(hero.ctaLabel.length).toBeGreaterThan(0);
            done();
        });
    });

    it('getMeetUs() returns team members from fixture', (done: DoneFn) => {
        service.getMeetUs().subscribe(meetUs => {
            expect(meetUs.teamMembers.length).toBeGreaterThan(0);
            expect(meetUs.teamMembers[0].name.length).toBeGreaterThan(0);
            done();
        });
    });

    it('getServices() returns service items from fixture', (done: DoneFn) => {
        service.getServices().subscribe(services => {
            expect(services.items.length).toBeGreaterThan(0);
            done();
        });
    });

    it('getTrustedBy() returns client list from fixture', (done: DoneFn) => {
        service.getTrustedBy().subscribe(trustedBy => {
            expect(trustedBy.items.length).toBeGreaterThan(0);
            done();
        });
    });

    it('getContact() returns phone from fixture', (done: DoneFn) => {
        service.getContact().subscribe(contact => {
            expect(contact.phone.length).toBeGreaterThan(0);
            expect(contact.email.length).toBeGreaterThan(0);
            done();
        });
    });

    it('getBrand() returns businessName from fixture', (done: DoneFn) => {
        service.getBrand().subscribe(brand => {
            expect(brand.businessName.length).toBeGreaterThan(0);
            expect(brand.socialUrls).toBeTruthy();
            done();
        });
    });

    it('getCatering() returns packages from fixture', (done: DoneFn) => {
        service.getCatering().subscribe(catering => {
            expect(catering.packages.length).toBeGreaterThan(0);
            done();
        });
    });

    it('getReviewsPage() returns pageTitle from fixture', (done: DoneFn) => {
        service.getReviewsPage().subscribe(reviewsPage => {
            expect(reviewsPage.pageTitle.length).toBeGreaterThan(0);
            done();
        });
    });

    it('getOrderUi() returns confirmationMessage from fixture', (done: DoneFn) => {
        service.getOrderUi().subscribe(orderUi => {
            expect(orderUi.confirmationMessage.length).toBeGreaterThan(0);
            done();
        });
    });

    it('getMenuItems() returns array of menu items from fixture', (done: DoneFn) => {
        service.getMenuItems().subscribe((items: CmsMenuItem[]) => {
            expect(items.length).toBeGreaterThan(0);
            const first = items[0];
            expect(first.slug.length).toBeGreaterThan(0);
            expect(first.name.length).toBeGreaterThan(0);
            expect(first.price).toBeGreaterThan(0);
            done();
        });
    });

    it('getMenuItemBySlug() returns matching item from fixture', (done: DoneFn) => {
        service.getMenuItemBySlug('classic').subscribe((item: CmsMenuItem) => {
            expect(item).toBeTruthy();
            expect(item.slug).toBe('classic');
            expect(item.category).toBe('beef');
            done();
        });
    });

    it('getMenuItemBySlug() errors for unknown slug', (done: DoneFn) => {
        service.getMenuItemBySlug('does-not-exist').subscribe({
            next: () => fail('expected error'),
            error: (err: Error) => {
                expect(err.message).toContain('does-not-exist');
                done();
            },
        });
    });

    it('getCateringItems() returns catering items from fixture', (done: DoneFn) => {
        service.getCateringItems().subscribe(items => {
            expect(items.length).toBeGreaterThan(0);
            done();
        });
    });

    it('getEvents() returns events array from fixture', (done: DoneFn) => {
        service.getEvents().subscribe((events: CmsEvent[]) => {
            expect(Array.isArray(events)).toBeTrue();
            done();
        });
    });

    it('getReviews() returns reviews array from fixture', (done: DoneFn) => {
        service.getReviews().subscribe(reviews => {
            expect(Array.isArray(reviews)).toBeTrue();
            done();
        });
    });
});
