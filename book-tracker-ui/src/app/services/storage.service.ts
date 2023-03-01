import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {LANGUAGES} from "../models/languages";

const LANG_KEY = 'user-lang'
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.localStorage.clear();
  }

  public saveLang(user: User): void {
    window.localStorage.removeItem(LANG_KEY);
    let prefLang = LANGUAGES[0];
    if (user.prefLang != null) {
      let index = LANGUAGES.findIndex(x => x.lang === user.prefLang);
      if (index) {
        prefLang = LANGUAGES[index];
      }
    }
    window.localStorage.setItem(LANG_KEY, JSON.stringify(prefLang))
  }

  public getLang() {
    let prefLang = localStorage.getItem(LANG_KEY);
    if (prefLang) {
      return JSON.parse(prefLang)
    }
  }
}
