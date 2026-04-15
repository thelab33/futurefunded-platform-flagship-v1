import { browser } from '$app/environment';

export type FFLaunchState = {
  orgName: string;
  orgType: string;
  location: string;
  logoText: string;
  brandColor: string;
  accentColor: string;
  campaignTitle: string;
  fundraisingGoal: string;
  shortStory: string;
  donationLane: boolean;
  sponsorLane: boolean;
  recurringLane: boolean;
  dataMode: 'preview' | 'live';
  paymentsConnected: boolean;
  updatedAt: string | null;
};

export const FF_LAUNCH_STORAGE_KEY = 'ff-launch-state/v1';

export const defaultLaunchState: FFLaunchState = {
  orgName: 'Connect ATX Elite',
  orgType: 'Youth team',
  location: 'Austin, TX',
  logoText: 'CA',
  brandColor: '#f97316',
  accentColor: '#38bdf8',
  campaignTitle: 'Spring Fundraiser',
  fundraisingGoal: '10000',
  shortStory:
    'Support travel, training, tournament fees, and shared season costs with one cleaner, sponsor-ready fundraising page.',
  donationLane: true,
  sponsorLane: true,
  recurringLane: false,
  dataMode: 'preview',
  paymentsConnected: false,
  updatedAt: null
};

export function loadLaunchState(): FFLaunchState {
  if (!browser) return { ...defaultLaunchState };

  try {
    const raw = localStorage.getItem(FF_LAUNCH_STORAGE_KEY);
    if (!raw) return { ...defaultLaunchState };
    const parsed = JSON.parse(raw);
    return { ...defaultLaunchState, ...parsed };
  } catch {
    return { ...defaultLaunchState };
  }
}

export function saveLaunchState(state: FFLaunchState): void {
  if (!browser) return;
  localStorage.setItem(FF_LAUNCH_STORAGE_KEY, JSON.stringify(state));
}

export function slugifyOrgName(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'connect-atx-elite'
  );
}
