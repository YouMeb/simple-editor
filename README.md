simple-editor
-------------

```javascript
var Editor = require('simple-editor');
var editor = new Editor('<p>Hello</p>');

editor.button('<strong>B</strong>', 'bold');
editor.button('link', function () {
  this.command('createLink', window.prompt('link:'));
});

document.body.appendChild(editor.el);
```
