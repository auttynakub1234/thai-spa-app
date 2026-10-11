import { useEffect, useState } from 'react';

export default function TreatmentList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => setServices(data))
      .catch((err) => {
        console.error(err);
        // fallback mock data
        setServices([
          { id: 1, name: 'นวดแผนไทย', description: 'นวดกดจุด เส้นสมุนไพร', duration_minutes: 60, price: 500, category: 'Thai Massage' },
          { id: 2, name: 'นวดอโรมา', description: 'นวดน้ำมันหอมระเหย ผ่อนคลาย', duration_minutes: 90, price: 800, category: 'Aroma Oil' },
          { id: 3, name: 'นวดประคบสมุนไพร', description: 'นวดร้อนด้วยลูกประคบสมุนไพร', duration_minutes: 120, price: 1200, category: 'Herbal' },
        ]);
      });
  }, []);

  return (
    <section id="treatments" className="py-12 bg-base">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary mb-6">บริการนวดของเรา</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
              <h3 className="flex-1 text-primary">{s.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{s.description}</p>
              <div className="mt-auto">
                <span className="text-accent font-medium">{s.price} บาท</span>
                <span className="ml-2 text-xs text-gray-500">({s.duration_minutes} นาที)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
