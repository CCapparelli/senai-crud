import { IContext, ITable } from "../data/model/objectModel";
import { DOM } from './utils.dom';

export class TableBuilder<IUserData> {
  cols : string[];
  context: IContext<IUserData>;
  container: HTMLElement;
  private component: ITable<IUserData>;

  constructor(component : ITable<IUserData>, context: IContext<IUserData>) {
    this.cols = ['Email','Nome','WhatsApp','Endereço','']; // última coluna para os botões

    this.component = component;
    this.context = context;
    this.container = component.tableContainer;

    this.load();
  }

  load() {
        
        this.container.innerHTML = '';

          let table  = DOM.append(this.container, 'table', ['table','table-striped','table-hover']);
          let header = DOM.append(table, 'thead', []);
          let headerRow = DOM.appendHeaderRow(header);
          for (let i = 0; i < this.cols.length; i++) {
            DOM.appendHeaderCell(headerRow, this.cols[i]);
          }
    
          let body = DOM.append(table, 'tbody', []);
          for (let i = 0; i < this.context.list.length; i++) {
            let tr = DOM.append(body, 'tr', []);
            const user = this.context.list[i];
            for (const key in user) {
              DOM.appendBodyCell(tr, user[key] as string);
            }
   
            let td = DOM.append(tr, 'td', []);
            let div = DOM.append(td, 'div', ['buttons'])
    
            let btn1 = DOM.append(div, 'button', ['btn','m-0','p-0']);
            btn1.addEventListener('click', () => this.component.edit(user));
            let i1 = DOM.append(btn1, 'i',  ['fa-solid', 'fa-pen-to-square', 'edit']);
            i1.setAttribute('title', 'Editar');
            
            let btn2 = DOM.append(div, 'button', ['btn','m-0','p-0']);
            btn2.addEventListener('click', () => this.component.remove(user));
            let i2 = DOM.append(btn2, 'i', ['fa-solid', 'fa-trash', 'trash']);
            i2.setAttribute('title', 'Remover');
          }

      }



    



      // //////////

    
}