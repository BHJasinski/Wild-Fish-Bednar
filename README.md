# Wild Fish Bednar

Responsywna, statyczna strona katalogowa hodowli i kanału BEDNAR Tv Akwarystyka. Działa bez instalowania zależności oraz bez backendu.

## Podgląd lokalny

Rozpakuj paczkę i otwórz `index.html`. Możesz też uruchomić `python3 -m http.server 8000` z katalogu plików i odwiedzić `http://localhost:8000`. Serwer lokalny pozwala również użyć przycisku kopiowania, jeśli przeglądarka udostępnia schowek.

## GitHub i publikacja

Repozytorium GitHub może przechowywać kod niezależnie od wyboru hostingu. Wgraj **zawartość ZIP-a** do głównego katalogu repozytorium, aby `index.html` i folder `assets` były widoczne od razu po jego otwarciu. Zachowaj plik `.nojekyll`.

Jeśli hostujesz dopuszczoną wersję informacyjną na GitHub Pages, przejdź do **Settings → Pages → Deploy from a branch → main → /(root)** i zapisz. Ścieżki zasobów są względne, więc strona jest przygotowana także do adresu z nazwą repozytorium. [Instrukcja GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

Jeśli głównym celem publikacji ma być sprzedaż, wybierz hosting dopuszczający działalność handlową. GitHub Pages nie jest przeznaczone do prowadzenia biznesu online, sklepów ani stron nastawionych głównie na ułatwianie transakcji. [Ograniczenia GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## Formularz i katalog

Formularz układa wiadomość do `mariuszbed9685@gmail.com`. Klient sam otwiera pocztę i wysyła wiadomość lub kopiuje treść. Strona niczego nie wysyła na serwer, nie zapisuje danych i nie składa zamówienia. Gdy kopiowanie jest niedostępne, treść można zaznaczyć ręcznie. Przy wyłączonym JavaScripcie działają bezpośrednie linki do telefonu i e-maila.

Karty pokazują przykładowe grupy, a nie stany magazynowe. Nie wpisano fikcyjnych cen ani terminów dostawy.

- `index.html` – treść, dane kontaktowe, karty ryb i metadane.
- `style.css` – wygląd i układ mobilny.
- `script.js` – menu, wybór gatunku oraz wiadomość e-mail. Jeśli zmieniasz adres poczty, podmień go zarówno tutaj, jak i w HTML.
- `assets/` – lokalne pliki graficzne, w tym portret Mariusza, logo i mapa. Dane kartograficzne mapy: Natural Earth.

Po ustaleniu docelowego adresu można dodać bezwzględne wartości `og:url`, `og:image` oraz `canonical` w sekcji `head`. Nie wstawiono przykładowej domeny do metadanych.

## Interaktywna mapa

Wybór kraju lub rzeki uruchamia przybliżenie i podświetla odpowiedni kształt. Kliknięcie w „Zapytaj o ryby z…” wpisuje kierunek do formularza, bez czyszczenia pozostałych pól. Mapą można sterować także przyciskami i klawiaturą, a ograniczenie animacji w ustawieniach systemu jest respektowane. Przy wyłączonym JavaScripcie wyświetla się wersja statyczna.

Mapa używa lokalnego SVG osadzonego w `index.html` i pliku `map.js`. Nie wymaga żadnego zewnętrznego serwisu ani klucza API. Dane geograficzne: Natural Earth.
