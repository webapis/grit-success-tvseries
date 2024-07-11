
import Stack from "@mui/material/Stack"
import Chip from "@mui/material/Chip";

const genres = ["komedi", "aile", { slug: "cocuk", label: 'çocuk' }, "dram", "romantik", "tarih", { slug: "ask", label: 'aşk' }, "gerilim", "fantastik", "gizem", "bilim kurgu", "aksiyon", "polisiye", { slug: "suc", label: 'suç' }, " macera", "mafya", "korku", { slug: "genclik", label: 'gençlik' }]
export default function TopNavigation({ currentSlug }) {

    return <Stack direction="row" spacing={1} gap={1} sx={{ display: "flex", flexFlow: 'wrap', justifyContent: 'center' }} >
        {
            genres.map((m, i) => {
                const label = typeof m === 'object' ? m.label : m
                const slug = typeof m === 'object' ? m.slug : m
                return <Chip color="primary" key={i} component="a" sx={{ textTransform: 'capitalize', cursor: 'pointer' }} variant={ currentSlug=== slug ? 'filled' : 'outlined'} href = {`/media/${slug}/turk-dizileri/sayfa/1`} label={label} />
        })
    }
    </Stack>
}