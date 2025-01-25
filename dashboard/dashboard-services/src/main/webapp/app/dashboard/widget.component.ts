import { Component, inject, input, OnChanges, OnInit, SimpleChanges, viewChild, ViewContainerRef } from '@angular/core';
import { ExposedComponentsService } from '@mattae/angular-shared';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'widget-cell',
    template: `
        <div class="flex flex-row w-full">
            <div #ref></div>
        </div>
    `,
    imports: [
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatMenuModule
    ],
    standalone: true
})
export class WidgetComponent implements OnInit, OnChanges {
    container = viewChild('ref', {read: ViewContainerRef})
    component = input.required<string>();
    #componentRef: any;
    #exposedComponentService = inject(ExposedComponentsService);

    constructor(private exposedComponentService: ExposedComponentsService) {
        const dynamicLifeCycleMethods = [
            'ngOnInit',
            'ngDoCheck',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewInit',
            'ngAfterViewChecked',
            'ngOnDestroy'
        ];

        dynamicLifeCycleMethods.forEach((method: string) => {
            // @ts-ignore
            this[method] = this.proxy.bind(this, method);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        Object.keys(changes)
            .map((changeName: any) => [changeName, changes[changeName]])
            .forEach(([inputParamName, simpleChange]: any) => {
                if (this.#componentRef?.instance)
                    this.#componentRef.instance[inputParamName] = simpleChange.currentValue;
            });

        //this.proxy('ngOnChanges', changes);
    }

    async ngOnInit() {
        await this.buildWidget();
    }

    ngOnDestroy() {
    }

    private async buildWidget() {
        const chartRef: any = await this.exposedComponentService
            .attachComponent(this.component(), this.container());
    }

    private proxy(methodName: any, ...args: any[]) {
        if (this.#componentRef.instance[methodName]) {
            this.#componentRef.instance[methodName].apply(this.#componentRef.instance, args);
        }
    }
}

