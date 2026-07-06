import type React from "react";

// This module is type-only. At runtime inside Lumen, the host's import map
// redirects @lumen-media/ui to /__lumen/ui.js which serves the real components.

// ─── Prop interfaces ────────────────────────────────────────────────────────

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?:
		| "default"
		| "xs"
		| "sm"
		| "lg"
		| "icon"
		| "icon-xs"
		| "icon-sm"
		| "icon-lg";
	title?: string;
	render?: React.ReactElement;
}

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface LabelProps
	extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export interface SwitchProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

export interface DialogRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
	dismissible?: boolean;
	children?: React.ReactNode;
}
export interface DialogTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface DialogContentProps
	extends React.HTMLAttributes<HTMLDivElement> {
	showCloseButton?: boolean;
}
export interface DialogTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface DialogDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface DialogFooterProps
	extends React.HTMLAttributes<HTMLDivElement> {
	showCloseButton?: boolean;
}
export interface DialogCloseProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface DialogOverlayProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface DialogPortalProps {
	children?: React.ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface TabsRootProps extends React.HTMLAttributes<HTMLDivElement> {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	orientation?: "horizontal" | "vertical";
}
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface TabsTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	value: string;
}
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
}
export interface TabsIndicatorProps
	extends React.HTMLAttributes<HTMLSpanElement> {}

export interface SelectRootProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	disabled?: boolean;
	children?: React.ReactNode;
}
export interface SelectTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface SelectValueProps
	extends React.HTMLAttributes<HTMLSpanElement> {
	placeholder?: string;
}
export interface SelectContentProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
	disabled?: boolean;
}
export interface SelectLabelProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface SelectGroupProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface SelectSeparatorProps
	extends React.HTMLAttributes<HTMLDivElement> {}

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
export interface TooltipTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface TooltipContentProps
	extends React.HTMLAttributes<HTMLDivElement> {}

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
	viewportClassName?: string;
	viewportProps?: React.HTMLAttributes<HTMLDivElement> & {
		ref?: React.Ref<HTMLDivElement>;
	};
	ref?: React.Ref<HTMLDivElement>;
}
export interface ScrollBarProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: "horizontal" | "vertical";
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface SliderProps
	extends Omit<React.HTMLAttributes<HTMLSpanElement>, "defaultValue"> {
	value?: number[];
	defaultValue?: number[];
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	orientation?: "horizontal" | "vertical";
	onValueChange?: (value: number[]) => void;
	onValueCommit?: (value: number[]) => void;
	thumbClassName?: string;
	trackClassName?: string;
	rangeClassName?: string;
}

export interface CheckboxProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	checked?: boolean | "indeterminate";
	defaultChecked?: boolean;
	onCheckedChange?: (checked: boolean | "indeterminate") => void;
}

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
	value?: number;
	max?: number;
}

export interface ToggleProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "secondary" | "outline";
	size?: "default" | "sm" | "lg";
	pressed?: boolean;
	defaultPressed?: boolean;
	onPressedChange?: (pressed: boolean) => void;
}

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}
export interface KbdGroupProps extends React.HTMLAttributes<HTMLElement> {}

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "secondary" | "outline";
	size?: "default" | "sm" | "lg";
	spacing?: number;
	orientation?: "horizontal" | "vertical";
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (value: string[]) => void;
	children?: React.ReactNode;
}
export interface ToggleGroupItemProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "secondary" | "outline";
	size?: "default" | "sm" | "lg";
	value: string;
}

export interface HoverCardRootProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	openDelay?: number;
	closeDelay?: number;
	children?: React.ReactNode;
}
export interface HoverCardTriggerProps
	extends React.HTMLAttributes<HTMLElement> {
	render?: React.ReactElement;
}
export interface HoverCardContentProps
	extends React.HTMLAttributes<HTMLDivElement> {
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
	align?: "start" | "center" | "end";
	alignOffset?: number;
}

export interface ComboboxProps {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	inputValue?: string;
	onInputValueChange?: (value: string) => void;
	children?: React.ReactNode;
}
export interface ComboboxInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	showTrigger?: boolean;
	showClear?: boolean;
}
export interface ComboboxContentProps
	extends React.HTMLAttributes<HTMLDivElement> {
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
	align?: "start" | "center" | "end";
	alignOffset?: number;
}
export interface ComboboxListProps
	extends React.HTMLAttributes<HTMLUListElement> {}
