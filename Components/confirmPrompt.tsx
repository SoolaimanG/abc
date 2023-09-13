import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

type promptProp = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  button: React.ReactNode;
  children: React.ReactNode;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

export default function ConfirmPrompt(prop: promptProp) {
  const { open, button, setOpen, children } = prop;
  const handleClose = () => setOpen(false);

  return (
    <div>
      {button}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="w-[20rem] h-fit overflow-auto md:w-[30rem] width-10">
            {children}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
