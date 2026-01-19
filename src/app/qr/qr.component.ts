import { Component, ElementRef, ViewChild, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import QRCode from 'qrcode';

const SITE_URL = 'https://timsgourmetsliders.com/scan';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="qr-page">
      <div class="qr-container">
        <div class="qr-header">
          <h1>Tim's Gourmet Sliders</h1>
          <p>Scan to visit our website</p>
        </div>

        <div class="qr-code-wrapper">
          <canvas #qrCanvas width="240" height="240"></canvas>
        </div>

        <p class="site-url">{{ displayUrl }}</p>

        <div class="qr-actions">
          <button class="btn-primary" (click)="downloadPNG()">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {{ isIOS ? 'Save QR Code' : 'Download PNG' }}
          </button>

          <button class="btn-outline" (click)="shareOrCopy()">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path *ngIf="!copied" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              <path *ngIf="copied" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ copied ? 'Copied!' : 'Share' }}
          </button>
        </div>

        <p class="qr-hint">Use this QR code for business cards and marketing materials</p>
      </div>
    </main>
  `,
  styles: [`
    .qr-page {
      min-height: 100vh;
      background: #1a1a1a;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .qr-container {
      text-align: center;
      max-width: 400px;
    }

    .qr-header {
      margin-bottom: 2rem;

      h1 {
        font-size: 1.75rem;
        font-weight: 700;
        color: #fff;
        margin-bottom: 0.5rem;
      }

      p {
        color: #9ca3af;
        font-size: 0.875rem;
      }
    }

    .qr-code-wrapper {
      display: inline-block;
      background: #fff;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      margin-bottom: 1.5rem;
    }

    .site-url {
      color: #f59e0b;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 2rem;
    }

    .qr-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;

      @media (min-width: 480px) {
        flex-direction: row;
        justify-content: center;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;

        svg {
          width: 20px;
          height: 20px;
        }
      }

      .btn-primary {
        background: #f59e0b;
        color: #000;
        border: none;

        &:hover {
          background: #fbbf24;
        }
      }

      .btn-outline {
        background: transparent;
        color: #fff;
        border: 1px solid #4b5563;

        &:hover {
          background: #374151;
        }
      }
    }

    .qr-hint {
      color: #6b7280;
      font-size: 0.75rem;
    }
  `]
})
export class QrComponent implements AfterViewInit {
  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  siteUrl = SITE_URL;
  displayUrl = 'timsgourmetsliders.com/scan';
  copied = false;
  isIOS = false;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.generateQR();
    }
  }

  async generateQR() {
    try {
      await QRCode.toCanvas(this.qrCanvas.nativeElement, SITE_URL, {
        width: 240,
        margin: 0,
        color: {
          dark: '#1a1a1a',
          light: '#ffffff'
        }
      });
    } catch (err) {
      console.error('QR generation failed:', err);
    }
  }

  async downloadPNG() {
    if (!this.isBrowser) return;

    const canvas = this.qrCanvas.nativeElement;
    const size = 1024;
    const downloadCanvas = document.createElement('canvas');
    const ctx = downloadCanvas.getContext('2d');
    if (!ctx) return;

    downloadCanvas.width = size;
    downloadCanvas.height = size;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    const padding = 64;
    ctx.drawImage(canvas, padding, padding, size - padding * 2, size - padding * 2);

    // Convert to blob for better iOS compatibility
    downloadCanvas.toBlob(async (blob) => {
      if (!blob) return;

      // Try Web Share API first (works great on iOS)
      if (navigator.share && this.isIOS) {
        try {
          const file = new File([blob], 'tims-gourmet-sliders-qr.png', { type: 'image/png' });
          await navigator.share({
            files: [file],
            title: "Tim's Gourmet Sliders QR Code",
          });
          return;
        } catch (err) {
          // User cancelled or share failed, fall through to other methods
          if ((err as Error).name !== 'AbortError') {
            console.log('Share failed, trying alternative method');
          }
        }
      }

      // For iOS without share support, open in new tab (user can long-press to save)
      if (this.isIOS) {
        const dataUrl = downloadCanvas.toDataURL('image/png');
        const newWindow = window.open();
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head><title>QR Code - Long press to save</title></head>
              <body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#1a1a1a;">
                <div style="text-align:center;">
                  <p style="color:#fff;margin-bottom:1rem;font-family:system-ui;">Long press the image to save</p>
                  <img src="${dataUrl}" alt="QR Code" style="max-width:90vw;max-height:80vh;" />
                </div>
              </body>
            </html>
          `);
        }
        return;
      }

      // Desktop: Use standard download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'tims-gourmet-sliders-qr.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  async shareOrCopy() {
    if (!this.isBrowser) return;

    // Try native share first
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Tim's Gourmet Sliders",
          text: 'Check out our menu!',
          url: SITE_URL,
        });
        return;
      } catch (err) {
        // User cancelled, fall through to clipboard
        if ((err as Error).name === 'AbortError') return;
      }
    }

    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(SITE_URL);
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
}
