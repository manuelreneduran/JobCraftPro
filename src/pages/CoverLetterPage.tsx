import { Stack } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import CoverLetterCard from "../components/CoverLetterCard";
import Loader from "../components/Loader";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import CoreLayout from "../layouts/CoreLayout";
import { auth } from "../services/firebase";
import {
  deleteCoverLetter,
  getCoverLettersQuery,
} from "../services/firebase/documents";

const CoverLetterPage = () => {
  const [user] = useAuthState(auth);

  const [coverLetters, isLoading] = useCollectionData(
    getCoverLettersQuery(user?.uid),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const { setAlert, setErrorAlert } = useAlert();

  const handleMenuItemClick = async (option: string, id: string) => {
    if (option === "Delete") {
      try {
        await deleteCoverLetter(id);
        setAlert("Document deleted successfully", "success", true);
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
