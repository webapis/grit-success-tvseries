
import fs from 'fs'

import deaccent from './deaccent.mjs'
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const tvseries = require('../data/aggregated-data/tvseries.json')

const EXTERNAL_DATA_URL = 'https://turk-dizi.glumzi.com/turk-dizi';
const genres = [{ slug: "tum", label: 'tüm' }, "komedi", "aile", { slug: "cocuk", label: 'çocuk' }, "dram", "romantik", "tarih", { slug: "ask", label: 'aşk' }, "gerilim", "fantastik", "gizem", "bilim kurgu", "aksiyon", "polisiye", { slug: "suc", label: 'suç' }, " macera", "mafya", "korku", { slug: "genclik", label: 'gençlik' }]

const validData = tvseries.filter(f => f.WATCH_LINK.length > 0)

const genreNavs = genres.map(m => {
  const label = typeof m === 'object' ? m.label : m
  const slug = typeof m === 'object' ? m.slug : m
  const count = slug === 'tum' ? validData.length : validData.filter(f => {

    const exists = f.GENRES.flat(1).map(m => deaccent(m).trim().toLowerCase()).includes(slug)

    return exists
  }).length
  return { ...m, count, slug, label }
})

const canidatePages = genreNavs.map((m) => {

  return {
    id: `media/${m.slug}/turk-dizileri/sayfa/1`
  }
})

function generateSiteMap(canidatePages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <!--We manually set the two URLs we know already-->
       <url>
         <loc>https://turk-dizi.glumzi.com/turk-dizi</loc>
       </url>
  
       ${canidatePages
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

const sitemap = generateSiteMap(canidatePages)

fs.writeFileSync(`${process.cwd()}/out/sitemap.xml`, sitemap)