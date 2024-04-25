import { Delete } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import CoreLayout from "../layouts/CoreLayout";
import {
  auth,
  deleteDocument,
  getManyDocumentByUser,
} from "../services/firebase";
import { TCoverLetterDetail } from "../utils/types";

const DashboardPage = () => {
  const [coverLetters, setCoverLetters] = useState<TCoverLetterDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user] = useAuthState(auth);
  const { setAlert } = useAlert();

  const fetchCoverLetters = useCallback(async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      // const response = await getManyDocumentByUser(user.uid);
      // setCoverLetters(response);
    } catch (e: any) {
      setAlert(e.message, "error");
    } finally {
      setIsLoading(false);
    }
  }, [user, setAlert, setCoverLetters, setIsLoading]);

  useEffect(() => {
    if (!coverLetters.length && user) {
      fetchCoverLetters();
    }
  }, [coverLetters, setIsLoading, fetchCoverLetters, user]);

  const deleteDocument = async (docId: string) => {
    try {
      await deleteDocument(docId);

      setAlert("Document deleted successfully", "success");
    } catch (e: any) {
      setAlert(e.message, "error");
    }
  };

  console.log("rerender");
  // fix bug with infinite loop on delete
  return (
    <CoreLayout pageHeader="Dashboard">
      <Stack className="dashboard-row">
        <Typography variant="h6">Cover Letters</Typography>
        <Stack flexWrap="wrap" direction="row">
          {coverLetters.map((coverLetter) => (
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
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {coverLetter?.text?.slice(0, 80) + "..."}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteDocument(coverLetter.id)}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Stack>
    </CoreLayout>
  );
};

export default DashboardPage;
