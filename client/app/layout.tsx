import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { PrimeReactProvider} from 'primereact/api'
import { AuthProvider} from './_context/userContext'
import ReactQueryProvider from './_context/queryProvider'



const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 

  return (
    <ReactQueryProvider>
      <AuthProvider>
       <PrimeReactProvider>
          <html lang="en">
            <body>
               {children}
           </body>
         </html>
        </PrimeReactProvider>
      </AuthProvider>
    </ReactQueryProvider>
  )
}
