const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto h-dvh max-h-[1920px] w-screen max-w-[1920px] bg-transparent p-2 md:p-4 lg:p-6">
      <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-white p-4 md:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
