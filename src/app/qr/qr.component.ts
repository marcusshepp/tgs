import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import QRCode from 'qrcode';

const SITE_URL = 'https://timsgourmetsliders.com';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      <div class="text-center space-y-8 max-w-md">
        <div class="space-y-2">
          <h1 class="text-2xl font-bold text-white">Tim's Gourmet Sliders</h1>
          <p class="text-gray-400 text-sm">Scan to visit our website</p>
        </div>

        <div class="inline-block bg-white p-6 rounded-lg shadow-lg">
          <canvas #qrCanvas width="240" height="240"></canvas>
        </div>

        <p class="text-amber-400 text-sm font-medium">{{ siteUrl }}</p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            (click)="downloadPNG()"
            class="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PNG
          </button>

          <button
            (click)="copyToClipboard()"
            class="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path *ngIf="!copied" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              <path *ngIf="copied" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ copied ? 'Copied!' : 'Share' }}
          </button>
        </div>

        <p class="text-gray-500 text-xs">
          Use this QR code for business cards and marketing materials
        </p>
      </div>
    </main>
  `
})
export class QrComponent implements AfterViewInit {
  @ViewChild('qrCanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  siteUrl = SITE_URL;
  copied = false;

  ngAfterViewInit() {
    this.generateQR();
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

  downloadPNG() {
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

    const link = document.createElement('a');
    link.href = downloadCanvas.toDataURL('image/png');
    link.download = 'tims-gourmet-sliders-qr.png';
    link.click();
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
}
