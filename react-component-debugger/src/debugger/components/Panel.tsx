export default function Panel({ children }: { children: React.ReactNode }) {
  return <div style={{
    background: 'rgb(0, 0, 0)',
    color: 'rgb(255, 255, 255)',
    padding: '1rem',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: '200px',
    maxHeight: '65dvh',
    overflowY: 'auto',
    textAlign: 'left',
  }}>
    {children}
  </div>;
}
