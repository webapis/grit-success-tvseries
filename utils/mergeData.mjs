import fs from 'fs'
import atv from '../unzipped-data/atv.json'  with { type: "json" }
// import kanal7 from '../unzipped-data/kanal7.json'  with { type: "json" }
import kanald from '../unzipped-data/kanald.json'  with { type: "json" }
import nowtv from '../unzipped-data/nowtv.json'  with { type: "json" }
import showtv from '../unzipped-data/showtv.json'  with { type: "json" }
import sinemalar from '../unzipped-data/sinemalar.json'  with { type: "json" }
import puhutv from '../unzipped-data/puhutv.json'  with { type: "json" }
import beyazperde from '../unzipped-data/beyazperde.json'  with { type: "json" }
import startv from '../unzipped-data/startv.json'  with { type: "json" }
// import trt1 from '../unzipped-data/trt1.json'  with { type: "json" }
import medyapim from '../unzipped-data/medyapim.json'  with { type: "json" }
import wikidl from '../unzipped-data/wikidl.json'  with { type: "json" }
import abcProductionWiki from '../unzipped-data/abcProductionWiki.json'  with { type: "json" }
import tableProductionWiki from '../unzipped-data/tableProductionWiki.json'  with { type: "json" }
import ngmedia from '../unzipped-data/tims.json'  with { type: "json" }
import tims from '../unzipped-data/ngmedia.json'  with { type: "json" }
import deaccent from './deaccent.mjs'
import groupBy from './groupBy.mjs'
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



for (let current of initData) {

  const TVSERIES_TITLE = current.TVSERIES_TITLE

   let currentAggData = aggregatedData.find((f) =>f.TVSERIES_TITLE===TVSERIES_TITLE || areStringsSimilar(normalizeTurkish(f.TVSERIES_TITLE).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(),normalizeTurkish(TVSERIES_TITLE).normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()))
  
  if (currentAggData) {


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

function areStringsSimilar(str1, str2, maxDistance = 1) {
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