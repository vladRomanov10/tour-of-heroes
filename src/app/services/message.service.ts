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

  addId():number {
    const id:number = Math.floor(Math.random() * 101)
    const idIsRepeat:boolean = this.messages.some((message:Message) => message.id === id)

    if (idIsRepeat) {
      return this.addId()
    }
    return id
  }
}
