import { Routes } from '@angular/router';
import path from 'path';
import { ListaComponent } from './components/lista/lista.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';

export const routes: Routes = [
    { path: '', component: ListaUsuariosComponent }, 
    { path: 'lista', component: ListaComponent }, 
];
