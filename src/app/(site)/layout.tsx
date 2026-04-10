import Script from "next/script";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Kitchco shared widget: WhatsApp + agente IA */}
      <Script
        src="https://agents.kitchcocenter.com/public/widget.js?v=2"
        data-brand="kulto3d"
        data-color="#10b981"
        data-popup-delay="20"
        data-agent-name="Kulto"
        data-greeting="¡Hola! Soy el agente de Kulto3D. Contame qué estás buscando y te ayudo."
        strategy="lazyOnload"
      />

      {/* Google Analytics 4 */}
      <GoogleAnalytics />
    </CartProvider>
  );
}
