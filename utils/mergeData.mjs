

import fs from 'fs'
import makeDir from "make-dir";
import { createRequire } from "module";
const require = createRequire(import.meta.url);


const atv = require(`${process.cwd()}/unzipped-data/atv.json`)
// import kanal7 from '../unzipped-data/kanal7.json'  with { type: "json" }
const kanald = require(`${process.cwd()}/unzipped-data/kanald.json`)
const nowtv = require(`${process.cwd()}/unzipped-data/nowtv.json`)
const showtv = require(`${process.cwd()}/unzipped-data/showtv.json`)
const puhutv = require(`${process.cwd()}/unzipped-data/puhutv.json`)
const beyazperde = require(`${process.cwd()}/unzipped-data/beyazperde.json`)
const sinemalar = require(`${process.cwd()}/unzipped-data/sinemalar.json`)
const startv = require(`${process.cwd()}/unzipped-data/startv.json`)
const medyapim = require(`${process.cwd()}/unzipped-data/medyapim.json`)
const wikidl = require(`${process.cwd()}/unzipped-data/wikidl.json`)
const abcProductionWiki = require(`${process.cwd()}/unzipped-data/abcProductionWiki.json`)
const tableProductionWiki = require(`${process.cwd()}/unzipped-data/tableProductionWiki.json`)
const ngmedia = require(`${process.cwd()}/unzipped-data/ngmedia.json`)
const tims = require(`${process.cwd()}/unzipped-data/tims.json`)

// import trt1 from '../unzipped-data/trt1.json'  with { type: "json" }

// import deaccent from './deaccent.mjs'
// import groupBy from './groupBy.mjs'
import fields from './consts.mjs'
const initData = [...atv,
...wikidl,
...kanald,
...showtv,
...nowtv, ...startv,
...medyapim,
...puhutv,
...sinemalar,
...beyazperde,
...abcProductionWiki,
...tableProductionWiki,
...ngmedia,
...tims]
//const initData = [...puhutv]
const notFound = []

debugger
const aggregatedData = []

await makeDir('data/aggregated-data')
const exceptions = [['Ali̇ye', 'Atiye']]
for (let current of initData) {

  const TVSERIES_TITLE = current.TVSERIES_TITLE


  let currentAggData = aggregatedData.find((f) => f.TVSERIES_TITLE === TVSERIES_TITLE || areStringsSimilar(normalizeTurkish(f.TVSERIES_TITLE).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(), normalizeTurkish(TVSERIES_TITLE).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(), exceptions))

  if (currentAggData) {
//&& TVSERIES_TITLE.trim().length===currentAggData.TVSERIES_TITLE.trim().length
debugger
    for (let propName in fields) {
      const prop = current[propName]
      if (prop) {
        currentAggData[propName] = [...currentAggData[propName], prop]
      }

    }
  } else {

    currentAggData = { ...fields }
    for (let propName in fields) {
      const prop = current[propName]
      if (prop) {
        currentAggData[propName] = [...currentAggData[propName], prop]
      }

    }
    aggregatedData.push({ TVSERIES_TITLE, ...currentAggData })

  }

}
debugger
fs.writeFileSync(`${process.cwd()}/data/aggregated-data/tvseries.json`, JSON.stringify(aggregatedData))
debugger






function levenshteinDistance(a, b) {
  const matrix = [];

  // Initialize the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = [j];
  }

  // Fill the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1, // insertion
          matrix[i - 1][j] + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

function areStringsSimilar(str1, str2, maxDistance = 1, exceptions = []) {
  // Check if the pair of strings is in the exceptions list
  if (exceptions.some(pair =>
    (pair[0].toLowerCase() === str1.toLowerCase() && pair[1].toLowerCase() === str2.toLowerCase()) ||
    (pair[1].toLowerCase() === str1.toLowerCase() && pair[0].toLowerCase() === str2.toLowerCase())
  )) {
    return false;
  }

  const distance = levenshteinDistance(str1, str2);
  return distance <= maxDistance;
}

function normalizeTurkish(text) {
  return text
    .replace(/ç/g, 'c').replace(/Ç/g, 'C')
    .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
    .replace(/ı/g, 'i').replace(/I/g, 'I')
    .replace(/ö/g, 'o').replace(/Ö/g, 'O')
    .replace(/ş/g, 's').replace(/Ş/g, 'S')
    .replace(/ü/g, 'u').replace(/Ü/g, 'U');
}