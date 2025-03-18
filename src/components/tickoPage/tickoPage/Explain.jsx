import { useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Header from "../../../components/tickoPage/common/header/Header";
import StartSpeechBubble from "../../../components/tickoPage/common/speechBubble/StartSpeechBubble";
import ElseSpeechBubble from "../../../components/tickoPage/common/speechBubble/ElseSpeechBubble";

const BodyWrap = styled.div`
  display: flex;
  width: 390px;
  flex-direction: column;
  gap: 5px;
  padding: 60px 20px 10px 10px;
  visibility: hidden;
`;

export default function Explain() {
  const [description, setDescription] = useState(null);
  const { menu } = useParams();
  const { title } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/explains/ticko/${menu}/${title}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          // 백엔드로부터 받아온 데이터 description에 저장
          setDescription(data);
        } else {
          console.error("Description not found");
        }
      })
      .catch((error) => {
        console.log("Error fetching description: ", error);
      });
  }, [title]);

  // description의 context 내용 \n 기준으로 자르기
  const contextArr = useRef([]);
  useMemo(() => {
    if (description) {
      contextArr.current = description.context.split("\n");
    }
  }, [description]);

  // animation-delay 계산
  let sec = 0;
  const secCal = () => {
    sec += 1;
    return sec + "s";
  };

  // backButton 클릭 시 이동할 주소
  const backLink = `/ticko/${menu}`;

  if (!description) {
    return null;
  } else {
    return (
      <>
        <Header link={backLink} />
        <BodyWrap>
          <StartSpeechBubble
            context={contextArr.current[0]}
          ></StartSpeechBubble>
          {contextArr.current.map((context, idx) => {
            if (idx >= 1) {
              return (
                <ElseSpeechBubble
                  key={idx}
                  context={context}
                  animationDelay={secCal}
                ></ElseSpeechBubble>
              );
            }
          })}
        </BodyWrap>
      </>
    );
  }
}
