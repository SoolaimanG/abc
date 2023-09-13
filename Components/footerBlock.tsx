"use client";

const FooterBlock = () => {
  const link = typeof window !== "undefined" ? location.origin : ""; // Get the origin link

  return (
    <div className="w-full flex flex-col items-center justify-end h-full">
      <p className="text-lg">
        Made with ❤{" "}
        <a href={link}>
          <strong className="text-xl font-bold">K</strong>
          onnect
        </a>
      </p>
    </div>
  );
};

export default FooterBlock;
