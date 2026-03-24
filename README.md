# Thuismeester — website

Pre-launch registratie website voor Thuismeester. Gebouwd met Next.js 16 en Tailwind CSS.

---

## Lokaal starten

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in de browser.

---

## Productie-build

```bash
npm run build
npm start
```

---

## Projectstructuur

```
src/
├── app/
│   ├── page.tsx                  ← Homepage
│   ├── hoe-werkt-het/page.tsx    ← Hoe werkt het
│   ├── diensten/page.tsx         ← Diensten
│   ├── over-thuismeester/page.tsx← Over pagina
│   ├── aanmelden/page.tsx        ← Aanmeldformulier
│   ├── contact/page.tsx          ← Contactpagina
│   ├── api/aanmelden/route.ts    ← API: verwerkt aanmeldingen
│   └── api/contact/route.ts      ← API: verwerkt contactberichten
└── components/
    ├── Navigation.tsx             ← Navigatiebalk
    ├── Footer.tsx                 ← Footer
    ├── Button.tsx                 ← Herbruikbare knopcomponent
    ├── SectionLabel.tsx           ← Kleine sectietitel boven koppen
    ├── AanmeldenForm.tsx          ← Aanmeldformulier (client component)
    └── ContactForm.tsx            ← Contactformulier (client component)

public/images/                     ← Voeg hier definitieve foto's toe
data/                              ← Formuliersubmissies worden hier opgeslagen
```

---

## Formulierdata

Aanmeldingen worden opgeslagen in `data/aanmeldingen.json` (NDJSON-formaat).
Contactberichten in `data/contactberichten.json`.

**Voor productie**: verbind een database of e-maildienst. Zie de commentaarblokken
bovenaan `src/app/api/aanmelden/route.ts` en `src/app/api/contact/route.ts`.

---

## Foto's vervangen

Zie `public/images/PHOTOS-PLACEHOLDER.md` voor de volledige lijst van foto's die
vervangen moeten worden. Zoek in de code naar `// TODO: replace src with` voor
exacte locaties.

Stap:
1. Upload foto naar `public/images/[naam].jpg`
2. Vervang de `images.unsplash.com` URL in het `<Image src=...>` attribuut
3. Verwijder het TODO-commentaar

---

## Tekst aanpassen

- **Regio's**: zoek op `regio` in `src/app/page.tsx` en `src/components/Footer.tsx`
- **Contactgegevens**: `CONTACT_EMAIL` en `CONTACT_PHONE` in `Footer.tsx` en `contact/page.tsx`
- **Diensten**: array `diensten` in `page.tsx` en `diensten/page.tsx`
- **Startdatum**: zoek op `januari 2027` in de pagina's

---

## Brochure

Er staat een placeholder-sectie op de Over-pagina (`src/app/over-thuismeester/page.tsx`)
voor de toekomstige brochure. Voeg daar een downloadlink toe als de brochure gereed is.
