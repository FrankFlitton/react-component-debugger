export default function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="__debugger_ui_root p-4"
      id="__debugger_ui_root"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: "200px",
        maxHeight: "65dvh",
        overflowY: "auto",
        textAlign: "left",
      }}
    >
      <div
        style={{
          minHeight: "200px",
          maxHeight: "65dvh",
          overflowY: "auto",
        }}
        className="
        text-neutral-900 dark:text-slate-100
        bg-neutral-100 dark:bg-slate-800
        border-solid border-2 border-neutral-200 dark:border-slate-700
        rounded-xl
        shadow-xl
        m-4
        "
      >
        {children}
      </div>
    </div>
  );
}
