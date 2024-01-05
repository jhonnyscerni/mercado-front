import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from '../../../../models/role';
import { RoleService } from '../../../../services/role.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-roles-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

    roles: Role[];
    errorMessage: string;

    roleselected: Role;
    // Paginação
    totalElements = 0;
    page = 1;
    pageElement = 0;
    size = 10;


    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private roleService: RoleService
    ) {
    }

    ngOnInit(): void {
        this.onRefresh();
    }

    onRefresh(): void {
        this.roleService.list()
            .subscribe((value) => {
                this.roles = value;
            }, (error) => {
                console.log(error);
            });
    }

    onCreate(): any {
        this.router.navigate(['/grupos/adicionar'], { relativeTo: this.route });
    }

    onEdit(id): any {
        this.router.navigate(['/grupos/editar', id], { relativeTo: this.route });
    }

    onDetalhe(id): any {
        this.router.navigate(['/grupos/detalhe', id], { relativeTo: this.route });
    }
}
