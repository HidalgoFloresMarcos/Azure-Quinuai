import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ingredient {
  name: string;
  weight: number;
  price: number;
  image: string;
}

interface NutritionalValue {
  name: string;
  percentage: number;
  value: string;
}

interface ShoppingItem {
  name: string;
  weight: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {
  selectedMeal: 'Almuerzo' | 'Desayuno' | 'Cena' = 'Almuerzo';
  selectedDay: number = 1;
  showCalendar = false;
  currentDate = new Date();
  currentMonth: number;
  currentYear: number;
  selectedDate: Date | null = null;

  months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  calendarDays: { date: Date; isOtherMonth: boolean }[] = [];

  ingredients: Ingredient[] = [
    {
      name: 'Lechuga',
      weight: 150,
      price: 2.20,
      image: 'assets/images/lettuce.png'
    },
    {
      name: 'Tomates',
      weight: 150,
      price: 5.00,
      image: 'assets/images/tomatoes.png'
    },
    {
      name: 'Queso',
      weight: 150,
      price: 8.00,
      image: 'assets/images/cheese.png'
    },
    {
      name: 'Palta',
      weight: 150,
      price: 4.00,
      image: 'assets/images/avocado.png'
    },
    {
      name: 'Pollo',
      weight: 150,
      price: 8.00,
      image: 'assets/images/chicken.png'
    }
  ];

  nutritionalValues: NutritionalValue[] = [
    {
      name: 'Carbohidratos',
      percentage: 45,
      value: '45g/100 gr'
    },
    {
      name: 'Proteínas',
      percentage: 74,
      value: '45g/100 gr'
    },
    {
      name: 'Grasas',
      percentage: 14,
      value: '45g/100 gr'
    }
  ];

  shoppingItems: ShoppingItem[] = [
    {
      name: 'Lechuga',
      weight: '1kg',
      price: 2.20,
      image: 'assets/images/lettuce.png'
    },
    {
      name: 'Huevos',
      weight: '1kg',
      price: 10.00,
      image: 'assets/images/eggs.png'
    },
    {
      name: 'Queso',
      weight: '700 gr',
      price: 8.00,
      image: 'assets/images/cheese.png'
    },
    {
      name: 'Palta',
      weight: '250',
      price: 4.00,
      image: 'assets/images/avocado.png'
    },
    {
      name: 'Pollo',
      weight: '1kgr',
      price: 8.00,
      image: 'assets/images/chicken.png'
    }
  ];

  years: number[] = [];

  constructor() {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    
    // Generar array de años (5 años antes y después del actual)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
      this.years.push(year);
    }
    
    this.generateCalendarDays();
  }

  ngOnInit(): void {
  }

  changeMeal(meal: 'Almuerzo' | 'Desayuno' | 'Cena'): void {
    this.selectedMeal = meal;
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
    if (this.showCalendar) {
      this.generateCalendarDays();
    }
  }

  closeCalendar(event: MouseEvent): void {
    // Solo cerramos si el clic fue directamente en el overlay
    if (event.target === event.currentTarget) {
      this.showCalendar = false;
    }
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendarDays();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendarDays();
  }

  onMonthChange(): void {
    this.generateCalendarDays();
  }

  onYearChange(): void {
    this.generateCalendarDays();
  }

  generateCalendarDays(): void {
    this.calendarDays = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    
    // Días del mes anterior
    const firstDayWeekday = firstDayOfMonth.getDay();
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const date = new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - i);
      this.calendarDays.push({ date, isOtherMonth: true });
    }

    // Días del mes actual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      this.calendarDays.push({ date, isOtherMonth: false });
    }

    // Días del mes siguiente
    const remainingDays = 42 - this.calendarDays.length; // 6 semanas * 7 días
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(this.currentYear, this.currentMonth + 1, day);
      this.calendarDays.push({ date, isOtherMonth: true });
    }
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    this.showCalendar = false;
  }

  isSelectedDay(date: Date): boolean {
    return this.selectedDate?.toDateString() === date.toDateString();
  }

  isToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }
}
