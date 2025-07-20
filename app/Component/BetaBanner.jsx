"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";

export default function BetaBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-400 text-white py-2 px-4 flex justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-4 py- flex items-center gap-2 text-sm md:text-base font-medium shadow-sm">
        <Rocket className="w-4 h-4 text-white" />
        <span className="flex flex-wrap items-center gap-1">
          We're currently in <strong className="font-bold">Beta!</strong> All paid features are{" "}
          <strong className="font-bold underline underline-offset-2">FREE</strong> to use.
          <span>
            Your&nbsp;
            <Link
              href="/feedback"
              className="underline font-semibold hover:text-white/90 transition"
            >
              feedback
            </Link>{" "}
            is highly appreciated!
          </span>
        </span>
      </div>
    </div>
  );
}
