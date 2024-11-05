import { Component, OnInit} from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentLang: string = 'en';
  isLanguageDropdownOpen = false;

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    //translate.setDefaultLang(this.currentLang);
    //translate.use(this.currentLang);
  }

  ngOnInit() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    this.currentLang = savedLanguage ?? 'en';
    this.translate.use(this.currentLang);
  }

  toggleLanguageDropdown(event: MouseEvent): void {
    event.stopPropagation(); // Prevent immediate closing when clicking inside the dropdown
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  closeLanguageDropdown(event: MouseEvent): void {
    const dropdownElement = document.querySelector('.language-dropdown');
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      this.isLanguageDropdownOpen = false;
    }
  }

  switchLanguage(lang: string): void {
    if (this.currentLang !== lang) {
      this.currentLang = lang;
      localStorage.setItem('selectedLanguage', lang);
      this.translate.use(lang);
    }
    this.isLanguageDropdownOpen = false;
  }

  getSelectedFlag() {
    return this.currentLang === 'en' ? 'assets/flags/en.svg' : 'assets/flags/fr.svg';
  }
}
