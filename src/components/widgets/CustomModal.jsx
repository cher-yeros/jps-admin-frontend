import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { IconCircleCheck, IconX } from "@tabler/icons-react";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function CustomModal({
  open,
  onClose,
  title,
  onSubmit,
  children,
  loading,
}) {
  return (
    <>
      {onSubmit ? (
        <Dialog
          open={open}
          onClose={onClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{
              cursor: "move",
              fontSize: "1.2rem",
              borderBottom: 1,
              borderColor: "divider",
              background: "primary.main",
            }}
            id="draggable-dialog-title"
          >
            {title}
          </DialogTitle>
          <form onSubmit={onSubmit}>
            <DialogContent>
              <DialogContentText>{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={onClose}
                variant="contained"
                color="error"
                startIcon={<IconX />}
              >
                Close
              </Button>
              <Button
                type={"submit"}
                variant="contained"
                startIcon={<IconCircleCheck />}
                disabled={loading}
              >
                {loading ? "Loading..." : "Save"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={onClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{
              cursor: "move",
              fontSize: "1.2rem",
              borderBottom: 1,
              borderColor: "divider",
              background: "primary.main",
            }}
            id="draggable-dialog-title"
          >
            {title}
          </DialogTitle>
          <form onSubmit={onSubmit}>
            <DialogContent>
              <DialogContentText>{children}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={onClose}
                variant="contained"
                color="error"
                startIcon={<IconX />}
              >
                Close
              </Button>
              {/* <Button
                type={"submit"}
                variant="contained"
                startIcon={<IconCircleCheck />}
                disabled={loading}
              >
                {loading ? "Loading..." : "Save"}
              </Button> */}
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
}
