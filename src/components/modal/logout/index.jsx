import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: 1.3,
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 3,
  outline: "none",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/sign-in");
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        style={{
          border: "2px solid #fff",
          padding: "5px 6px",
          borderRadius: "6px",
          backgroundColor: "#ffffff20",
        }}
      >
        
        <LogoutIcon sx={{ color: "black" }} />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Haqiqatdan ham chiqishni hohlaysizmi?
            </Typography>
            <div style={{ display: "flex", gap: "12px", marginTop: "64px" }}>
              <Button  onClick={handleClose}>Yo'q</Button>
              <Button onClick={logOut} variant="contained">
                Xa
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
