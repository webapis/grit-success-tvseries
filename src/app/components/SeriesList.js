import { Grid, Container } from "@mui/material";

import tvseries from '../../../data/aggregated-data/tvseries.json'
import Image from './Image'
import PaginationContainer from './PaginationContainer'
import TopNavigation from './TopNavigation'
import deaccent from '../utils/deaccent.js'
const data = tvseries

export default function SeriesList({ page, tur }) {
    const validData =data.filter(f=>f.WATCH_LINK.length>0)
    const dataTur = tur==='tum'? validData: validData.filter(f=>{
      
        const exists =f.GENRES.flat(1).map(m=> deaccent(m).trim().toLowerCase()).includes(tur)
 
      return exists })
    const paginatedData = paginate(dataTur, page, 50)
    const pageCount = Math.ceil(dataTur.length / 50)

    return (
        <Container>
            <TopNavigation currentSlug={tur}/>
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