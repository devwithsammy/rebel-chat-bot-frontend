"use client";
import { RiAccountCircleLine } from "react-icons/ri";

import { LuSettings } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { TVariant, useModal } from "@src/contexts/ModalContext";
import { IconType } from "react-icons";
import { useState } from "react";
import { FaLightbulb, FaMoon } from "react-icons/fa6";
import { useTheme } from "@src/contexts/ThemeHandler";
import { useAuth } from "@src/contexts/AuthContext";

export const SettingsModal = ({
  closeModal,
  variant,
}: {
  closeModal: () => void;
  variant: TVariant;
}) => {
  const { updateModal, modal } = useModal();
  return (
    <div>
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 w-dvw h-screen z-[100] inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      >
        {/* Modal Content */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 w-[90%] max-w-2xl animate-fadeIn min-h-[400PX] flex flex-col"
        >
          <div className="flex justify-between items-center mb-4 ">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-zinc-100">
              {variant === "general-settings"
                ? "Appearance"
                : "Profile Settings"}
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 dark:hover:text-zinc-100 hover:text-gray-800 cursor-pointer"
            >
              <MdClose />
            </button>
          </div>

          <div className="flex-grow flex flex-col md:flex-row">
            <div className="flex flex-row md:flex-col gap-2 border-b-1 md:border-b-0 md:border-r-1 border-zinc-200 dark:border-zinc-700 md:basis-[150px] px-2 py-2">
              <ModalSidebarBtn
                label="General"
                Icon={LuSettings}
                isActive={modal.variant == "general-settings"}
                handler={() =>
                  updateModal({
                    variant: "general-settings",
                    showModal: true,
                  })
                }
              />
              <ModalSidebarBtn
                label="Profile"
                isActive={modal.variant == "profile-settings"}
                Icon={RiAccountCircleLine}
                handler={() =>
                  updateModal({
                    variant: "profile-settings",
                    showModal: true,
                  })
                }
              />
            </div>
            <div className="px-4 flex-1 ">
              {variant === "general-settings" && <GeneralSettingsContent />}

              {variant === "profile-settings" && <ProfileSettingsContent />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalSidebarBtn = ({
  label,
  handler,
  Icon,
  isActive,
}: {
  label: string;
  handler: () => void;
  Icon: IconType;
  isActive: boolean;
}) => {
  return (
    <button
      onClick={handler}
      title={label}
      className="p-3 py-2 rounded-lg cursor-pointer tracking-wide font-semibold flex flex-row gap-2 items-center  dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transform "

      //   className="flex flex-row items-center gap-2 cursor-pointer py-2 hover:bg-zinc-300"
    >
      <Icon />
      <span>{label}</span>
    </button>
  );
};

const GeneralSettingsContent = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const isDarkMode = theme == "dark";
  return (
    <div className="">
      {/* Header */}
      <div className="text-left font-nunito pt-8 md:pt-0">
        <h2 className="text-base tracking-wide font-semibold text-gray-800 dark:text-white ">
          Theme
        </h2>
        <div className="flex flex-row gap-4 w-full pt-4">
          {[
            {
              label: "light",
              Icon: FaLightbulb,
              handler: () => (!isDarkMode ? null : setTheme("light")),
            },
            {
              label: "dark",
              Icon: FaMoon,
              handler: () => (isDarkMode ? null : setTheme("dark")),
            },
          ].map(({ label, Icon, handler }, i) => {
            return (
              <button
                key={label}
                onClick={handler}
                className="p-3 py-4 rounded-sm cursor-pointer tracking-wide font-semibold flex flex-col-reverse gap-2 items-center basis-[50%] w-full  bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transform "
                aria-label="Activate light mode"
              >
                <span>{label}</span>
                <Icon />
              </button>
            );
          })}
        </div>
        {/* <FaMoon /> */}
      </div>
    </div>
  );
};

/* Profile Content */
const ProfileSettingsContent = () => {
  const { logout } = useAuth();
  return (
    <div className="text-sm text-gray-700">
      {[
        {
          label: "Name",
          value: "Sample USer",
        },
        {
          label: "Email",
          value: "sampleuser@gmail.com",
        },
        {
          label: "Phone number",
          value: "",
        },
        {
          label: "Logout",
          value: "Logout",
          handler: () => logout(),
        },
      ].map(({ label, value, handler }, i) => {
        return (
          <div className=" py-4 flex flex-row justify-between items-baseline font-nunito  ">
            <div className="font-semibold tracking-wide text-zinc-900 dark:text-zinc-200">
              {label}
            </div>
            <div className="font-manrope text-base tracking-wide  text-zinc-800 dark:text-zinc-200">
              {!handler ? (
                <span>{!value ? "-" : value}</span>
              ) : (
                <button
                  onClick={handler}
                  className="py-2 px-4 rounded-lg border-2 border-transparent font-nunito hover:border-red-600 text-red-600 cursor-pointer"
                >
                  {!value ? "-" : value}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
