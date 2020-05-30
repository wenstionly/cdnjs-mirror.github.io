import { ComponentInternalInstance } from 'vue';
import { ComputedRef } from '@vue/reactivity';
import { Plugin as Plugin_2 } from 'vue';
import { WritableComputedRef } from '@vue/reactivity';

export declare const Availabilities: IntlAvailability;

export declare type Choice = number;

/**
 *  createI18n factory
 *
 *  This function is compatible with constructor of `VueI18n` class (offered with vue-i18n@8.x) like `new VueI18n(...)`.
 */
export declare function createI18n(options?: VueI18nOptions): VueI18n;

/**
 * I18n Composer factory
 *
 * @example
 * case: Global resource base localization
 * ```js
 * import { createApp } from 'vue'
 * import { createI18nComposer, useI18n } 'vue-i18n'
 *
 * const i18n = createI18nComposer({
 *   locale: 'ja',
 *   messages: {
 *     en: { ... }
 *     ja: { ... }
 *   }
 * })
 *
 * const app = createApp({
 *   setup() {
 *     return useI18n()
 *   }
 * })
 *
 * app.use(i18n)
 * app.mount('#app')
 * ```
 */
export declare function createI18nComposer(options?: I18nComposerOptions): I18nComposer;

/**
 *  number
 */
export declare type CurrencyDisplay = 'symbol' | 'code' | 'name';

export declare interface CurrencyNumberFormatOptions extends Intl.NumberFormatOptions {
    style: 'currency';
    currency: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: 'lookup' | 'best-fit';
    formatMatcher?: 'basic' | 'best-fit';
}

declare type CustomBlocks = string[];

export declare type DateTimeDigital = 'numeric' | '2-digit';

export declare type DateTimeFormat = {
    [key: string]: DateTimeFormatOptions;
};

export declare type DateTimeFormatOptions = Intl.DateTimeFormatOptions | SpecificDateTimeFormatOptions;

export declare type DateTimeFormatResult = string;

export declare type DateTimeFormats = {
    [locale: string]: DateTimeFormat;
};

export declare type DateTimeHumanReadable = 'long' | 'short' | 'narrow';

/**
 *  # datetime
 *
 *  ## usages:
 *    // for example `context.datetimeFormats` below
 *    'en-US': {
 *      short: {
 *        year: 'numeric', month: '2-digit', day: '2-digit',
 *        hour: '2-digit', minute: '2-digit'
 *      }
 *    },
 *    'ja-JP': { ... }
 *
 *    // datetimeable value only
 *    datetime(context, value)
 *
 *    // key argument
 *    datetime(context, value, 'short')
 *
 *    // key & locale argument
 *    datetime(context, value, 'short', 'ja-JP')
 *
 *    // object sytle argument
 *    datetime(context, value, { key: 'short', locale: 'ja-JP' })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    datetime(context, value, { key: 'short', locale: 'ja-JP', fallbackWarn: false })
 */
declare type DateTimeOptions = {
    key?: string;
    locale?: Locale;
    fallbackWarn?: boolean;
};

export declare type FormattedNumberPart = {
    type: FormattedNumberPartType;
    value: string;
};

export declare type FormattedNumberPartType = 'currency' | 'decimal' | 'fraction' | 'group' | 'infinity' | 'integer' | 'literal' | 'minusSign' | 'nan' | 'plusSign' | 'percentSign';

export declare interface Formatter {
    interpolate(message: string, values: any, path: string): Array<any> | null;
}

/**
 *  I18n Composer Interfaces
 */