export interface ComboboxItemProps extends React.HTMLAttributes<HTMLLIElement> {
	value: string;
	disabled?: boolean;
}
export interface ComboboxGroupProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface ComboboxLabelProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface ComboboxCollectionProps {
	children?: React.ReactNode;
}
export interface ComboboxEmptyProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface ComboboxSeparatorProps
	extends React.HTMLAttributes<HTMLDivElement> {}

export interface AlertDialogRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
	children?: React.ReactNode;
}
export interface AlertDialogContentProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface AlertDialogDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface AlertDialogActionProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface AlertDialogCancelProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface AlertDialogTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface AlertDialogHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogFooterProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogMediaProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogOverlayProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface AlertDialogPortalProps {
	children?: React.ReactNode;
}

export interface PopoverRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
	children?: React.ReactNode;
}
export interface PopoverTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface PopoverContentProps
	extends React.HTMLAttributes<HTMLDivElement> {
	align?: "start" | "center" | "end";
	alignOffset?: number;
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
}
export interface PopoverHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface PopoverTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface PopoverDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface DropdownMenuRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
	modal?: boolean;
	children?: React.ReactNode;
}
export interface DropdownMenuTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface DropdownMenuContentProps
	extends React.HTMLAttributes<HTMLDivElement> {
	align?: "start" | "center" | "end";
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
}
export interface DropdownMenuItemProps
	extends React.HTMLAttributes<HTMLDivElement> {
	disabled?: boolean;
	inset?: boolean;
}
export interface DropdownMenuCheckboxItemProps
	extends React.HTMLAttributes<HTMLDivElement> {
	checked?: boolean | "indeterminate";
	onCheckedChange?: (checked: boolean) => void;
	disabled?: boolean;
}
export interface DropdownMenuRadioItemProps
	extends React.HTMLAttributes<HTMLDivElement> {
	value: string;
	disabled?: boolean;
}
export interface DropdownMenuRadioGroupProps
	extends React.HTMLAttributes<HTMLDivElement> {
	value?: string;
	onValueChange?: (value: string) => void;
}
export interface DropdownMenuLabelProps
	extends React.HTMLAttributes<HTMLDivElement> {
	inset?: boolean;
}
export interface DropdownMenuSeparatorProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface DropdownMenuShortcutProps
	extends React.HTMLAttributes<HTMLSpanElement> {}
export interface DropdownMenuGroupProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface DropdownMenuPortalProps {
	children?: React.ReactNode;
}
export interface DropdownMenuSubProps {
	children?: React.ReactNode;
}
export interface DropdownMenuSubTriggerProps
	extends React.HTMLAttributes<HTMLDivElement> {
	inset?: boolean;
}
export interface DropdownMenuSubContentProps
	extends React.HTMLAttributes<HTMLDivElement> {}

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}
export interface TableHeaderProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableBodyProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableFooterProps
	extends React.HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps
	extends React.HTMLAttributes<HTMLTableRowElement> {}
export interface TableHeadProps
	extends React.ThHTMLAttributes<HTMLTableCellElement> {}
export interface TableCellProps
	extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export interface TableCaptionProps
	extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export interface AvatarRootProps
	extends React.HTMLAttributes<HTMLSpanElement> {}
export interface AvatarImageProps
	extends React.ImgHTMLAttributes<HTMLImageElement> {}
export interface AvatarFallbackProps
	extends React.HTMLAttributes<HTMLSpanElement> {}
export interface AvatarGroupProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface AvatarGroupCountProps
	extends React.HTMLAttributes<HTMLSpanElement> {}
export interface AvatarBadgeProps
	extends React.HTMLAttributes<HTMLSpanElement> {}

export interface DrawerRootProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	defaultOpen?: boolean;
	direction?: "top" | "right" | "bottom" | "left";
	children?: React.ReactNode;
}
export interface DrawerTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface DrawerContentProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerFooterProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface DrawerDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface DrawerCloseProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	render?: React.ReactElement;
}
export interface DrawerOverlayProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface DrawerPortalProps {
	children?: React.ReactNode;
}

