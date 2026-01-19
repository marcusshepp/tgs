import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main class="scan-page">
      <div class="scan-container">
        <div class="logo-section">
          <img src="/tgs-logo.webp" alt="Tim's Gourmet Sliders" class="logo" />
          <h1>Tim's Gourmet Sliders</h1>
          <p class="tagline">Detroit's Finest Gourmet Sliders</p>
        </div>

        <div class="tabs">
          <a routerLink="/" class="tab">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </a>
          <a routerLink="/menu" class="tab">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span>Menu</span>
          </a>
        </div>

        <div class="quick-links">
          <a routerLink="/catering" class="quick-link">
            <span>🍔</span> Catering
          </a>
          <a routerLink="/contact-us" class="quick-link">
            <span>📞</span> Contact
          </a>
          <a routerLink="/reviews" class="quick-link">
            <span>⭐</span> Reviews
          </a>
        </div>

        <p class="footer-text">Serving Detroit & Redford, Michigan</p>
      </div>
    </main>
  `,
  styles: [`
    .scan-page {
      min-height: 100dvh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .scan-container {
      text-align: center;
      max-width: 400px;
      width: 100%;
    }

    .logo-section {
      margin-bottom: 2.5rem;

      .logo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 1rem;
        box-shadow: 0 8px 32px rgba(245, 158, 11, 0.3);
      }

      h1 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #fff;
        margin-bottom: 0.25rem;
      }

      .tagline {
        color: #f59e0b;
        font-size: 0.875rem;
        font-weight: 500;
      }
    }

    .tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 2rem;

      .tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        padding: 1.5rem 1rem;
        background: #fff;
        border-radius: 16px;
        text-decoration: none;
        color: #1a1a1a;
        font-weight: 600;
        font-size: 1.125rem;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        svg {
          width: 32px;
          height: 32px;
          color: #f59e0b;
        }

        &:hover, &:active {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.25);
        }
      }
    }

    .quick-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;

      .quick-link {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        text-decoration: none;
        color: #fff;
        font-size: 0.875rem;
        font-weight: 500;
        transition: background 0.2s;

        &:hover, &:active {
          background: rgba(255, 255, 255, 0.2);
        }

        span {
          font-size: 1rem;
        }
      }
    }

    .footer-text {
      color: #6b7280;
      font-size: 0.75rem;
    }
  `]
})
export class ScanComponent {}
