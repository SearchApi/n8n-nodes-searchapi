import { SENTINEL_LABELS, COUNTRY_OVERRIDES, LANGUAGE_OVERRIDES } from './overrides.mjs';

const region = new Intl.DisplayNames(['en'], { type: 'region' });
const language = new Intl.DisplayNames(['en'], { type: 'language' });
const currency = new Intl.DisplayNames(['en'], { type: 'currency' });

const RESOLVERS = {
  country: (code) => region.of(code.toUpperCase()),
  language: (code) => language.of(code),
  currency: (code) => currency.of(code.toUpperCase()),
};

const OVERRIDES = {
  country: COUNTRY_OVERRIDES,
  language: LANGUAGE_OVERRIDES,
  currency: {},
};

export function normalize(kind, value) {
  return kind === 'language' ? value.replace(/^lang_/, '').toLowerCase() : value.toLowerCase();
}

export function isSentinel(kind, value) {
  return kind !== 'currency' && sentinelLabel(value) !== undefined;
}

function sentinelLabel(value) {
  const match = Object.keys(SENTINEL_LABELS).find((k) => k.toLowerCase() === value.toLowerCase());
  return match === undefined ? undefined : SENTINEL_LABELS[match];
}

export function resolve(kind, value) {
  if (kind !== 'currency' && sentinelLabel(value) !== undefined) return sentinelLabel(value);
  const code = normalize(kind, value);
  const override = OVERRIDES[kind][code];
  if (override) return override;
  let label;
  try {
    label = RESOLVERS[kind](code);
  } catch {
    return null;
  }
  if (!label || label.toLowerCase() === code) return null;
  return label;
}

