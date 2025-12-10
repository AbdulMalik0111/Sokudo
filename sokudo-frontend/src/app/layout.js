import Footer from './components/Footer';
import Header from './components/Header';
import './globals.css';
import { Providers } from './providers';
import FloatingUI from './components/FloatingUI';

export const metadata = {
   title: 'Sokudo Electric Scooters',
   description: 'High Speed EV Scooters in India',
};

export default function RootLayout({ children }) {
   return (
      <html lang='en'>
         <body suppressHydrationWarning={true}>
            <Providers>
               <Header />
               {children}
               <Footer />
            </Providers>
            <FloatingUI />
         </body>
      </html>
   );
}
