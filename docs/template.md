<% _.each(types, function(x) { %>
# `<%= x.name %>` 
**`<%= x.$type %>`**

<%= x.description %>

[Go to source](<%= sourceFile %>)

<% if (x.$type === "Class" || x.$type === "Interface") { %>

<% if (x.parentClass) { %>
*Extends:* [`<%= x.parentClass %>`]( <%= x.parentClass %>)
<% } %>

<% if (x.interfaces && x.interfaces.length) { %>
*Implements:* <%= _.map(x.interfaces, function(x){ return "[`" + x + "`](" + x + ")"}).join(", ") %>
<% } %>

    <% _.each(x.properties, function(y) { %>
## `<%= y.name %>`
*PROPERTY*

**`<%= y.name %> <% if (y.type) { %>: y.type %><% } %><% if (y.defaultValue) { %> = <%=y.defaultValue %><% } %>`**

<%= (y.description || "").replace(/\n\+/g,"\n*") %>
    <% }) %>

    <% _.each(x.methods, function(y) { %>
## `<%= y.name === "new" ? "constructor" : y.name %>`
*METHOD*

**`<%= y.name %>(<%= _.map(y.args,function(x){ return x.name + " : " + x.type }).join(", ") %>) <% if (y.returnType) { %>: <%= y.returnType %><% } %>`**

<%= y.description %>
    <% }) %>
   
<% } %>

<% }) %>
