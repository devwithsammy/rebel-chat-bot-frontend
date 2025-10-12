"use client";
import {
  ReactNode,
  useContext,
  useState,
  createContext,
  useEffect,
} from "react";

export type TVariant = "general-settings" | "profile-settings" | null;

interface IModal {
  variant: TVariant;
  showModal: boolean;
}
export interface IModalContext {
  modal: IModal;
  updateModal: (a: IModal) => void;
  closeModal: () => void;
}
const ModalContext = createContext<IModalContext | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<IModal>({
    variant: null,
    showModal: false,
  });
  const updateModal = (v: IModal) => {
    console.log("calling setmodal",v)
    setModal(v)};

  const closeModal = () =>
    setModal({
      variant: null,
      showModal: false,
    });

  return (
    <ModalContext.Provider
      value={{
        modal,
        updateModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal can only be used in a ModalProvider");
  }
  return context;
};
