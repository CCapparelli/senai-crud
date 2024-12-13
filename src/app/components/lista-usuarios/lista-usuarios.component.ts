import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataServices } from '../../data/dataServices';
import { IModal, ITable, IUserData } from '../../data/model/objectModel';
import { TableBuilder } from '../../dom/table.builder';
import { ModalBuilder } from '../../dom/modal.builder';



@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit, ITable<IUserData> { //, IModal<IUserData> {
  list: IUserData[] = [];
  divTable: HTMLElement|null;
  // divModal: HTMLElement|null;

  current: IUserData;
  @ViewChild('divModal') modal: ElementRef | undefined;

  constructor(private dataServices: DataServices,
              private tableBuilder: TableBuilder,
              // private modalBuilder: ModalBuilder
  ) {
    this.current = this.dataServices.users.empty;
    this.list = this.loadUsers();
    this.divTable = document.getElementById('divTable');
    // this.divModal = document.getElementById('divModal');

    // this.modalBuilder.build<IUserData>(this);
  }
  
  ngOnInit(): void {
    this.loadData();
    // this.modalBuilder.build<IUserData>(this);
  }

  loadData() {
    this.current  = this.dataServices.users.empty;
    this.list     = this.loadUsers();
    this.divTable = document.getElementById('divTable');

    if (this.divTable && this.list) {
      this.tableBuilder.build<IUserData>(this, ['Email','Nome','WhatsApp','Endereço']);
    }
  }

  loadUsers(): IUserData[] {
    const x = this.dataServices.users?.data;
    return (x) ? x : [];
  }

  titleMessage() {
    return (this.list && this.list.length === 0) 
     ? 'Clique em "Adicionar" (ao lado) para inserir um novo cliente na lista.'
     : '';
  }

  openModal() {
    const modal = document.getElementById("divModal");
    if (modal != null) 
      modal.style.display = 'block';
  }
  closeModal() {
    this.current = this.dataServices.users.empty
    if (this.modal != null) 
      this.modal.nativeElement.style.display = 'none';
  }

  add() {
    this.current = this.dataServices.users.empty;
    this.openModal();  
  }
  
  edit(user: IUserData) {
    this.current = user;
    this.openModal();
  } 
  remove(user: IUserData) {
    const goOn = confirm(`Você tem certeza que quer deletar ${user.name}?`);
    if(goOn) 
      this.dataServices.users.remove(user);
  }

  saveOrUpdate() {
    this.dataServices.users.saveOrUpdate(this.current);
    this.closeModal();
    this.loadData();
  }
}