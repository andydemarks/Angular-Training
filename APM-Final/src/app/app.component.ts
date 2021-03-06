import { Component } from '@angular/core';

//updated the buttons to have no text underline
//!! This code is buggy and I do not like the way this routing was done by the training
//!! would have done it differently by actually using angular routing.

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <a class='navbar-brand' style='text-decoration: none'>Nasa Mars Rover List</a>
        <ul class='nav nav-pills'>
          <li><a class='nav-link' routerLinkActive='active' style='text-decoration: none' routerLink='/welcome'>Home</a></li>
          <li><a class='nav-link' routerLinkActive='active' style='text-decoration: none' routerLink='/products'>Product List</a></li>
        </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
}
