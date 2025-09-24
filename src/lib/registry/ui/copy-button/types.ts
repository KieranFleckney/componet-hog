import type { Snippet } from 'svelte';
import type { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
import type { HTMLAnchorAttributes, HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
import type { WithChildren, WithoutChildren } from 'bits-ui';
import type { WithElementRef } from '$lib/utils';
import type { ButtonSize, ButtonVariant } from '$lib/components/ui/button';

export type CopyButtonPropsWithoutHTML = WithChildren<
	WithElementRef<HTMLButtonAttributes> &
	WithElementRef<HTMLAnchorAttributes> & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	} & {
		ref?: HTMLButtonElement | null;
		text: string;
		icon?: Snippet<[]>;
		animationDuration?: number;
		onCopy?: (status: UseClipboard['status']) => void;
	}
>;

export type CopyButtonProps = CopyButtonPropsWithoutHTML &
	WithoutChildren<HTMLAttributes<HTMLButtonElement>>;
