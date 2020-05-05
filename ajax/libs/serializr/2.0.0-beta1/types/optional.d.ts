import { PropSchema } from "../api/types";
/**
 * Optional indicates that this model property shouldn't be serialized if it isn't present.
 *
 * @example
 * createModelSchema(Todo, {
 *     title: optional(primitive()),
 * })
 *
 * serialize(new Todo()) // {}
 *
 * @param propSchema propSchema to (de)serialize the contents of this field
 */
export default function optional(propSchema?: PropSchema | boolean): PropSchema;
