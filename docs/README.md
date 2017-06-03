## Dependencies

Install [mkdocs](http://www.mkdocs.org/#installation) and [node.js](https://nodejs.org/en/download/)

Install node dependencies:

```
> npm install
```

## Building

You'll need to generate all of the md files, which are generated from the .hx files and transported into the docs directory. 

```
> node gen.js
```

Use mkdocs to generate the static html:

```
> mkdocs build
```



