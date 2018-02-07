import { Injectable } from '@angular/core';

export interface SortSettings {
    sortBy: string;
    sortOrder: string;
}

export interface Settings {
    products: SortSettings;
    sells: SortSettings;
    collection: SortSettings;
    ingredients: SortSettings;
    terminals: SortSettings;
    events: {
        operational: SortSettings,
        system: SortSettings,
        uncertain: SortSettings,
        additional: SortSettings
    };
}

@Injectable()
export class SettingsService {

    _settings: Settings;
    constructor() {
        if (sessionStorage.getItem('settings')) {
            this._settings = JSON.parse(sessionStorage.getItem('settings'));
        } else {
            this._settings = {
                products: { sortBy: '', sortOrder: '' },
                sells: { sortBy: '', sortOrder: '' },
                collection: { sortBy: '', sortOrder: '' },
                ingredients: { sortBy: '', sortOrder: '' },
                terminals: { sortBy: '', sortOrder: '' },
                events: {
                    operational: { sortBy: 'Name', sortOrder: 'asc' },
                    system: { sortBy: 'Name', sortOrder: 'asc' },
                    uncertain: { sortBy: 'Name', sortOrder: 'asc' },
                    additional: { sortBy: 'Name', sortOrder: 'asc' },
                }
            };
        }
    }

    get settings(): Settings {
        return this._settings;
    }

    set settings(settings: Settings) {
        this._settings = settings;
    }

}
