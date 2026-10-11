export default function Hero() {
  return (
    <section className="bg-base bg-[url('/images/hero.jpg')] bg-center bg-cover min-h-[60vh] flex items-center">
      <div className="max-w-4xl mx-auto px-4 text-center text-primary">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">สปาไทยระดับลักซ์ชัวรี่</h1>
        <p className="text-lg mb-6">ผ่อนคลายกับการนวดแผนไทยต้นตำรับ บรรยากาศหรูหราใจกลางกรุงเทพ</p>
        <a href="#treatments" className="bg-accent hover:bg-primary/80 text-white px-6 py-3 rounded-md transition">ดูบริการ</a>
      </div>
    </section>
  );
}
