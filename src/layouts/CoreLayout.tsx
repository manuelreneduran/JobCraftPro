import NavMenu from "../components/NavMenu";

type CoreLayoutProps = {
  children: React.ReactNode;
  pageHeader?: string;
  isLoading?: boolean;
  isError?: boolean;
};

const CoreLayout = ({
  children,
  pageHeader,
  isLoading = false,
  isError = false,
}: CoreLayoutProps) => {
  return (
    <NavMenu isError={isError} isLoading={isLoading} pageHeader={pageHeader}>
      {children}
    </NavMenu>
  );
};
export default CoreLayout;
