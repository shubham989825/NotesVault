import React from "react";
import { cn } from "../../lib/utils"; 

export const PulsatingButton = React.forwardRef(
  ({ className, children, pulseColor = "#808080", duration = "1.5s", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-blue-600 text-white relative flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-center",
          className
        )}
        style={{
          "--pulse-color": pulseColor,
          "--duration": duration,
        }}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          style={{
            backgroundColor: "var(--pulse-color)",
            animation: `pulse ${duration} infinite`,
          }}
        />
      </button>
    );
  }
);

PulsatingButton.displayName = "PulsatingButton";
