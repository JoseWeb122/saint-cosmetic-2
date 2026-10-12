import { CheckCircle2 } from "lucide-react";
import { StoreProvider, useStore } from "./store/StoreContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import QuickView from "./components/QuickView";
import BookingModal from "./components/BookingModal";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Services from "./pages/Services";
import About from "./pages/About";
import Journal from "./pages/Journal";
import Contact from "./pages/Contact";

function Toasts() {
  const { toasts, setCartOpen } = useStore();
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[95] flex w-full max-w-sm -translate-x-1/2 flex-col items-center gap-2 px-4 sm:left-auto sm:right-6 sm:translate-x-0 sm:items-end sm:px-0" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          onClick={() => setCartOpen(true)}
          className="animate-toast pointer-events-auto flex w-full items-center gap-3.5 bg-espresso px-5 py-4 text-left shadow-2xl transition-colors hover:bg-cocoa"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.75} />
          <span className="min-w-0">
            <span className="block text-[0.68rem] font-semibold tracking-[0.2em] text-gold uppercase">{toast.title}</span>
            <span className="mt-0.5 block truncate text-sm font-light text-ivory/85">{toast.message}</span>
          </span>
          <span className="ml-auto shrink-0 text-[0.62rem] font-semibold tracking-[0.2em] text-champagne uppercase">
            View Bag
          </span>
        </button>
      ))}
    </div>
  );
}

function Shell() {
  const { page } = useStore();

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main key={page} className="animate-fade-in">
        {page === "home" && <Home />}
        {page === "shop" && <Shop />}
        {page === "services" && <Services />}
        {page === "about" && <About />}
        {page === "journal" && <Journal />}
        {page === "contact" && <Contact />}
      </main>
      <Footer />
      <CartDrawer />
      <QuickView />
      <BookingModal />
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
