import { useState, useEffect } from 'react';

export default function BookingForm() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    service_id: '',
    therapist_id: '',
    booking_date: '',
    start_time: '',
    duration_minutes: 60,
    massage_pressure: '',
    health_notes: '',
  });
  const [slots, setSlots] = useState([]);
  const [status, setStatus] = useState('idle'); // idle|loading|success|error

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then(setServices);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'service_id' || name === 'therapist_id' || name === 'booking_date') {
      fetchSlots();
    }
  };

  const fetchSlots = async () => {
    if (!form.therapist_id || !form.booking_date) return;
    setStatus('loading');
    try {
      const res = await fetch(
        `/api/slots?date=${form.booking_date}&therapistId=${form.therapist_id}&duration=${form.duration_minutes}`
      );
      const data = await res.json();
      setSlots(data.free ?? []);
      setStatus('idle');
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        // optionally reset form
      } else {
        setStatus('error');
      }
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-bold text-primary">จองคิวนวด</h2>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1 text-primary">ชื่อลูกค้า</label>
          <input
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-primary">เบอร์โทร</label>
          <input
            name="customer_phone"
            value={form.customer_phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-primary">เลือกบริการ</label>
        <select
          name="service_id"
          value={form.service_id}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">-- เลือกบริการ --</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.duration_minutes} นาที) – {s.price} บาท
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-primary">เลือกหมอนวด</label>
        <select
          name="therapist_id"
          value={form.therapist_id}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">-- เลือกหมอนวด --</option>
          {/* In real app, fetch from API; hard‑coded for demo */}
          <option value="1">คุณแจ่ม (หมอนวดชาย)</option>
          <option value="2">คุณบัว (หมอนวดหญิง)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-primary">วันที่</label>
        <input
          type="date"
          name="booking_date"
          value={form.booking_date}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-primary">เวลาเริ่มต้น</label>
        <select
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        >
          <option value="">-- เลือกเวลา --</option>
          {slots.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {status === 'loading' && (
          <p className="text-xs text-gray-500 mt-1">กำลังโหลดช่วงเวลาว่าง…</p>
        )}
        {status === 'error' && (
          <p className="text-xs text-red-600 mt-1">ไม่สามารถโหลดช่วงเวลาได้</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-primary">ระยะเวลา (นาที)</label>
        <select
          name="duration_minutes"
          value={String(form.duration_minutes)}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        >
          [60, 90, 120].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-primary">ความดันที่ต้องการ</label>
        <select
          name="massage_pressure"
          value={form.massage_pressure}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">-- ไม่ระบุ --</option>
          <option value="เบา">เบา</option>
          <option value="กลาง">กลาง</option>
          <option value="หนัก">หนัก</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-primary">หมายเหตุสุขภาพ</label>
        <textarea
          name="health_notes"
          value={form.health_notes}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          rows="3"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-md font-medium transition"
      >
        {status === 'loading' ? 'กำลังบันทึก…' : 'ยืนยันการจอง'}
      </button>

      {status === 'success' && (
        <p className="mt-2 text-green-600 font-medium">
          ✅ จองสำเร็จ! เราจะแจ้งเตือนทาง LINE หากคุณได้ตั้งค่าไว้
        </p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-red-600 font-medium">
          ❌ ไม่สามารถจองได้ กรุณาลองใหม่
        </p>
      )}
    </form>
  );
}
