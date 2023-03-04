import {Injectable} from "@angular/core";
import {LanguageEntry, LANGUAGES} from "../models/languages";

const LANG_KEY = 'user-lang'
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.localStorage.clear();
  }

  public saveLang(language?: string): void {
    window.localStorage.removeItem(LANG_KEY);
    let prefLang = LANGUAGES[0];
    if (language !== undefined && language !== null && language !== "") {
      let index = LANGUAGES.findIndex(x => x.lang === language);
      prefLang = LANGUAGES[index];
    }
    window.localStorage.setItem(LANG_KEY, JSON.stringify(prefLang))
  }

  public getLang(): LanguageEntry {
    const prefLang = localStorage.getItem(LANG_KEY);
    if (prefLang) {
      return JSON.parse(prefLang)
    } else {
      return LANGUAGES[0]
    }
  }
}
