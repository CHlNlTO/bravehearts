"use client";

import { useRef, useState, useEffect, useTransition, useId } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useClickOutside from "@/hooks/useClickOutside";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import { addBrave } from "@/app/actions/addBraveAction";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

export default function AddBraveForm() {
  const uniqueId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [brave, setBrave] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await addBrave(formData);
      if (result.success) {
        toast({
          title: "Your Brave has been added.",
          description: `Date: ${new Date().toLocaleDateString()}`,
        });
        formRef.current?.reset();
        setBrave("");
        setIsOpen(false);
      } else {
        setError(result.error || "Failed to add record. Please try again.");
        toast({
          title: "Error",
          description: result.error || "Failed to add record",
          variant: "destructive",
        });
      }
    });
  }

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setError(null);
    setBrave("");
  };

  useClickOutside(formContainerRef, () => {
    closeMenu();
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-center justify-center">
        <motion.button
          key="button"
          layoutId={`popover-${uniqueId}`}
          className="btn focus-outline inline-flex cursor-pointer select-none flex-row
          items-center border no-underline shadow-none transition
          duration-200 ease-in-out typo-callout justify-center font-bold iconOnly h-10 w-12 p-0 rounded-xl btn-tertiaryFloat z-1 justify-self-center border-border-subtlest-tertiary"
          style={{
            borderRadius: 8,
          }}
          onClick={openMenu}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className="text-sm"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 pointer-events-none"
            >
              <path
                d="M18.361 11.259a.75.75 0 01-.009 1.484l-.102.007h-5.5v5.5a.75.75 0 01-1.491.111l-.009-.11V12.75h-5.5l-.111-.009a.75.75 0 01.009-1.484l.102-.007h5.5v-5.5a.75.75 0 011.491-.111l.009.11v5.501h5.5l.111.009z"
                fill="currentcolor"
                fillRule="evenodd"
              ></path>
            </svg>
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className="absolute h-[200px] w-[364px] bottom-14 sm:top-14 z-10 overflow-hidden border border-zinc-950/10 bg-white outline-none dark:bg-zinc-700"
              style={{
                borderRadius: 12,
              }}
            >
              <form
                ref={formRef}
                action={handleSubmit}
                className="flex h-full flex-col"
              >
                <motion.span
                  layoutId={`popover-label-${uniqueId}`}
                  aria-hidden="true"
                  style={{
                    opacity: brave ? 0 : 1,
                  }}
                  className="absolute left-4 top-3 select-none text-sm text-zinc-500 dark:text-zinc-400"
                >
                  What&apos;s on your mind?
                </motion.span>
                <textarea
                  name="brave"
                  className="h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none z-50"
                  value={brave}
                  onChange={(e) => setBrave(e.target.value)}
                  autoFocus
                />
                <div key="close" className="flex justify-between px-4 py-3">
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={closeMenu}
                    aria-label="Close popover"
                  >
                    <ArrowLeftIcon
                      size={16}
                      className="text-zinc-900 dark:text-zinc-100"
                    />
                  </button>
                  <button
                    className="relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800"
                    type="submit"
                    aria-label="Submit form"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Submit Brave"}
                  </button>
                </div>
                {error && <p className="text-red-500 px-4 text-xs">{error}</p>}
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
