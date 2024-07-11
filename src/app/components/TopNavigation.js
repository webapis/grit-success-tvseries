
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip";
import tvseries from '../../../data/aggregated-data/tvseries.json'

import deaccent from '../utils/deaccent.js'
const genres = [{ slug: "tum", label: 'tüm' }, "komedi", "aile", { slug: "cocuk", label: 'çocuk' }, "dram", "romantik", "tarih", { slug: "ask", label: 'aşk' }, "gerilim", "fantastik", "gizem", "bilim kurgu", "aksiyon", "polisiye", { slug: "suc", label: 'suç' }, " macera", "mafya", "korku", { slug: "genclik", label: 'gençlik' }]

const validData = tvseries.filter(f => f.WATCH_LINK.length > 0)

const genreNavs =   genres.map(m => {
    const label = typeof m === 'object' ? m.label : m
    const slug = typeof m === 'object' ? m.slug : m
    const count = slug === 'tum' ? validData.length : validData.filter(f => {

        const exists = f.GENRES.flat(1).map(m => deaccent(m).trim().toLowerCase()).includes(slug)

        return exists
    }).length
    return { ...m, count, slug, label }
})

export {genreNavs}
export default function TopNavigation({ currentSlug }) {

    return <Stack direction="row" spacing={1} gap={1} sx={{ display: "flex", flexFlow: 'wrap', justifyContent: 'center' }} >
        {
         genreNavs.filter(f => f.slug === 'tum' || f.count > 0).map((m, i) => {
                const { slug, label, count } = m

                return <Chip color="primary" key={i} component="a" sx={{ textTransform: 'capitalize', cursor: 'pointer' }} variant={currentSlug === slug ? 'filled' : 'outlined'} href={`/media/${slug}/turk-dizileri/sayfa/1`} label={label + " (" + count + ")"} />
            })
        }
    </Stack>
}