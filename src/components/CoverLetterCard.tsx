import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Typography from "../components/Typography";
import { TCoverLetterDetail } from "../utils/types";
import { useState } from "react";
import { deleteDocument } from "../services/firebase";
import useAlert from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";

const options = ["Delete"];

const ITEM_HEIGHT = 48;

const CoverLetterCard = ({
  coverLetter,
}: {
  coverLetter: TCoverLetterDetail;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

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
      sx={{
        margin: "1rem 1rem 1rem 0",
        width: { xs: 175 },
        height: { xs: 240 },
      }}
    >
      <CardHeader
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
      <CardActions>
        <Stack
          width="100%"
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            onClick={() => navigate(`/cover-letter/${coverLetter.id}`)}
            variant="text"
            size="small"
          >
            View
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default CoverLetterCard;
