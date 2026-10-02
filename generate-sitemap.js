import * as fs from 'fs';


const seed = JSON.parse(fs.readFileSync('cms/seed-content.json', 'utf8'));
const menuItemIds = seed['menu-items'].filter(item => item.available && item.visible !== false).map(item => item.slug);

const baseUrl = 'https://timsgourmetsliders.com';

// Static routes from app.routes.ts
const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/reviews', changefreq: 'weekly', priority: '0.8' },
  { path: '/catering', changefreq: 'monthly', priority: '0.8' },
  { path: '/menu', changefreq: 'weekly', priority: '0.9' },
  { path: '/contact-us', changefreq: 'monthly', priority: '0.7' },
  { path: '/meet-us', changefreq: 'monthly', priority: '0.7' },
];

// Dynamic routes from MENU_ITEMS
const dynamicRoutes = menuItemIds.map(item => ({
  path: `/menu-item/${item}`,
  changefreq: 'weekly',
  priority: '0.6',
}));

const allRoutes = [...staticRoutes, ...dynamicRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map(
      route => `
    <url>
      <loc>${baseUrl}${route.path}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>${route.changefreq}</changefreq>
      <priority>${route.priority}</priority>
    </url>`
    )
    .join('')}
</urlset>`;

fs.writeFileSync('src/sitemap.xml', sitemap);
console.log('Sitemap generated successfully!');
