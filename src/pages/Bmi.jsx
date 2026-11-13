import { Link } from "react-router"
import bmi from "./../assets/bmi.png"
import Footer from "../components/Footer"
import { useState } from "react"
import Swal from "sweetalert2"
 
export default function Bmi() {
  // สร้าง state สำหรับเก็บค่าที่ป้อนเข้ามา
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiValue, setBmiValue] = useState('0.00');

  // ฟังก์ชันสำหรับคำนวณค่า BMI
  const handleBMIClick= (e) => {
    e.preventDefault();
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height) / 100; // แปลงจากเซนติเมตรเป็นเมตร

    if (weight !== "" && height !== "") { // ใส่ ออ ได้ && คือ และ ต้องไม่เป็นค่าว่าง
      //alerrt ไม่สวยงาม
      const bmiValue = weightValue / (heightValue * heightValue);
      setBmiValue(bmiValue.toFixed(2));
    } else {
      Swal.fire({
        icon: "warning",
        title: "คำเตือน",
        text: "กรุณาป้อนข้อมูลน้ำหนักและส่วนสูงให้ครบถ้วนนะ..ซิบอกให้",
        confirmButtonText: "ตกลง",
      });
      return;// อย่าลืม return เพื่อหยุดการทำงานของฟังก์ชัน
    }
  };

  // ฟังก์ชันสำหรับรีเซ็ตฟอร์ม
  const handleResetClick = () => {
    setWeight("");
    setHeight("");
    setBmiValue('0.00');
  };

  return (
    <>
      <div className="w-[50%] border border-gray-200 rounded-2xl
                      shadow-xl mt-20 mx-auto flex flex-col
                      items-center p-10">
        {/* แสดงรูปและชื่อหน้าจอ */}
        <p className="font-kanit font-bold text-2xl">
          BMI Calculator
        </p>
        <p className="font-kanit font-bold text-gray-500">
          คำนวณ BMI
        </p>
        <img src={bmi} alt="BMI" className="w-20 mt-5" />
 
        {/* ส่วนของฟอร์ม สำหรับป้อน เลือก คลิก */}
        <form className="w-full mt-10 flex flex-col">
          <label className="font-kanit">ป้อนน้ำหนัก (กิโลกร้ม)</label>
          <input type="number" name="" id="" placeholder="เช่น 65"
                value={weight} onChange={(e) => setWeight(e.target.value)}
                 className="border border-gray-300 p-2 rounded-md
                            placeholder:font-kanit" />
 
          <label className="font-kanit mt-3">ป้อนส่วนสูง (เซนติเมตร)</label>
          <input type="number" name="" id="" placeholder="เช่น 170"
                value={height} onChange={(e) => setHeight(e.target.value)}
                 className="border border-gray-300 p-2 rounded-md
                            placeholder:font-kanit" />
         
          <button onClick={handleBMIClick}
          className="w-full bg-blue-600 mt-5 p-2 rounded-md
                            text-white font-kanit font-bold cursor-pointer
                            hover:bg-blue-800">
            คำนวณ BMI
          </button> onClick={handleResetClick}
          <button className="w-full bg-gray-400 mt-3 p-2 rounded-md
                            text-black font-kanit font-bold cursor-pointer
                            hover:bg-gray-500">
            รีเซ็ต
          </button>
        </form>
 
        {/* ส่วนแสดงผล */}
        <div className="flex justify-center gap-3 mt-5">
          <p className="font-kanit font-bold">
            ค่า BMI ที่คำนวณได้ :
          </p>
          <p className="font-kanit font-bold text-blue-600">
            {bmiValue}
          </p>
        </div>
 
        {/* ส่วนลิงค์กลับไปหน้าหลัก */}
        <Link to="/" className="w-full bg-gray-400 mt-3 p-2 rounded-md
                              text-black font-kanit font-bold text-center
                              hover:bg-gray-500">
          กลับหน้าหลัก
        </Link>

        {/* แสดงส่วน Footer */}
        <Footer />
      </div>

    </>
  )
}
