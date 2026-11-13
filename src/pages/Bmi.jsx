import { useState } from "react";
import { Link } from "react-router"; // หากใช้ React Router v6 ให้ใช้ "react-router-dom" แต่ถ้าเป็น v7 ใช้ "react-router" ได้เลยครับ
import bmi from "./../assets/bmi.png";

export default function Bmi() {
  // 1. สร้าง State สำหรับเก็บค่าจากฟอร์มและผลลัพธ์
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBmiResult] = useState("0.00");

  // 2. ฟังก์ชันคำนวณ BMI
  const handleCalculate = (e) => {
    e.preventDefault(); // ป้องกันหน้าเว็บรีเฟรชเมื่อกดปุ่ม submit

    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // แปลงเซนติเมตรเป็นเมตร

    if (!w || !h || w <= 0 || h <= 0) {
      alert("กรุณาป้อนน้ำหนักและส่วนสูงให้ถูกต้อง");
      return;
    }

    const result = w / (h * h);
    setBmiResult(result.toFixed(2)); // แสดงทศนิยม 2 ตำแหน่ง
  };

  // 3. ฟังก์ชันรีเซ็ตค่าทั้งหมด
  const handleReset = () => {
    setWeight("");
    setHeight("");
    setBmiResult("0.00");
  };

  return (
    <>
      {/* ปรับ w-[90%] md:w-[50%] เพื่อให้บนมือถือไม่บีบแคบเกินไป และคง 50% บน PC ตามเดิม */}
      <div
        className="w-[90%] md:w-[50%] border border-gray-200 rounded-2xl
                   shadow-xl mt-10 md:mt-20 mb-10 mx-auto flex flex-col
                   items-center p-6 md:p-10"
      >
        {/* แสดงรูปและชื่อหน้าจอ */}
        <p className="font-kanit font-bold text-2xl">
          BMI Calculator
        </p>
        <p className="font-kanit font-bold text-gray-500">
          คำนวณ BMI
        </p>
        <img src={bmi} alt="BMI" className="w-20 mt-5" />

        {/* ส่วนของฟอร์ม สำหรับป้อน เลือก คลิก */}
        <form onSubmit={handleCalculate} className="w-full mt-10 flex flex-col">
          <label htmlFor="weight" className="font-kanit">
            ป้อนน้ำหนัก (กิโลกรัม)
          </label>
          <input
            type="number"
            step="any"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="เช่น 65"
            className="border border-gray-300 p-2 rounded-md
                       placeholder:font-kanit font-kanit"
          />

          <label htmlFor="height" className="font-kanit mt-3">
            ป้อนส่วนสูง (เซนติเมตร)
          </label>
          <input
            type="number"
            step="any"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="เช่น 170"
            className="border border-gray-300 p-2 rounded-md
                       placeholder:font-kanit font-kanit"
          />

          {/* ระบุ type="submit" ให้ชัดเจน */}
          <button
            type="submit"
            className="w-full bg-blue-600 mt-5 p-2 rounded-md
                       text-white font-kanit font-bold cursor-pointer
                       hover:bg-blue-800"
          >
            คำนวณ BMI
          </button>

          {/* ระบุ type="button" เพื่อไม่ให้ไป trigger การ submit ของ form */}
          <button
            type="button"
            onClick={handleReset}
            className="w-full bg-gray-400 mt-3 p-2 rounded-md
                       text-black font-kanit font-bold cursor-pointer
                       hover:bg-gray-500"
          >
            รีเซ็ต
          </button>
        </form>

        {/* ส่วนแสดงผล */}
        <div className="flex justify-center gap-3 mt-5">
          <p className="font-kanit font-bold">
            ค่า BMI ที่คำนวณได้ :
          </p>
          <p className="font-kanit font-bold text-blue-600">
            {bmiResult}
          </p>
        </div>

        {/* ส่วนลิงค์กลับไปหน้าหลัก */}
        <Link
          to="/"
          className="w-full bg-gray-400 mt-3 p-2 rounded-md
                     text-black font-kanit font-bold text-center
                     hover:bg-gray-500"
        >
          กลับหน้าหลัก
        </Link>
      </div>
      {/* แสดงส่วน Footer */}
        <div className="mt-12 mb-6">
          <Footer />
        </div>
      </div>
    </>
  );
}
