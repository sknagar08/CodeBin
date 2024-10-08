import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AboutComponent } from './components/about/about.component';
import { CreateBinComponent } from './components/create-bin/create-bin.component';
import { HomeComponent } from './components/home/home.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { authGuard } from './guard/auth.guard';
import { AllSnippetsComponent } from './components/all-snippets/all-snippets.component';
import { ViewSnippetComponent } from './components/view-snippet/view-snippet.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'about', loadComponent: () => import('./components/about/about.component').then(c => c.AboutComponent) },
    { path: 'create', component: CreateBinComponent, canActivate: [authGuard] },
    { path: 'snippets', component: AllSnippetsComponent, canActivate: [authGuard] },
    { path: 'snippet/:id', component: ViewSnippetComponent, canActivate: [authGuard] },
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: NotFoundComponent },
];
