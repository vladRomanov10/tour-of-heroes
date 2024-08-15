import { Component, inject } from '@angular/core';
import { MessageService } from "../../services/message.service";


@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

  readonly messageService:MessageService = inject(MessageService)

}
