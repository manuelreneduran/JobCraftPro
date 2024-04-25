import { Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import CoverLetterCard from "../components/CoverLetterCard";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import CoreLayout from "../layouts/CoreLayout";
import { auth, getManyDocumentByUser } from "../services/firebase";
import { TCoverLetterDetail } from "../utils/types";
import { formatReadableDate } from "../utils/date";

const DashboardPage = () => {
  const [coverLetters, setCoverLetters] = useState<TCoverLetterDetail[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, authStateLoading] = useAuthState(auth);
  const { setAlert } = useAlert();

  const fetchCoverLetters = async (userUid: string) => {
    let response: TCoverLetterDetail[] = [];
    try {
      response = await getManyDocumentByUser(userUid);
    } catch (e: any) {
      setAlert(e.message, "error");
    } finally {
      setCoverLetters(response);
    }
  };

  useEffect(() => {
    if (user && !coverLetters) {
      fetchCoverLetters(user.uid);
    }
  }, [fetchCoverLetters, user, coverLetters]);

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
          <Link to="cover-letters">See all</Link>
        </Stack>
        <Stack flexWrap="wrap" direction="row">
          {coverLetters?.map((coverLetter) => (
            <CoverLetterCard coverLetter={coverLetter} key={coverLetter.id} />
          ))}
        </Stack>
      </Stack>
    </CoreLayout>
  );
};

export default DashboardPage;
