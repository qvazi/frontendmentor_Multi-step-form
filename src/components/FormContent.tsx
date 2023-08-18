type FormContentProps = {
  show: boolean;
};

export const FormContent = ({
  children,
  show,
}: React.PropsWithChildren<FormContentProps>) => {
  if (!show) return null;
  return <div className="FormContent">{children}</div>;
};
