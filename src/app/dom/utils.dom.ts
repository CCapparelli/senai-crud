export abstract class DOM {
    private constructor() {};

    static append(parent: HTMLElement, tag:string, classes: string[]) : HTMLElement {
        const result = document.createElement(tag);
        for (let i = 0; i < classes.length; i++) {
            result.classList.add(classes[i]);
        }
        parent.appendChild(result);
        return result;
    }

    static appendText(parent:HTMLElement, tag:string, classes: string[], content:string) {
        const result = this.append(parent, tag, classes);
        const text  = document.createTextNode(content);
        result.appendChild(text);
        return result;
    }
    
    static appendType(parent:HTMLElement, tag:string, type:string, classes: string[], content:string|null) {
        const result = this.append(parent, tag, classes);
        result.setAttribute('type', type);
        if (content) {
            const text  = document.createTextNode(content);
            result.appendChild(text);
        }
        return result;
    }
    
    static appendHeaderRow(parent:HTMLElement) : HTMLElement {
        const result = document.createElement('tr');
        parent.appendChild(result);
        return result;
    }
      
    static appendHeaderCell(tr:HTMLElement, content:string) {
        const cell = document.createElement('th');
        const text = document.createTextNode(content);
        cell.appendChild(text);
    
        tr.appendChild(cell);
    }
      
    static appendBodyCell(tr:HTMLElement, content:string|null) {
        const cell = document.createElement('td');
        if (content) {
          const text = document.createTextNode(content);
          cell.appendChild(text);
        }
        tr.appendChild(cell);
    }
      
    static appendBodyCellEl(tr:HTMLElement, child:HTMLElement) {
        const cell = document.createElement('td');
        cell.appendChild(child);
        tr.appendChild(cell);
    }
}