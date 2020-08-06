# gener8

Generate new files from template files

## Usage

```
$ gener8 <templateName> <fileName> [templateOpts]
```

e.g.

```
$ gener8 component cxButton
```

will find a template named `component.tmpl8`, and generate a new file.

## tmpl8 files

A `.tmpl8` file is just a [handlebars](https://handlebarsjs.com/) template, with some yaml [front-matter](https://www.npmjs.com/package/front-matter) at the top.

Use the front-matter to define variables for the user to change during runtime.

example `react.fc.tmpl8`

```
---
extension: jsx
---
export function {{ name }}(props) => {
  <div>{{name}} works!</div>
}
```

```
$ gener8 react.fc Header

// optionally pass --extension to change the file extension
$ gener8 react.fc Header --extension ts
```
