import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./style.module.css";
import introVideo from "@/assets/video_background.mp4";
import { Link } from "react-router-dom";
import { httpClient } from "@/util/http-client";
import { apis } from "@/util/api";

function Home() {
  const dispatch = useDispatch();
  const [isQFormOpen, setIsQFormOpen] = useState(false);

  const onToggleFormHandler = async (e: {preventDefault: () => void}) => {
    e.preventDefault()
    const res = await httpClient.get({url: apis.post.getPostList})
    console.log(res)
  };

  return (
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
        <div className={`${classes.bannerBg} relative md:hidden`} />
        <div
          className={`${classes.model} min-w-full min-h-full absolute top-0`}
        ></div>
        <form>
          <div className="absolute min-w-full min-h-full p-0 top-0 flex items-center justify-center container mx-auto">
            <div
              className={`absolute w-full h-full flex items-center justify-center lg:w-fit lg:h-fit`}
            >
              <div className="absolute top-0 bg-black w-full h-full opacity-70 lg:rounded"></div>
              <div className="flex flex-col space-y-8 w-2/3 z-10 lg:w-96 lg:px-10 lg:py-10">
                <h1 className="text-2xl text-white font-bold z-10">
                  Đăng Nhập
                </h1>
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    className="p-4 bg-gray-700 rounded-md text-white outline-none"
                    placeholder="Nhập tài khoản"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <input
                    type="password"
                    className="p-4 bg-gray-700 rounded-md text-white outline-none"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                <button className={` btn-primary bg-lightBlue`} onClick={onToggleFormHandler}>
                  <Link to="/home">Đăng Nhập</Link>
                </button>
                <span className="text-gray-500 italic">
                  *Lưu ý: Chỉ sinh viên khoa CNTT được đăng nhập vào hệ thống!
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Home;
