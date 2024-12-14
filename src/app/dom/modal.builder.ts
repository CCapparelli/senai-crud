import { Injectable } from "@angular/core";
import { IModal } from "../data/model/objectModel";

export class ModalBuilder<T> {
    private component: IModal<T>;

    constructor(component : IModal<T>) {
        this.component = component;
    }

    open(item: T): void {
        const modal = document.getElementById("divModal");
        if (modal != null) 
          modal.style.display = 'block';
    }

    build(divModal:HTMLElement) {
        if (!divModal) return;
        divModal.innerHTML = '';

        let dialog  = this.append(divModal, 'div', ['modal-dialog']);
        let content = this.append(dialog, 'div', ['modal-content']);

        let header = this.append(content, 'div', ['modal-header']);
        let body   = this.append(content, 'div', ['modal-body']);
        let footer = this.append(content, 'div', ['modal-footer']);

        // const title = (parent.current[0] === '') ? 'Novo' : 'Edição';
        const title = 'Modal';
        this.appendText(header, 'h4', ['modal-title'], title);
       
        const btn1 = this.appendType(header, 'button', 'button', ['btn-close'], null);
        btn1.addEventListener('click', () => this.close());

        const btn2 = this.appendType(footer, 'button', 'button', ['btn-primary'], 'Salvar');
        btn2.addEventListener('click', () => this.close());

    }
    
    close() {
        const modal = document.getElementById("divModal");
        if (modal!= null) 
          modal.style.display = 'none';
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