import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-home',
    imports: [
        MatInputModule,

    ],
    templateUrl: './home.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class HomeComponent {

}

