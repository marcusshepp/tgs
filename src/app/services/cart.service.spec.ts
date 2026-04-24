import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { CartService, LineItem } from './cart.service';
import { StoreService } from './store.service';
import { CmsMenuItem, CmsMenuItemCategory } from '../models/cms.types';

const STORAGE_KEY = 'tgs_order_cart_v1';

// Minimal stub — tests in this file don't exercise the pricing path.
// `getPricing()` returns null which makes the breakdown degrade to
// subtotal-only, matching legacy behavior.
const storeServiceStub: Pick<StoreService, 'getPricing'> = {
    getPricing: async () => null,
};

function makeFreshCartService(platformId: object): CartService {
    return new CartService(platformId, storeServiceStub as StoreService);
}

function makeMenuItem(slug: string, price: number, name?: string): CmsMenuItem {
    return {
        slug,
        name: name ?? slug,
        description: 'Test item',
        price,
        imageUrl: '',
        category: 'beef' as CmsMenuItemCategory,
        popular: false,
        available: true,
        spiceLevel: 0,
        isVegetarianOption: false,
        dietaryInfo: [],
        ingredients: [],
        allergens: [],
        nutritionInfo: { calories: 0, protein: '', carbs: '', fat: '', sodium: '' },
    };
}

describe('CartService', () => {
    let service: CartService;

    beforeEach(() => {
        localStorage.removeItem(STORAGE_KEY);
        TestBed.configureTestingModule({
            providers: [
                CartService,
                { provide: PLATFORM_ID, useValue: 'browser' },
                { provide: StoreService, useValue: storeServiceStub },
            ],
        });
        service = TestBed.inject(CartService);
    });

    afterEach(() => {
        localStorage.removeItem(STORAGE_KEY);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('addItem', () => {
        it('adds a new item with quantity 1', (done: DoneFn) => {
            const item = makeMenuItem('classic', 8);
            service.addItem(item, 'spring-fest');
            service.getItems().subscribe(items => {
                expect(items.length).toBe(1);
                expect(items[0].slug).toBe('classic');
                expect(items[0].quantity).toBe(1);
                expect(items[0].unitPrice).toBe(8);
                done();
            });
        });

        it('increments quantity when same item added twice', (done: DoneFn) => {
            const item = makeMenuItem('classic', 8);
            service.addItem(item, 'spring-fest');
            service.addItem(item, 'spring-fest');
            service.getItems().subscribe(items => {
                expect(items.length).toBe(1);
                expect(items[0].quantity).toBe(2);
                done();
            });
        });

        it('does not duplicate — adds distinct items separately', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.addItem(makeMenuItem('spicy', 9), 'spring-fest');
            service.getItems().subscribe(items => {
                expect(items.length).toBe(2);
                done();
            });
        });

        it('caps quantity at 99', (done: DoneFn) => {
            const item = makeMenuItem('classic', 8);
            for (let i = 0; i < 105; i++) {
                service.addItem(item, 'spring-fest');
            }
            service.getItems().subscribe(items => {
                expect(items[0].quantity).toBe(99);
                done();
            });
        });

        it('sets eventSlug on the service', () => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            expect(service.getEventSlug()).toBe('spring-fest');
        });
    });

    describe('removeItem', () => {
        it('removes an item from the cart', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.addItem(makeMenuItem('spicy', 9), 'spring-fest');
            service.removeItem('classic');
            service.getItems().subscribe(items => {
                expect(items.length).toBe(1);
                expect(items[0].slug).toBe('spicy');
                done();
            });
        });

        it('is a no-op for slug not in cart', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.removeItem('does-not-exist');
            service.getItems().subscribe(items => {
                expect(items.length).toBe(1);
                done();
            });
        });

        it('empties cart when last item removed', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.removeItem('classic');
            service.isEmpty$.subscribe(empty => {
                expect(empty).toBeTrue();
                done();
            });
        });
    });

    describe('updateQty', () => {
        it('updates quantity to specified value', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.updateQty('classic', 5);
            service.getItems().subscribe(items => {
                expect(items[0].quantity).toBe(5);
                done();
            });
        });

        it('removes item when qty set to 0', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.updateQty('classic', 0);
            service.getItems().subscribe(items => {
                expect(items.length).toBe(0);
                done();
            });
        });

        it('removes item when qty set to negative', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.updateQty('classic', -1);
            service.getItems().subscribe(items => {
                expect(items.length).toBe(0);
                done();
            });
        });

        it('caps quantity at 99', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.updateQty('classic', 200);
            service.getItems().subscribe(items => {
                expect(items[0].quantity).toBe(99);
                done();
            });
        });

        it('is a no-op for slug not in cart', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.updateQty('does-not-exist', 5);
            service.getItems().subscribe(items => {
                expect(items.length).toBe(1);
                expect(items[0].slug).toBe('classic');
                done();
            });
        });
    });

    describe('clear', () => {
        it('removes all items from the cart', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.addItem(makeMenuItem('spicy', 9), 'spring-fest');
            service.clear();
            service.getItems().subscribe(items => {
                expect(items.length).toBe(0);
                done();
            });
        });

        it('preserves the event slug after clear', () => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.clear();
            expect(service.getEventSlug()).toBe('spring-fest');
        });
    });

    describe('derived observables', () => {
        it('getItemCount emits total quantity across all items', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.addItem(makeMenuItem('spicy', 9), 'spring-fest');
            service.getItemCount().subscribe(count => {
                expect(count).toBe(3);
                done();
            });
        });

        it('getTotal emits sum of unitPrice * quantity', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.addItem(makeMenuItem('spicy', 9), 'spring-fest');
            service.getTotal().subscribe(total => {
                expect(total).toBe(25);
                done();
            });
        });

        it('isEmpty$ is true when cart is empty', (done: DoneFn) => {
            service.isEmpty$.subscribe(empty => {
                expect(empty).toBeTrue();
                done();
            });
        });

        it('isEmpty$ is false when cart has items', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.isEmpty$.subscribe(empty => {
                expect(empty).toBeFalse();
                done();
            });
        });
    });

    describe('localStorage persistence', () => {
        it('saves cart to localStorage on addItem', () => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            const raw = localStorage.getItem(STORAGE_KEY);
            expect(raw).toBeTruthy();
            const stored = JSON.parse(raw!);
            expect(stored.currentSlug).toBe('spring-fest');
            expect(stored.carts['spring-fest']['classic']).toBeTruthy();
            expect(stored.carts['spring-fest']['classic'].quantity).toBe(1);
        });

        it('saves cart to localStorage on removeItem', () => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.addItem(makeMenuItem('spicy', 9), 'spring-fest');
            service.removeItem('classic');
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
            expect(stored.carts['spring-fest']['classic']).toBeUndefined();
            expect(stored.carts['spring-fest']['spicy']).toBeTruthy();
        });

        it('restores cart from localStorage on service init', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');
            service.addItem(makeMenuItem('classic', 8), 'spring-fest');

            const platformId = TestBed.inject(PLATFORM_ID);
            const freshService = makeFreshCartService(platformId);

            freshService.getItems().subscribe((items: LineItem[]) => {
                expect(items.length).toBe(1);
                expect(items[0].slug).toBe('classic');
                expect(items[0].quantity).toBe(2);
                done();
            });
        });

        it('clears localStorage on corrupted JSON', () => {
            localStorage.setItem(STORAGE_KEY, 'not-valid-json{{{');
            const platformId = TestBed.inject(PLATFORM_ID);
            const freshService = makeFreshCartService(platformId);
            expect(freshService.getEventSlug()).toBeNull();
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('clears localStorage on structurally invalid data', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([1, 2, 3]));
            const platformId = TestBed.inject(PLATFORM_ID);
            const freshService = makeFreshCartService(platformId);
            expect(freshService.getEventSlug()).toBeNull();
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('starts fresh when localStorage is empty', (done: DoneFn) => {
            const platformId = TestBed.inject(PLATFORM_ID);
            const freshService = makeFreshCartService(platformId);
            freshService.getItems().subscribe((items: LineItem[]) => {
                expect(items.length).toBe(0);
                done();
            });
        });
    });

    describe('event slug switching', () => {
        it('switches to new event cart when addItem called with different slug', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'event-a');
            service.addItem(makeMenuItem('spicy', 9), 'event-b');

            service.getItems().subscribe(items => {
                expect(items.length).toBe(1);
                expect(items[0].slug).toBe('spicy');
                expect(service.getEventSlug()).toBe('event-b');
                done();
            });
        });

        it('preserves previous event cart when switching back', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'event-a');
            service.addItem(makeMenuItem('spicy', 9), 'event-b');
            service.addItem(makeMenuItem('classic', 8), 'event-a');

            service.getItems().subscribe(items => {
                const classicItem = items.find(i => i.slug === 'classic');
                expect(classicItem).toBeTruthy();
                expect(classicItem!.quantity).toBe(2);
                expect(items.find(i => i.slug === 'spicy')).toBeUndefined();
                done();
            });
        });

        it('event-a and event-b carts are stored independently in localStorage', () => {
            service.addItem(makeMenuItem('classic', 8), 'event-a');
            service.addItem(makeMenuItem('spicy', 9), 'event-b');

            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
            expect(stored.carts['event-a']['classic']).toBeTruthy();
            expect(stored.carts['event-b']['spicy']).toBeTruthy();
            expect(stored.carts['event-a']['spicy']).toBeUndefined();
        });

        it('starts with empty cart for a new event slug', (done: DoneFn) => {
            service.addItem(makeMenuItem('classic', 8), 'event-a');

            const platformId = TestBed.inject(PLATFORM_ID);
            const freshService = makeFreshCartService(platformId);

            freshService.addItem(makeMenuItem('bbq', 10), 'event-b');
            freshService.getItems().subscribe(items => {
                expect(items.length).toBe(1);
                expect(items[0].slug).toBe('bbq');
                done();
            });
        });
    });
});
