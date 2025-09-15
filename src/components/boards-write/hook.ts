import { ChangeEvent, useEffect, useState, MouseEvent } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "commons/graphql/graphql";
import { IAddress } from "./types";

export const useBoardWrite = (isEdit: boolean) => {
  const router = useRouter();
  const params = useParams();

  // let editId = isEdit ? params.boardId.toString() : "";

  //그래프큐엘 셋팅
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [targetId, setTargetId] = useState(
    isEdit ? params.boardId.toString() : ""
  );

  //state 가 캡쳐되서 감
  // state 는 변경을 감지되지 못하나...

  console.log("밖에서 targetId", targetId);

  // 수정하는 경우, 수정을 위한 초기값 보여주기
  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: targetId.toString() },
    skip: !isEdit,
  });

  console.log("in useBoardWrite data:::");
  console.log("in useBoardWrite isEdit", isEdit);
  // 작성자 변경 불가

  const [writer, setWriter] = useState<string>(
    isEdit ? data?.fetchBoard?.writer || "" : ""
  );

  // 비밀번호 수정 불가
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<string>(
    isEdit && data?.fetchBoard?.title ? data?.fetchBoard.title : ""
  );
  const [contents, setContents] = useState<string>(
    isEdit && data?.fetchBoard.contents ? data?.fetchBoard.contents : ""
  );
  const [writerError, setWriterError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [contentError, setContentError] = useState<string>("");
  const [zipcode, setZipcode] = useState<string>(
    isEdit ? data?.fetchBoard?.boardAddress?.zipcode || "" : ""
  );
  const [address, setAddress] = useState<string>(
    isEdit ? data?.fetchBoard?.boardAddress?.address || "" : ""
  );
  const [addressDetail, setAddressDetail] = useState<string>(
    isEdit && data?.fetchBoard?.boardAddress?.addressDetail
      ? data.fetchBoard.boardAddress.addressDetail
      : ""
  );

  // 새로고침해도 초기값 유지하기 -> 다음주에 배워요.
  useEffect(() => {
    if (isEdit && data) {
      setWriter(data.fetchBoard.writer || "");
      setTitle(data.fetchBoard.title || "");
      setContents(data.fetchBoard.contents || "");
      setZipcode(data.fetchBoard.boardAddress?.zipcode || "");
      setAddress(data.fetchBoard.boardAddress?.address || "");
      setAddressDetail(data.fetchBoard.boardAddress?.addressDetail || "");
      setYoutubeUrl(data.fetchBoard.youtubeUrl || "");
    }
  }, [data, isEdit]);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    isEdit && data?.fetchBoard?.youtubeUrl ? data.fetchBoard.youtubeUrl : ""
  );
  //모달 보여주는 여부 값
  const [afterSubmitModal, setAfterSubmitModal] = useState<boolean>(false);

  //모달의 content 내용
  const [modalContent, setModalContent] = useState<string>("");

  // 값이 없는 경우, 버튼 비활성화
  const isButtonDisabled = !writer || !password || !title || !contents;

  // 변경값 상태관리
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onChangeDetailAddress = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const handleOk = () => {
    // 수정이 완료 되어도 , 새로운 게시글이 등록 되어도 detail 화면으로 이동
    console.log("editId:::", targetId);
    router.push(`/boards/${targetId}`);
  };

  const handleCancel = () => {
    setAfterSubmitModal(false);
  };

  const onClickSignup = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    //새글 등록하기일 경우
    if (isEdit === false) {
      let hasError = false;

      if (writer.trim() === "") {
        setWriterError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setWriterError("");
      }

      if (password.length === 0) {
        setPasswordError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setPasswordError("");
      }

      if (!title?.trim()) {
        setTitleError("필수입력 사항입니다.");
        hasError = true;
        return;
      } else {
        setTitleError("");
      }

      if (!contents?.trim()) {
        setContentError("필수입력 사항입니다.");
        hasError = true;
        return;
      } else {
        setContentError("");
      }

      if (!hasError) {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password,
              title,
              contents,
              youtubeUrl,
              boardAddress: {
                zipcode,
                address,
                addressDetail,
              },
              images: ["", ""],
            },
          },
        });
        if (data?.createBoard) {
          setTargetId(data.createBoard._id);
          console.log("data", data);
          setModalContent("게시글이 등록되었습니다!");
          setAfterSubmitModal(true);
        }
      }
    }

    // 기존의 글을 수정하는 경우
    else if (isEdit === true) {
      // 입력값이 비어있는 경우 수정 진행 불가
      if (contents?.trim() === "" && title?.trim() === "") {
        setContentError("필수입력 사항입니다.");
        setTitleError("필수입력 사항입니다.");
        return;
      }
      if (contents?.trim() === "") {
        setContentError("필수입력 사항입니다.");
        return;
      }
      if (title?.trim() === "") {
        setTitleError("필수입력 사항입니다.");
        return;
      }

      // 비밀번호 확인하기
      const 입력받은비밀번호 = prompt(
        "글을 작성할때 입력하셨던 비밀번호를 입력해주세요"
      );

      // 변경된 항목만 포함해 안전하게 updateBoard 호출
      const updateInput: any = {}; // 최상위 입력 객체(처음엔 비움)
      const boardAddressInput: any = {}; // 주소 변경분만 담는 객체

      if (title?.trim() && title !== data?.fetchBoard?.title) updateInput.title = title; // 제목 변경 시에만 포함
      if (contents?.trim() && contents !== data?.fetchBoard?.contents) updateInput.contents = contents; // 내용 변경 시에만 포함
      if (youtubeUrl?.trim() && youtubeUrl !== data?.fetchBoard?.youtubeUrl) updateInput.youtubeUrl = youtubeUrl; // 유튜브 주소 변경 시에만 포함

      if (zipcode?.trim() && zipcode !== data?.fetchBoard?.boardAddress?.zipcode) boardAddressInput.zipcode = zipcode; // 우편번호 변경 시
      if (address?.trim() && address !== data?.fetchBoard?.boardAddress?.address) boardAddressInput.address = address; // 주소 변경 시
      if (addressDetail?.trim() && addressDetail !== data?.fetchBoard?.boardAddress?.addressDetail) boardAddressInput.addressDetail = addressDetail; // 상세주소 변경 시

      if (Object.keys(boardAddressInput).length > 0) updateInput.boardAddress = boardAddressInput; // 주소 중 하나라도 바뀌면 boardAddress 포함

      // 변경 사항이 전혀 없으면 수정 중단
      if (Object.keys(updateInput).length === 0) { 
        setModalContent("수정된 내용이 없습니다.");
        setAfterSubmitModal(true);
        return;
      }

      try {
        const result = await updateBoard({
          variables: {
            updateBoardInput: updateInput, // 변경된 값들만 서버에 전송
            password: 입력받은비밀번호, // 사용자에게 prompt 로 입력 받은 인증용 비밀번호
            boardId: targetId, // 수정할 게시글 ID
          },
        });

        // 뮤테이션이 성공하여 data가 존재하는 경우
        if (result.data) {
          console.log("기존의 글을 수정하는 경우:::", result);
          setModalContent("수정이 완료 되었습니다"); // 성공 메시지 설정
          setAfterSubmitModal(true); // 결과 모달 열기 !
        } else {
          console.log("수정에 실패하는경우");
          setModalContent("수정에 실패하였습니다");
          setAfterSubmitModal(true);
        }
      } catch (error: any) {
        const errMsg = (error as ApolloError).graphQLErrors[0] as any; // GraphQL 에러 배열의 첫번째 항목 추출
        if (errMsg) {
          setModalContent(errMsg.message); // 서버 에러 메시지 설정
          setAfterSubmitModal(true); // 결과 모달 열기 !
        } else { // 만약 GraphQL 에러가 아닌 다른 경우의 에러라면 아래와 같이 처리할래 !
          console.error("네트워크에러 발생");
          setModalContent("네트워크에러 발생하였습니다. 재시도 해주세요.");
          setAfterSubmitModal(true);
        }
      }
    }
  };

  const onSearchAddress = () => {
    setIsAddressModalOpen((prevOpenState: boolean) => !prevOpenState);
  };

  const completeHandler = (data: IAddress) => {
    console.log("주소 data", data);
    const { address, zonecode } = data;
    setZipcode(zonecode);
    setAddress(address);
    setIsAddressModalOpen(false);
  };

  return {
    writer,
    data,
    writerError,
    password,
    passwordError,
    title,
    titleError,
    contents,
    contentError,
    isButtonDisabled,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickSignup,
    afterSubmitModal,
    handleOk,
    handleCancel,
    modalContent,
    setModalContent,
    onSearchAddress,
    isAddressModalOpen,
    completeHandler,
    zipcode,
    address,
    setAddressDetail,
    onChangeDetailAddress,
    addressDetail,
    onChangeYoutubeUrl,
    youtubeUrl,
  };
};
