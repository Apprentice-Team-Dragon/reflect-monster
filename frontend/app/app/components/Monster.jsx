'use client'
import Image from "next/image";

export default function Monster(monsterImagePath) {

  return (
    <div className="monster-container">
      {/* <Image src={"/img/firstegg.png"} alt="卵" width={500} height={500}/> */}
      <Image src={process.env.NEXT_PUBLIC_STRAGE_URL/monsterImagePath} alt="卵" width={500} height={500}/>
      {/* <Image src={`${process.env.NEXT_PUBLIC_STRAGE_URL}/1706632518363_amg8wzx.png`} alt="卵" width={500} height={500}/> */}
    </div>
  );
}