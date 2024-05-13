import { Button, Stack } from "@mui/material";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import CoreLayout from "../layouts/CoreLayout";
import { getCoverLetterQuery } from "../services/firebase/documents";
import { colors } from "../styles/colors";

const CoverLetterDetailPage = () => {
  const params = useParams();

  const [document, loading, error] = useDocumentData(
    getCoverLetterQuery(params?.id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const { setAlert } = useAlert();

  const handleCopy = () => {
    if (document?.text) {
      navigator.clipboard.writeText(document.text);
      setAlert("Copied to clipboard", "success", true);
    } else {
      setAlert("No text to copy", "error", true);
    }
  };

  return (
    <CoreLayout pageHeader="Cover Letter" isLoading={loading} isError={!!error}>
      <Stack
        p={4}
        sx={{ overflowY: "auto", backgroundColor: colors.background.secondary }}
      >
        <Stack
          mb={2}
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Cover Letter</Typography>
          <Stack
            direction="row"
            spacing={1}
            flex={1}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button variant="text" onClick={handleCopy}>
              Copy
            </Button>
            <Button disabled variant="text">
              Download PDF
            </Button>
          </Stack>
        </Stack>
        <Typography sx={{ whiteSpace: "pre-wrap" }}>
          {document?.text}
        </Typography>
      </Stack>
    </CoreLayout>
  );
};

export default CoverLetterDetailPage;
