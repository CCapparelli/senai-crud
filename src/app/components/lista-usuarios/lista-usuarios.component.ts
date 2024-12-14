import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
export class ListaUsuariosComponent implements OnInit, AfterViewInit, ITable<IUserData>, IModal<IUserData> {
  list: IUserData[] = [];
  divTable: HTMLElement|null;
  divModal: HTMLElement|null;
  modalBuilder : ModalBuilder<IUserData>;

  current: IUserData;
  @ViewChild('myModal') modal: ElementRef | undefined;

  constructor(private dataServices: DataServices,
              private tableBuilder: TableBuilder
  ) {
    this.current = this.dataServices.users.empty;
    this.list = this.loadUsers();
    this.divTable = document.getElementById('divTable');
    this.divModal = document.getElementById('divModal');

    this.modalBuilder = new ModalBuilder<IUserData>(this);
  }
  ngAfterViewInit(): void {
    this.divModal = document.getElementById('divModal');
    if (this.divModal) {
      this.modalBuilder.build(this.divModal);
    }
  }
  
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.list     = this.loadUsers();
    this.divTable = document.getElementById('divTable');
    if (this.divTable && this.list) {
      this.tableBuilder.build<IUserData>(this, ['Email','Nome','WhatsApp','Endereço']);
    }
  }

  // loadModal() {
  //   this.current  = this.dataServices.users.empty;
  //   this.divModal = document.getElementById('divModal');
  //   if (this.divModal) { // && this.list) {
  //     this.modalBuilder.build<IUserData>(this);
  //   }
  // }

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
    // const modal = document.getElementById("myModal");
    // if (modal != null) 
    //   modal.style.display = 'block';

    this.modalBuilder.open(this.current);
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
    this.modalBuilder.open(this.current);
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