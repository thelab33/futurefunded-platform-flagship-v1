<script lang="ts">
  import { clsx } from 'clsx';
  import type { Snippet } from 'svelte';

  type Variant = 'primary' | 'secondary' | 'ghost' | 'pill';
  type Size = 'sm' | 'md' | 'lg';

  type Props = {
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: Variant;
    size?: Size;
    class?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    target?: HTMLAnchorElement['target'];
    rel?: string;
    download?: HTMLAnchorElement['download'];
    children?: Snippet;
    [key: string]: any;
  };

  let {
    href = undefined,
    type = 'button',
    variant = 'primary',
    size = 'md',
    class: className = '',
    disabled = false,
    fullWidth = false,
    target = undefined,
    rel = undefined,
    download = undefined,
    children,
    ...rest
  }: Props = $props();

  const base =
    'ff-btn select-none align-middle';

  function getVariantClass(variant: Variant) {
    return {
      primary: 'ff-btn--primary',
      secondary: 'ff-btn--secondary',
      ghost: 'ff-btn--ghost',
      pill:
        'border border-[var(--ff-border-soft)] bg-white/[0.05] text-[var(--ff-text-soft)] shadow-none hover:bg-white/[0.08] hover:text-[var(--ff-text)]'
    }[variant];
  }

  function getSizeClass(size: Size) {
    return {
      sm: 'min-h-[var(--ff-btn-h-sm)] px-3.5 text-[0.82rem]',
      md: 'min-h-[var(--ff-btn-h-md)] px-4.5 text-[0.95rem]',
      lg: 'min-h-[var(--ff-btn-h-lg)] px-5.5 text-[1rem]'
    }[size];
  }

  function getWidthClass(fullWidth: boolean) {
    return fullWidth ? 'w-full' : '';
  }

  function getDisabledClass(disabled: boolean) {
    return disabled ? 'pointer-events-none opacity-55' : '';
  }

  function getClasses() {
    return clsx(
      base,
      getVariantClass(variant),
      getSizeClass(size),
      getWidthClass(fullWidth),
      getDisabledClass(disabled),
      className
    );
  }

  function getSafeRel(target?: string, rel?: string) {
    if (target !== '_blank') return rel;

    const parts = new Set((rel ?? '').split(/\s+/).filter(Boolean));
    parts.add('noopener');
    parts.add('noreferrer');
    return Array.from(parts).join(' ');
  }

  function handleAnchorClick(event: MouseEvent) {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
</script>

{#if href}
  <a
    {...rest}
    class={getClasses()}
    href={href}
    target={target}
    rel={getSafeRel(target, rel)}
    download={download}
    aria-disabled={disabled ? 'true' : undefined}
    tabindex={disabled ? -1 : undefined}
    onclick={handleAnchorClick}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    {...rest}
    class={getClasses()}
    {type}
    {disabled}
  >
    {@render children?.()}
  </button>
{/if}
