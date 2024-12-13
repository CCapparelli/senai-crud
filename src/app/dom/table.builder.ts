import { Injectable } from "@angular/core";
import { ITable } from "../data/model/objectModel";

@Injectable({providedIn: "root"})
export class TableBuilder {

    build<T>(parent: ITable<T>, cols:string[]) {
      if (!parent.divTable) return;

        cols.push(''); // coluna para os botões
        parent.divTable.innerHTML = '';

          let table  = this.append(parent.divTable, 'table', 'table table-striped table-hover');
          let header = this.append(table, 'thead', null);
          let headerRow = this.appendHeaderRow(header);
          for (let i = 0; i < cols.length; i++) {
            this.appendHeaderCell(headerRow, cols[i]);
          }
    
          let body = this.append(table, 'tbody', null);
          for (let i = 0; i < parent.list.length; i++) {
            let tr = this.append(body, 'tr', null);
            const user = parent.list[i];
            for (const key in user) {
                this.appendBodyCell(tr, user[key] as string);
            }
   
            let td = this.append(tr, 'td', null);
            let div = this.append(td, 'div', 'buttons')
    
            let btn1 = this.append(div, 'button', 'btn m-0 p-0');
            btn1.addEventListener('click', () => parent.edit(user));
            let i1 = this.appendX(btn1, 'i',  ['fa-solid', 'fa-pen-to-square', 'edit']);
            i1.setAttribute('title', 'Editar');
            
            let btn2 = this.append(div, 'button', 'btn m-0 p-0');
            btn2.addEventListener('click', () => parent.remove(user));
            let i2 = this.appendX(btn2, 'i', ['fa-solid', 'fa-trash', 'trash']);
            i2.setAttribute('title', 'Remover');
          }

      }

    appendX(parent: HTMLElement, tag:string, classes: string[]) : HTMLElement {
        const result = document.createElement(tag);
        for (let i = 0; i < classes.length; i++) {
          result.classList.add(classes[i]);
        }
        parent.appendChild(result);
        return result;
      }
      
      append(parent: HTMLElement, tag:string, classes: string|null) : HTMLElement {
        const result = document.createElement(tag);
        if (classes)
          result.className = classes;
      
        parent.appendChild(result);
        return result;
      }
      appendHeaderRow(parent:HTMLElement) : HTMLElement {
        const result = document.createElement('tr');
        parent.appendChild(result);
        return result;
      }
      appendHeaderCell(tr:HTMLElement, content:string) {
        const cell = document.createElement('th');
        const text = document.createTextNode(content);
        cell.appendChild(text);
    
        tr.appendChild(cell);
      }
      appendBodyCell(tr:HTMLElement, content:string|null) {
        const cell = document.createElement('td');
        if (content) {
          const text = document.createTextNode(content);
          cell.appendChild(text);
        }
        tr.appendChild(cell);
      }
      appendBodyCellEl(tr:HTMLElement, child:HTMLElement) {
        const cell = document.createElement('td');
        cell.appendChild(child);
        tr.appendChild(cell);
      }
    
}