export declare type I18nComposer = {
    /**
     * properties
     */
    locale: WritableComputedRef<Locale>;
    fallbackLocales: WritableComputedRef<Locale[]>;
    readonly availableLocales: Locale[];
    readonly messages: ComputedRef<LocaleMessages>;
    readonly datetimeFormats: ComputedRef<DateTimeFormats>;
    readonly numberFormats: ComputedRef<NumberFormats>;
    readonly modifiers: LinkedModifiers;
    readonly pluralRules?: PluralizationRules;
    missingWarn: boolean | RegExp;
    fallbackWarn: boolean | RegExp;
    fallbackRoot: boolean;
    fallbackFormat: boolean;
    /**
     * methods
     */
    t(key: Path): string;
    t(key: Path, plural: number): string;
    t(key: Path, plural: number, options: TranslateOptions): string;
    t(key: Path, defaultMsg: string): string;
    t(key: Path, defaultMsg: string, options: TranslateOptions): string;
    t(key: Path, list: unknown[]): string;
    t(key: Path, list: unknown[], plural: number): string;
    t(key: Path, list: unknown[], defaultMsg: string): string;
    t(key: Path, list: unknown[], options: TranslateOptions): string;
    t(key: Path, named: NamedValue): string;
    t(key: Path, named: NamedValue, plural: number): string;
    t(key: Path, named: NamedValue, defaultMsg: string): string;
    t(key: Path, named: NamedValue, options: TranslateOptions): string;
    t(...args: unknown[]): string;
    d(value: number | Date): string;
    d(value: number | Date, key: string): string;
    d(value: number | Date, key: string, locale: Locale): string;
    d(value: number | Date, options: DateTimeOptions): string;
    d(...args: unknown[]): string;
    n(value: number): string;
    n(value: number, key: string): string;
    n(value: number, key: string, locale: Locale): string;
    n(value: number, options: NumberOptions): string;
    n(...args: unknown[]): string;
    getLocaleMessage(locale: Locale): LocaleMessage;
    setLocaleMessage(locale: Locale, message: LocaleMessage): void;
    mergeLocaleMessage(locale: Locale, message: LocaleMessage): void;
    getDateTimeFormat(locale: Locale): DateTimeFormat;
    setDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    mergeDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    getNumberFormat(locale: Locale): NumberFormat;
    setNumberFormat(locale: Locale, format: NumberFormat): void;
    mergeNumberFormat(locale: Locale, format: NumberFormat): void;
    getPostTranslationHandler(): PostTranslationHandler | null;
    setPostTranslationHandler(handler: PostTranslationHandler | null): void;
    getMissingHandler(): MissingHandler | null;
    setMissingHandler(handler: MissingHandler | null): void;
    install: Plugin_2;
};

/**
 *  I18n Composer Options
 */
export declare type I18nComposerOptions = {
    locale?: Locale;
    fallbackLocales?: Locale[];
    messages?: LocaleMessages;
    datetimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    modifiers?: LinkedModifiers;
    pluralRules?: PluralizationRules;
    missing?: MissingHandler;
    missingWarn?: boolean | RegExp;
    fallbackWarn?: boolean | RegExp;
    fallbackRoot?: boolean;
    fallbackFormat?: boolean;
    postTranslation?: PostTranslationHandler;
    __i18n?: CustomBlocks;
    _root?: I18nComposer;
};

/**
 *  datetime
 */
export declare type IntlAvailability = {
    dateTimeFormat: boolean;
    numberFormat: boolean;
};

declare type LinkedModifiers = {
    [key: string]: LinkedModify;
};

declare type LinkedModify = (str: string) => string;

export declare type Locale = string;

export declare type LocaleMessage = string | MessageFunction | LocaleMessageDictionary | LocaleMessage[];

export declare type LocaleMessageDictionary = {
    [property: string]: LocaleMessage;
};

export declare type LocaleMessageObject = LocaleMessageDictionary;

export declare type LocaleMessages = Record<Locale, LocaleMessage>;

declare type MessageFunction = (ctx: unknown) => string;

export declare type MissingHandler = (locale: Locale, key: Path, insttance?: ComponentInternalInstance) => string | void;

declare type NamedValue<T = {}> = T & {
    [prop: string]: unknown;
};

export declare type NumberFormat = {
    [key: string]: NumberFormatOptions;
};

export declare type NumberFormatOptions = Intl.NumberFormatOptions | SpecificNumberFormatOptions | CurrencyNumberFormatOptions;

export declare type NumberFormatResult = string;

export declare type NumberFormats = {
    [locale: string]: NumberFormat;
};

export declare type NumberFormatToPartsResult = {
    [index: number]: FormattedNumberPart;
};

