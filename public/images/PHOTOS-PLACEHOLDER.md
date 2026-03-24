# Foto's — plaatsingslijst voor definitieve fotografie

Vervang de Unsplash-placeholder-URLs in de code door onderstaande bestandsnamen
zodra de definitieve fotografie beschikbaar is. Upload de afbeeldingen naar
`/public/images/` en vervang de `src`-attributen in de pagina's.

---

## Homepage (`src/app/page.tsx`)

| Bestand                     | Aanbevolen inhoud                                              |
|-----------------------------|----------------------------------------------------------------|
| `hero-home.jpg`             | Prachtige, verzorgde Nederlandse woning, buiten, warm licht    |
| `homeowner-busy.jpg`        | Huiseigenaar met aandacht voor woningzaken, subtiel druk       |
| `service-homeowner.jpg`     | Thuismeester in gesprek met bewoner — warm en professioneel    |
| `launch-amersfoort.jpg`     | Rustige woonwijk, straat of beeld van de regio Amersfoort      |

## Hoe werkt het (`src/app/hoe-werkt-het/page.tsx`)

| Bestand                     | Aanbevolen inhoud                                              |
|-----------------------------|----------------------------------------------------------------|
| `step-aanmelden.jpg`        | Iemand die een formulier invult op tablet of laptop            |
| `step-regio.jpg`            | Rustige straat of wijk in Amersfoort / omstreken               |
| `step-thuismeester.jpg`     | Thuismeester helpt bewoner, warm gesprek                       |

## Diensten (`src/app/diensten/page.tsx`)

| Bestand                     | Aanbevolen inhoud                                              |
|-----------------------------|----------------------------------------------------------------|
| `diensten-header.jpg`       | Nette woonkamer of interieur, rustig en licht                  |
| `contact-trust.jpg`         | Betrouwbaar gesprek, warme entree of vriendelijk portret       |

## Over Thuismeester (`src/app/over-thuismeester/page.tsx`)

| Bestand                     | Aanbevolen inhoud                                              |
|-----------------------------|----------------------------------------------------------------|
| `over-header.jpg`           | Portret van oprichter of teamfoto, professioneel en warm       |
| `about-story.jpg`           | Bewoner in een nette, sfeervolle woning, dagelijks tafereel    |
| `about-home-1.jpg`          | Nette voordeur of entree van een verzorgde woning              |
| `about-home-2.jpg`          | Rustige, nette woonruimte met naturel tinten en licht          |

## Aanmelden (`src/app/aanmelden/page.tsx`)

| Bestand                     | Aanbevolen inhoud                                              |
|-----------------------------|----------------------------------------------------------------|
| `contact-trust.jpg`         | (gedeeld met diensten-pagina)                                  |

## Contact (`src/app/contact/page.tsx`)

| Bestand                     | Aanbevolen inhoud                                              |
|-----------------------------|----------------------------------------------------------------|
| `contact-trust.jpg`         | Warme sfeer, gastvrije entree of professioneel contact         |

---

## Technische richtlijnen

- Formaat: JPEG, minimaal 1400px breed voor volledigheid
- Hero-afbeeldingen: minimaal 1800px breed
- Thumbnails/sidebar: minimaal 700px breed
- Bestandsgrootte: comprimeer naar <300 KB voor optimale laadtijd
- Na uploaden: vervang de `images.unsplash.com` URL met `/images/[bestandsnaam]`
  in het betreffende `<Image src=...>` attribuut.
