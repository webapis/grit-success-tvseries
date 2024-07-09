import fs from 'fs'
import atv from '../unzipped-data/atv.json'  with { type: "json" }
import kanal7 from '../unzipped-data/kanal7.json'  with { type: "json" }
import kanald from '../unzipped-data/kanald.json'  with { type: "json" }
import nowtv from '../unzipped-data/nowtv.json'  with { type: "json" }
import showtv from '../unzipped-data/showtv.json'  with { type: "json" }
import startv from '../unzipped-data/startv.json'  with { type: "json" }
import trt1 from '../unzipped-data/trt1.json'  with { type: "json" }
import medyapim from '../unzipped-data/medyapim.json'  with { type: "json" }
import wikidl from '../unzipped-data/wikidl.json'  with { type: "json" }
import deaccent from './deaccent.mjs'
import groupBy from './groupBy.mjs'

const initData = [...atv, ...kanal7, ...kanald, ...nowtv, ...showtv, ...startv, ...trt1, ...medyapim]
const notFound = []

const mapData = initData.map(m => {
    return { ...m, title: m.dizi.title }
})

const groupedByTitle = Object.entries(groupBy(mapData, "title"))



debugger

const aggregatedData = []
for (let c of groupedByTitle) {
    const title = c[0]
    const streamers = c[1]
    const wiki = wikidl.find(f => deaccent(f.dizi.title).toLocaleLowerCase() === deaccent(title).toLocaleLowerCase().trim())
    const oyuncu = []
    const links = []
    const kapak = []
    const wikiLink = []
    const format = []
    const genre = []
    const projeTasarimci = []
    const senarist = []
    const oyku = []
    const yonetmen = []
    const basrol = []
    const temaMuzigiBesteci = []
    const besteci = []
    const ulke = []
    const dili = []
    const sezonSayisi = []
    const bolumSayisi = []
    const yapimci = []
    const mekan = []
    const goruntuYonetmeni = []
    const gosterimSuresi = []
    const yapimSirketi = []
    const kanal = []
    const goruntuFormati = []
    const sesFormati = []
    const yayinTarihi = []
    const durum = []



    if (wiki) {
        try {
        

            wikiLink.push(wiki.dizi.detailHref)
            format.push(wiki.bilgiler?.find(f => f.title === 'Format')?.value)
            genre.push(wiki.bilgiler?.find(f => f.title === 'Tür')?.value)
            projeTasarimci.push(wiki.bilgiler?.find(f => f.title === 'Proje tasarımcısı')?.value)
            senarist.push(wiki.bilgiler?.find(f => f.title === 'Senarist')?.value)
            oyku.push(wiki.bilgiler?.find(f => f.title === 'Öykü')?.value)
            yonetmen.push(wiki.bilgiler?.find(f => f.title === 'Yönetmen')?.value)
            basrol.push(wiki.bilgiler?.find(f => f.title === 'Başrol')?.value)
            temaMuzigiBesteci.push(wiki.bilgiler?.find(f => f.title === 'Tema müziği bestecisi')?.value)
            besteci.push(wiki.bilgiler?.find(f => f.title === 'Besteci')?.value)
            ulke.push(wiki.bilgiler?.find(f => f.title === 'Ülke')?.value)
            dili.push(wiki.bilgiler?.find(f => f.title === 'Dili')?.value)
            sezonSayisi.push(wiki.bilgiler?.find(f => f.title === 'Sezon sayısı')?.value)
            bolumSayisi.push(wiki.bilgiler?.find(f => f.title === 'Bölüm sayısı')?.value)
            yapimci.push(wiki.bilgiler?.find(f => f.title === 'Yapımcı')?.value)
            mekan.push(wiki.bilgiler?.find(f => f.title === 'Mekân')?.value)
            goruntuYonetmeni.push(wiki.bilgiler?.find(f => f.title === 'Görüntü yönetmeni')?.value)
            gosterimSuresi.push(wiki.bilgiler?.find(f => f.title === 'Gösterim süresi')?.value)
            yapimSirketi.push(wiki.bilgiler?.find(f => f.title === 'Yapım şirketi')?.value)
            kanal.push(wiki.bilgiler?.find(f => f.title === 'Kanal')?.value)
            goruntuFormati.push(wiki.bilgiler?.find(f => f.title === 'Görüntü formatı')?.value)
            sesFormati.push(wiki.bilgiler?.find(f => f.title === 'Ses formatı')?.value)
            yayinTarihi.push(wiki.bilgiler?.find(f => f.title === 'Yayın tarihi')?.value)
            if(wiki.bilgiler?.image){
                debugger
            }
            durum.push(wiki.bilgiler?.find(f => f.title === 'Durumu')?.value)
            kapak.unshift(wiki.bilgiler?.image)
        } catch (error) {
            console.log('wikidl', error)
        }

    }
    for (let s of streamers) {
        if (s.oyuncular.length > 0) {
            oyuncu.push(s.oyuncular)
        }

        links.push(s.dizi.detailHref)
        kapak.push(s.dizi.img)


    }
    aggregatedData.push({
        title, oyuncu, links, 
        kapak: kapak.filter(f => f),
        wikiLink: wikiLink.filter(f => f),
        format: format.filter(f => f),
        genre: genre.filter(f => f),
        projeTasarimci: projeTasarimci.filter(f => f),
        senarist: senarist.filter(f => f),
        oyku: oyku.filter(f => f),
        yonetmen: yonetmen.filter(f => f),
        basrol: basrol.filter(f => f),
        temaMuzigiBesteci: temaMuzigiBesteci.filter(f => f),
        besteci: besteci.filter(f => f),
        ulke: ulke.filter(f => f),
        dili: dili.filter(f => f),
        sezonSayisi: sezonSayisi.filter(f => f),
        bolumSayisi: bolumSayisi.filter(f => f),
        yapimci: yapimci.filter(f => f),
        mekan: mekan.filter(f => f),
        goruntuYonetmeni: goruntuYonetmeni.filter(f => f),
        gosterimSuresi: gosterimSuresi.filter(f => f),
        yapimSirketi: yapimSirketi.filter(f => f),
        kanal: kanal.filter(f => f),
        goruntuFormati: goruntuFormati.filter(f => f),
        sesFormati: sesFormati.filter(f => f),
        yayinTarihi: yayinTarihi.filter(f => f),
        durum: durum.filter(f => f)
    })
}
debugger
const mappedData = initData.map(m => {
    const title = deaccent(m.dizi.title).toLocaleLowerCase().trim()

    const result = wikidl.find(f => deaccent(f.dizi.title).toLocaleLowerCase() === title)

    if (result) {

        return { dizibilgiler: result.bilgiler, diziWikiRef: result.dizi.detailHref, ...m, title: result.dizi.title }

    } else {

        notFound.push(m)

        return { ...m, title: m.dizi.title }

    }


})




// fs.writeFileSync(`${process.cwd()}/data/aggregated-data/tvseries.json`,JSON.stringify(groupedByTitle))
// fs.writeFileSync(`${process.cwd()}/data/aggregated-data/tvseries-uncomlete.json`,JSON.stringify({notFound}))
// debugger


