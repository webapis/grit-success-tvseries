'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MediaControlCard({ src, title, genre, years, summary, DETAIL_LINK, KANAL, WATCH_LINK, YAPIM_SIRKETI,YAYIN_TARIHI }) {
  const theme = useTheme();
  try {
    genre.map(m => m)
  } catch (error) {
    console.log('error--', genre, title)
  }
  return (
    <Card sx={{ display: 'flex' }}>
      <img
        component="img"
        style={{ width: 200, height: 400, objectFit: 'contain' }}
        src={src}
        alt={title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" sx={{ textTransform: "capitalize" }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <span style={{ fontWeight: "bold" }}>Yayın Tarihi:</span>{YAYIN_TARIHI}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <span style={{ fontWeight: "bold" }}>Tarih:</span>{!years.includes('undefined') && years}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <span style={{ fontWeight: "bold" }}>Tür:</span>{genre.length > 0 && genre.flat().reduce((acc, value) => {
              if (!acc.includes(value.trim())) {
                acc.push(value.trim());
              }
              return acc;
            }, []).join(', ') }
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