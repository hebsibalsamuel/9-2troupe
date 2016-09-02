ace.require("ace/ext/language_tools");
               var editor = ace.edit("editor");
               editor.setTheme("ace/theme/solarized_light");
               editor.session.setMode("ace/mode/javascript");
               editor.setOption({
                 enableBasicAutocompletion: true
               });