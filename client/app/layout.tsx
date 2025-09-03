import type React from "react"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import '@ant-design/v5-patch-for-react-19';
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} dark`}>
      <head>
        <title>CuraX</title>
        <link rel="icon" href="/title_logo_curaX.png" type="image/png" />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
