import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TCoverLetterDetail } from "../utils/types";
import { getDocument } from "../services/firebase";
import useAlert from "../hooks/useAlert";
import CoreLayout from "../layouts/CoreLayout";
import Typography from "../components/Typography";
import { Button, Stack, TextField } from "@mui/material";
import { colors } from "../styles/colors";

const CoverLetterDetailPage = () => {
  const [document, setDocument] = useState<any | null>(null);
  const params = useParams();

  const { setAlert } = useAlert();
  const fetchDocument = async (docId: string) => {
    try {
      const doc = await getDocument(docId);
      setDocument(doc);
    } catch (e: any) {
      setAlert("error", e.message);
    }
  };

  useEffect(() => {
    if (params.id && !document) {
      fetchDocument(params.id);
    }
  }, [params, fetchDocument]);

  console.log(document);
  return (
    <CoreLayout>
      <Stack direction="row" height="100%">
        {/* Lft Column */}
        <Stack flex={1} p={2}>
          <Typography>Job Listing</Typography>
          <Typography>{document?.jobListingText}</Typography>
        </Stack>
        {/* Right Column */}

        <Stack
          flex={4}
          p={2}
          sx={{ backgroundColor: colors.background.secondary }}
        >
          <Stack width="100%" direction="row" justifyContent="flex-end">
            <Button variant="text">Download PDF</Button>
          </Stack>
          <Typography>Cover Letter</Typography>
          <Typography>{document.text}</Typography>
        </Stack>
      </Stack>
    </CoreLayout>
  );
};

export default CoverLetterDetailPage;
