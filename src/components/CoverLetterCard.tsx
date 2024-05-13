import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "../components/Typography";
import { TGetCoverLetterQueryResponse } from "../utils/types";

const options = ["Delete"];

const ITEM_HEIGHT = 48;

const CoverLetterCard = ({
  coverLetter,
  handleMenuItemClick,
}: {
  coverLetter: TGetCoverLetterQueryResponse;
  handleMenuItemClick: (option: string, id: string) => Promise<void>;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleOptionClick = async (option: string, id: string) => {
    await handleMenuItemClick(option, id);
    handleClose();
  };
  return (
    <Card
      key={coverLetter.id}
      sx={{
        margin: "1rem 1rem 1rem 0",
        width: { xs: 175 },
        height: { xs: 220 },
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
                <MenuItem
                  key={option}
                  onClick={() => handleOptionClick(option, coverLetter.id)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {coverLetter?.text?.slice(0, 50) + "..."}
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
