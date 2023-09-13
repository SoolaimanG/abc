import React from "react";

const EmptyState = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full justify-center items-center gap-3">
      <div className="w-7 bg-gray-300 h-[1.5px]" />
      <span>{title}</span>
      <div className="w-7 bg-gray-300 h-[1.5px]" />
    </div>
  );
};

export default EmptyState;
