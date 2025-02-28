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
import { Component, OnInit } from '@angular/core';
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
export class HeroComponent implements OnInit {
    public contact = CONTACT;
    public socials = SOCIAL_MEDIA;
    public isHandset$: Observable<boolean>;

    constructor(private mobileService: MobileService) {
        this.isHandset$ = this.mobileService.isHandset();
    }

    ngOnInit(): void {
        this.setMinHeight();
        window.addEventListener('resize', this.setMinHeight);
    }

    ngOnDestroy(): void {
        window.removeEventListener('resize', this.setMinHeight);
    }

    private setMinHeight = (): void => {
        const bottomBar = document.querySelector('.banner-bottom');
        const bannerSection = document.querySelector('.banner-section');

        if (bottomBar && bannerSection) {
            const viewportHeight = window.innerHeight;
            const minHeightNeeded = viewportHeight;

            bannerSection.setAttribute(
                'style',
                `min-height: ${minHeightNeeded}px`
            );
        }
    };
}

```

`/home/marcusshep/p/tgs/src/app/hero/hero.component.html`:

```html
<section class="banner-section">
    <div class="background-pattern"></div>
    <div class="overlay"></div>
    <div class="logo-container d-none d-md-block">
        <img
            src="/img/shape/burger-shape.png"
            alt="burger icon"
            class="burger-icon float-bob-y"
        />
        <img
            src="/img/shape/burger-shape.png"
            alt="burger icon"
            class="burger-icon-2 float-bob-x"
        />
    </div>
    <div class="container h-100 d-flex flex-column justify-content-between">
        <div
            class="row justify-content-center align-items-center title-section"
        >
            <div class="col-12">
                <div class="banner-title">
                    <div class="subtitle">Tim's</div>
                    <div class="subtitle">Gourmet</div>
                    <div class="subtitle">Sliders</div>
                </div>
            </div>
        </div>

        <div class="row justify-content-center burger-section">
            <div class="col-10 col-md-8 col-lg-6">
                <div class="burger-container">
                    <img
                        src="/img/new/whiskey.jpg"
                        alt="Gourmet Slider"
                        class="burger-image"
                    />
                </div>
            </div>
        </div>

        <div class="row justify-content-center button-section">
            <div class="col-12 d-flex justify-content-center flex-wrap gap-3">
                <a href="#menu" class="action-button primary-button"
                    >VIEW OUR MENU</a
                >
                <a
                    href="tel:{{ contact.PHONE_LINK }}"
                    class="action-button secondary-button"
                    >CALL NOW</a
                >
            </div>
        </div>
    </div>

    <div class="banner-bottom">
        <div
            class="container-fluid d-flex flex-wrap align-items-center justify-content-between"
        >
            <div class="location-info d-flex align-items-center gap-3">
                <div>
                    <i class="fa-solid fa-location-dot"></i>
                    <span>{{ contact.ADDRESS }}</span>
                </div>
                <div itemscope itemtype="http://schema.org/LocalBusiness">
                    <a
                        [href]="contact.PHONE_LINK"
                        itemprop="telephone"
                        aria-label="Call our business"
                        class="phone-link"
                    >
                        {{ contact.PHONE }}
                    </a>
                </div>
            </div>
            <div class="social-meta d-flex align-items-center gap-3">
                <p>Follow Us:</p>
                <div class="social-icons">
                    <a
                        target="_blank"
                        [href]="socials.FACEBOOK"
                        aria-label="Facebook"
                        ><i class="fab fa-facebook-f"></i
                    ></a>
                    <a target="_blank" [href]="socials.YELP" aria-label="Yelp"
                        ><i class="fab fa-yelp"></i
                    ></a>
                    <a
                        target="_blank"
                        [href]="socials.GOOGLE"
                        aria-label="Google"
                        ><i class="fab fa-google"></i
                    ></a>
                    <a
                        target="_blank"
                        [href]="socials.INSTAGRAM"
                        aria-label="Instagram"
                        ><i class="fab fa-instagram"></i
                    ></a>
                </div>
            </div>
        </div>
    </div>
</section>

```

`/home/marcusshep/p/tgs/src/app/hero/hero.component.scss`:

```scss
.hero-section {
    position: relative;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-image: url('/img/new/food-truck.jpg');
    background-size: cover;
    background-position: center;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        160deg,
        rgba(1, 15, 28, 0.85) 0%,
        rgba(1, 15, 28, 0.65) 100%
    );
    z-index: 1;
}

.hero-content {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}

.hero-title-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin-bottom: 2rem;
}

.hero-title {
    position: relative;
    z-index: 3;
    text-align: center;
}

.title-line {
    font-family: 'Times New Roman', serif;
    font-size: 5rem;
    font-weight: 600;
    line-height: 1.1;
    color: transparent;
    -webkit-text-stroke: 2px #ff6b00;
    text-transform: uppercase;
    text-shadow: 0 0 15px rgba(255, 107, 0, 0.3);
    transform: translateZ(0);
    transition: all 0.3s ease;

    &:hover {
        color: #ff6b00;
        transform: scale(1.05);
    }
}

.hero-burger {
    position: relative;
    z-index: 3;
    width: 100%;
    max-width: 450px;
    margin: 2rem auto;
    transform: translateY(0);
    animation: float 6s ease-in-out infinite;
}

.burger-image {
    width: 100%;
    height: auto;
    border-radius: 50%;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    transition: transform 0.5s ease;

    &:hover {
        transform: scale(1.05) rotate(3deg);
    }
}

.cta-container {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    z-index: 3;
}

.cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    background-color: #ff6b00;
    color: white;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 50px;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
        background-color: #ff8c00;
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(255, 107, 0, 0.4);
    }

    &.cta-secondary {
        background-color: transparent;
        border: 2px solid #ff6b00;

        &:hover {
            background-color: rgba(255, 107, 0, 0.1);
        }
    }
}

.hero-bottom {
    position: relative;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1rem 0;
}

.info-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    color: white;
}

.location-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    i {
        color: #ff6b00;
        font-size: 1.2rem;
    }
}

.phone-link {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: #ff6b00;
    }
}

.social-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    p {
        margin: 0;
    }
}

.social-icons {
    display: flex;
    align-items: center;
    gap: 1rem;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
        transition: all 0.3s ease;

        &:hover {
            background-color: #ff6b00;
            transform: translateY(-3px);
        }
    }
}

@keyframes float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-15px);
    }
    100% {
        transform: translateY(0px);
    }
}

@media (max-width: 992px) {
    .title-line {
        font-size: 4rem;
    }

    .hero-burger {
        max-width: 350px;
    }
}

@media (max-width: 768px) {
    .title-line {
        font-size: 3rem;
    }

    .hero-burger {
        max-width: 300px;
    }

    .info-bar {
        flex-direction: column;
        gap: 1rem;
    }
}

@media (max-width: 576px) {
    .title-line {
        font-size: 2.5rem;
    }

    .cta-container {
        flex-direction: column;
    }
}

```