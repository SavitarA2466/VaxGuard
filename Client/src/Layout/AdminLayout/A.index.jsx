import React from "react";
import ASidebar from "./A.Sidebar";
import AHeader from "./A.Header";

function index({ children, title }) {
  return (
    <div className="bg-dry xl:h-screen flex-colo ">
      <div className="grid xl:grid-cols-12 w-full 2xl:max-w-[2000px]">
        <div className="hidden col-span-2 xl:block">
          <ASidebar />
        </div>
        <div className="relative col-span-10 overflow-y-scroll xl:h-screen">
          <AHeader title={title} />
          <div className="px-2 pt-24 xs:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default index;
