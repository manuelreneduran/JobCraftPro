import { Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CoverLetterCard from "../components/CoverLetterCard";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import CoreLayout from "../layouts/CoreLayout";
import { auth } from "../services/firebase";
import {
  deleteCoverLetter,
  getCoverLettersByUser,
} from "../services/firebase/documents";
import { TGetCoverLetterQueryResponse } from "../utils/types";
import Loader from "../components/Loader";

const CoverLetterPage = () => {
  const [coverLetters, setCoverLetters] = useState<
    TGetCoverLetterQueryResponse[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user] = useAuthState(auth);
  const { setAlert, setErrorAlert } = useAlert();

  const fetchCoverLetters = useCallback(
    async (userUid: string) => {
      let response: TGetCoverLetterQueryResponse[] = [];
      try {
        setIsLoading(true);
        response = await getCoverLettersByUser(userUid);
      } catch (e: unknown) {
        setErrorAlert(e);
      } finally {
        setCoverLetters(response);
        setIsLoading(false);
      }
    },
    [setCoverLetters, setIsLoading, setErrorAlert]
  );

  useEffect(() => {
    if (user && !coverLetters) {
      fetchCoverLetters(user.uid);
    }
  }, [fetchCoverLetters, user, coverLetters]);

  const handleMenuItemClick = async (option: string, id: string) => {
    if (option === "Delete") {
      try {
        await deleteCoverLetter(id);
        setAlert("Document deleted successfully", "success", true);
        if (user) {
          fetchCoverLetters(user.uid);
        }
      } catch (e: unknown) {
        setErrorAlert(e);
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
    <CoreLayout pageHeader="Cover Letters">
      <Stack mt={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">All Cover Letters</Typography>
        </Stack>
        <Stack flexWrap="wrap" direction="row">
          {isLoading ? <Loader /> : renderCoverLetters()}
        </Stack>
      </Stack>
    </CoreLayout>
  );
};

export default CoverLetterPage;
