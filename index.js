'use strict';

var domify = require('domify');
var prevent = require('prevent');
var template = require('./template.html');
var proto = Editor.prototype;

module.exports = Editor;

function Editor(html) {
  this.el = domify(template);
  this.btns = [];
  this.content = this.el.querySelector('.simple-editor-content');
  this.toolbar = this.el.querySelector('.simple-editor-toolbar');
  html && (this.content.innerHTML = html);
}

proto.use = function (fn) {
  fn(this);
  return this;
};

proto.button = function (html, action) {
  var btn = {};

  if (typeof action === 'string') {
    action = (function (command) {
      return function () {
        this.command(command);
      };
    })(action);
  }

  btn.el = domify('<li>' + html + '</li>');
  btn.action = action;

  btn.el.addEventListener('mousedown', prevent);
  btn.el.addEventListener('click', this.onClick.bind(this, btn));

  this.toolbar.appendChild(btn.el);

  return this;
};

proto.command = function (command, arg) {
  var result = document.execCommand(command, false, arg);
  this.focus();
  return result;
};

proto.focus = function () {
  this.el.focus();
  return this;
};

proto.onClick = function (btn, e) {
  prevent(e);
  btn.action.call(this);
};
