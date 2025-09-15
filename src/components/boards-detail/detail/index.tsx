"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import { useBoardDetail } from "./hook";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import YouTube from "react-youtube";
import profile_image from "@assets/profile_image.png";
import link from "@assets/link.png";
import location from "@assets/location.png";
import cheongsan from "@assets/cheongsan.png";
import neotube from "@assets/neotube.png";
import bad from "@assets/bad.png";
import good from "@assets/good.png";
import hamberger from "@assets/hamberger.png";
import pencil from "@assets/pencil.png";
const IMAGE_SRC = {
  profileImage: {
    src: profile_image,
    alt: "프로필이미지",
  },
  linkImage: {
    src: link,
    alt: "링크아이콘",
  },
  locationImage: {
    src: location,
    alt: "위치아이콘",
  },
  cheongsanImage: {
    src: cheongsan,
    alt: "청산사진",
  },
  neotubeImage: {
    src: neotube,
    alt: "너튜브사진",
  },
  badImage: {
    src: bad,
    alt: "싫어요",
  },
  goodImage: {
    src: good,
    alt: "좋아요",
  },
  hamberger: {
    src: hamberger,
    alt: "목록아이콘",
  },
  pencil: {
    src: pencil,
    alt: "수정아이콘",
  },
} as const;

export default function BoardDetail() {
  const { data, goToEditPage } = useBoardDetail();

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          <div className={styles.detailSubject}>{data?.fetchBoard?.title}</div>
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image
                src={IMAGE_SRC.profileImage.src}
                alt={IMAGE_SRC.profileImage.alt}
              />
              <div> {data?.fetchBoard?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
              {data?.fetchBoard?.createdAt}
            </div>
          </div>
          <div className={styles.enrollBorder}></div>
          <div className={styles.detailMetadataIconContainer}>
            <Image
              src={IMAGE_SRC.linkImage.src}
              alt={IMAGE_SRC.linkImage.alt}
            />
            <Tooltip title={data?.fetchBoard?.boardAddress?.address}>
              <Image
                src={IMAGE_SRC.locationImage.src}
                alt={IMAGE_SRC.locationImage.alt}
              />
            </Tooltip>
          </div>
          <div className={styles.detailContentContainer}>
            <Image
              src={IMAGE_SRC.cheongsanImage.src}
              alt={IMAGE_SRC.cheongsanImage.alt}
              className={styles.detailContentImage}
            />
            <div className={styles.detailContentText}>
              {data?.fetchBoard?.contents}
            </div>

            <YouTube
              videoId={
                data?.fetchBoard?.youtubeUrl?.split("=")[1] &&
                data?.fetchBoard?.youtubeUrl.split("=")[1]
              }
            />
            <div className={styles.detailContentGoodOrBad}>
              <div className={styles.detailGoodContainer}>
                <DislikeOutlined />
                <div className={styles.detailBadText}>24</div>
              </div>
              <div className={styles.detailGoodContainer}>
                <LikeOutlined style={{ color: "red" }} />

                <div className={styles.detailGoodText}>12</div>
              </div>
            </div>
            <div className={styles.detailButtonsContainer}>
              <button className={styles.detailButton}>
                <Image
                  src={IMAGE_SRC.hamberger.src}
                  alt={IMAGE_SRC.hamberger.alt}
                />

                <div>목록으로</div>
              </button>
              <button className={styles.detailButton} onClick={goToEditPage}>
                <Image src={IMAGE_SRC.pencil.src} alt={IMAGE_SRC.pencil.alt} />
                <div>수정하기</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
