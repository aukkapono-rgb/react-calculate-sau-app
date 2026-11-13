import calculate from "./../assets/calculate.png";
import CardMenu from "./../components/CardMenu";
import bmi from "./../assets/bmi.png";
import bmr from "./../assets/bmr.png";
import car from "./../assets/car.png";
import { Link } from "react-router"; // หมายเหตุ: หากใช้ React Router v6/v7 ตรวจสอบให้แน่ใจว่า import จาก "react-router" หรือ "react-router-dom" ตามเวอร์ชันที่ติดตั้ง
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      {/* เพิ่ม px-4 เพื่อไม่ให้เนื้อหาชิดขอบจอมือถือเกินไป และปรับ mt-10 md:mt-20 */}
      <div className="w-full min-h-screen flex flex-col items-center px-4 mt-10 md:mt-20">
        {/* แสดงรูป */}
        <img src={calculate} alt="calculate" className="w-24 md:w-32" />

        {/* แสดงชื่อเว็บ (เพิ่ม text-center เพื่อความสวยงามบนมือถือ) */}
        <h1 className="font-kanit text-2xl md:text-3xl font-bold mt-6 md:mt-10 text-center">
          เครื่องมือคำนวณออนไลน์
        </h1>
        <p className="font-itim text-gray-600 text-lg md:text-xl text-center mt-2">
          เลือกการคำนวณที่คุณต้องการจากรายการด้านล่าง
        </p>

        {/* แสดงปุ่ม 3 ปุ่ม: มือถือเรียงแนวตั้ง (flex-col), จอใหญ่เรียงแนวนอน (md:flex-row) และขึ้นบรรทัดใหม่ได้ถ้าจอไม่พอ (flex-wrap) */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-10 mt-10 md:mt-14 w-full max-w-5xl">
          <Link to="/bmi" className="w-full max-w-xs flex justify-center">
            <CardMenu
              showImg={bmi}
              showTitle="BMI (ดัชนีมวลกาย)"
              showDetail="คำนวณความสมดุลของน้ำหนักส่วนสูง"
            />
          </Link>

          <Link to="/bmr" className="w-full max-w-xs flex justify-center">
            <CardMenu
              showImg={bmr}
              showTitle="BMR (อัตราเผาผลาญ)"
              showDetail="คำนวณการเผาผลาญที่ร่างกายต้องการ"
            />
          </Link>

          <Link to="/car" className="w-full max-w-xs flex justify-center">
            <CardMenu
              showImg={car}
              showTitle="CAR (คำนวณเงินผ่อน)"
              showDetail="คำนวณเงินผ่อนรถยนต์-รถเครื่อง"
            />
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
