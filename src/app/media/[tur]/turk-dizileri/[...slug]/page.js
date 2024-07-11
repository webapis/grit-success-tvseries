import SeriesList from '../../../../components/SeriesList'

export default function MediaPage(props){
const {params:{slug,tur}}=props
const page = parseInt(slug[slug.length-1])

return <SeriesList page={page} tur={tur}/>
}