export interface EmptyRootProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface EmptyHeaderProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface EmptyTitleProps
	extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface EmptyDescriptionProps
	extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface EmptyContentProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface EmptyMediaProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface InputGroupRootProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface InputGroupAddonProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface InputGroupButtonProps
	extends React.HTMLAttributes<HTMLDivElement> {}
export interface InputGroupTextProps
	extends React.HTMLAttributes<HTMLSpanElement> {}
export interface InputGroupInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface InputGroupTextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

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

export const Skeleton = _stub as AnyComp<SkeletonProps>;
export const Slider = _stub as AnyComp<SliderProps>;
export const Checkbox = _stub as AnyComp<CheckboxProps>;
export const Progress = _stub as AnyComp<ProgressProps>;
export const Toggle = _stub as AnyComp<ToggleProps>;
export const ToggleGroup = _stub as AnyComp<ToggleGroupProps> & {
	ToggleGroupItem: AnyComp<ToggleGroupItemProps>;
};
export const HoverCard = _stub as AnyComp<HoverCardRootProps> & {
	HoverCardTrigger: AnyComp<HoverCardTriggerProps>;
	HoverCardContent: AnyComp<HoverCardContentProps>;
};
export const toggleVariants = _stub as unknown;
export const Kbd = _stub as AnyComp<KbdProps>;
export const KbdGroup = _stub as AnyComp<KbdGroupProps>;
export const Combobox = _stub as AnyComp<ComboboxProps> & {
	ComboboxInput: AnyComp<ComboboxInputProps>;
	ComboboxContent: AnyComp<ComboboxContentProps>;
	ComboboxList: AnyComp<ComboboxListProps>;
	ComboboxItem: AnyComp<ComboboxItemProps>;
	ComboboxGroup: AnyComp<ComboboxGroupProps>;
	ComboboxLabel: AnyComp<ComboboxLabelProps>;
	ComboboxCollection: AnyComp<ComboboxCollectionProps>;
	ComboboxEmpty: AnyComp<ComboboxEmptyProps>;
	ComboboxSeparator: AnyComp<ComboboxSeparatorProps>;
};

export const AlertDialog = _stub as AnyComp<AlertDialogRootProps> & {
	AlertDialogAction: AnyComp<AlertDialogActionProps>;
	AlertDialogCancel: AnyComp<AlertDialogCancelProps>;
	AlertDialogContent: AnyComp<AlertDialogContentProps>;
	AlertDialogDescription: AnyComp<AlertDialogDescriptionProps>;
	AlertDialogFooter: AnyComp<AlertDialogFooterProps>;
	AlertDialogHeader: AnyComp<AlertDialogHeaderProps>;
	AlertDialogMedia: AnyComp<AlertDialogMediaProps>;
	AlertDialogOverlay: AnyComp<AlertDialogOverlayProps>;
	AlertDialogPortal: AnyComp<AlertDialogPortalProps>;
	AlertDialogTitle: AnyComp<AlertDialogTitleProps>;
	AlertDialogTrigger: AnyComp<AlertDialogTriggerProps>;
};

export const Popover = _stub as AnyComp<PopoverRootProps> & {
	PopoverTrigger: AnyComp<PopoverTriggerProps>;
	PopoverContent: AnyComp<PopoverContentProps>;
	PopoverHeader: AnyComp<PopoverHeaderProps>;
	PopoverTitle: AnyComp<PopoverTitleProps>;
	PopoverDescription: AnyComp<PopoverDescriptionProps>;
};

export const DropdownMenu = _stub as AnyComp<DropdownMenuRootProps> & {
	DropdownMenuTrigger: AnyComp<DropdownMenuTriggerProps>;
	DropdownMenuContent: AnyComp<DropdownMenuContentProps>;
	DropdownMenuItem: AnyComp<DropdownMenuItemProps>;
	DropdownMenuCheckboxItem: AnyComp<DropdownMenuCheckboxItemProps>;
	DropdownMenuRadioItem: AnyComp<DropdownMenuRadioItemProps>;
	DropdownMenuRadioGroup: AnyComp<DropdownMenuRadioGroupProps>;
	DropdownMenuLabel: AnyComp<DropdownMenuLabelProps>;
	DropdownMenuSeparator: AnyComp<DropdownMenuSeparatorProps>;
	DropdownMenuShortcut: AnyComp<DropdownMenuShortcutProps>;
	DropdownMenuGroup: AnyComp<DropdownMenuGroupProps>;
	DropdownMenuPortal: AnyComp<DropdownMenuPortalProps>;
	DropdownMenuSub: AnyComp<DropdownMenuSubProps>;
	DropdownMenuSubTrigger: AnyComp<DropdownMenuSubTriggerProps>;
	DropdownMenuSubContent: AnyComp<DropdownMenuSubContentProps>;
};

