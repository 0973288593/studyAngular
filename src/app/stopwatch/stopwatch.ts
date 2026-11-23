import { Component, signal, computed, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.html',
  styleUrl: './stopwatch.css',
})
export class Stopwatch implements OnDestroy {
  elapsed = signal(0);          // หน่วยเป็น 0.1 วินาที
  running = signal(false);
  private timerId?: ReturnType<typeof setInterval>;

  // แปลงเป็นรูปแบบ 00:00.0
  display = computed(() => {
    const total = this.elapsed();
    const min = Math.floor(total / 600);
    const sec = Math.floor((total % 600) / 10);
    const tenth = total % 10;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${tenth}`;
  });

  start() {
    if (this.running()) return;
    this.running.set(true);
    this.timerId = setInterval(() => {
      this.elapsed.update(t => t + 1);
    }, 100);
  }

  stop() {
    this.running.set(false);
    clearInterval(this.timerId);
  }

  reset() {
    this.stop();
    this.elapsed.set(0);
  }

  // ทำงานเมื่อ component ถูกลบออกจากหน้าจอ ใช้หยุด timer ไม่ให้ทำงานค้างอยู่
  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}