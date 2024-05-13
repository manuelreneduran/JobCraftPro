import { Button, Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "../components/Typography";
import useAlert from "../hooks/useAlert";
import CoreLayout from "../layouts/CoreLayout";
import { getCoverLetter } from "../services/firebase/documents";
import { colors } from "../styles/colors";
import { TGetCoverLetterQueryResponse } from "../utils/types";
import useAppBarHeight from "../hooks/useAppBarHeight";

const CoverLetterDetailPage = () => {
  const [document, setDocument] = useState<TGetCoverLetterQueryResponse | null>(
    null
  );
  const params = useParams();

  const height = useAppBarHeight();

  const { setErrorAlert, setAlert } = useAlert();

  const fetchDocument = useCallback(
    async (docId: string) => {
      try {
        const response = await getCoverLetter(docId);
        setDocument(response);
      } catch (e: unknown) {
        setErrorAlert(e);
      }
    },
    [setErrorAlert, setDocument]
  );

  useEffect(() => {
    if (params.id && !document) {
      fetchDocument(params.id);
    }
  }, [params, fetchDocument, document]);

  const handleCopy = () => {
    if (document?.text) {
      navigator.clipboard.writeText(document.text);
      setAlert("Copied to clipboard", "success", true);
    } else {
      setAlert("No text to copy", "error", true);
    }
  };

  return (
    <CoreLayout pageHeader="Cover Letter">
      <Stack
        p={4}
        height={`calc(100vh - ${height}px - 48px)`}
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
