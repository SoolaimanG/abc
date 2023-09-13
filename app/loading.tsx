import Logo from "@/Components/logo";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Logo enableColor={false} loading={true} showIcon={true} />
    </div>
  );
};

export default Loading;
