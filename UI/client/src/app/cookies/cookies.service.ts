import { Injectable } from '@angular/core';

@Injectable()
export class CookiesService {
    private static domain(): string {
        let host = location.host,
            parts = host.split('.'),
            partsLength = parts.length;

        return '.' + parts[partsLength - 2] + '.' + parts[partsLength - 1].replace(/:.*/i, '');
    }

    private static isLocalhost(): boolean {
        return this.domain().indexOf('localhost') !== -1;
    }

    public static get(name: string): string {
        let key: string = name + '=';
        let value: string[] = document.cookie.split(';');

        for (let i = 0; i < value.length; i++) {
            let cookie = value[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }

            if (cookie.indexOf(key) === 0) {
                return cookie.substring(key.length, cookie.length);
            }
        }

        return null;
    }

    public static put(name: string, value: string): void {
        let currentDate: Date = new Date(),
            expirationDate: Date = new Date(currentDate),
            domain: string = this.domain();

        if (value != null && typeof value === 'object') {
            value = JSON.stringify(value);
        }

        // Set expiration date to tomorrow
        expirationDate.setDate(currentDate.getDate() + 1);

        if (this.isLocalhost()) {
            // If we don't have more than two parts, we are probably running with localhost domain. We can't set cookies on domain=localhost.
            document.cookie = name + '=' + value + '; path=/; expires=' + expirationDate.toUTCString() + ';';
        } else {
            document.cookie = name + '=' + value + '; path=/; domain=' + domain + '; expires=' + expirationDate.toUTCString() + ';';
        }
    }

    public static remove(name: string): void {
        let domain = this.domain();
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = name + '=; path=/; domain=' + domain + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}