import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-page-title',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="title-area">
            <div class="sub-title text-center" [class.animate]="isBrowser">
                <img
                    class="me-1"
                    src="/img/icon/titleIcon.svg"
                    alt="icon"
                />
                {{ title }}
                <img
                    class="ms-1"
                    src="/img/icon/titleIcon.svg"
                    alt="icon"
                />
            </div>
        </div>
    `,
    styles: [`
        .title-area {
            margin-bottom: 2.5rem;
        }

        .sub-title {
            font-size: 1.8rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            transition:
                transform 0.5s ease,
                opacity 0.5s ease;
            opacity: 0;
            transform: translateY(20px);
        }

        .sub-title.animate {
            opacity: 1;
            transform: translateY(0);
        }

        .sub-title img {
            height: 24px;
        }

        .text-center {
            text-align: center;
        }

        @media (max-width: 767px) {
            .title-area {
                margin-bottom: 2rem;
            }

            .sub-title {
                font-size: 1.5rem;
            }
        }

        @media (max-width: 480px) {
            .title-area {
                margin-bottom: 1.5rem;
            }

            .sub-title {
                font-size: 1.3rem;
            }

            .sub-title img {
                height: 20px;
            }
        }
    `]
})
export class PageTitleComponent {
    @Input() title: string = '';
    isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
}
