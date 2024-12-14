import { DOM } from './utils.dom';

export abstract class FloatingForm {
    private constructor() {};

    static Input(id:string, type:string, title:string, value:string, parent: HTMLElement ) : HTMLElement {
        const result = DOM.append(parent, 'div', ['form-floating']);
        
        const input = (type === 'textArea') 
                    ? DOM.append(result, 'textarea', ['form-control'])
                    : DOM.appendType(result, 'input', type, ['form-control'], null);
        const label = DOM.appendText(result, 'label', [], title);
        
        label.setAttribute('for', id);
        input.setAttribute('id', id);
        input.setAttribute('value', value);
        input.setAttribute('placeholder', title);
        
        parent.appendChild(result);
        return parent;
    }
}