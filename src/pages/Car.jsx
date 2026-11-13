import { useState } from "react";
import carImg from "../assets/car.png";
import { Link } from "react-router";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

export default function Car() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [downPaymentPercent, setDownPaymentPercent] = useState("15");
  const [months, setMonths] = useState("24");
  const [installmentPerMonth, setInstallmentPerMonth] = useState("0.00");

  const calculateInstallment = (e) => {
    e.preventDefault();
    const carPrice = parseFloat(price);
    const interest = parseFloat(interestRate);
    const downPercent = parseFloat(downPaymentPercent);
    const totalMonths = parseInt(months);

    // ตรวจสอบว่าป้อนข้อมูลครบถ้วนและถูกต้องหรือไม่ (ชื่อไม่ว่าง, ราคารถ > 0, ดอกเบี้ย >= 0)
    if (
      name.trim() !== "" &&
      price !== "" &&
      interestRate !== "" &&
      carPrice > 0 &&
      interest >= 0 &&
      totalMonths > 0
    ) {
      // 1. คำนวณเงินดาวน์ และยอดจัดไฟแนนซ์
      const downPaymentAmount = carPrice * (downPercent / 100);
      const financeAmount = carPrice - downPaymentAmount;

      // 2. คำนวณดอกเบี้ยทั้งหมด (ยอดจัด x อัตราดอกเบี้ยปี % x จำนวนปีที่ผ่อน)
      const years = totalMonths / 12;
      const totalInterest = financeAmount * (interest / 100) * years;

      // 3. คำนวณยอดรวมทั้งหมดที่ต้องผ่อน
      const totalAmount = financeAmount + totalInterest;

      // 4. คำนวณค่างวดต่อเดือน
      const monthlyPayment = totalAmount / totalMonths;

      setInstallmentPerMonth(
        monthlyPayment.toLocaleString("th-TH", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    } else {
      // แจ้งเตือนด้วย SweetAlert2 เมื่อกรอกข้อมูลไม่ครบหรือค่าไม่ถูกต้อง
      Swal.fire({
        icon: "warning",
        title: "คำเตือน",
        text: "กรุณาป้อนชื่อผู้คำนวณ ราคารถ และดอกเบี้ยต่อปีให้ครบเด้อ..ซิบอกให้",
        confirmButtonText: "ตกลง",
      });
      return;
    }
  };

  const handleReset = () => {
    setName("");
    setPrice("");
    setInterestRate("");
    setDownPaymentPercent("15");
    setMonths("24");
    setInstallmentPerMonth("0.00");
  };

  return (
    <>
      <div className="w-[90%] md:w-[45%] lg:w-[40%] border border-gray-200 rounded-2xl shadow-xl mt-10 mb-10 mx-auto flex flex-col items-center p-6 md:p-10 bg-white">
        <p className="font-kanit font-bold text-2xl text-gray-800">Car Installment Calculator</p>
        <p className="font-kanit font-bold text-gray-400 text-sm mt-1">คำนวณ Car Installment</p>

        {/* รูปภาพรถ */}
        <img src={carImg} alt="Car" className="w-28 mt-4" />

        {/* ฟอร์มรับข้อมูล */}
        <form onSubmit={calculateInstallment} className="w-full mt-6 flex flex-col">
          {/* ชื่อผู้คำนวณ */}
          <label className="font-kanit text-xs text-gray-500 mb-1">ชื่อผู้คำนวณ</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-blue-500"
          />

          {/* ราคารถ (บาท) */}
          <label className="font-kanit text-xs text-gray-500 mt-3 mb-1">ราคารถ (บาท)</label>
          <input
            type="number"
            step="any"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-blue-500"
          />

          {/* ดอกเบี้ยต่อปี (%) */}
          <label className="font-kanit text-xs text-gray-500 mt-3 mb-1">ดอกเบี้ยต่อปี (%)</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-blue-500"
          />

          {/* เงินดาวน์ (%) */}
          <label className="font-kanit text-xs text-gray-500 mt-3 mb-1">เงินดาวน์ (%)</label>
          <div className="w-full flex flex-wrap justify-between gap-2 font-kanit text-xs text-gray-700 bg-gray-50 p-2.5 rounded-md border border-gray-200">
            {["15", "20", "25", "30", "35"].map((percent) => (
              <label key={percent} className="flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="downPayment"
                  value={percent}
                  checked={downPaymentPercent === percent}
                  onChange={(e) => setDownPaymentPercent(e.target.value)}
                />
                {percent}%
              </label>
            ))}
          </div>

          {/* จำนวนเดือนที่ผ่อน (Dropdown) */}
          <label className="font-kanit text-xs text-gray-500 mt-3 mb-1">จำนวนเดือนที่ผ่อน</label>
          <select
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:border-blue-500 font-kanit bg-white"
          >
            <option value="24">24 เดือน</option>
            <option value="36">36 เดือน</option>
            <option value="48">48 เดือน</option>
            <option value="60">60 เดือน</option>
            <option value="72">72 เดือน</option>
            <option value="84">84 เดือน</option>
          </select>

          {/* ปุ่มคำนวณ และ ล้างข้อมูล */}
          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-kanit text-sm font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
            >
              คำนวณ
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-kanit text-sm font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
            >
              ล้างข้อมูล
            </button>
          </div>
        </form>

        {/* ผลลัพธ์ */}
        <div className="flex justify-center items-center gap-2 mt-5 font-kanit">
          <span className="font-bold text-gray-700 text-sm">ผ่อนชำระต่อเดือน:</span>
          <span className="font-bold text-blue-600 text-sm">{installmentPerMonth} บาท</span>
        </div>

        {/* ลิงก์กลับหน้าหลัก */}
        <Link
          to="/"
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-kanit font-semibold text-xs text-center py-2 rounded-md mt-4 transition duration-200"
        >
          กลับหน้าหลัก
        </Link>

        {/* แสดงส่วน Footer */}
        <Footer />
      </div>
    </>
  );
}
