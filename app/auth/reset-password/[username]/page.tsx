import ResetPassword from "@/Pages/resetPassword";

type paramsProps = {
  username: string;
};

const Page = ({ params }: { params: paramsProps }) => {
  console.log(params.username);
  return (
    <div>
      <ResetPassword params={params?.username} />
    </div>
  );
};

export default Page;
