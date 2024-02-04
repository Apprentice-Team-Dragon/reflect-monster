import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)({
  width: 600,
  height: 50,
  borderRadius: 10,
  backgroundColor: "#dbdbdb",
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: "#5bd75a",
  },
});

export default function ExpBar({ useMonsterState }) {
  const { monster, isLoading } = useMonsterState;

  if (isLoading) {
    return null;
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <BorderLinearProgress
        variant="determinate"
        value={
          monster.exp_point >= monster.max_exp_point
            ? 100
            : Math.floor((monster.exp_point * 100) / monster.max_exp_point)
        }
      />
    </Grid>
  );
}
