
import SeriesList from '../../../../components/SeriesList'
import data from '../../../../../../data/aggregated-data/tvseries.json'
import { genreNavs } from '../../../../components/TopNavigation'
import deaccent from '@/app/utils/deaccent.js'
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





export async function generateStaticParams() {
    const cansitatePages = []
    debugger
    const validData = data.filter(f => f.WATCH_LINK.length > 0)


    for (let current of genreNavs) {
     const {slug}=current

        const dataTur = slug === 'tum' ? validData : validData.filter(f => {

            const exists = f.GENRES.flat(1).map(m => deaccent(m).trim().toLowerCase()).includes(slug)

            return exists
        })

        //const paginatedData = paginate(dataTur, page, 50)
        const pageCount = Math.ceil(dataTur.length / 50)
    
        const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
   
        for (let page of pages) {
            cansitatePages.push({ page, tur:slug })
        }
    }

    return cansitatePages.map(m => {
        const { page, tur } = m

        return { tur, slug: ['sayfa', page.toString()] }
    })


}




function paginate(array, page, pageSize) {
    --page; // Adjusting to zero-based index

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;

    return array.slice(startIndex, endIndex);
}