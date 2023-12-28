import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Notice } from 'app/models/notice';
import { NoticeFile } from 'app/models/notice-file';
import { NoticeFileService } from 'app/services/notice-file.service';
import { NoticeService } from 'app/services/notice.service';

@Component({
  selector: 'app-notice-my-file',
  templateUrl: './notice-my-file.component.html',
  styleUrls: ['./notice-my-file.component.css']
})
export class NoticeMyFileComponent implements OnInit {

  arquivo: NoticeFile = new NoticeFile();
  editalId: number
  edital: Notice;
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private uploadService: NoticeFileService,
    private editaService: NoticeService,
  ){
  
  }
  ngOnInit(): void {
    this.onRefresh()
  }
  
  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.arquivo.arquivo = event.target.files[0]
    this.arquivo.descricao = event.target.files[0].name

    console.log(this.arquivo)
  }

  onRefresh(): any {
    this.route.params.subscribe((params: any) => {
      this.editalId = params['editalId'];
      if (this.editalId) {
        const edital$ = this.editaService.loadByID(this.editalId);
        edital$.subscribe(edital => {
          this.edital = edital;
        });
      }
    });
  }
  
  upload() {
    if (this.arquivo.arquivo) {
      this.uploadService.uploadfile(this.arquivo.arquivo, this.arquivo.descricao, this.editalId).subscribe(resp => {
      })
    } else {
      alert("Please select a file first")
    }
  }
 }