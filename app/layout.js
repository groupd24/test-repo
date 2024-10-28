import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        <title>KwaMai Eatery</title>
        <link rel="icon" href="/Kwa.png" />

        {/* Main Meta Tags */}
    

        <meta name="description" content="This is the official recipe website of KwaMai Eatery" />
        <meta
          name="keywords"
          content="Food, recipe, dinner, lunch, snack, ingredients, kwamai, eatery "
        />
        <meta name="author" content="Codespace" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="KwaMai Eatery" />
        <meta property="og:description" content="This is the official recipe website of KwaMai Eatery" />
        <meta property="og:image" content="/kwaMai.jpg" />
        <meta property="og:url" content="To be added when app is launched" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="KwaMai Eatery" />
        <meta name="twitter:description" content="This is the official recipe website of KwaMai Eatery" />
        <meta name="twitter:image" content="/kwaMai.jpg" />

      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // Applying custom fonts and antialiasing for better text rendering
      >
        <Header /> {/* Rendering the Header component */}
        {children} {/* Rendering the child components or pages */}
       
      </body>
    </html>
  );
}
