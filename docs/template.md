<% _.each(types, function(x) { %>

# <%= x.name %>
`verb.<%= namespace + "." + x.name %>`

**<%= x.$type.toUpperCase() %>**

[Source code](<%= sourceFile + "#L" + x.line %>)

<%= x.$type.toUpperCase() === "TYPEDEF" && x.alias ? "`" + x.name + " = " + x.alias + "`" : "" %>

<%= x.description %>

<% if (x.$type === "Class" || x.$type === "Interface") { %>

<% if (x.parentClass) { %>
**Extends:** [<%= x.parentClass %>]( <%= x.parentClass %>)
<% } %>

<% if (x.interfaces && x.interfaces.length) { %>
**Implements:** <%= _.map(x.interfaces, function(x){ return "[`" + x + "`](" + x + ")"}).join(", ") %>
<% } %>

    <% _.each(x.methods, function(y) { %>
## <%= y.name === "new" ? "constructor" : y.name %>
**<%= y.isStatic ? "STATIC " : "" %>METHOD**

[Source code](<%= sourceFile + "#L" + y.line %>)

`<%= y.name === "new" ? y.name + " " + x.name : y.name %>(<%= _.map(y.args,function(x){ return x.name + " : " + x.type }).join(", ") %>) <% if (y.returnType) { %>: <%= y.returnType %><% } %>`

<%= y.description %>
    <% }) %>

    <% _.each(x.properties, function(y) { %>
## <%= y.name %>
**<%= y.isStatic ? "STATIC " : "" %>PROPERTY**

[Source code](<%= sourceFile + "#L" + y.line %>)

`<%= y.name %> <% if (y.type) { %>: <%=y.type %><% } %><% if (y.defaultValue) { %> = <%=y.defaultValue %><% } %>`

<%= (y.description || "").replace(/\n\+/g,"\n*") %>
    <% }) %>

<% } %>

<% }) %>
