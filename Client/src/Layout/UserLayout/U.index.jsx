import React from 'react';
import USidebar from './U.Sidebar';
import UHeader from './U.Header';

function index({ children, title }) {
  return (
    <div className="bg-dry xl:h-screen flex-colo ">
      <div className="grid xl:grid-cols-12 w-full 2xl:max-w-[2000px]">
        <div className="col-span-2 xl:block hidden">
          <USidebar />
        </div>
        <div className="col-span-10 xl:h-screen overflow-y-scroll relative">
          <UHeader title={title} />
          <div className="xs:px-8 px-2 pt-24">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default index;
