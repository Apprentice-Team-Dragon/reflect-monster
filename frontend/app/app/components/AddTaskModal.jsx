import React, { useState } from "react";
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

export default function AddTaskModal({
  isModalOpen,
  onClickCloseButton,
  goalId,
  execDate,
  tasks,
  hundleCreateTasks,
}) {
  const [content, setContent] = useState("");
  const handleChange = (e) => {
    setContent(() => e.target.value);
  };

  const hundleAddTasks = async () => {
    const task = [
      {
        content: content,
        execDate: execDate,
      },
    ];
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?goalId=${goalId}`;
    const raw = JSON.stringify({
      tasks: task,
    });
    const config = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: raw,
    };
    const response = await fetch(url, config);
    const data = await response.json();
    console.log(data);
    hundleCreateTasks(data);
  };

  return (
    <Modal isOpen={isModalOpen} style={modalStyle}>
      <Button variant="outlined" onClick={onClickCloseButton}>
        Close
      </Button>

      <Box textAlign="center" marginTop="32px" fontSize="24px">
        タスクを追加する
      </Box>
      <Box textAlign="center" width="80%" margin="24px auto">
        <TextField
          type="text"
          name="aaa"
          style={{ width: "100%" }}
          value={content}
          onChange={handleChange}
        />
      </Box>

      <Box textAlign="center" marginTop="32px">
        <Button
          variant="outlined"
          onClick={hundleAddTasks}
          style={{ width: "60%", padding: "8px 0" }}
        >
          保存
        </Button>
      </Box>
    </Modal>
  );
}
