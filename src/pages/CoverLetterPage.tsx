import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Paper, Slider } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useCallback, useMemo, useState } from "react";
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
import Loader from "../components/Loader";
import FlowCard from "../components/FlowCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, saveDocument } from "../services/firebase";
import useAlert from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";

const defaultFormValues: TCoverLetterFormInputs = {
  resume: {
    resumeText: "",
    resumePDF: undefined,
  },
  jobListing: {
    jobListingText: "",
  },
  parameters: {
    length: 200,
    paragraphs: 4,
  },
};

const MAX_STEPS = 4;

const CoverLetterPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [
    triggerGenerateCoverLetter,
    { isLoading: isLoadingGenerateCoverLetter },
  ] = useGenerateCoverLetterMutation();

  const [user] = useAuthState(auth);

  const { setAlert } = useAlert();

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    trigger,
    setValue,
    reset: resetForm,
  } = useForm<TCoverLetterFormInputs>({
    mode: "all",
    defaultValues: defaultFormValues,
    resolver: yupResolver(coverLetterFormSchema),
  });

  const resumePDF = watch("resume.resumePDF");
  const resumeText = watch("resume.resumeText");
  const jobListingText = watch("jobListing.jobListingText");

  const onSubmit: SubmitHandler<TCoverLetterFormInputs> = async (data) => {
    let form = {
      resumeText: data.resume?.resumeText,
      resumePDF: data.resume?.resumePDF,
      jobListingText: data.jobListing?.jobListingText,
      length: data.parameters.length?.toString(),
      paragraphs: data.parameters.paragraphs?.toString(),
    };

    try {
      // set loading state
      const response = await triggerGenerateCoverLetter(form).unwrap();
      const coverLetterText = response.result;

      // save the document, then navigate to the cover letter page
      if (user?.uid && coverLetterText) {
        setIsLoading(true);
        const doc = await saveDocument(user?.uid, {
          text: coverLetterText,
          jobListingText: form.jobListingText,
          length: form.length,
          paragraphs: form.paragraphs,
        });
        navigate(`/cover-letter/${doc.id}`);
      }
    } catch (e: any) {
      console.log(e);
      setAlert(e.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const incrementStep = async () => {
    if (await validateStep(activeStep)) {
      setActiveStep(activeStep + 1);
    }
  };

  const decrementStep = () => setActiveStep(activeStep - 1);

  const steps = [
    "Upload Resume",
    "Add Job Description",
    "Configure Parameters",
  ];

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

  const reset = () => {
    setActiveStep(0);
    resetForm();
  };

  const renderBody = useCallback(() => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Typography fontSize="14px" fontStyle="italic">
              Leverage the power of AI to build a custom cover letter for your
              next job application. Upload your resume to get started.
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
        );
      case 1:
        return (
          <>
            <Typography fontSize="14px" fontStyle="italic">
              Upload the job description for the role you are applying for. This
              will help us tailor your cover letter to the job.
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
        );
      case 2:
        return (
          <Stack spacing={3}>
            <Typography fontSize="14px" fontStyle="italic">
              Configure additional parameters to customize your cover letter.
              The default values are recommended.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Stack flex={1}>
                <Typography fontSize="14px">Length (words)</Typography>
                <Controller
                  name="parameters.length"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      step={25}
                      marks
                      min={50}
                      max={300}
                      valueLabelDisplay="on"
                    />
                  )}
                />
              </Stack>
              <Stack flex={1}>
                <Typography fontSize="14px">Paragraphs</Typography>
                <Controller
                  name="parameters.paragraphs"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      {...field}
                      step={1}
                      marks
                      min={1}
                      max={6}
                      valueLabelDisplay="on"
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Stack>
        );
      default:
        return (
          <>
            <Loader />
          </>
        );
    }
  }, [activeStep, control, handleSubmit, isLoading, resumePDF, setValue]);

  const renderFooter = useCallback(() => {
    const isLastStep = activeStep === MAX_STEPS - 1;
    return (
      <>
        {!isLastStep ? (
          <Button
            variant="text"
            disabled={activeStep === 0}
            onClick={decrementStep}
          >
            Back
          </Button>
        ) : null}

        {isLastStep ? (
          <Button variant="contained" onClick={reset}>
            Reset
          </Button>
        ) : activeStep === 2 ? (
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Generate
          </Button>
        ) : (
          <Button disabled={!enableNext} variant="text" onClick={incrementStep}>
            Next
          </Button>
        )}
      </>
    );
  }, [activeStep, decrementStep, enableNext, incrementStep, reset]);

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
          {isLoadingGenerateCoverLetter || isLoading ? (
            <Stack flex={1} justifyContent="center" alignItems="center">
              <Loader text="Loading..." />
            </Stack>
          ) : (
            <FlowCard
              headerTitle="Generate Cover Letter"
              steps={steps}
              body={renderBody()}
              footer={renderFooter()}
              activeStep={activeStep}
            />
          )}
        </Paper>
      </Stack>
    </CoreLayout>
  );
};

export default CoverLetterPage;
