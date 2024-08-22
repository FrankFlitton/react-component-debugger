const TopBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
  border-solid border-2 border-neutral-200 dark:border-slate-700
  flex justify-start items-center
  gap-2
  p-2
  "
    >
      top bar
      {children}
    </div>
  );
};

export default TopBar;
