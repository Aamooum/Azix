import '@styles/globals.css'
import Navbar from "@components/Navbar";

import { CookiesProvider } from 'next-client-cookies/server';

export const metadata = {
    title: "Azix",
    description : "Ecommerce website"
}
const RootLayout = async({children }) => {
  return (
    <html lang='eng'>
      <body>
        <main className='app'>
          <Navbar />
          <CookiesProvider>
            {children}
          </CookiesProvider>
        </main>
      </body>
    </html>
  )
}

export default RootLayout