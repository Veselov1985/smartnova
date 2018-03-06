import { Injectable } from '@angular/core';

export interface SortSettings {
    sortBy: string;
    sortOrder: string;
    page?: number;
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
    eventStats: SortSettings;
}

@Injectable()
export class SettingsService {

    _settings: Settings;

    constructor() {
        if (sessionStorage.getItem('settings')) {
            this._settings = JSON.parse(sessionStorage.getItem('settings'));
        } else {
            this.setDefaultSettings();
        }
    }

    get settings(): Settings {
        return this._settings;
    }

    set settings(settings: Settings) {
        this._settings = settings;
    }

    setDefaultSettings() {
        this._settings = {
            products: { sortBy: '', sortOrder: '', page: 1 },
            sells: { sortBy: '', sortOrder: '', page: 1 },
            collection: { sortBy: '', sortOrder: '', page: 1 },
            ingredients: { sortBy: '', sortOrder: '', page: 1 },
            terminals: { sortBy: '', sortOrder: '', page: 1 },
            events: {
                operational: { sortBy: 'Name', sortOrder: 'asc' },
                system: { sortBy: 'Name', sortOrder: 'asc' },
                uncertain: { sortBy: 'Name', sortOrder: 'asc' },
                additional: { sortBy: 'Name', sortOrder: 'asc' },
            },
            eventStats: { sortBy: '', sortOrder: '', page: 1 }
        };
    }

}
