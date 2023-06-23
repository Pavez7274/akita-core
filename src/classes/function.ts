/* eslint-disable @typescript-eslint/no-explicit-any */
import { Interpreter, object_data } from "./interpreter";
import { LexerAkitaFunction } from "./lexer";
import { AkitaError } from "./util";
import { isNil } from "lodash";

// types
export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Decorator that enforces the presence of required fields.
 * @param min The minimum number of fields required (default: Infinity).
 * @returns A decorator function.
 */
export function requiredFields(min = Infinity) {
	return function (
		target: AbstractAkitaFunction,
		propertyKey: "solve",
		descriptor: TypedPropertyDescriptor<AbstractAkitaFunction["solve"]>
	) {
		/**
		 * Overrides the original method with additional validation logic.
		 * @param this The Interpreter instance.
		 * @param self The LexerAkitaFunction instance.
		 * @param data The object data.
		 * @returns A promise that resolves to the updated object data.
		 * @throws AkitaError if the required fields are not present.
		 */
		const old = target[propertyKey];
		descriptor.value = async function (
			this: Interpreter,
			self: LexerAkitaFunction<any>,
			data: object_data
		) {
			if (isNil(self.fields) || (min !== Infinity && self.fields.length < min)) {
				if (min !== Infinity) {
					throw new AkitaError(
						isNil(self.fields?.length)
							? `${self.name} requires ${min} fields but didn't get any instead!`
							: `${self.name} requires ${min} fields but instead received ${
									self.fields?.length ?? 0
							  }!`
					);
				} else {
					throw new AkitaError(`${self.name} requires brackets!`);
				}
			}
			return old.apply(this, [self, data]);
		};
		return descriptor as TypedPropertyDescriptor<
			(
				this: Interpreter,
				self: LexerAkitaFunction<any>,
				data: object_data
			) => Promise<object_data>
		>;
	};
}

/**
 * Abstract base class for Akita functions.
 * @template T The type of the object data.
 */
export abstract class AbstractAkitaFunction<T = object_data> {
	/**
	 * The type of the function.
	 * Possible values: "unknown" or "parent".
	 */
	type: "unknown" | "parent" = "unknown";

	/**
	 * An array of prototype names associated with the function.
	 */
	prototypes: Array<string> = [];

	/**
	 * An optional name used internally.
	 */
	name_in?: string;

	/**
	 * The name of the function.
	 * Must be implemented by derived classes.
	 */
	abstract name: string;

	/**
	 * Resolves the function.
	 * @param this The Interpreter instance.
	 * @param self The LexerAkitaFunction instance.
	 * @param data The object data.
	 * @returns A promise that resolves to the updated object data.
	 */
	abstract solve(
		this: Interpreter,
		self: LexerAkitaFunction<unknown>,
		data: T
	): Promise<T>;
}

export class VoidAkitaFunction extends AbstractAkitaFunction {
	name = "void_akita_function";
	solve(): Promise<object_data> {
		throw new Error("void function");
	}
}
