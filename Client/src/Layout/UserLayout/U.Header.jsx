import React from "react";
import { MenuSelect } from "../../Components/Form";
import { TbUser } from "react-icons/tb";
import { AiOutlinePoweroff } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import NotificationComp from "../../Components/NotificationComp";
import { useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import MenuDrawer from "../../Components/Drawer/U.MenuDrawer";
import useGlobalStore from "../../globalStore";

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  const { user } = useGlobalStore();

  // toggle drawer
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const DropDown1 = [
    {
      title: "Profile",
      icon: TbUser,
      onClick: () => {
        navigate("/settings");
      },
    },
    {
      title: "Logout",
      icon: AiOutlinePoweroff,
      onClick: () => {
        navigate("/login");
      },
    },
  ];

  return (
    <>
      {isOpen && <MenuDrawer isOpen={isOpen} toggleDrawer={toggleDrawer} />}

      {/* cmp */}
      <div className="xl:w-5/6 w-full 2xl:max-w-[1640px] bg-dry grid md:grid-cols-2 grid-cols-12 items-center bg-opacity-95 fixed top-0 z-40 xs:px-8 px-2">
        <div className="flex items-center col-span-10 gap-4 py-4 md:col-span-1 sm:col-span-11 md:py-0">
          <button
            onClick={toggleDrawer}
            className="block w-16 h-12 text-2xl border rounded-md xl:hidden bg-greyed md:w-12 flex-colo text-textGray transitions hover:bg-border"
          >
            <BiMenu />
          </button>
          {/* search */}
          <input
            type="text"
            placeholder="Search"
            className="w-full h-12 px-4 text-sm border rounded-md md:w-96 text-main bg-dry border-border"
          />
        </div>
        <div className="items-center justify-end col-span-2 pr-4 md:col-span-1 sm:col-span-1 md:pr-0">
          <div className="flex items-center justify-center float-right gap-4">
            <NotificationComp>
              <div className="relative">
                <MdOutlineNotificationsNone className="text-2xl hover:text-subMain" />
                <span className="absolute -top-2.5 -right-2.5 font-semibold bg-subMain rounded-full px-1.5 py-0.5 text-xs text-white text-center">
                  5
                </span>
              </div>
            </NotificationComp>

            <div className="items-center hidden md:flex">
              <MenuSelect datas={DropDown1}>
                <div className="flex items-center gap-4 p-4 rounded-lg">
                  <img
                    src="/images/user1.png"
                    alt="user"
                    className="object-cover w-12 h-12 border rounded-full border-border"
                  />
                  <p className="text-sm font-medium text-textGray">
                    {user.firstName}
                  </p>
                </div>
              </MenuSelect>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
