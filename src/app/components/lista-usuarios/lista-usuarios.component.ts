import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLocalContext } from '../../data/dataServices';
import { IModal, ITable, IUserData } from '../../data/model/objectModel';
import { TableBuilder } from '../../dom/table.builder';
import { ModalBuilder } from '../../dom/modal.builder';



@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements ITable<IUserData>, IModal<IUserData> {
  list: IUserData[] = [];
  current: IUserData;
  tableContainer: HTMLElement;
  modalContainer: HTMLElement;
  modalBuilder : ModalBuilder<IUserData>;
  tableBuilder: TableBuilder<IUserData>;
  
  // @ViewChild('myModal') modal: ElementRef | undefined;

  constructor(private usersContext: UserLocalContext) {
    this.tableContainer = this.getTableContainer();
    this.modalContainer = this.getModalContainer();

    this.list           = this.usersContext.list;
    this.current        = this.usersContext.emptyItem;
    
    this.tableBuilder   = new TableBuilder(this, this.usersContext);
    this.modalBuilder   = new ModalBuilder<IUserData>(this);
  }

  getTableContainer() {
    let result = document.createElement('div');
    result.setAttribute('id', 'divTable');
    result.className = 'container';
    document.body.appendChild(result);
    return result
  }
  
  getModalContainer() {
    let result = document.createElement('div');
    result.setAttribute('id', 'divMOdal');
    result.className = 'modal';
    document.body.appendChild(result);
    return result
  }
  
  titleMessage() {
    return (this.list && this.list.length === 0) 
     ? 'Clique em "Adicionar" (ao lado) para inserir um novo cliente na lista.'
     : '';
  }

  add() {
    this.current = this.usersContext.users.empty;
    this.modalBuilder.show(this.current);
  }

  // ITable
  edit(user: IUserData) {
    this.current = user;
    this.modalBuilder.show(this.current);
  } 
  remove(user: IUserData) {
    const goOn = confirm(`Você tem certeza que quer deletar ${user.name}?`);
    if(goOn) {
      this.usersContext.remove(user);
      this.tableBuilder.load();
    }
  }

  // IModal
  saveOrUptade(item: IUserData): void {
    this.usersContext.saveOrUptade(this.current);
    this.modalBuilder.close();
    this.tableBuilder.load();
  }
}