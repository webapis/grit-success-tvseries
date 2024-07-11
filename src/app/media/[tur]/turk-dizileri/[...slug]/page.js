
import SeriesList from '../../../../components/SeriesList'


export async function generateMetadata({ params }) {
    const { tur } = params
    return {
        title: `${tur} Türk dizilerini izleme için tek yerden erişim`

    }

}

export default function MediaPage(props) {
    const { params: { slug, tur } } = props
    const page = parseInt(slug[slug.length - 1])

    return <SeriesList page={page} tur={tur} />
}