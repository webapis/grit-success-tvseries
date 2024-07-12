//pages/sitemap.xml.js

import { genreNavs } from '../src/app/components/TopNavigation'
const EXTERNAL_DATA_URL = 'https://turk-dizi.glumzi.com/turk-dizi';

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://turk-dizi.glumzi.com/turk-dizi</loc>
     </url>

     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const canidatePages = genreNavs.map((m) => {

    return {
        id: `media/${m.slug}/turk-dizileri/sayfa/1`
    }
})
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(canidatePages);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;