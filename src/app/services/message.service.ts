import { Injectable } from '@angular/core';
import {Message} from "../types/interfaces/message.interface";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public messages: Message[] = []

  add(message: Message) {
    this.messages.push(message)
  }

  clear() {
    this.messages = []
  }
}
