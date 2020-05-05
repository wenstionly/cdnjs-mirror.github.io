import { PropSchema, AdditionalPropArgs, Clazz } from "../api/types";
/**
 *
 */
export default function poly(classes: Clazz<any>[], additionalArgs?: AdditionalPropArgs): PropSchema;
export default function poly(valueToClassString: (value: any) => [string, PropSchema], classStringToPropSchema: (classString: string) => PropSchema, additionalArgs?: AdditionalPropArgs): PropSchema;
