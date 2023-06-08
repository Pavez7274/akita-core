import { Interpreter, object_data } from "./interpreter";
import { type akitaFunction } from "./lexer";
import { AkitaError } from "./util";
import { isNil } from "lodash";

// types
export type RequiredField<T, K extends keyof T> = T & Required<Pick<T, K>>;

// decorators
export function requiredFields(min = Infinity) {
	return function (
		target: AbstractAkitaFunction,
		propertyKey: "solve",
		descriptor: TypedPropertyDescriptor<AbstractAkitaFunction["solve"]>
	) {
		const old = target[propertyKey];
		descriptor.value = async function (
			this: Interpreter,
			self: akitaFunction,
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
				} else throw new AkitaError(`${self.name} requires brackets!`);
			}
			return old.apply(this, [self, data]);
		};
		return descriptor as TypedPropertyDescriptor<
			(
				this: Interpreter,
				self: RequiredField<akitaFunction, "fields" | "inside">,
				data: object_data
			) => Promise<object_data>
		>;
	};
}

// classes
export abstract class AbstractAkitaFunction {
	type: "unknown" | "parent" = "unknown";
	prototypes: Array<string> = [];
	abstract name: string;
	abstract solve(
		this: Interpreter,
		self: akitaFunction,
		data: object_data
	): Promise<object_data>;
}
export class VoidAkitaFunction extends AbstractAkitaFunction {
	override name = "undefined";
	override solve(): Promise<object_data> {
		throw new Error("void function");
	}
}
