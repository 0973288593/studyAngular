import { Component, signal, computed } from '@angular/core';

// รูปร่างข้อมูลของ todo 1 รายการ
interface Todo {
  id: number;
  title: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high';
}

type Filter = 'all' | 'active' | 'done';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todos = signal<Todo[]>([
    { id: 1, title: 'เรียน Angular บทที่ 4', done: false, priority: 'high' },
    { id: 2, title: 'ซื้อกาแฟ', done: true, priority: 'low' },
  ]);

  filter = signal<Filter>('all');
  private nextId = 3;

  // รายการที่แสดงตาม filter ที่เลือก
  visibleTodos = computed(() => {
    const list = this.todos();
    switch (this.filter()) {
      case 'active': return list.filter(t => !t.done);
      case 'done':   return list.filter(t => t.done);
      default:       return list;
    }
  });

  remaining = computed(() => this.todos().filter(t => !t.done).length);
  doneCount = computed(() => this.todos().length - this.remaining());

  add(title: string, priority: string) {
    const text = title.trim();
    if (!text) return;
    this.todos.update(list => [
      ...list,
      { id: this.nextId++, title: text, done: false, priority: priority as Todo['priority'] },
    ]);
  }

  toggle(id: number) {
    this.todos.update(list =>
      list.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  remove(id: number) {
    this.todos.update(list => list.filter(t => t.id !== id));
  }

  clearDone() {
    this.todos.update(list => list.filter(t => !t.done));
  }
}