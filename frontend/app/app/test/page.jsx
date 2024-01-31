"use client";
import useFetch from "@/hooks/useFetch";
import useModal from "@/hooks/useModal";
import {
  generateMonster,
  getGoalCategory,
  removeBackground,
} from "@/utils/api/monster";
import { useIsEvolve } from "@/hooks/MonsterHooks/monster";
import { useCallback } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
// import { uploadImage } from "@/utils/strage";
import Monster from "../components/Monster"
import {useGetMonster} from "@/hooks/MonsterHooks/useGetMonster"


export default function Test() {
  // const url = "https://api.stability.ai/v1/user/balance";
  // const config = {
  //   method: "GET",
  //   headers: {
  //     Authorization: "Bearer " + process.env.NEXT_PUBLIC_STABILITY_API_KEY,
  //     "Content-Type": "application/json",
  //   },
  // };
  // const { data, isLoading, hasError, errorMessage } = useFetch(url, {
  //   ...config,
  // });
  // const { modalStatus, closeModal, openModal } = useModal();


  const { data, isLoading, hasError, errorMessage } = useGetMonster(1);
  const { monster, setMonster } = useState(null);
  useEffect(() => {
    const hundleMonster = ()=> {
      setMonster((prevMonster) => data.monster)
    }
  }, [])

  console.log(monster)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    const error = errorMessage;
    return <div>{error}</div>;
  }

  const result = data?.credits;
  return (
    <div>
      {result}
      <div>
        <button onClick={() => openModal()}>Open</button>
      </div>
      <ModalComponent modalStatus={modalStatus} closeModal={closeModal} />
      <Monster />
    </div>
  );
}

const ModalComponent = ({ modalStatus, closeModal }) => {
  const [point, setPoint] = useState(0);
  const [monsterImage, setMonterImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const maxPoint = 10;
  const { isEvolve } = useIsEvolve(point, maxPoint);

  const monsterInfo = {
    evolutionStage: 1,
    animal: "snake",
    color: "black",
    seed: 936118357,
  };

  const hundlePoint = () => {
    if (point === maxPoint) {
      console.log("これ以上経験値は溜まりません");
    } else {
      setPoint((prevPoint) => prevPoint + 1);
    }
    if (isEvolve) {
      console.log("進化できます");
    }
  };
  async function hundleEvolve() {
    setLoading(true);
    const image = await generateMonster("運動する 毎日10kmランニングする", monsterInfo);
    // const image = await removeBackground(base64);
    // const image = await uploadImage(base64);
    setLoading(false);
    setMonterImage(() => image);
    setPoint(0);
  }

  if (!modalStatus) return null;

  return (
    <div>
      <p>ここはコンテンツです。</p>
      <button onClick={() => closeModal()}>Close</button>
      {/* <button onClick={() => hundleGenerateMonster()}>モンスター生成</button> */}
      <div>{point}</div>
      <button onClick={() => hundlePoint()}>ポイント追加</button>
      {isEvolve ? (
        <button onClick={() => hundleEvolve()}>進化させる</button>
      ) : null}
      {loading ? <div>モンスター進化中...</div> : null}
      {monsterImage ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAGE_URL}/${monsterImage}`}
          alt=""
          width={500}
          height={500}
        ></Image>
        ) : null}      
    </div>
  );
};
