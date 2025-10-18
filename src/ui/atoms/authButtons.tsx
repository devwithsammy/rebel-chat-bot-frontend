import { IconType } from "react-icons";

interface IContinueWIthProps {
  label: string;
  handler: () => void;
  Icon?: IconType;
}


export const ContinueWithCta = ({
  label,
  handler,
  Icon,
}: IContinueWIthProps) => (
  <button
    onClick={handler}
    type="button"
    className="w-full max-w-[250px] flex items-center justify-center  gap-2 tracking-wide font-nunito border-1 border-solid border-slate-200 hover-focus:border-slate-600  rounded-[30px] py-3 px-6 cursor-pointer font-medium "
  >
    {Icon &&<Icon />}
    <span>{label}</span>
  </button>
);
