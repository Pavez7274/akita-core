# **@kodeko/akita-core**

<small>`@kodeko/akita-core` is a free-to-use string-based interpreter that allows people to develop packages with a simple syntax. The syntax is based on a **keyword** that represents a function, characters to indicate function **opening** and **closing**, and a character to **separate arguments**. A good analogy to use would be the way function calls are made, for example: `myFunction(1, 2, 3)`, where "myFunction" is the keyword, "(" is the opening symbol, ")" is the closing symbol, and "," is the argument separator.
</small>

## Installation

You can install `@kodeko/akita-core` using the following npm command:

```shell
npm install @kodeko/akita-core
```

## Example

Once installed, you can use the akita interpreter in your project as follows:

```ts
import {
	akita_functions_mod,
	Interpreter,
	withPrefix,
} from "@kodeko/akita-core";

void (async function main() {
	// Load the defult functions and adds as prefix $
	await Interpreter.load_functions(akita_functions_mod, withPrefix("$"));
	// Creates a new Interpreter
	const itr = new Interpreter();
	// Sets the input to execute
	itr.lexer.set_input("$log[$get[great]]");
	// Executes the input
	await itr.solve({
		extra: {
			variables: {
				great: "Hello world!",
			},
		},
	});
})();
```

```ts
// result
Hello world!
```

In the above example, we import the interpreter and helpers and then execute a script represented by the string "$log\[$get\[great]]". The execute method of the akita interpreter will parse and execute the script, returning the result. In this case, the result will be logged to the console.

## How Works?

The akita interpreter works through **a lexer based on regular expressions**, which detects **keywords** and their arguments. It then stores this information in objects and replaces their values with SYSTEM_FUNCTION(<small>\<unique id></small>). For example:

```php
// Input
$log[$get[great]]
// Output
SYSTEM_RESULT(0)
// Object Data
[
  {
    id: 'SYSTEM_FUNCTION(0)',
    prototype: undefined,
    total: '$log[SYSTEM_FUNCTION(1)]',
    name: '$log',
    pos: 0,
    _id: 0,
    inside: 'SYSTEM_FUNCTION(1)',
    fields: [
      {
        value: 'SYSTEM_FUNCTION(1)',
        overloads: [
          {
            id: 'SYSTEM_FUNCTION(1)',
            prototype: undefined,
          }
        ]
      }
    ]
  }
]
```

In this case, `SYSTEM_FUNCTION(1)` represents the keyword `$log`, and inside `$log` is `SYSTEM_FUNCTION(0)`, which is `$object`.

After this process, an array is traversed that executes the functions from top to bottom and from left to right. The value of each function is returned as SYSTEM_RESULT(<small>\<unique id></small>), allowing for handling of objects, numbers, classes, etc.
First, it tries to execute $log, but since it contains within its arguments another function ($get), that one will be executed first. That is, that "always" the functions inside will be executed, and once that is executed, $log is executed.

```ts
// Final interpreter object data
{
  results: { 'SYSTEM_RESULT(1)': 'Hello world!', 'SYSTEM_RESULT(0)': '' },
  extra: { variables: { great: 'Hello world!' } },
  input: 'SYSTEM_RESULT(1)',
  parents: [],
  epd: null,
}
```

## Additional Considerations

<small>
  <ul>
    <li>
      Ensure you provide valid scripts and follow the syntax described above.
    </li>
    <li>
      Please note that <code>@kodeko/akita-core</code> is a string-based interpreter and there may be limitations or unhandled cases. Make sure to review the documentation and thoroughly test your code.
    </li>
    <li>
      This package is under active development, and it is recommended to stay updated with new releases and versions.
    </li>
  </ul>
</small>

- - -

Enjoy using the package in your project! If you have any further questions or need more information, feel free to ask on my [Discord DM](https://discord.com/users/788869971073040454) or our [Discord Server](https://discord.gg/MYZbyRYaxF).
