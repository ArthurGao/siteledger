export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="pageTitle">{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
    </>
  );
}
