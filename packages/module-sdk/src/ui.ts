import type React from "react";

// This module is type-only. At runtime inside Lumen, the host's import map
// redirects @lumen-media/ui to /__lumen/ui.js which serves the real components.

// ─── Prop interfaces ────────────────────────────────────────────────────────

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
	title?: string;
	render?: React.ReactElement;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	checked?: boolean;
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
}

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
	decorative?: boolean;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "secondary" | "destructive" | "outline";
}

// Dialog
export interface DialogRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
	dismissible?: boolean;
	children?: React.ReactNode;
}
export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
	showCloseButton?: boolean;
}
export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	showCloseButton?: boolean;
}
export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface DialogOverlayProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogPortalProps { children?: React.ReactNode }

// Card
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

// Tabs
export interface TabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	orientation?: "horizontal" | "vertical";
}
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	value: string;
}
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
}
export interface TabsIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {}

// Select
export interface SelectRootProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	disabled?: boolean;
	children?: React.ReactNode;
}
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
	placeholder?: string;
}
export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
	disabled?: boolean;
}
export interface SelectLabelProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface SelectSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

// Tooltip
export interface TooltipRootProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	delay?: number;
	children?: React.ReactNode;
}
export interface TooltipProviderProps {
	delay?: number;
	children?: React.ReactNode;
}
export interface TooltipTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {}

// ScrollArea
export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
}

// ─── Component exports (typed stubs — replaced by host at runtime) ──────────

const _stub = null as unknown;
type AnyComp<P = object> = React.ComponentType<P>;

export const Button = _stub as AnyComp<ButtonProps>;
export const Input = _stub as AnyComp<InputProps>;
export const Textarea = _stub as AnyComp<TextareaProps>;
export const Label = _stub as AnyComp<LabelProps>;
export const Switch = _stub as AnyComp<SwitchProps>;
export const Separator = _stub as AnyComp<SeparatorProps>;
export const Badge = _stub as AnyComp<BadgeProps>;

export const Dialog = _stub as AnyComp<DialogRootProps> & {
	DialogTrigger: AnyComp<DialogTriggerProps>;
	DialogContent: AnyComp<DialogContentProps>;
	DialogHeader: AnyComp<React.HTMLAttributes<HTMLDivElement>>;
	DialogTitle: AnyComp<DialogTitleProps>;
	DialogDescription: AnyComp<DialogDescriptionProps>;
	DialogFooter: AnyComp<DialogFooterProps>;
	DialogClose: AnyComp<DialogCloseProps>;
	DialogOverlay: AnyComp<DialogOverlayProps>;
	DialogPortal: AnyComp<DialogPortalProps>;
};

export const Card = _stub as AnyComp<CardProps> & {
	CardHeader: AnyComp<CardHeaderProps>;
	CardTitle: AnyComp<CardTitleProps>;
	CardDescription: AnyComp<CardDescriptionProps>;
	CardContent: AnyComp<CardContentProps>;
	CardFooter: AnyComp<CardFooterProps>;
};

export const Tabs = _stub as AnyComp<TabsRootProps> & {
	TabsList: AnyComp<TabsListProps>;
	TabsTrigger: AnyComp<TabsTriggerProps>;
	TabsContent: AnyComp<TabsContentProps>;
	TabsIndicator: AnyComp<TabsIndicatorProps>;
};

export const Select = _stub as AnyComp<SelectRootProps> & {
	SelectTrigger: AnyComp<SelectTriggerProps>;
	SelectValue: AnyComp<SelectValueProps>;
	SelectContent: AnyComp<SelectContentProps>;
	SelectItem: AnyComp<SelectItemProps>;
	SelectLabel: AnyComp<SelectLabelProps>;
	SelectGroup: AnyComp<SelectGroupProps>;
	SelectSeparator: AnyComp<SelectSeparatorProps>;
};

export const Tooltip = _stub as AnyComp<TooltipRootProps> & {
	TooltipProvider: AnyComp<TooltipProviderProps>;
	TooltipTrigger: AnyComp<TooltipTriggerProps>;
	TooltipContent: AnyComp<TooltipContentProps>;
};

export const ScrollArea = _stub as AnyComp<ScrollAreaProps> & {
	ScrollBar: AnyComp<ScrollBarProps>;
};
