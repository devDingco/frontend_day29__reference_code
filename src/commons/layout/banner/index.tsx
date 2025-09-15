"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.css";
import "swiper/css";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import banner1 from "@assets/banner1.png";
import banner2 from "@assets/banner2.png";
import banner3 from "@assets/banner3.png";
const IMAGE_SRC = {
  banner1: {
    src: banner1,
    alt: "배너버튼1",
  },

  banner2: {
    src: banner2,
    alt: "배너버튼2",
  },

  banner3: {
    src: banner3,
    alt: "배너버튼3",
  },
};

export default function BannerList() {
  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView={1}
      allowSlideNext
      allowSlidePrev
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return (
            '<span class="' +
            className +
            " " +
            styles.customBullet +
            '"></span>'
          );
        },
      }}
    >
      <SwiperSlide>
        <Image
          src={IMAGE_SRC.banner1.src}
          alt={IMAGE_SRC.banner1.alt}
          sizes="100vw"
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      </SwiperSlide>

      <SwiperSlide>
        <Image
          src={IMAGE_SRC.banner2.src}
          alt={IMAGE_SRC.banner2.alt}
          sizes="100vw"
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      </SwiperSlide>

      <SwiperSlide>
        <Image
          src={IMAGE_SRC.banner3.src}
          alt={IMAGE_SRC.banner3.alt}
          sizes="100vw"
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      </SwiperSlide>
    </Swiper>
  );
}
