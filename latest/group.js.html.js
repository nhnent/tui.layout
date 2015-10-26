ne.util.defineNamespace("fedoc.content", {});
fedoc.content["group.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview layout group. group include item.\n * @dependency code-snippet, jquery1.8.3, layout.js\n * @author NHN entertainment FE dev team Jein Yi(jein.yi@nhnent.com)\n */\n\nvar statics = require('./statics');\nvar Item = require('./item');\n\n/**\n * The group class make list of item and group element(jQueryObject).\n * @constructor\n */\nvar Group = tui.util.defineClass(/**@lends Group.prototype */{\n\t/**\n\t * Element pool\n\t */\n\t$pool: $('&lt;div class=\"pool\" style=\"display:none\">&lt;/div>'),\n\t/**\n\t * Initailize default member field\n\t * @param {object} options\n\t * \t@param {string} options.id\n\t *\t@param {array} options.items array of items\n\t * \t@param {string} [options.html] html of group element\n\t * \t@param {(number|string)} [options.ratio] ratio\n\t */\n\tinit: function(options) {\n\t\tif (!options) {\n\t\t\tthrow new Error(statics.ERROR.OPTIONS_NOT_DEFINED);\n\t\t}\n\n\t\tthis.size = options.ratio + '%';\n\t\tthis.id = options.id;\n\n\t\tthis._makeElement(options.html || statics.HTML.GROUP);\n\t\tthis._makeItems(options.items);\n\t\tthis._appendDimmed();\n\n\t\tthis.render();\n\t},\n\n\t/**\n\t * Make group element(JqueryObject)\n\t * @param {string} html The html string to create the html element\n\t * @private\n\t */\n\t_makeElement: function(html) {\n\t\thtml = this._getHtml(html, {\n\t\t\t'group-id': this.id\n\t\t});\n\n\t\tthis.$element = $(html);\n\t\tthis.$element.css({\n\t\t\t'position': 'relative',\n\t\t\t'width': this.size\n\t\t});\n\t},\n\n\t/**\n\t * Make markup with template\n\t * @param {string} html A item element html\n\t * @param {object} map The map to change html string\n\t * @returns {string}\n\t * @private\n\t */\n\t_getHtml: function(html, map) {\n\t\thtml = html.replace(/\\{\\{([^\\}]+)\\}\\}/g, function(mstr, name) {\n\t\t\treturn map[name];\n\t\t});\n\t\treturn html;\n\t},\n\n\t/**\n\t * Make list of item by items\n\t * @param {array} list The list of item's IDs\n\t * @private\n\t */\n\t_makeItems: function(list) {\n\t\tvar options = {\n\t\t\tgroupInfo: this.id\n\t\t};\n\t\tthis.list = tui.util.map(list, function(item) {\n\t\t\ttui.util.extend(item, options);\n\t\t\treturn new Item(item);\n\t\t}, this);\n\t},\n\n\t/**\n\t * Make dimmed element\n\t * @private\n\t */\n\t_makeDimmed: function() {\n\t\tthis.$dimmed = $('&lt;div class=\"' + statics.DIMMED_LAYER_CLASS + '\">&lt;/div>');\n\t\tthis.$dimmed.css({\n\t\t\tposition: 'absolute',\n\t\t\tleft: 0,\n\t\t\ttop: 0, \n\t\t\tbottom: 0,\n\t\t\tright: 0,\n\t\t\tdisplay: 'none'\n\t\t});\n\t},\n\n\t/**\n\t * Append dimmed element\n\t * @private\n\t */\n\t_appendDimmed: function() {\n\t\tif (!this.$dimmed) {\n\t\t\tthis._makeDimmed();\n\t\t}\n\t\tthis.$element.append(this.$dimmed);\n\t},\n\n\t/**\n\t * Remove item by index\n\t * @param {number} index The index of the item to remove\n\t **/\n\tremove: function(index) {\n\t\tthis.storePool(this.list[index]);\n\t\tthis.list.splice(index, 1);\n\t},\n\n\t/**\n\t * Add item to item list\n\t * @param {object} item item object\n\t * @param {number} [index] add The index of the item to add\n\t */\n\tadd: function(item, index) {\n\t\tif (arguments.length > 1) {\n\t\t\tthis.list.splice(index, 0, item);\n\t\t} else {\n\t\t\tthis.list.push(item);\n\t\t}\n\t\titem.groupInfo = this.id;\n\t},\n\n\t/**\n\t * Rearrange group items\n\t */\n\trender: function() {\n\t\ttui.util.forEach(this.list, function(item, index) {\n\t\t\tthis.$dimmed.before(item.$element);\n\t\t\titem.index = index;\n\t\t\titem.$element.attr({\n\t\t\t\t'data-index' : index,\n\t\t\t\t'data-groupInfo': this.id\n\t\t\t});\n\t\t}, this);\n\t\tthis.$dimmed.hide();\n\t},\n\n\t/**\n\t * Store items to pool\n\t * @param {object} $element A JQuery element to store in the pool\n\t */\n\tstorePool: function($element) {\n\t\tif ($element) {\n\t\t\tthis.$pool.append($element);\n\t\t} else {\n\t\t\ttui.util.forEach(this.list, function(item) {\n\t\t\t\tthis.$pool.append(item.$element);\n\t\t\t}, this);\n\t\t}\n\t}\n});\n\nmodule.exports = Group;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"