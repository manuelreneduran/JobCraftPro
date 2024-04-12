import Header from "../components/Header";

type CoreLayoutProps = {
    children: React.ReactNode;
}

const CoreLayout = ({ children }: CoreLayoutProps) => (
    <div>
        <Header />
        {children}
    </div>
);
export default CoreLayout;