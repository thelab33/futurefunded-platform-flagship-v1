import { browser } from '$app/environment';

export type FFTheme = 'dark' | 'light';
export type FFTemplate = 'platform' | 'fundraiser';
export type FFPage = 'platform' | 'onboarding' | 'dashboard' | 'fundraiser';
export type FFThemePreset = 'core' | 'signal-glass' | 'school-spirit' | string;
export type FFBrand = string;
export type FFDataMode = 'preview' | 'live' | string;

export type FFThemeOptions = {
  template?: FFTemplate;
  page?: FFPage;
  brand?: FFBrand;
  themePreset?: FFThemePreset;
  dataMode?: FFDataMode;
  canonical?: string;
  shareUrl?: string;
  returnUrl?: string;
};

const FF_THEME_STORAGE_KEY = 'ff-theme';

const PAGE_TEMPLATE: Record<FFPage, FFTemplate> = {
  platform: 'platform',
  onboarding: 'platform',
  dashboard: 'platform',
  fundraiser: 'fundraiser'
};

function setData(
  el: HTMLElement,
  key: string,
  value: string | undefined | null,
  { allowEmpty = false }: { allowEmpty?: boolean } = {}
): void {
  if (value == null) {
    delete (el.dataset as DOMStringMap)[key];
    return;
  }

  const trimmed = value.trim();
  if (!trimmed && !allowEmpty) {
    delete (el.dataset as DOMStringMap)[key];
    return;
  }

  (el.dataset as DOMStringMap)[key] = allowEmpty ? value : trimmed;
}

function normalizeTheme(theme: FFTheme | string | null | undefined, fallback: FFTheme): FFTheme {
  return theme === 'light' || theme === 'dark' ? theme : fallback;
}

function normalizePage(page: FFPage | string | undefined): FFPage {
  if (page === 'platform' || page === 'onboarding' || page === 'dashboard' || page === 'fundraiser') {
    return page;
  }
  return 'platform';
}

function normalizeTemplate(template: FFTemplate | string | undefined, page: FFPage): FFTemplate {
  if (template === 'platform' || template === 'fundraiser') return template;
  return PAGE_TEMPLATE[page];
}

export function readFFTheme(defaultTheme: FFTheme = 'dark'): FFTheme {
  if (!browser) return defaultTheme;
  return normalizeTheme(localStorage.getItem(FF_THEME_STORAGE_KEY), defaultTheme);
}

export function writeFFTheme(theme: FFTheme): void {
  if (!browser) return;
  localStorage.setItem(FF_THEME_STORAGE_KEY, normalizeTheme(theme, 'dark'));
}

export function clearFFTheme(): void {
  if (!browser) return;
  localStorage.removeItem(FF_THEME_STORAGE_KEY);
}

export function applyFFTheme(theme: FFTheme, opts: FFThemeOptions = {}): void {
  if (!browser) return;

  const root = document.documentElement;
  const body = document.body;

  const page = normalizePage(opts.page);
  const template = normalizeTemplate(opts.template, page);
  const nextTheme = normalizeTheme(theme, 'dark');

  root.classList.add('ff-root');
  body.classList.add('ff-body');

  root.dataset.theme = nextTheme;
  root.dataset.ffTheme = (opts.themePreset || 'core').trim();
  root.style.colorScheme = nextTheme;
  setData(root, 'ffBrand', opts.brand);

  setData(body, 'ffBody', '', { allowEmpty: true });
  body.dataset.ffTemplate = template;
  body.dataset.ffPage = page;
  setData(body, 'ffDataMode', opts.dataMode);
  setData(body, 'ffCanonical', opts.canonical);
  setData(body, 'ffShareUrl', opts.shareUrl);
  setData(body, 'ffReturnUrl', opts.returnUrl);
}

export function syncFFTheme(
  opts: FFThemeOptions = {},
  defaultTheme: FFTheme = 'dark'
): FFTheme {
  const theme = readFFTheme(defaultTheme);
  applyFFTheme(theme, opts);
  return theme;
}

export function setFFTheme(
  theme: FFTheme,
  opts: FFThemeOptions = {}
): FFTheme {
  const nextTheme = normalizeTheme(theme, 'dark');
  writeFFTheme(nextTheme);
  applyFFTheme(nextTheme, opts);
  return nextTheme;
}

export function toggleFFTheme(
  current: FFTheme,
  opts: FFThemeOptions = {}
): FFTheme {
  return setFFTheme(current === 'dark' ? 'light' : 'dark', opts);
}

export function mountFFPage(
  page: FFPage,
  opts: Omit<FFThemeOptions, 'page' | 'template'> = {},
  defaultTheme: FFTheme = 'dark'
): FFTheme {
  return syncFFTheme(
    {
      ...opts,
      page,
      template: PAGE_TEMPLATE[page]
    },
    defaultTheme
  );
}

export function getFFThemeInitScript(
  defaultTheme: FFTheme = 'dark',
  opts: FFThemeOptions = {}
): string {
  const page = normalizePage(opts.page);
  const template = normalizeTemplate(opts.template, page);
  const themePreset = (opts.themePreset || 'core').trim();
  const brand = opts.brand?.trim() || '';
  const dataMode = opts.dataMode?.trim() || '';
  const canonical = opts.canonical?.trim() || '';
  const shareUrl = opts.shareUrl?.trim() || '';
  const returnUrl = opts.returnUrl?.trim() || '';

  return `(() => {
    try {
      const key = '${FF_THEME_STORAGE_KEY}';
      const saved = localStorage.getItem(key);
      const theme = saved === 'light' || saved === 'dark' ? saved : '${defaultTheme}';
      const root = document.documentElement;
      const body = document.body;
      if (!root || !body) return;
      root.classList.add('ff-root');
      body.classList.add('ff-body');
      root.dataset.theme = theme;
      root.dataset.ffTheme = '${themePreset}';
      root.style.colorScheme = theme;
      ${brand ? `root.dataset.ffBrand = ${JSON.stringify(brand)};` : `delete root.dataset.ffBrand;`}
      body.dataset.ffBody = '';
      body.dataset.ffTemplate = '${template}';
      body.dataset.ffPage = '${page}';
      ${dataMode ? `body.dataset.ffDataMode = ${JSON.stringify(dataMode)};` : `delete body.dataset.ffDataMode;`}
      ${canonical ? `body.dataset.ffCanonical = ${JSON.stringify(canonical)};` : `delete body.dataset.ffCanonical;`}
      ${shareUrl ? `body.dataset.ffShareUrl = ${JSON.stringify(shareUrl)};` : `delete body.dataset.ffShareUrl;`}
      ${returnUrl ? `body.dataset.ffReturnUrl = ${JSON.stringify(returnUrl)};` : `delete body.dataset.ffReturnUrl;`}
    } catch {}
  })();`;
}

