import SeriesList from './components/SeriesList'


export const metadata = {
  title: 'Türk dizilerini izle: komedi, aile, çocuk, dram, romantik, aşk, gerilim, fantastik, gizem, bilim kurgu, aksiyon, polisiye, suç, gençlik, korku',
  description: 'Tüm türk dizilerine tek yerden erişim',
}

export default function Home() {


  return <SeriesList page={1} tur="tum"/>
}


