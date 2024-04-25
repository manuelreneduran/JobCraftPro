import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Typography from "../components/Typography";
import { TCoverLetterDetail } from "../utils/types";
import { useState } from "react";
import { deleteDocument } from "../services/firebase";
import useAlert from "../hooks/useAlert";

const options = ["Delete"];

const ITEM_HEIGHT = 48;

const CoverLetterCard = ({
  coverLetter,
}: {
  coverLetter: TCoverLetterDetail;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { setAlert } = useAlert();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async (option: string) => {
    if (option === "Delete") {
      try {
        await deleteDocument(coverLetter.id);
        setAlert("Document deleted successfully", "success");
      } catch (e: any) {
        setAlert(e.message, "error", true);
      }
    }
    setAnchorEl(null);
  };

  return (
    <Card
      key={coverLetter.id}
      sx={{ margin: "1rem 1rem 1rem 0", width: 200, height: 180 }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="pdf">
            PDF
          </Avatar>
        }
        title={coverLetter.jobListingText.slice(0, 20) + "..."}
        subheader={coverLetter.createdAt}
        action={
          <>
            <IconButton
              aria-label="settings"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={() => handleClose(option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {coverLetter?.text?.slice(0, 80) + "..."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CoverLetterCard;
