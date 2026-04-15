import { promises as fs } from 'node:fs';
import path from 'node:path';

export type PersistedSponsor = {
  id: string;
  business: string;
  contact?: string;
  email?: string;
  tier: string;
  amount: number;
  slug: string;
  orgName?: string;
  campaignName?: string;
  status: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'sponsors.json');

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, '[]\n', 'utf-8');
  }
}

export async function readSponsors(): Promise<PersistedSponsor[]> {
  await ensureStore();

  try {
    const raw = await fs.readFile(STORE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PersistedSponsor[]) : [];
  } catch {
    return [];
  }
}

export async function writeSponsors(items: PersistedSponsor[]) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(items, null, 2) + '\n', 'utf-8');
}

export async function addPaidSponsor(input: PersistedSponsor) {
  const sponsors = await readSponsors();

  const next = sponsors.filter((item) => item.id !== input.id);
  next.push(input);

  await writeSponsors(next);
}

export async function appendWebhookDebugLog(entry: Record<string, unknown>) {
  if (process.env.FF_STRIPE_WEBHOOK_DEBUG !== '1') return;
  await ensureStore();
  const debugPath = path.join(DATA_DIR, 'stripe-webhook-debug.jsonl');
  const line = JSON.stringify({
    at: new Date().toISOString(),
    ...entry
  });
  await fs.appendFile(debugPath, line + '\n', 'utf-8');
}

export async function getSponsorsForSlug(slug: string) {
  const sponsors = await readSponsors();
  return sponsors
    .filter((item) => item.slug === slug)
    .sort((a, b) => {
      const aTime = Date.parse(a.createdAt || '') || 0;
      const bTime = Date.parse(b.createdAt || '') || 0;
      return bTime - aTime;
    });
}
