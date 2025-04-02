import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { IconCheck, IconCircleCheck, IconX } from "@tabler/icons-react";
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
          //   sx={{
          //     "& .MuiButton-root": { fontSize: "1.35rem" },
          //     "& .MuiInputBase-input": { fontSize: "1.5rem!important" },
          //     "& .MuiFormLabel-root": { fontSize: "1.5rem!important" },
          //   }}
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
                type="submit"
                variant="contained"
                startIcon={<IconCircleCheck />}
              >
                Save
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
          sx={{
            "& .MuiButton-root": { fontSize: "1.35rem" },
            "& .MuiInputBase-input": { fontSize: "1.5rem!important" },
            "& .MuiFormLabel-root": { fontSize: "1.5rem!important" },
          }}
        >
          <DialogTitle
            style={{
              cursor: "move",
              fontSize: "2.5rem",
              borderBottom: 1,
              borderColor: "divider",
            }}
            id="draggable-dialog-title"
          >
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{children}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={onClose}>
              Cancel
            </Button>
            <Button type={onSubmit ? "submit" : "button"}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
