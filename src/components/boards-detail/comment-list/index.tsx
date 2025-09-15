import { useCommentList } from "./hook";
import styles from "./styles.module.css";
import Image from "next/image";
import { Rate } from "antd";
import profile_image from "@assets/profile_image.png";
import fivestars from "@assets/fivestars.png";
import edit from "@assets/edit.png";
import close from "@assets/close.png";
const IMAGE_SRC = {
  profileImage: {
    src: profile_image,
    alt: "프로필이미지",
  },
  starsImage: {
    src: fivestars,
    alt: "평점이미지",
  },
  editImage: {
    src: edit,
    alt: "편집버튼",
  },
  closeImage: {
    src: close,
    alt: "삭제버튼",
  },
};
export default function CommentList() {
  const { data } = useCommentList();

  console.log("commentList 에서 data:::", data);
  return (
    <div className={styles.commentListBody}>
      <div className={styles.commentListContainer}>
        {data?.fetchBoardComments.map((comment, index) => (
            <div className={styles.listBody} key={comment?._id}>
              <div className={styles.listTitle}>
                <div className={styles.forwardTitle}>
                  <Image
                    src={IMAGE_SRC.profileImage.src}
                    alt={IMAGE_SRC.profileImage.alt}
                  />
                  <div className={styles.forwardTitleText}>
                    {comment?.writer}
                  </div>
                  <Rate defaultValue={comment?.rating} />
                </div>
                  <div className={styles.backTitle}>
                    <Image
                      src={IMAGE_SRC.editImage.src}
                      alt={IMAGE_SRC.editImage.alt}
                    />
                    <Image
                      src={IMAGE_SRC.closeImage.src}
                      alt={IMAGE_SRC.closeImage.alt}
                    />
                  </div>
              </div>
              <div className={styles.commentText}>{comment?.contents}</div>
              <div className={styles.commentDate}>
                {comment?.createdAt.split("T")[0].split("-").join(".")}
              </div>
            {/* 마지막 댓글 밑에는 border 가 없음 */}
            {index + 1 !== data?.fetchBoardComments.length && (
              <div className={styles.border}> </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
