# **@kodeko/akita-core**

> `@kodeko/akita-core` is a free-to-use string-based interpreter that allows people to develop packages with a simple syntax. The syntax is based on a **keyword** that represents a function, characters to indicate function **opening** and **closing**, and a character to **separate arguments**. A good analogy to use would be the way function calls are made, for example: `myFunction(1, 2, 3)`, where "myFunction" is the keyword, "(" is the opening symbol, ")" is the closing symbol, and "," is the argument separator.

## Installation

You can install @kodeko/akita-core using the following npm command:

```shell
npm install @kodeko/akita-core
```

## Usage

Once installed, you can use @kodeko/akita-core in your project as follows:

```ts
import { Interpreter, akita_functions_mod } from "@kodeko/akita-core";

void (async function main() {
	// Load the defult functions and adds as prefix $
	await Interpreter.load_functions(akita_functions_mod, (t) => {
		t.name = "$" + t.name;
		return t;
	});
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

In the above example, we import the `@kodeko/akita-core` package and then execute a script represented by the string "$log\[$get\[great]]". The execute method of `@kodeko/akita-core` will parse and execute the script, returning the result. In this case, the result will be logged to the console.

## Functioning

The Akita interpreter works through a **lexer based on regular expressions**, which detects keywords and their arguments. It then stores this information in objects and replaces their values with SYSTEM_FUNCTION(<UNIQUE_ID>). For example:

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
  extra: { variables: { great: 'Hello world!' } },
  results: { 'SYSTEM_RESULT(1)': 'Hello world!', 'SYSTEM_RESULT(0)': '' },
  parents: [],
  epd: null,
  input: 'SYSTEM_RESULT(1)'
}
```

## Additional Considerations

- Ensure you provide valid scripts and follow the syntax described above.
- Please note that @kodeko/akita-core is a string-based interpreter and there may be limitations or unhandled cases. Make sure to review the documentation and thoroughly test your code.
- This package is under active development, and it is recommended to stay updated with new releases and versions.

> Enjoy using @kodeko/akita-core in your project! If you have any further questions or need more information, feel free to ask on my [DM](https://discord.com/users/788869971073040454) or our [Server](https://discord.gg/MYZbyRYaxF).
