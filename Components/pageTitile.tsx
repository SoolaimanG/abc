type pageTitilesProps = {
  name: string;
};

const PageTitile = (props: pageTitilesProps) => {
  const { name } = props;
  return (
    <h2 className="text-4xl w-full text-center text-gradient font-semibold">
      {name}
    </h2>
  );
};

export default PageTitile;
