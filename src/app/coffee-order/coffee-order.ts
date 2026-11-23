import { Component, signal, computed, effect, inject, PLATFORM_ID, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-coffee-order',
  templateUrl: './coffee-order.html',
  styleUrl: './coffee-order.css',
})
export class CoffeeOrder {
  // ✅ ตรวจว่ากำลังทำงานบนเบราว์เซอร์หรือไม่ (ต้องประกาศไว้ก่อน signal ที่ใช้ค่านี้)
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly COFFEE_PRICE = 55;
  readonly CAKE_PRICE = 75;
  readonly CROISSANT_PRICE = 45;

  coffeeQty = signal(this.load('coffeeQty'));
  cakeQty = signal(this.load('cakeQty'));
  croissantQty = signal(this.load('croissantQty'));
  isMember = signal(false);

  subtotal = computed(() =>
    this.coffeeQty() * this.COFFEE_PRICE + this.cakeQty() * this.CAKE_PRICE + this.croissantQty() * this.CROISSANT_PRICE
  );

  discount = computed(() => {
    let d = 0;
    if (this.isMember()) d += this.subtotal() * 0.1;
    if (this.subtotal() >= 300) d += 20;
    return d;
  });

  total = computed(() => this.subtotal() - this.discount());
  totalItems = computed(() => this.coffeeQty() + this.cakeQty() + this.croissantQty());

  freeShipping = computed(() => {
   

    if(this.subtotal() >= 500){
      return true
    }else{
      return false
    }
    
  })

  constructor() {
    effect(() => {
      const coffee = this.coffeeQty();
      const cake = this.cakeQty();
      const croissant = this.croissantQty();
      if (!this.isBrowser) return;          // ✅ บน Server ไม่ต้องบันทึก
      localStorage.setItem('coffeeQty', String(coffee));
      localStorage.setItem('cakeQty', String(cake));
      localStorage.setItem('croissantQty', String(croissant));
      console.log(cake)
    });

  }

  // ✅ อ่านค่าจาก localStorage เฉพาะเมื่ออยู่บนเบราว์เซอร์
  private load(key: string): number {
    if (!this.isBrowser) return 0;
    return Number(localStorage.getItem(key) ?? 0);
  }

  change(item: 'coffee' | 'cake' | 'croissant', amount: number) {
    // const target = item === 'coffee' ? this.coffeeQty : this.cakeQty : this.croissantQty ;
    let target: WritableSignal<number>;
    switch (item) {
      case 'coffee':
        target = this.coffeeQty;
        break;
      case 'cake':
        target = this.cakeQty;
        break;
      case 'croissant':
        target = this.croissantQty;
        break; 
    }
    target.update(q => Math.max(0, q + amount));
  }

  toggleMember() {
    this.isMember.update(m => !m);
  }

  clear() {
    this.coffeeQty.set(0);
    this.cakeQty.set(0);
  }
}