/**
 *  # number
 *
 *  ## usages
 *    // for example `context.numberFormats` below
 *    'en-US': {
 *      'currency': {
 *        style: 'currency', currency: 'USD', currencyDisplay: 'symbol'
 *      }
 *    },
 *    'ja-JP: { ... }
 *
 *    // value only
 *    number(context, value)
 *
 *    // key argument
 *    number(context, value, 'currency')
 *
 *    // key & locale argument
 *    number(context, value, 'currency', 'ja-JP')
 *
 *    // object sytle argument
 *    number(context, value, { key: 'currency', locale: 'ja-JP' })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    number(context, value, { key: 'currency', locale: 'ja-JP', fallbackWarn: false })
 */
declare type NumberOptions = {
    key?: string;
    locale?: Locale;
    fallbackWarn?: boolean;
};

export declare type Path = string;

export declare type PathValue = string | number | boolean | Function | null | {
    [key: string]: PathValue;
} | PathValue[];

declare type PluralizationRule = (choice: number, choicesLength: number, orgRule?: PluralizationRule) => number;

declare type PluralizationRules = {
    [locale: string]: PluralizationRule;
};

export declare type PluralizationRulesMap = {
    [locale: string]: PluralizationRule;
};

export declare type PostTranslationHandler = (translated: string) => string;

export declare interface SpecificDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
    year?: DateTimeDigital;
    month?: DateTimeDigital | DateTimeHumanReadable;
    day?: DateTimeDigital;
    hour?: DateTimeDigital;
    minute?: DateTimeDigital;
    second?: DateTimeDigital;
    weekday?: DateTimeHumanReadable;
    era?: DateTimeHumanReadable;
    timeZoneName?: 'long' | 'short';
    localeMatcher?: 'lookup' | 'best-fit';
    formatMatcher?: 'basic' | 'best-fit';
}

export declare interface SpecificNumberFormatOptions extends Intl.NumberFormatOptions {
    style?: 'decimal' | 'percent';
    currency?: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: 'lookup' | 'best-fit';
    formatMatcher?: 'basic' | 'best-fit';
}

/**
 *  # translate
 *
 *  ## usages:
 *    // for example, locale messages key
 *    { 'foo.bar': 'hi {0} !' or 'hi {name} !' }
 *
 *    // no argument, context & path only
 *    translate(context, 'foo.bar')
 *
 *    // list argument
 *    translate(context, 'foo.bar', ['kazupon'])
 *
 *    // named argument
 *    translate(context, 'foo.bar', { name: 'kazupon' })
 *
 *    // plural choice number
 *    translate(context, 'foo.bar', 2)
 *
 *    // plural choice number with name argument
 *    translate(context, 'foo.bar', { name: 'kazupon' }, 2)
 *
 *    // default message argument
 *    translate(context, 'foo.bar', 'this is default message')
 *
 *    // default message with named argument
 *    translate(context, 'foo.bar', { name: 'kazupon' }, 'Hello {name} !')
 *
 *    // use key as default message
 *    translate(context, 'hi {0} !', ['kazupon'], { default: true })
 *
 *    // locale option, override context.locale
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { locale: 'ja' })
 *
 *    // suppress localize miss warning option, override context.missingWarn
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    translate(context, 'foo.bar', { name: 'kazupon' }, { fallbackWarn: false })
 */
declare type TranslateOptions = {
    list?: unknown[];
    named?: NamedValue;
    plural?: number;
    default?: string | boolean;
    locale?: Locale;
    missingWarn?: boolean;
    fallbackWarn?: boolean;
};

export declare type TranslateResult = string;

/**
 * Enable vue-i18n composable API
 *
 * @example
 * case: Component resource base localization
 * ```html
 * <template>
 *   <form>
 *     <label>{{ t('language') }}</label>
 *     <select v-model="locale">
 *       <option value="en">en</option>
 *       <option value="ja">ja</option>
 *     </select>
 *   </form>
 *   <p>message: {{ t('hello') }}</p>
 * </template>
 *
 * <script>
 * import { useI18n } from 'vue-i18n'
 *
 * export default {
 *  setup() {
 *    const { t, locale } = useI18n({
 *      locale: 'ja',
 *      messages: {
 *        en: { ... },
 *        ja: { ... }
 *      }
 *    })
 *    // Something to do ...
 *
 *    return { ..., t, locale }
 *  }
 * }
 * </script>
 * ```
 */
