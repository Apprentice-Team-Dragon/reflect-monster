import React from "react";
import Modal from "react-modal";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

const modalStyle = {
  content: {
    // ここはみる人の画面によって高さ変わるから注意 top100pxだとズレる人いるかも
    top: "100px",
    width: "545px",
    height: "330px",
    margin: "auto",
  },
};

export default function AddTaskModal({ isModalOpen, onClickCloseButton }) {
  return (
    <Modal isOpen={isModalOpen} style={modalStyle}>
      <Button variant="outlined" onClick={onClickCloseButton}>
        Close
      </Button>

      <Box textAlign="center" marginTop="32px" fontSize="24px">
        タスクを追加する
      </Box>
      <Box textAlign="center" width="80%" margin="24px auto">
        <TextField type="text" name="aaa" style={{ width: "100%" }} />
      </Box>

      <Box textAlign="center" marginTop="32px">
        <Button
          variant="outlined"
          onClick={() => console.log("aaa")}
          style={{ width: "60%", padding: "8px 0" }}
        >
          保存
        </Button>
      </Box>
    </Modal>
  );
}
