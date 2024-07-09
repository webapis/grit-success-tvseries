import { Grid, Container } from "@mui/material";

import tvseries from '../../data/aggregated-data/tvseries.json'
import Image from './components/Image'

const data = tvseries//filter((f, i) => i < 300)

export default function Home() {
  //.sort((a,b)=>b.FIRST_YEAR-a.FIRST_YEAR)
  return (
    <Container>
      <Grid container spacing={2}>
        {data.sort((a,b)=>b.FIRST_YEAR-a.FIRST_YEAR).map((m, i) => {
      console.log('i',i)
          const { TVSERIES_TITLE,POSTER , GENRES, FIRST_YEAR, LAST_YEAR,SUMMARY,WATCH_LINK,KANAL,YAPIM_SIRKETI,YAYIN_TARIHI } = m
      
          const imageSrc = POSTER.sort((a,b)=>b.POSTER_QUALITY-a.POSTER_QUALITY)[0].POSTER_IMG
          const genre = GENRES

          return (
            <Grid item key={i} xs={12}>
              <Image YAYIN_TARIHI={YAYIN_TARIHI} YAPIM_SIRKETI={YAPIM_SIRKETI} id={i} WATCH_LINK={WATCH_LINK} KANAL={KANAL} DETAIL_LINK={WATCH_LINK} src={imageSrc} alt={LAST_YEAR} title={TVSERIES_TITLE} genre={genre} years={FIRST_YEAR[0] + "-" + LAST_YEAR[0]} summary={SUMMARY} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  );
}