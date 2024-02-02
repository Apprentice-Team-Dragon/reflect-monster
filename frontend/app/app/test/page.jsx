"use client";
import useModal from "@/hooks/useModal";
import { generateMonster } from "@/utils/api/monster";
import { getMonster, getCredit } from "@/utils/api/monster";
import { useIsEvolve } from "@/hooks/MonsterHooks/useIsEvolve";
import Image from "next/image";
import { useState } from "react";
import Monster from "../components/Monster"
import {useGetMonster} from "@/hooks/MonsterHooks/useGetMonster"
import { addExpPoint } from "@/utils/api/monster";


export default function Test() {

  const { modalStatus, closeModal, openModal } = useModal();

  const { monsterFetchInfo } = useGetMonster();

  return (
    <div>
      <div>
        <button onClick={() => openModal()}>Open</button>
      </div>
      <ModalComponent modalStatus={modalStatus} closeModal={closeModal} />
      {/* <Monster {...monsterFetchInfo}/> */}
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
    setLoading(false);
    setMonterImage(() => image);
    setPoint(0);
  }
  async function hundleGetMonster() {
    // const response = await fetch('http://localhost:3000/api/monsters');
    // const data = await response.json();
    // console.log(data)
    // const monster = await getMonster();
    // // const monster = await addExpPoint(6, 1);
    // console.log(monster)
    const data = getCredit();
  }

  if (!modalStatus) return null;

  return (
    <div>
      <p>ここはコンテンツです。</p>
      <button onClick={() => closeModal()}>Close</button>
      <div>{point}</div>
      <button onClick={() => hundleGetMonster()}>モンスター取得</button>
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
