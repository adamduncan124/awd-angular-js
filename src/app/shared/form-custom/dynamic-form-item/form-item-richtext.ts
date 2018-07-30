import { FormItemBase } from './form-item-base';
import { IRichTextButton } from '../../../models/rich-text-button';

declare var AWD: any;

enum ButtonTypes {Limited, Full, None}

export class FormItemRichText extends FormItemBase<string> {

  controlType = 'richtext';
  type: string;
  value: string;

  isReadOnly: boolean = false;
  editorMode: string = "html";  
  xHtml: boolean = true;
  lang: string = "en";
  encodding: string = "iso-8859-1";
  buttonType: ButtonTypes = ButtonTypes.Limited;

  get selectedAction(): string{
    return AWD.RichText.SelectedAction;
  }
  set selectedAction(value: string) {
    AWD.RichText.SelectedAction = value;
  }
  get selectedRange(): any{
    return AWD.RichText.SelectedRange;
  }
  set selectedRange(value: any) {
    AWD.RichText.SelectedRange = value;
  }

  buttons: IRichTextButton[];

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';

    this.buttons = [ 
      { action: "cut", desc: "Cut", type: "image-button", limited: false }, 
      { action: "copy", desc: "Copy", type: "image-button", limited: false }, 
      { action: "paste", desc: "Paste", type: "image-button", limited: false }, 
      { action: "font-family", desc: "Font", type: "font-family", limited: false }, 
      { action: "font-size", desc: "Size", type: "font-size", limited: false }, 
      { action: "bold", desc: "Bold", type: "image-button", limited: true }, 				
      { action: "italic", desc: "Italic", type: "image-button", limited: true }, 
      { action: "underline", desc: "Underline", type: "image-button", limited: true }, 
      { action: "justifyleft", desc: "Align Left", type: "image-button", limited: true }, 
      { action: "justifycenter", desc: "Align Center", type: "image-button", limited: true }, 
      { action: "justifyright", desc: "Align Right", type: "image-button", limited: true }, 
      { action: "justifyfull", desc: "Justify Full", type: "image-button", limited: true }, 
      { action: "inserthorizontalrule", desc: "Horizontal Rule", type: "image-button", limited: false }, 
      { action: "insertorderedlist", desc: "Ordered List", type: "image-button", limited: true }, 
      { action: "insertunorderedlist", desc: "Unordered List", type: "image-button", limited: true }, 
      { action: "outdent", desc: "Outdent", type: "image-button", limited: false }, 
      { action: "indent", desc: "Indent", type: "image-button", limited: false }, 
      { action: "forecolor", desc: "Text Color", type: "image-button", limited: false }, 
      { action: "hilitecolor", desc: "Background Color", type: "image-button", limited: false }, 
      //{ action: "link", desc: "Insert Link", type: "image-button", limited: true }, 
      { action: "media", desc: "Insert Media", type: "image-button", limited: true }, 
      //{ action: "table", desc: "Insert Table", type: "image-button", limited: false }, 
      { action: "undo", desc: "Undo", type: "image-button", limited: false }, 
      { action: "redo", desc: "Redo", type: "image-button", limited: false }				
    ];
  }

  public SetFontSize(id: string): void{
    AWD.RichText.RichActions.SetFont(this.name, "fontsize", id);
  }

  public SetFontName(id: string): void{
    AWD.RichText.RichActions.SetFont(this.name, "fontname", id);
  }

  public CommandAction(cmd: string, value: any = null): void{
    AWD.RichText.RichActions.Command(this.name, cmd, value);
  }

  public ToggleCodeBehindMode(): void{
    this.editorMode = AWD.RichText.RichActions.ToggleCodeBehindMode(this.name, this.editorMode);
  }

  public Init(): void{
    AWD.RichText.RichActions.EnableDesignMode(this.name, this.value, this.isReadOnly, true);
  }

  public GetValueFromGlobal(): void{
    return AWD.RichText.AngList[this.name]; //move back to form control
  }

  public SaveToHidden(): void{
    AWD.RichText.RichActions.SaveHtmlToHidden(this.name);
  }
}