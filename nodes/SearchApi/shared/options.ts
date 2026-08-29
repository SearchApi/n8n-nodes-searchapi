import { INodePropertyOptions } from 'n8n-workflow';
import {
  COUNTRY_LABELS,
  CURRENCY_LABELS,
  LANGUAGE_LABELS,
  LOCALE_LABELS,
  SENTINEL_LABELS,
} from './labels';

type Kind = 'country' | 'language' | 'currency' | 'locale';

const LABELS: Record<Kind, Record<string, string>> = {
  country: COUNTRY_LABELS,
  language: LANGUAGE_LABELS,
  currency: CURRENCY_LABELS,
  locale: LOCALE_LABELS,
};

function normalize(kind: Kind, value: string): string {
  return kind === 'language' ? value.replace(/^lang_/, '').toLowerCase() : value.toLowerCase();
}

function sentinelLabel(value: string): string | undefined {
  const match = Object.keys(SENTINEL_LABELS).find((key) => key.toLowerCase() === value.toLowerCase());
  return match === undefined ? undefined : SENTINEL_LABELS[match];
}

function label(kind: Kind, value: string): string {
  if (kind !== 'currency') {
    const sentinel = sentinelLabel(value);
    if (sentinel !== undefined) return sentinel;
  }
  return LABELS[kind][normalize(kind, value)] ?? value;
}

function build(kind: Kind, values: string[]): INodePropertyOptions[] {
  return values
    .map((value) => ({ name: label(kind, value), value }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

export function countryOptions(values: string[]): INodePropertyOptions[] {
  return build('country', values);
}

export function languageOptions(values: string[]): INodePropertyOptions[] {
  return build('language', values);
}

export function currencyOptions(values: string[]): INodePropertyOptions[] {
  return build('currency', values);
}

export function localeOptions(values: string[]): INodePropertyOptions[] {
  return build('locale', values);
}
