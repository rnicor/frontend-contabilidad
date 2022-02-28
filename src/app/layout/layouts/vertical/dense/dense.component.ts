import { environment } from 'environments/environment';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import {User} from '../../../../core/user/user.types';
import {AuthService} from '../../../../core/auth/auth.service';

@Component({
    selector     : 'dense-layout',
    templateUrl  : './dense.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DenseLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    navigation: Navigation;
    user: User;
    url: string;
    navigationAppearance: 'default' | 'dense' = 'dense';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        public _authService: AuthService
    ){
        this.url = environment.apiEndpoint + 'api/usuario/archivo';
    }

    get currentYear(): number{
        return new Date().getFullYear();
    }

    ngOnInit(): void{
        this.user = this._authService.usuario;

        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    ngOnDestroy(): void{
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    toggleNavigation(name: string): void{
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);
        if ( navigation ){
            navigation.toggle();
        }
    }

    toggleNavigationAppearance(): void{
        this.navigationAppearance = (this.navigationAppearance === 'default' ? 'dense' : 'default');
    }
}
