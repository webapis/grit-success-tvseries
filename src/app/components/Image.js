
import * as React from 'react';
import deaccent from '../utils/deaccent';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
export default function MediaControlCard({ src, title, genre, years, summary, DETAIL_LINK, KANAL, WATCH_LINK, YAPIM_SIRKETI, YAYIN_TARIHI, POSTER, currentSlug }) {


  const GENRES =genre? genre.flat().map(m => m.toLowerCase()).reduce((acc, value) => {
    if (!acc.includes(value.trim())) {
      acc.push(value.trim());
    }
    return acc;
  }, []).sort():[]

debugger
  return (
    <Card sx={{ display: 'flex' }}>
      <div style={{ display: 'flex' }}>

        <MasonryImageList itemData={removeDuplicates(POSTER).filter(f => f.POSTER_IMG)} title={title} />
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" sx={{ textTransform: "capitalize" }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <span style={{ fontWeight: "bold" }}>Yayın Tarihi:</span>{YAYIN_TARIHI[0]}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <span style={{ fontWeight: "bold" }}>Tarih:</span>{!years.includes('undefined') && years}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <span style={{ fontWeight: "bold" }}>Tür:</span>{GENRES.length > 0 && GENRES.map(m => <Chip sx={{margin:1}}  size='small' color='secondary' variant={(currentSlug === deaccent(m).trim().toLowerCase()) ? 'filled':'outlined' }   label={m}/> )  }
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <span style={{ fontWeight: "bold" }}>Yapım Şirket:</span> {YAPIM_SIRKETI.length > 0 && YAPIM_SIRKETI[0]}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" component="div">
            <span style={{ fontWeight: "bold" }}>Kanal:</span> {KANAL && KANAL[0]}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {summary.length > 0 && summary[0]}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <span style={{ fontWeight: "bold" }}>İzle:</span> {WATCH_LINK.length > 0 && WATCH_LINK.map((m, i) => {

              return <><a key={i} href={m}>{extractDomain(m)}</a> <br></br></>

            })}
          </Typography>
          <p>
            {DETAIL_LINK.map((m) => <div>{extractDomain(m)}</div>)}
          </p>
        </CardContent>

      </Box>

    </Card>
  );
}
function extractDomain(url) {
  try {
    const newUrl = new URL(url);
    return newUrl.hostname;
  } catch (err) {
    return null; // Handle invalid URLs gracefully
  }
}

function removeDuplicates(array) {
  const seen = new Set();
  return array.filter(item => {
    const duplicate = seen.has(item.POSTER_IMG);
    seen.add(item.POSTER_IMG);
    return !duplicate;
  });
}


function MasonryImageList({ itemData, title }) {
  return (
    <Box sx={{ width: 100, height: 350, overflowY: 'hidden' }}>
      <ImageList variant="masonry" cols={1} gap={2}>
        {itemData.map((item) => (
          <ImageListItem key={item.POSTER_IMG}>
            <img
              src={item.POSTER_IMG}
              alt={title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}