export const Table = _stub as AnyComp<TableProps> & {
	TableHeader: AnyComp<TableHeaderProps>;
	TableBody: AnyComp<TableBodyProps>;
	TableFooter: AnyComp<TableFooterProps>;
	TableRow: AnyComp<TableRowProps>;
	TableHead: AnyComp<TableHeadProps>;
	TableCell: AnyComp<TableCellProps>;
	TableCaption: AnyComp<TableCaptionProps>;
};

export const Avatar = _stub as AnyComp<AvatarRootProps> & {
	AvatarImage: AnyComp<AvatarImageProps>;
	AvatarFallback: AnyComp<AvatarFallbackProps>;
	AvatarGroup: AnyComp<AvatarGroupProps>;
	AvatarGroupCount: AnyComp<AvatarGroupCountProps>;
	AvatarBadge: AnyComp<AvatarBadgeProps>;
};

export const Drawer = _stub as AnyComp<DrawerRootProps> & {
	DrawerTrigger: AnyComp<DrawerTriggerProps>;
	DrawerContent: AnyComp<DrawerContentProps>;
	DrawerHeader: AnyComp<DrawerHeaderProps>;
	DrawerFooter: AnyComp<DrawerFooterProps>;
	DrawerTitle: AnyComp<DrawerTitleProps>;
	DrawerDescription: AnyComp<DrawerDescriptionProps>;
	DrawerClose: AnyComp<DrawerCloseProps>;
	DrawerOverlay: AnyComp<DrawerOverlayProps>;
	DrawerPortal: AnyComp<DrawerPortalProps>;
};

export const Empty = _stub as AnyComp<EmptyRootProps> & {
	EmptyHeader: AnyComp<EmptyHeaderProps>;
	EmptyTitle: AnyComp<EmptyTitleProps>;
	EmptyDescription: AnyComp<EmptyDescriptionProps>;
	EmptyContent: AnyComp<EmptyContentProps>;
	EmptyMedia: AnyComp<EmptyMediaProps>;
};

export const InputGroup = _stub as AnyComp<InputGroupRootProps> & {
	InputGroupAddon: AnyComp<InputGroupAddonProps>;
	InputGroupButton: AnyComp<InputGroupButtonProps>;
	InputGroupText: AnyComp<InputGroupTextProps>;
	InputGroupInput: AnyComp<InputGroupInputProps>;
	InputGroupTextarea: AnyComp<InputGroupTextareaProps>;
};

export interface TextEditorRef {
	getMarkdown: () => string;
	setMarkdown: (md: string) => void;
	getHTML: () => string;
	focus: () => void;
	editor: unknown;
}

export interface TextEditorProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
	defaultValue?: string;
	placeholder?: string;
	onChange?: (markdown: string) => void;
	debounce?: number;
	editable?: boolean;
	children?: React.ReactNode;
}

export interface TextEditorToolbarProps
	extends React.HTMLAttributes<HTMLDivElement> {
	editorRef: React.RefObject<TextEditorRef | null>;
}

export interface BubbleMenuItem {
	children: React.ReactNode;
	action: () => void;
	active?: boolean;
}

export interface TextEditorBubbleMenuProps
	extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
	editorRef: React.RefObject<TextEditorRef | null>;
	items: BubbleMenuItem[];
}

export const TextEditor = _stub as React.ForwardRefExoticComponent<
	TextEditorProps & React.RefAttributes<TextEditorRef>
> & {
	Toolbar: AnyComp<TextEditorToolbarProps>;
	BubbleMenu: AnyComp<TextEditorBubbleMenuProps>;
};
