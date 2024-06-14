import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar/Navbar";
import UserProvider from "@/app/context/userProvider";
import 'primereact/resources/themes/lara-light-indigo/theme.css';  //theme
import 'primereact/resources/primereact.min.css';                  //core css
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PedalStart Assignment",
  description: "Task Management Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <UserProvider>
      <Navbar/>
      {children}
      </UserProvider>
      </body>
    </html>
  );
}
