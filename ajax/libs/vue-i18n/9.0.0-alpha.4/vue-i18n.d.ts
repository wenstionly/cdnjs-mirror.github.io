import { ComponentInternalInstance } from 'vue';
import { ComputedRef } from '@vue/reactivity';
import { InjectionKey } from 'vue';
import { Plugin as Plugin_2 } from 'vue';
import { WritableComputedRef } from '@vue/reactivity';

export declare const Availabilities: IntlAvailability;

export declare type Choice = number;

/**
 *  Composer Interfaces
 */
export declare type Composer = {
    /**
     * properties
     */
    locale: WritableComputedRef<Locale>;
    fallbackLocale: WritableComputedRef<FallbackLocale>;
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
    __id: number;
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
    __transrateVNode(...args: unknown[]): unknown;
    __numberParts(...args: unknown[]): string | Intl.NumberFormatPart[];
    __datetimeParts(...args: unknown[]): string | Intl.DateTimeFormatPart[];
};

/**
 *  Composer Options
 */
export declare type ComposerOptions = {
    locale?: Locale;
    fallbackLocale?: FallbackLocale;
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
    __root?: Composer;
};

/**
 * I18n factory
 *
 * @param options - see the {@link I18nOptions}
 * @returns {@link Composer} object, or {@link VueI18n} object
 *
 * @remarks
 * When you use Composable API, you need to specify options of {@link ComposerOptions}.
 * When you use Legacy API, you need toto specify options of {@link VueI18nOptions} and `legacy: true`.
 *
 * @example
 * case: for Composable API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n, useI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   setup() {
 *     // ...
 *     const { t } = useI18n({ ... })
 *     return { ... , t }
 *   }
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @example
 * case: for Legacy API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   legacy: true, // you must specify 'lagacy: true' option
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   // ...
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 */
export declare function createI18n(options?: I18nOptions): Composer | VueI18n;

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
 *    // suppress localize miss warning option, override context.missingWarn
 *    datetime(context, value, { key: 'short', locale: 'ja-JP', missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    datetime(context, value, { key: 'short', locale: 'ja-JP', fallbackWarn: false })
 *
 *    // if you specify `part` options, you can get an array of objects containing the formatted datetime in parts
 *    datetime(context, value, { key: 'short', part: true })
 *
 *    // orverride context.datetimeFormats[locale] options with functino options
 *    datetime(cnotext, value, 'short', { currency: 'EUR' })
 *    datetime(cnotext, value, 'short', 'ja-JP', { currency: 'EUR' })
 *    datetime(context, value, { key: 'short', part: true }, { currency: 'EUR'})
 */
declare type DateTimeOptions = {
    key?: string;
    locale?: Locale;
    missingWarn?: boolean;
    fallbackWarn?: boolean;
    part?: boolean;
};

export declare type FallbackLocale = Locale | Locale[] | {
    [locale in string]: Locale[];
} | false;

export declare type FormattedNumberPart = {
    type: FormattedNumberPartType;
    value: string;
};

export declare type FormattedNumberPartType = 'currency' | 'decimal' | 'fraction' | 'group' | 'infinity' | 'integer' | 'literal' | 'minusSign' | 'nan' | 'plusSign' | 'percentSign';

export declare interface Formatter {
    interpolate(message: string, values: any, path: string): Array<any> | null;
}

export declare const GlobalI18nSymbol: InjectionKey<Composer>;

/**
 * I18n Options
 *
 * {@link createI18n} factory option.
 *
 * @remarks
 * `I18nOptions` is union type of {@link ComposerOptions} and {@link VueI18nOptions}, so you can specify these options.
 *
 */
export declare type I18nOptions = {
    /**
     * @defaultValue `false`
     */
    legacy?: boolean;
} & (ComposerOptions | VueI18nOptions);

export declare type I18nPluginOptions = {
    'i18n-t'?: string;
};

/**
 *  datetime
 */
export declare type IntlAvailability = {
    dateTimeFormat: boolean;
    numberFormat: boolean;
};

export declare type LinkedModifiers = {
    [key: string]: LinkedModify;
};

declare type LinkedModify = (value: unknown, type: string) => unknown;

export declare type Locale = string;

export declare type LocaleMessage = string | MessageFunction | LocaleMessageDictionary | LocaleMessage[];

export declare type LocaleMessageDictionary = {
    [property: string]: LocaleMessage;
};

export declare type LocaleMessageObject = LocaleMessageDictionary;

export declare type LocaleMessages = Record<Locale, LocaleMessage>;

declare type MessageFunction = (ctx: unknown) => unknown;

export declare type MissingHandler = (locale: Locale, key: Path, insttance?: ComponentInternalInstance, type?: string) => string | void;

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
 *    // suppress localize miss warning option, override context.missingWarn
 *    number(context, value, { key: 'currency', locale: 'ja-JP', missingWarn: false })
 *
 *    // suppress localize fallback warning option, override context.fallbackWarn
 *    number(context, value, { key: 'currency', locale: 'ja-JP', fallbackWarn: false })
 *
 *    // if you specify `part` options, you can get an array of objects containing the formatted number in parts
 *    number(context, value, { key: 'currenty', part: true })
 *
 *    // orverride context.numberFormats[locale] options with functino options
 *    number(cnotext, value, 'currency', { year: '2-digit' })
 *    number(cnotext, value, 'currency', 'ja-JP', { year: '2-digit' })
 *    number(context, value, { key: 'currenty', part: true }, { year: '2-digit'})
 */
declare type NumberOptions = {
    key?: string;
    locale?: Locale;
    missingWarn?: boolean;
    fallbackWarn?: boolean;
    part?: boolean;
};

export declare type Path = string;

export declare type PathValue = string | number | boolean | Function | null | {
    [key: string]: PathValue;
} | PathValue[];

export declare type PluralizationRule = (choice: number, choicesLength: number, orgRule?: PluralizationRule) => number;

declare type PluralizationRules = {
    [locale: string]: PluralizationRule;
};

export declare type PluralizationRulesMap = {
    [locale: string]: PluralizationRule;
};

export declare type PostTranslationHandler = (translated: unknown) => unknown;

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
 * Use Composable API
 *
 * @param options - See the {@link ComponentOptions}
 * @returns {@link Composer} object
 *
 * @remarks
 * This function is mainly used by `setup`.
 * If options are specified Composer object is created for each component, and you can be localized on the component.
 * If options are not specified, you can be localized using the global Composer.
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
export declare function useI18n(options?: ComposerOptions): Composer;

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
    fallbackLocale: FallbackLocale;
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
    sync: boolean;
    __id: number;
    __composer: Composer;
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
    fallbackLocale?: FallbackLocale;
    messages?: LocaleMessages;
    datetimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    availableLocales?: Locale[];
    modifiers?: LinkedModifiers;
    formatter?: Formatter;
    missing?: MissingHandler;
    fallbackRoot?: boolean;
    silentTranslationWarn?: boolean | RegExp;
    silentFallbackWarn?: boolean | RegExp;
    formatFallbackMessages?: boolean;
    preserveDirectiveContent?: boolean;
    warnHtmlInMessage?: WarnHtmlInMessageLevel;
    sharedMessages?: LocaleMessages;
    pluralizationRules?: PluralizationRules;
    postTranslation?: PostTranslationHandler;
    sync?: boolean;
    __i18n?: CustomBlocks;
    __root?: Composer;
};

export declare type WarnHtmlInMessageLevel = 'off' | 'warn' | 'error';

export { }
