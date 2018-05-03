import { Injectable } from '@angular/core';

export interface SortSettings {
    sortBy: string;
    sortOrder: string;
    page?: number;
    rowsOnPage?: number;
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
        custom: SortSettings
    };
    eventStats: SortSettings;
    admin:SortSettings;
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
            products: { sortBy: '', sortOrder: '', page: 1, rowsOnPage: 10 },
            sells: { sortBy: '', sortOrder: '', page: 1, rowsOnPage: 10 },
            collection: { sortBy: '', sortOrder: '', page: 1, rowsOnPage: 10 },
            ingredients: { sortBy: '', sortOrder: '', page: 1, rowsOnPage: 10 },
            terminals: { sortBy: '', sortOrder: '', page: 1, rowsOnPage: 10 },
            events: {
                operational: { sortBy: 'Name', sortOrder: 'asc' },
                system: { sortBy: 'Name', sortOrder: 'asc' },
                uncertain: { sortBy: 'Name', sortOrder: 'asc' },
                custom: { sortBy: 'Name', sortOrder: 'asc' },
            },
            eventStats: { sortBy: '', sortOrder: '', page: 1, rowsOnPage: 10 },
            admin: { sortBy: '', sortOrder: '', page: 1, rowsOnPage: 10 }
        };
    }

}
