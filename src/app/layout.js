import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',  
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],  
  variable: '--font-poppins',  
})

export const metadata = {
  title: 'Anatomy Visualizer',
  description: 'Explore the human mouth in 3D',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans bg-background`}>
        {children}
      </body>
    </html>
  )
}