import { Component } from '@angular/core';
import { Header } from './header/header'
import { LikeButton } from './like-button/like-button';
import { Stopwatch } from './stopwatch/stopwatch';
import { CoffeeOrder } from './coffee-order/coffee-order';
import { GradeCalc } from './grade-calc/grade-calc';
import { TodoList } from './todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [Header, LikeButton, Stopwatch, CoffeeOrder, GradeCalc, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  name = 'สมชาย ใจดี';
  job = 'นักพัฒนาเว็บมือใหม่';
  age = 25;
  hobby = 'sleep';
  darkMode = false;
  showDetail = true;
  num = 0;
  message = '';



  btnaddNumber() {
    this.num = this.num + 1;
  }
  btnRemoveNumber() {
    this.num = (this.num - 1 > 0) ? this.num - 1 : 0;
  }

  btnReset() {
    this.num = 0;
  }


  toggleTheme() {
    this.darkMode = !this.darkMode;
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

}