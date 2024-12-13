import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataServices } from '../../data/dataServices';
import { Address, IUserData } from '../../data/model/objectModel';

@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent {
  constructor(private dataServices: DataServices) {
    this.clientList = dataServices.users.data;
    this.clientObj = {email: '', name: '', mobile: '', address: new Address('','','')};
  }

  @ViewChild('myModal') model: ElementRef | undefined;
  clientObj: IUserData;
  clientList: IUserData[]|null;

  empty = {email: '', name: '', mobile: '', address: new Address('','','')};

  openModal() {
    const modal = document.getElementById("myModal");
    if (modal != null) 
      modal.style.display = 'block';
  }
  closeModal() {
    // Reseta o objeto clientObj para os valores padrão.
    this.clientObj = this.empty
    if (this.model != null) {
      // Altera o estilo para ocultar o modal.
      this.model.nativeElement.style.display = 'none';
    }
  }

  // Método para excluir um cliente da lista.
  onDelete(item: Cliente) {
    // Solicita confirmação do usuário antes de excluir.
    const isDelet = confirm("Você tem certeza que quer deletar?");
    if(isDelet) {
      // Encontra o índice do cliente na lista.
      const currentRecord = this.clientList.findIndex(m => m.id === this.clientObj.id);
      // Remove o cliente do array.
      this.clientList.splice(currentRecord, 1);
      // Atualiza o LocalStorage com a lista modificada.
      localStorage.setItem('angularCrud', JSON.stringify(this.clientList));
    }
  }

  // Método para editar os dados de um cliente.
  onEdit(item: Cliente) {
    // Atribui os dados do cliente selecionado ao clientObj.
    this.clientObj = item;
    // Abre o modal para edição.
    this.openModel();
  }

  // Método para atualizar os dados de um cliente existente.
  update() {
    // Busca o cliente atual na lista pelo ID.
    const currentRecord = this.clientList.find(m => m.id === this.clientObj.id);
    if(currentRecord != undefined) {
      // Atualiza os campos do cliente com os novos valores.
      currentRecord.name = this.clientObj.name;
      currentRecord.address = this.clientObj.address;
      currentRecord.mobileNo = this.clientObj.mobileNo;
    };
    // Salva a lista atualizada no LocalStorage.
    localStorage.setItem('angularCrud', JSON.stringify(this.clientList));
    // Fecha o modal.
    this.closeModel();
  }

  // Método para salvar um novo cliente na lista.
  save() {
    debugger; // Ponto de depuração para verificar o estado durante a execução.
    // Verifica se há dados existentes no LocalStorage.
    const isLocalPresent = localStorage.getItem("angularCrud");
    if (isLocalPresent != null) {
      // Converte os dados existentes em array.
      const oldArray = JSON.parse(isLocalPresent);
      // Atribui um novo ID baseado no tamanho do array.
      this.clientObj.id = oldArray.length + 1;
      // Adiciona o novo cliente à lista.
      oldArray.push(this.clientObj);
      // Atualiza a lista de clientes e o LocalStorage.
      this.clientList = oldArray;
      localStorage.setItem('angularCrud', JSON.stringify(oldArray));
    } else {
      // Cria um novo array caso o LocalStorage esteja vazio.
      const newArr = [];
      newArr.push(this.clientObj);
      this.clientObj.id = 1;
      this.clientList = newArr;
      // Salva a lista inicial no LocalStorage.
      localStorage.setItem('angularCrud', JSON.stringify(newArr));
    }
    // Fecha o modal após salvar.
    this.closeModel();
  }
}
