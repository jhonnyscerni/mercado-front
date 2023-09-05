import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Notice } from 'app/models/notice';
import { NoticeService } from 'app/services/notice.service';

@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss']
})
export class NoticeDetailComponent implements OnInit {

  test: Date = new Date();
  user: any;
  isCollapsed = true;
  id: number
  edital: Notice;
  editalId : number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editaService: NoticeService,
    private authService: AuthService) { }


    ngOnInit() {

      this.route.params.subscribe((params: any) => {
        this.editalId = params['editalId'];
        if (this.editalId) {
            const edital$ = this.editaService.loadByID(this.editalId);
            edital$.subscribe(edital => {
              console.log(edital)
                this.edital = edital;
            });
        }
    });
  }

  usuarioLogado(): boolean {
    this.user = this.authService.getUserName();
    return this.authService.isAuthenticated();
  }

  onLance(id): any {
    this.router.navigate(['../../editais', id ,'leilao', 'lance' ], { relativeTo: this.route });
  }

}
