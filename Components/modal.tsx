import { motion, AnimatePresence } from "framer-motion";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { KonnectFeatures } from "@/utils/data";
import { features } from "process";

type childrenProps<T> = {
  open: boolean;
  message: string;
  isArray?: boolean;
  index?: number;
  warning?: boolean;
  warningMessage?: string;
  setOpen: React.Dispatch<React.SetStateAction<T>>;
  children: React.ReactNode;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1.5px solid #000",
  boxShadow: 24,
  p: 1,
  borderRadius: "7px",
};

export default function ModalComponent(props: childrenProps<boolean>) {
  const { open, message, index, warning, setOpen } = props;
  const handleClose = () => setOpen(false);

  //React.useEffect(() => {
  //  KonnectFeatures.map((feature) => {
  //    return feature.id === index ? setOpen(true) : setOpen(false);
  //  });
  //}, [index]);

  return (
    <div>
      {props.children}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <motion.div
            initial={{ scale: 0.1, opacity: 0, y: -3 }}
            animate={{
              scale: 1,
              opacity: 0.8,
              transition: { duration: 0.3 },
              y: 1,
            }}
          >
            {warning ? (
              <div></div>
            ) : (
              <motion.div className="w-[20rem] md:w-[35rem] width-8">
                <p className="text-xl text-center">
                  <span className="text-3xl text-blue-600">{index}.</span>{" "}
                  {message}
                </p>
              </motion.div>
            )}
          </motion.div>
        </Box>
      </Modal>
    </div>
  );
}
