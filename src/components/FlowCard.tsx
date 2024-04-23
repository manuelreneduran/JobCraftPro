import { Divider, Stack } from "@mui/material";
import Stepper from "./Stepper";
import Typography from "./Typography";

type TFlowCardProps = {
  headerTitle: string;
  steps: string[];
  body: React.ReactNode;
  footer: React.ReactNode;
  activeStep: number;
};

const FlowCard = ({
  headerTitle,
  steps,
  body,
  activeStep,
  footer,
}: TFlowCardProps) => {
  return (
    <Stack flex={1} padding={2}>
      <Stack spacing={2}>
        <Typography variant="h5" textAlign="center">
          {headerTitle}
        </Typography>
        <Stepper activeStep={activeStep} steps={steps} />
      </Stack>
      <Divider sx={{ marginY: "1rem" }} />

      {/** BODY **/}
      <Stack flex={2}>{body}</Stack>

      {/** FOOTER **/}
      <Stack
        flex={1}
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        {footer}
      </Stack>
    </Stack>
  );
};

export default FlowCard;
