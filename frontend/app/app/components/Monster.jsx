import Image from "next/image";
import { CircularProgress } from "@mui/material";

export default function Monster({useMonsterState}) {
  const { monster, isLoading, hasError, errorMessage } = useMonsterState;

  if (isLoading) {
    return (
      <div className="monster-container">
        <CircularProgress />
      </div>
    );
  }
  if (hasError) {
    return (
      <div className="monster-container">
        {errorMessage.status} : {errorMessage.error}
      </div>
    );
  }
  if (monster) {
    return (
      <div className="monster-container">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAGE_URL}/${monster.image}`}
          alt="monster_image"
          width={400}
          height={400}
        />
      </div>
    );
  }
}
