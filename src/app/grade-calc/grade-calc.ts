import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-grade-calc',
  templateUrl: './grade-calc.html',
  styleUrl: './grade-calc.css',
})
export class GradeCalc {
  score = signal<number | null>(null);

  grade = computed(() => {
    const s = this.score();
    if (s === null) return null;
    if (s >= 80) return 'A';
    if (s >= 70) return 'B';
    if (s >= 60) return 'C';
    if (s >= 50) return 'D';
    return 'F';
  });

  setScore(value: string) {
    this.score.set(value === '' ? null : Number(value));
  }
}