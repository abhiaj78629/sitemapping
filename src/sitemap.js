const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

const hostname = 'https://test.avanceglobal.in/';

const routes = [
  { url: '/', changefreq: 'daily', priority: 0.7 },
  { url: '/about', changefreq: 'weekly', priority: 0.5 },
  { url: '/contact', changefreq: 'weekly', priority: 0.5 },
  { url: '/details', changefreq: 'weekly', priority: 0.5 },
];


const sitemap = new SitemapStream({ hostname });


routes.forEach(route => {
  sitemap.write(route);
});

sitemap.end();

streamToPromise(sitemap).then(sm => {
 
  fs.writeFileSync('./public/sitemap.xml', sm.toString());
  console.log('Sitemap generated successfully.');
});
