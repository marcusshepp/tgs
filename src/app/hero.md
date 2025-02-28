Project Path: hero

Source Tree:

```
hero
├── hero.component.ts
├── hero.component.html
└── hero.component.scss

```

`/home/marcusshep/p/tgs/src/app/hero/hero.component.ts`:

```ts
import { Component } from '@angular/core';
import { CONTACT } from '../data/contact-info.model';
import { SOCIAL_MEDIA } from '../data/social-media.model';
import { MobileService } from '../services/mobile.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
})
export class HeroComponent {
    public contact = CONTACT;
    public socials = SOCIAL_MEDIA;
    public isHandset$: Observable<boolean>;

    constructor(private mobileService: MobileService) {
        this.isHandset$ = this.mobileService.isHandset();
    }
}

```

`/home/marcusshep/p/tgs/src/app/hero/hero.component.html`:

```html
<section class="banner-section fix">
    <div class="slider-area">
        <div class="swiper banner3-slider">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="banner-wrapper style3 bg-img">
                        <div
                            class="shape1 d-none d-xxl-block"
                            data-animation="slideInLeft"
                            data-duration="2s"
                            data-delay=".3s"
                        >
                            <img
                                class="float-bob-y"
                                src="/img/shape/burger-shape.png"
                                alt="shape"
                            />
                        </div>
                        <div
                            class="shape2 d-none d-xxl-block"
                            data-animation="slideInLeft"
                            data-duration="2s"
                            data-delay=".5s"
                        >
                            <img
                                class="float-bob-x"
                                src="/img/shape/burger-shape.png"
                                alt="shape"
                            />
                        </div>
                        <div class="shape2"></div>
                        <div class="overlay"></div>
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div class="banner-style3">
                                        <div
                                            class="subtitle"
                                            data-animation="slideInRight"
                                            data-duration="2s"
                                            data-delay=".3s"
                                        >
                                            Tim's
                                        </div>
                                        <div
                                            class="subtitle"
                                            data-animation="slideInLeft"
                                            data-duration="2s"
                                            data-delay=".3s"
                                        >
                                            Gourmet
                                        </div>
                                        <div
                                            class="subtitle"
                                            data-animation="slideInRight"
                                            data-duration="2s"
                                            data-delay=".3s"
                                        >
                                            sliders
                                        </div>
                                        <p
                                            class="hero-text"
                                            data-animation="slideInLeft"
                                            data-duration="2s"
                                            data-delay=".9s"
                                        ></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="banner-bottom z-3 position-relative">
                            <div
                                class="container-fluid d-flex align-items-center justify-content-between"
                            >
                                <div class="fancy-item">
                                    <div>
                                        <i
                                            class="fa-solid fa-location-dot text-theme-color2"
                                        ></i>
                                        <span class="text-white"
                                            >{{ contact.ADDRESS }}</span
                                        >
                                    </div>
                                    <div
                                        itemscope
                                        itemtype="http://schema.org/LocalBusiness"
                                    >
                                        <p>
                                            <a
                                                [href]="contact.PHONE_LINK"
                                                itemprop="telephone"
                                                aria-label="Call our business at 555-555-5555"
                                                class="text-white"
                                            >
                                                {{ contact.PHONE }}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div
                                    class="social-meta d-flex flex-column flex-md-row align-items-center gap-2"
                                >
                                    <p class="text-white">Follow Us:</p>
                                    <ul class="d-flex align-items-center gap-2">
                                        <a
                                            target="_blank"
                                            [href]="socials.FACEBOOK"
                                            ><i class="fab fa-facebook-f"></i
                                        ></a>
                                        <a target="_blank" [href]="socials.YELP"
                                            ><i class="fab fa-yelp"></i
                                        ></a>
                                        <a
                                            target="_blank"
                                            [href]="socials.GOOGLE"
                                            ><i class="fab fa-google"></i
                                        ></a>
                                        <a
                                            target="_blank"
                                            [href]="socials.INSTAGRAM"
                                            ><i class="fab fa-instagram"></i
                                        ></a>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

```

`/home/marcusshep/p/tgs/src/app/hero/hero.component.scss`:

```scss
.banner-style3 .subtitle {
    // position: relative;
    // -webkit-text-stroke: 2px var(--theme2);
    // color: var(--theme2);
}

.banner-style3 {
    max-width: 800px;
    margin: 0 auto;
}

.banner-wrapper.style3 .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #010f1ccf 0%, rgba(1, 15, 28, 0.75) 100%);
    z-index: 1;
}

.banner-style3 p,
.banner-style3 * {
    word-break: break-word;
    max-width: 100%;
    line-height: 1.6;
    margin: 20px 0;
}

.banner-wrapper.style3 {
}

.mobile-subtitle {
    font-size: 57px;
    font-weight: 600;
    color: white;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Times New Roman;';
}

.hero-text {
    padding-top: 40px;
    font-size: 12px;
    font-weight: 300;
    color: white;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    font-family: 'Times New Roman;';
}

.fa-location-dot {
    margin-right: 8px;
}

@media (min-width: 770px) {
    .banner-style3 {
        padding-top: 175px;
        padding-bottom: 41px;
    }

    .banner-style3 > .subtitle {
        line-height: 1.1 !important;
    }

    .hero-text {
        font-size: 14.2px;
        font-weight: 800;
        line-height: 2 !important;
    }
}

@media (max-width: 767px) {
    .banner-style3 {
        padding: 70px 15px;
        padding-bottom: 40px;
    }
}

```