export declare function useI18n(options?: I18nComposerOptions): I18nComposer;

export declare const VERSION: string;

/**
 *  VueI18n Interfaces
 *
 *  This type is compatible with interface of `VueI18n` class (offered with vue-i18n@8.x).
 */
export declare type VueI18n = {
    /**
     * properties
     */
    locale: Locale;
    fallbackLocale: Locale;
    readonly availableLocales: Locale[];
    readonly messages: LocaleMessages;
    readonly datetimeFormats: DateTimeFormats;
    readonly numberFormats: NumberFormats;
    formatter: Formatter;
    missing: MissingHandler | null;
    postTranslation: PostTranslationHandler | null;
    silentTranslationWarn: boolean | RegExp;
    silentFallbackWarn: boolean | RegExp;
    formatFallbackMessages: boolean;
    /**
     * methods
     */
    t(key: Path): TranslateResult;
    t(key: Path, locale: Locale): TranslateResult;
    t(key: Path, locale: Locale, list: unknown[]): TranslateResult;
    t(key: Path, locale: Locale, named: object): TranslateResult;
    t(key: Path, list: unknown[]): TranslateResult;
    t(key: Path, named: object): TranslateResult;
    t(...args: unknown[]): TranslateResult;
    tc(key: Path): TranslateResult;
    tc(key: Path, locale: Locale): TranslateResult;
    tc(key: Path, list: unknown[]): TranslateResult;
    tc(key: Path, named: object): TranslateResult;
    tc(key: Path, choice: number): TranslateResult;
    tc(key: Path, choice: number, locale: Locale): TranslateResult;
    tc(key: Path, choice: number, list: unknown[]): TranslateResult;
    tc(key: Path, choice: number, named: object): TranslateResult;
    tc(...args: unknown[]): TranslateResult;
    te(key: Path, locale?: Locale): boolean;
    getLocaleMessage(locale: Locale): LocaleMessage;
    setLocaleMessage(locale: Locale, message: LocaleMessage): void;
    mergeLocaleMessage(locale: Locale, message: LocaleMessage): void;
    d(value: number | Date): DateTimeFormatResult;
    d(value: number | Date, key: string): DateTimeFormatResult;
    d(value: number | Date, key: string, locale: Locale): DateTimeFormatResult;
    d(value: number | Date, args: {
        [key: string]: string;
    }): DateTimeFormatResult;
    d(...args: unknown[]): DateTimeFormatResult;
    getDateTimeFormat(locale: Locale): DateTimeFormat;
    setDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    mergeDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    n(value: number): NumberFormatResult;
    n(value: number, key: string): NumberFormatResult;
    n(value: number, key: string, locale: Locale): NumberFormatResult;
    n(value: number, args: {
        [key: string]: string;
    }): NumberFormatResult;
    n(...args: unknown[]): NumberFormatResult;
    getNumberFormat(locale: Locale): NumberFormat;
    setNumberFormat(locale: Locale, format: NumberFormat): void;
    mergeNumberFormat(locale: Locale, format: NumberFormat): void;
    getChoiceIndex: (choice: Choice, choicesLength: number) => number;
    install: Plugin_2;
};

/**
 *  VueI18n Options
 *
 *  This option type is compatible with the constructor options of `VueI18n` class (offered with vue-i18n@8.x).
 */
export declare type VueI18nOptions = {
    locale?: Locale;
    fallbackLocale?: Locale;
    messages?: LocaleMessages;
    datetimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    availableLocales?: Locale[];
    modifiers?: LinkedModifiers;
    formatter?: Formatter;
    missing?: MissingHandler;
    fallbackRoot?: boolean;
    sync?: boolean;
    silentTranslationWarn?: boolean | RegExp;
    silentFallbackWarn?: boolean | RegExp;
    formatFallbackMessages?: boolean;
    preserveDirectiveContent?: boolean;
    warnHtmlInMessage?: WarnHtmlInMessageLevel;
    sharedMessages?: LocaleMessages;
    pluralizationRules?: PluralizationRules;
    postTranslation?: PostTranslationHandler;
    __i18n?: CustomBlocks;
    _root?: I18nComposer;
};

export declare type WarnHtmlInMessageLevel = 'off' | 'warn' | 'error';

export { }
