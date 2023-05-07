import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../features/users/usersSlice";
import { Avatar, Menu, MenuButton, Button, MenuItem, MenuList, Flex } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function Navbar() {
  const userGlobal = useSelector((state) => state.users.user);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const profilePhoto = `http://localhost:8001${userGlobal.imagePath}`;

  return (
    <div className="sticky top-0 z-40 bg-[#161b22] text-white flex justify-between pr-5">
      {userGlobal.id ? (
        //if users have logged in
        <>
          {/* <button
            onClick={() => {
              nav("/profile");
            }}
            className="font-bold"
          >
            Welcome {userGlobal.username} !
          </button>

          <button
            onClick={() => {
              nav("/users");
            }}
          >
            Users
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("user_token");
              dispatch(resetUser());
              alert("Logout Berhasil");
              nav("/login");
            }}
          >
            Logout
          </button> */}
          <div className="sticky top-0 z-40 bg-[#161b22] text-white flex justify-between px-4 py-3 ">
            <button className="font-bold text-xl">PROFILE</button>
          </div>
          <div className="flex flex-row gap-4">
            {/* <button
              className="hover:text-gray-500 ml-1"
              onClick={() => {
                localStorage.removeItem("user_token");
                dispatch(resetUser());
                alert("Logout Berhasil");
                nav("/login");
              }}
            >
              Logout
            </button> */}
            <button className="font-bold hover:text-gray-500" onClick={() => nav("/profile")}>
              <Flex align="center" gap="3" justify="center">
                <Avatar size="sm" name={userGlobal.username} src={profilePhoto} />
                <Menu>
                  <MenuButton>
                    {userGlobal.username} <ChevronDownIcon />
                  </MenuButton>
                  <MenuList bg="#161b22" color="white" border="1px" borderColor="gray.700">
                    <MenuItem
                      bg="#161b22"
                      onClick={() => {
                        localStorage.removeItem("user_token");
                        dispatch(resetUser(), nav("/login"));
                        alert("Logout Berhasil");
                        nav("/login");
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </button>
          </div>
        </>
      ) : (
        //if users have NOT logged in
        <>
          <div className="sticky top-0 z-40 bg-[#161b22] text-white flex justify-between px-4 py-3 ">
            <button className=" font-bold text-xl">PROFILE</button>
          </div>
          <div className="flex flex-row gap-4">
            <button className="hover:text-gray-500" onClick={() => nav("/login")}>
              Login
            </button>
            <button className="hover:text-gray-500 ml-1" onClick={() => nav("/register")}>
              Register
            </button>
          </div>
        </>
      )}
    </div>
    // <div className="sticky top-0 z-40 bg-black text-white flex justify-between px-4 py-3 ">
    //   <button className="hover:text-lime-300 font-bold text-xl" onClick={() => nav("/Products")}>
    //     OKGOSTORE
    //   </button>
    //   <div className="flex flex-row gap-4">
    //     <button className="hover:text-gray-500 ml-1" onClick={() => nav("/register")}>
    //       Register
    //     </button>
    //     <button className="hover:text-gray-500" onClick={() => nav("/login")}>
    //       Login
    //     </button>
    //   </div>
    // </div>
  );
}

export default Navbar;
