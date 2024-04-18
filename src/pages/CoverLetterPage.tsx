import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/Input";
import Stepper from "../components/Stepper";
import Typography from "../components/Typography";
import UploadButton from "../components/UploadButton";
import CoreLayout from "../layouts/CoreLayout";
import { useGenerateCoverLetterMutation } from "../services/api";
import { colors } from "../styles/colors";
import { TCoverLetterFormInputs } from "../utils/types";
import { coverLetterFormSchema } from "../utils/validation";

const defaultFormValues: TCoverLetterFormInputs = {
  resume: {
    resumeText: "",
    resumePDF: undefined,
  },
  jobListing: {
    jobListingText: "",
  },
  parameters: {
    name: "",
    company: "",
    role: "",
    length: 0,
    paragraphs: 0,
  },
};

const MAX_STEPS = 3;

const CoverLetterPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const [triggerGenerateCoverLetter] = useGenerateCoverLetterMutation();

  const {
    handleSubmit,
    formState: { errors: formErrors },
    control,
    watch,
    trigger,
    setValue,
  } = useForm<TCoverLetterFormInputs>({
    defaultValues: defaultFormValues,
    resolver: yupResolver(coverLetterFormSchema),
  });

  const resumePDF = watch("resume.resumePDF");
  const resumeText = watch("resume.resumeText");
  const jobListingText = watch("jobListing.jobListingText");

  const onSubmit: SubmitHandler<TCoverLetterFormInputs> = (data) =>
    triggerGenerateCoverLetter(data);

  const incrementStep = async () => {
    if (await validateStep(activeStep)) {
      setActiveStep(activeStep + 1);
    }
  };

  const decrementStep = () => setActiveStep(activeStep - 1);

  const steps = [
    {
      number: 0,
      title: "Upload Resume",
      body: "Leverage the power of AI to build a custom cover letter for your next job application. Upload your resume to get started.",
    },
    {
      number: 1,
      title: "Upload Job Description",
      body: "Upload the job description for the role you are applying for. This will help us tailor your cover letter to the job.",
    },
    {
      number: 2,
      title: "Configure Parameters",
      body: "Configure additional parameters to customize your cover letter.",
    },
  ];

  const stepTitles = useMemo(() => steps.map((step) => step.title), [steps]);

  const validateStep = async (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return await trigger("resume.resumeText");
      case 1:
        return true;
      case 2:
        return true;
      default:
        return false;
    }
  };

  // return false if disabled
  const enableNext = useMemo(() => {
    switch (activeStep) {
      case 0:
        return !!resumePDF || !!resumeText;
      case 1:
        return !!jobListingText;
      case 2:
        return true;
      default:
        return false;
    }
  }, [activeStep, resumePDF, resumeText, jobListingText]);

  return (
    <CoreLayout>
      <Stack
        height="100%"
        justifyContent={{ xs: "inherit", sm: "center" }}
        alignItems={{ xs: "inherit", sm: "center" }}
        sx={{ backgroundColor: colors.background.secondary }}
      >
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            width: { xs: "100%", sm: "75%" },
            height: { xs: "100%", sm: "75%" },
          }}
        >
          <Stack flex={1} padding={2}>
            <Stack spacing={2}>
              <Typography variant="h5" textAlign="center">
                Generate Cover Letter
              </Typography>
              <Stepper activeStep={activeStep} steps={stepTitles} />
            </Stack>
            <Divider sx={{ marginY: "2rem" }} />
            <form
              style={{
                flex: 1,
                flexDirection: "column",
                display: "flex",
                justifyContent: "space-between",
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              {/** BODY **/}
              <Stack flex={2}>
                {activeStep === 0 ? (
                  <>
                    <Typography fontSize="14px" fontStyle="italic">
                      Leverage the power of AI to build a custom cover letter
                      for your next job application. Upload your resume to get
                      started.
                    </Typography>
                    <Stack flex={1} justifyContent="center" alignItems="center">
                      <UploadButton
                        variant="contained"
                        sx={{ color: "white" }}
                        onChange={(e: any) =>
                          setValue("resume.resumePDF", e.target.files[0])
                        }
                        success={!!resumePDF}
                        text={!resumePDF ? "Upload Resume" : "Resume Uploaded"}
                      />
                    </Stack>
                  </>
                ) : activeStep === 1 ? (
                  <>
                    <Typography fontSize="14px" fontStyle="italic">
                      Upload the job description for the role you are applying
                      for. This will help us tailor your cover letter to the
                      job.
                    </Typography>
                    <Stack flex={1} justifyContent="center">
                      <Controller
                        name="jobListing.jobListingText"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            name="jobListingText"
                            placeholder="Paste job description here"
                            required
                            multiline
                            rows={4}
                          />
                        )}
                      />
                    </Stack>
                  </>
                ) : (
                  <>
                    <Typography fontSize="14px" fontStyle="italic">
                      Configure additional parameters to customize your cover
                      letter.
                    </Typography>
                  </>
                )}
              </Stack>

              {/** FOOTER **/}
              <Stack
                flex={1}
                direction="row"
                alignItems="flex-end"
                justifyContent="space-between"
              >
                <Button
                  variant="text"
                  disabled={activeStep === 0}
                  onClick={decrementStep}
                >
                  Back
                </Button>
                {activeStep === MAX_STEPS - 1 ? (
                  <Button variant="contained" type="submit">
                    Generate
                  </Button>
                ) : (
                  <Button
                    disabled={!enableNext}
                    variant="text"
                    onClick={incrementStep}
                  >
                    Next
                  </Button>
                )}
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Stack>
    </CoreLayout>
  );
};

export default CoverLetterPage;
