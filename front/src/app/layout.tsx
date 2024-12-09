import type { Metadata } from "next";
import "./globals.css";
import HomeContainer from "@/components/HomeContainer/Home";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/chatbot/chatbot";
import ShowComponent from "@/components/ShowComponent/ShowComponent";
import { LogginProvider } from "@/context/logginContext";
export const metadata: Metadata = {
  title: "Hotel y Resort de Lujo",
  description: "Generated by Grupo #01 PF PT21 Henry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LogginProvider>
          <Header />

          {children}
          <Chatbot />
          <Footer />
        </LogginProvider>
      </body>
    </html>
  );
}
