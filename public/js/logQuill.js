

// var squill = new Quill('#testdiv', {  
//     theme: 'snow'
// });


let BlockEmbed = Quill.import('blots/block/embed');
class DividerBlot extends BlockEmbed { }
DividerBlot.blotName = 'divider';
DividerBlot.tagName = 'hr';
Quill.register(DividerBlot);


addDividerButton = (id) => `<span class="ql-formats"><button id="divider-button-${id}">${$$hr}</button></span>`;

linkDividerButton = (quill, id) => {
    $(`#divider-button-${id}`).click(function(e) {
        e.preventDefault();
        let range = quill.getSelection(true);
        quill.insertText(range.index, '\n', Quill.sources.USER);
        quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
        quill.setSelection(range.index + 2, Quill.sources.SILENT);
    });
}

