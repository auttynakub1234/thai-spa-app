import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TreatmentList from '../components/TreatmentList';
import BookingForm from '../components/BookingForm';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TreatmentList />
        <section className="py-12 bg-base">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary mb-6">จองคิวทันที</h2>
            <BookingForm />
          </div>
        </section>
      </main>
    </>
  );
}
