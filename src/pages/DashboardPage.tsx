import { Stack } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
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

const DashboardPage = () => {
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
    <CoreLayout pageHeader="Dashboard">
      <Stack className="dashboard-row">
        <Typography variant="h5">
          Hi, {user?.displayName || user?.email} &#x1F64C;
        </Typography>
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
