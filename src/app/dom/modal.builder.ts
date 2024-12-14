import { IModal } from "../data/model/objectModel";
import { DOM } from './utils.dom';
import { FloatingForm } from './utils.form';

export class ModalBuilder<IUserData> {
    private component: IModal<IUserData>;
    current: IUserData;
    modalContainer: HTMLElement;

    constructor(component : IModal<IUserData>) {
        this.component = component;
        this.current   = this.component.current;
        this.modalContainer  = this.component.modalContainer;
        this.init();
    }

    init() {
        this.modalContainer.innerHTML = '';

        let dialog  = DOM.append(this.modalContainer, 'div', ['modal-dialog']);
        let content = DOM.append(dialog, 'div', ['modal-content']);

        let header = DOM.append(content, 'div', ['modal-header']);
        let body   = DOM.append(content, 'div', ['modal-body']);
        let footer = DOM.append(content, 'div', ['modal-footer']);
        let spaced = DOM.append(footer, 'div', ['f-sp-b']);

        // const title = (parent.current[0] === '') ? 'Novo' : 'Edição';
        const title = 'Modal';
        DOM.appendText(header, 'h4', ['modal-title'], title);
       
        const btnX = DOM.appendType(header, 'button', 'button', ['btn-close'], null);
        btnX.addEventListener('click', () => this.close());

        // body 
        const vName = FloatingForm.Input('txtName', 'text', 'Nome', body);
        vName.setAttribute('value', this.current.name);

        FloatingForm.Input('txtMobile', 'text', 'WhatsApp', body);
        FloatingForm.Input('txtEmail', 'email', 'Email', body);
        FloatingForm.Input('txtAddress', 'textArea', 'Endereço', body);
        FloatingForm.Input('txtCity', 'text', 'Cidade', body);
        FloatingForm.Input('txtState', 'text', 'Estado', body);
        FloatingForm.Input('txtPostalCode', 'text', 'CEP', body);

        // footer
        const btnCancel = DOM.appendType(spaced, 'button', 'button', ['btn', 'btn-danger'], 'Cancelar');
        btnCancel.addEventListener('click', () => this.close());

        const btnSave = DOM.appendType(spaced, 'button', 'button', ['btn', 'btn-primary'], 'Salvar');
        btnSave.addEventListener('click', () => this.component.saveOrUptade(this.current));
    }

    show(item : IUserData): void {
        this.modalContainer.style.display = 'block';
    }

    close = () => this.modalContainer.style.display = 'none';
}