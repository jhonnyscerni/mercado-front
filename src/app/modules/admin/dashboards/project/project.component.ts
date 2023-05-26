import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {DashboardService} from '../../../../services/dashboard.service';
import {AuthService} from "../../../../core/auth/auth.service";

@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit, OnDestroy {
    //selectedProject: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private id = this._authService.getUserId();

    private numberPerson: number = 0;
    private numberPersonVoteIsConquistado: number = 0;
    private numberPersonVoteIsAConquistar: number = 0;
    private numberPersonVoteIsPerdido: number = 0;

    private user: any;

    /**
     * Constructor
     */
    constructor(
        private _dashboardService: DashboardService,
        private _router: Router,
        private _authService: AuthService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.user = this._authService.getUserName();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public Request Prams
    // -----------------------------------------------------------------------------------------------------

    getRequestParams(): any {
        const params = {};
        params['id'] = this.id;
        return params;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

}
