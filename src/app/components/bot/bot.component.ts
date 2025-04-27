import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-bot',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './bot.component.html',
  styleUrl: './bot.component.scss'
})
export class BotComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messages: Message[] = [];
  currentMessage: string = '';
  isTyping: boolean = false;

  constructor() {
    // Mensajes iniciales del bot
    this.addBotMessage('Hola, soy Qaly');
    setTimeout(() => {
      this.addBotMessage('Estoy diseñada para darte una dieta acorde a tus gustos, preferencias, objetivos y alimentos a tu disposición');
      setTimeout(() => {
        this.addBotMessage('¿Listo/a para mejorar tu salud?');
      }, 1000);
    }, 1000);
  }

  ngOnInit() {
    // Cargar los iconos de Material
    const materialIconsLink = document.createElement('link');
    materialIconsLink.rel = 'stylesheet';
    materialIconsLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined';
    document.head.appendChild(materialIconsLink);
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  addUserMessage(content: string) {
    this.messages.push({
      content,
      isUser: true,
      timestamp: new Date()
    });
  }

  addBotMessage(content: string) {
    this.messages.push({
      content,
      isUser: false,
      timestamp: new Date()
    });
  }

  async sendMessage() {
    if (!this.currentMessage.trim()) return;

    const userMessage = this.currentMessage.trim();
    this.addUserMessage(userMessage);
    this.currentMessage = '';
    
    // Simular que el bot está escribiendo
    this.isTyping = true;
    
    // Simular respuesta del bot (esto se reemplazará con la llamada real a la API)
    setTimeout(() => {
      this.isTyping = false;
      this.addBotMessage('Estoy procesando tu mensaje. Esta es una respuesta temporal.');
    }, 1500);
  }
} 