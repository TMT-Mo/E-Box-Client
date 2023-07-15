import React from "react";
import likeIcon from "@/assets/like (1).png";
import teamIcon from "@/assets/team.png";
import clockIcon from "@/assets/clock (1).png";
import descriptionIcon from "@/assets/description.jpg";
import classes from './style.module.css'
import vluIcon from '@/assets/u48.png'
import introVideo from '@/assets/video_background.mp4'
import { Link } from "react-router-dom";
import Footer from "@/components/Layout/General/Footer";

function Introduction() {
  
  return (
    <div className="snap-y">
        <section id="Introduction">
      <div className={`relative min-w-full min-h-fit z-0 container mx-auto`}>
        <video
          className="hidden min-w-full min-h-full md:block"
          src={introVideo}
          autoPlay
          playsInline
          muted
          loop
        ></video>
        {/* <img alt='' src={universityIcon} className="bg-cover md:hidden"/> */}
        <div className={`${classes.bannerBg} relative md:hidden`}/>
        <div
          className={`${classes.model} min-w-full min-h-full absolute top-0`}
        ></div>
        <div className="absolute flex flex-col w-full p-4 space-y-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center items-center sm:p-20 md:max-w-4xl sm:max-w-xl">
      <img src={vluIcon} alt="" className="w-10" />
      <h1 className="text-white font-bold text-xl  md:text-4xl">
        Xin chào, Tôi là hộp thư góp ý Khoa CNTT
      </h1>
      <h3 className="text-white text-sm md:text-xl">
        Nếu bạn cần đặt câu hỏi hoặc tham khảo các vấn đề xảy ra, bạn có thể
        đăng nhập ngay để được hỗ trợ!
      </h3>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className={classes.downArrow}
      >
        <path
          fill="#fff"
          d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"
        ></path>
      </svg>
      <Link
        className="bg-black text-white py-4 px-8 font-bold rounded-md hover:bg-white hover:text-black transition"
        to='/login'
      >Đăng Nhập</Link>
    </div>
      </div>
    </section>
      {/* <IntroductionBanner className='snap-center'>
        <IntroContent />
      </IntroductionBanner> */}
      <section id="services">
        <div className="container mx-auto snap-center flex flex-col relative items-center min-w-full p-0 mb-20 space-y-6">
          <div className="flex flex-col space-y-6 mx-auto text-center text-white z-10">
            <h1 className="font-semibold">DỊCH VỤ</h1>
            <h1 className="font-bold text-2xl max-w-md">
              Luôn mang đến cho sinh viên nhiều lợi ích khác nhau
            </h1>
          </div>
          <div className="flex flex-col px-6 space-y-6 py-10 w-full items-center z-10 lg:flex-row lg:space-y-0 lg:justify-center lg:space-x-16">
            <div className="flex flex-col space-y-6 text-black bg-gray-200 max-w-xl items-center py-14 px-12 rounded-xl drop-shadow-lg lg:h-80 lg:w-80">
              <img alt="" src={teamIcon} className="w-10" />
              <h1 className="font-bold text-center">LUÔN SẴN LÒNG HỖ TRỢ</h1>
              <h1>
                Luôn có đội ngũ nhân viên có năng lực sẵn sàng hỗ trợ trả lời
                câu hỏi
              </h1>
            </div>
            <div className="flex flex-col space-y-6 text-black bg-gray-200 max-w-xl items-center py-14 px-6 rounded-xl drop-shadow-lg lg:h-80 lg:w-80">
              <img alt="" src={clockIcon} className="w-10" />
              <h1 className="font-bold text-center">
                Ở BẤT CỨ ĐÂU, BẤT KỲ LÚC NÀO
              </h1>
              <h1>
                Hộp thư góp ý khoa CNTT là nơi lưu trữ câu hỏi trực tuyến mà
                sinh viên đặt ra, có thể hỗ trợ bạn ở bất cứ đâu và vào bất cứ
                lúc nào.
              </h1>
            </div>
            <div className="flex flex-col space-y-6 text-black bg-gray-200 max-w-xl items-center py-14 px-12 rounded-xl drop-shadow-lg lg:h-80 lg:w-80 ">
              <img alt="" src={likeIcon} className="w-10" />
              <h1 className="font-bold text-center">ĐỘ TIN CẬY TUYỆT ĐỐI</h1>
              <h1>
                Các câu hỏi đưa ra luôn được giải đáp một cách chính xác nhất,
                minh bạch.
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section id="description">
        <div className="container mx-auto snap-center flex flex-col space-y-10 px-12 py-16 items-center justify-between bg-gray-200 min-w-full lg:flex-row  lg:space-y-0">
          <div className="flex flex-col space-y-4 items-center text-black lg:w-1/2 xl:pl-40 lg:items-start">
            <h1 className="font-bold text-xl">HỘP THƯ GÓP Ý KHOA CNTT</h1>
            <h1 className="text-md max-w-md">
              Dùng Kênh
              <span className="font-bold"> HỘP THƯ GÓP Ý KHOA CNTT</span> trực
              tuyến là cách nhanh và đơn giản nhất để tìm câu trả lời cũng như
              kết nối với đội ngũ hỗ trợ. Sinh viên có thể tìm câu trả lời cho
              các vấn đề thường gặp; gửi câu hỏi đến VHUB.
            </h1>
          </div>
          <div className="lg:w-1/2">
            <img
              alt=""
              src={descriptionIcon}
              className=" p-4 border-2 border-lightBlue w-full max-w-sm mx-auto"
            ></img>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Introduction;
