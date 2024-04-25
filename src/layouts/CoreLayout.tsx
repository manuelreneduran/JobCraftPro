import NavMenu from "../components/NavMenu";

type CoreLayoutProps = {
  children: React.ReactNode;
  pageHeader?: string;
};

const CoreLayout = ({ children, pageHeader }: CoreLayoutProps) => {
  return <NavMenu pageHeader={pageHeader}>{children}</NavMenu>;
};
export default CoreLayout;
