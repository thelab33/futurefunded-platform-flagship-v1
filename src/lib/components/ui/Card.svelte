<script lang="ts">
  import { clsx } from 'clsx';
  import type { Snippet } from 'svelte';

  type CardTag = 'section' | 'article' | 'div' | 'aside';
  type CardTone = 'default' | 'premium' | 'soft' | 'brand';

  type Props = {
    as?: CardTag;
    tone?: CardTone;
    interactive?: boolean;
    class?: string;
    children?: Snippet;
    [key: string]: any;
  };

  let {
    as = 'section',
    tone = 'default',
    interactive = false,
    class: className = '',
    children,
    ...rest
  }: Props = $props();

  function toneClass(tone: CardTone) {
    return {
      default:
        'rounded-[var(--ff-radius-xl)] border border-[var(--ff-border)] bg-[linear-gradient(180deg,var(--ff-panel-strong),var(--ff-panel-soft))] shadow-[var(--ff-shadow-sm)]',
      premium:
        'rounded-[var(--ff-radius-xl)] border border-[var(--ff-border-strong)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[var(--ff-shadow)]',
      soft:
        'rounded-[var(--ff-radius-xl)] border border-[var(--ff-border-soft)] bg-[rgba(255,255,255,0.03)] shadow-[var(--ff-shadow-xs)]',
      brand:
        'rounded-[var(--ff-radius-xl)] border border-[var(--ff-border-brand)] bg-[linear-gradient(180deg,var(--ff-brand-soft),rgba(255,255,255,0.03))] shadow-[var(--ff-shadow-brand)]'
    }[tone];
  }

  function interactiveClass(enabled: boolean) {
    return enabled
      ? 'transition-transform duration-200 hover:-translate-y-[1px]'
      : '';
  }

  function getClasses() {
    return clsx(
      'ff-card backdrop-blur-[var(--ff-blur-md)] supports-[backdrop-filter]:backdrop-blur-[var(--ff-blur-md)]',
      toneClass(tone),
      interactiveClass(interactive),
      className
    );
  }
</script>

<svelte:element this={as} class={getClasses()} {...rest}>
  {@render children?.()}
</svelte:element>
