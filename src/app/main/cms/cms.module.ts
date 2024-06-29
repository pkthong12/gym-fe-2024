import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CmsRoutes } from './cms.routing';

@NgModule({
    imports: [
        RouterModule.forChild(CmsRoutes),
    ],
    declarations: []
})
export class CmsModule {
}
