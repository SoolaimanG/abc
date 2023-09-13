type chipProps = {
  title: string;
  filled?: boolean;
};

const TitleChip = (props: chipProps) => {
  const { title, filled } = props;
  return (
    <div
      className={`px-2 text-3 cursor-pointer py-1 rounded-2xl ${
        filled
          ? "text-blue-700 font-medium bg-blue-100"
          : "border-solid border-[1.5px] border-blue-700"
      }`}
    >
      {title}
    </div>
  );
};

export default TitleChip;
