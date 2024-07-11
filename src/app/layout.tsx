
import Footer from './components/Footer'
import PersistentDrawer from './components/Drawler'
import { genreNavs } from './components/TopNavigation'



const sideNavData = genreNavs.map((m => { return { ...m, title: m.label+" ("+m.count+")", href: `/media/${m.slug}/turk-dizileri/sayfa/1` } }))
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PersistentDrawer data={ sideNavData} title="Dizi Türleri">
          {children}
        </PersistentDrawer>
        <Footer />
      </body>

    </html>
  )
}
