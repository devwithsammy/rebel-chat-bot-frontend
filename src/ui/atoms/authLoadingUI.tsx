export const AuthLoadingUI = () => {
  return (
    <div className="flex items-center justify-center gap-2 h-dvh bg-neutral-50 text-zinc-800 dark:bg-zinc-800 dark:text-slate-100">
      <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-200 border-t-primary-500 rounded-full animate-spin"></div>
      <div className="text-lg md:text-xl tracking-wide">Loading...</div>
    </div>
  );
};
