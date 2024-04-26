import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import CoverLetterCard from "../components/CoverLetterCard";
import Loader from "../components/Loader";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import CoreLayout from "../layouts/CoreLayout";
import { auth } from "../services/firebase";
import {
  deleteDocument,
  getSnapshotCoverLettersByUser,
} from "../services/firebase/documents";
import { TCoverLetterDetail } from "../utils/types";

const DashboardPage = () => {
  const [coverLetters, setCoverLetters] = useState<TCoverLetterDetail[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user] = useAuthState(auth);
  const { setAlert } = useAlert();

  const fetchCoverLetters = async (userUid: string) => {
    let response: TCoverLetterDetail[] = [];
    try {
      setIsLoading(true);
      response = await getSnapshotCoverLettersByUser(userUid);
    } catch (e: any) {
      setAlert(e.message, "error", true);
    } finally {
      setCoverLetters(response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && !coverLetters) {
      fetchCoverLetters(user.uid);
    }
  }, [fetchCoverLetters, user, coverLetters]);

  const handleMenuItemClick = async (option: string, id: string) => {
    if (option === "Delete") {
      try {
        await deleteDocument(id);
        setAlert("Document deleted successfully", "success", true);
        if (user) {
          fetchCoverLetters(user.uid);
        }
      } catch (e: any) {
        setAlert(e.message, "error");
      }
    }
  };
  const renderCoverLetters = () =>
    coverLetters?.map((coverLetter) => (
      <CoverLetterCard
        handleMenuItemClick={handleMenuItemClick}
        coverLetter={coverLetter}
        key={coverLetter.id}
      />
    ));

  return (
    <CoreLayout pageHeader="Dashboard">
      <Stack className="dashboard-row">
        <Typography variant="h5">Hi, {user?.displayName} &#x1F64C;</Typography>
      </Stack>
      <Stack className="dashboard-row" mt={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Previous Cover Letters</Typography>
          <Link to="/cover-letter">See all</Link>
        </Stack>
        <Stack flexWrap="wrap" direction="row">
          {isLoading ? <Loader /> : renderCoverLetters()}
        </Stack>
      </Stack>
    </CoreLayout>
  );
};

export default DashboardPage;
