import { Injectable } from "@angular/core";
import { IModal } from "../data/model/objectModel";

@Injectable({providedIn: "root"})
export class ModalBuilder {

    build<T>(parent: IModal<T>) {
        if (!parent.divModal) return;
        parent.divModal.innerHTML = '';

        let dialog  = this.append(parent.divModal, 'div', ['modal-dialog']);
        let content = this.append(dialog, 'div', ['modal-content']);

        let header = this.append(content, 'div', ['modal-header']);
        let body   = this.append(content, 'div', ['modal-body']);
        let footer = this.append(content, 'div', ['modal-footer']);

        const title = (parent.current[0] === '') ? 'Novo' : 'Edição';
        this.appendText(header, 'h4', ['modal-title'], title);
       
        const btn1 = this.appendType(header, 'button', 'button', ['btn-close'], null);
        btn1.addEventListener('click', () => parent.closeModal());



    }

    append(parent: HTMLElement, tag:string, classes: string[]) : HTMLElement {
        const result = document.createElement(tag);
        for (let i = 0; i < classes.length; i++) {
            result.classList.add(classes[i]);
        }
        parent.appendChild(result);
        return result;
    }

    appendText(parent:HTMLElement, tag:string, classes: string[], content:string) {
        const result = this.append(parent, tag, classes);
        const text  = document.createTextNode(content);
        result.appendChild(text);
        return result;
    }
    
    appendType(parent:HTMLElement, tag:string, type:string, classes: string[], content:string|null) {
        const result = this.append(parent, tag, classes);
        result.setAttribute('type', type);
        if (content) {
            const text  = document.createTextNode(content);
            result.appendChild(text);
        }
        return result;
    }
}