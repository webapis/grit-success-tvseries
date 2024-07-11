import { Grid, Container, Typography } from "@mui/material";

import tvseries from '../../../data/aggregated-data/tvseries.json'
import Image from './Image'
import PaginationContainer from './PaginationContainer'
import TopNavigation from './TopNavigation'
import deaccent from '../utils/deaccent.js'
const data = tvseries


const validData =data.filter(f=>f.WATCH_LINK.length>0)


export default function SeriesList({ page, tur }) {
  
    const dataTur = tur==='tum'? validData: validData.filter(f=>{
      
        const exists =f.GENRES.flat(1).map(m=> deaccent(m).trim().toLowerCase()).includes(tur)
 
      return exists })
      
    const paginatedData = paginate(dataTur, page, 50)
    const pageCount = Math.ceil(dataTur.length / 50)
    const genres = [{ slug: "tum", label: 'tüm' }, "komedi", "aile", { slug: "cocuk", label: 'çocuk' }, "dram", "romantik", "tarih", { slug: "ask", label: 'aşk' }, "gerilim", "fantastik", "gizem", "bilim kurgu", "aksiyon", "polisiye", { slug: "suc", label: 'suç' }, " macera", "mafya", "korku", { slug: "genclik", label: 'gençlik' }]

    return (
        <Container>
            <div sx={{display:'flex'}}>
            <Typography textAlign="center" variant="h4">Türk Dizileri</Typography>
            </div>
        
            <TopNavigation currentSlug={tur}/>
            <div>Toplam {dataTur.length} dizi bulundu</div>
            <Grid container spacing={2}>
                {paginatedData.sort((a, b) => b.FIRST_YEAR - a.FIRST_YEAR).map((m, i) => {
                    console.log('i', i)
                    const { TVSERIES_TITLE, POSTER, GENRES, FIRST_YEAR, LAST_YEAR, SUMMARY, WATCH_LINK, KANAL, YAPIM_SIRKETI, YAYIN_TARIHI } = m
                    const imageSrc = POSTER.sort((a, b) => b.POSTER_QUALITY - a.POSTER_QUALITY)[0].POSTER_IMG
                    const genre = GENRES
                    return (
                        <Grid item key={i} xs={12}>
                            <Image currentSlug={tur} POSTER={POSTER} YAYIN_TARIHI={YAYIN_TARIHI} YAPIM_SIRKETI={YAPIM_SIRKETI} id={i} WATCH_LINK={WATCH_LINK} KANAL={KANAL} DETAIL_LINK={WATCH_LINK} src={imageSrc} alt={LAST_YEAR} title={TVSERIES_TITLE} genre={genre} years={FIRST_YEAR[0] + "-" + LAST_YEAR[0]} summary={SUMMARY} />
                        </Grid>
                    )
                })}
            </Grid>
            <PaginationContainer count={pageCount} page={page} url={`/media/${tur}/turk-dizileri/sayfa/`} />
        </Container>
    );
}



function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }