"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type LucideIcon, ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";

const selectTriggerVariants = cva(
  "group flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-white px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      variant: {
        default: "hover:border-primary/50",
        outline: "border-2 hover:border-primary/60",
        ghost: "border-transparent hover:bg-hero-accent/10",
      },
      size: {
        sm: "h-8 px-2 text-xs gap-2",
        default: "h-9 px-3 text-sm gap-3",
        lg: "h-10 px-4 text-base gap-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const selectContentVariants = cva(
  "relative z-50 max-h-[300px] min-w-[8rem] overflow-hidden rounded-2xl border border-border bg-white text-dark-text shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      position: {
        popper:
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        "item-aligned": "",
      },
    },
    defaultVariants: {
      position: "popper",
    },
  }
);

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> & {
    placeholder?: string;
  }
>(({ className, placeholder, ...props }, ref) => (
  <SelectPrimitive.Value
    ref={ref}
    className={cn("select-none tabular-nums", className)}
    placeholder={
      placeholder && <span className="text-muted select-none">{placeholder}</span>
    }
    {...props}
  />
));
SelectValue.displayName = SelectPrimitive.Value.displayName;

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {
  icon?: LucideIcon;
  placeholder?: string;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, variant, size, icon: Icon, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, size }), className)}
    {...props}
  >
    <div className="flex min-w-0 flex-1 items-center gap-2">
      {Icon && <Icon size={16} className="shrink-0 text-muted" />}
      {children}
    </div>
    <SelectPrimitive.Icon asChild>
      <ChevronDown
        size={16}
        className="shrink-0 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180"
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {
  position?: "popper" | "item-aligned";
}

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(selectContentVariants({ position }), className)}
      position={position}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.12 }}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "max-h-[280px] overflow-y-auto p-2",
            position === "popper" &&
              "h-fit w-full min-w-(--radix-select-trigger-width)"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </motion.div>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-3 py-2 text-xs font-semibold text-muted", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  icon?: LucideIcon;
}

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, icon: Icon, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-xl py-2 pl-3 pr-8 text-sm outline-none focus:bg-hero-accent/10 focus:text-dark-text data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  >
    <motion.div
      className="flex w-full items-center gap-2"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.1 }}
    >
      {Icon && <Icon size={16} className="shrink-0" />}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </motion.div>
    <span className="absolute right-3 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.1 }}>
          <Check size={16} />
        </motion.div>
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  selectTriggerVariants,
};

