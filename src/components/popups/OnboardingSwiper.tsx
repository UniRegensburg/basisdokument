import { OnboardingSliderItem } from "./OnboardingSwiperItem";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { ArrowSquareLeft, ArrowSquareRight } from "phosphor-react";
import "swiper/css/bundle";
import "swiper/css/navigation";
import "swiper/css/pagination";

const sliderItems = [
  {
    src: "images/BDWelcome.png",
    alt: "Main screen to show the main functions",
    title: "Willkommen zum Basisdokument!",
    desc: "Das Basisdokument unterstützt die Digitalisierung ziviler Gerichtsverfahren. In dieser kurzen Einführung werden Ihnen die Funktionen des Basisdokuments erläutert. Auf den nächsten Seiten finden Sie zuerst Informationen zu den Funktionen, die in dieser Version der Anwendung neu sind. Danach sind die Grundfunktionalitäten der Anwendung dargestellt.<br><br>Eine Übersicht zu allen Funktionen und detaillierte Anleitungen finden Sie im <a href='https://www.uni-regensburg.de/forschung/reallabor-informationen/wiki/index.html' target='_blank'>Basisdokument-Wiki</a>.",
  },
  // {
  //   src: "videos/BDBeiträgeVorZwischen.mp4",
  //   title: "NEU: Neue Beiträge vor und zwischen anderen einfügen",
  //   desc: "Sie können neue Beiträge nun auch vor und zwischen bestehenden Beiträgen einfügen.<br><br>Eine Übersicht zu allen Funktionen finden Sie im <a href='https://www.uni-regensburg.de/forschung/reallabor-informationen/wiki/index.html' target='_blank'>Basisdokument-Wiki</a>.",
  // },
  {
    src: "videos/BDAnlageRubrum.mp4",
    title: "NEU: Anlage für das Rubrum",
    desc: "Sie können nun auch zum Rubrum Anlagen hinzufügen.<br><br>Eine Übersicht zu allen Funktionen finden Sie im <a href='https://www.uni-regensburg.de/forschung/reallabor-informationen/wiki/index.html' target='_blank'>Basisdokument-Wiki</a>.",
  },
  {
    src: "videos/BDBezugnahmeZitat.mp4",
    title: "NEU: Bezugnahme durch 'Zitieren'",
    desc: "Sie können nun auch auf Ausschnitte eines Beitrags Bezug nehmen. Dieser Ausschnitt wird dann in Ihrem Beitrag 'zitiert'.<br><br>Eine Übersicht zu allen Funktionen finden Sie im <a href='https://www.uni-regensburg.de/forschung/reallabor-informationen/wiki/index.html' target='_blank'>Basisdokument-Wiki</a>.",
  },

  // Aufbau / Anleitung
  {
    src: "videos/Öffnen.mp4",
    title: "Basisdokument anlegen",
    desc: "Zu Beginn können Sie wählen, ob Sie ein <b>neues Basisdokument erstellen</b> oder ein bereits <b>vorhandenes Basisdokument öffnen</b> wollen. Zusätzlich können private Ergänzungen und Notizen geladen & gespeichert werden. Beide Dateien werden mit der Endung .txt gespeichert. Sie geben außerdem an, ob Sie an einer <b>Version</b> des Basisdokuments weiterarbeiten wollen oder ob eine neue Version erstellt werden soll.",
  },
  {
    src: "videos/BDMandanten-Domain.mp4",
    title: "Mandanten-Domain",
    desc: "Unter der <b>Mandanten-Domain</b> kann das Basisdokument schnell und unkompliziert eingesehen werden. Die Seite ist dazu gedacht, externen Personen die Einsicht in Basisdokumente zu erleichtern. In der Mandantenansicht gibt es <b>keine Bearbeitungsmöglichkeiten</b>.",
  },
  {
    src: "videos/Darstellungen.mp4",
    title: "Basisdokument: Fall anlegen & Ansicht",
    desc: "Beim initialen Anlegen eines Falls können Sie <b>Rubren</b> Ihrer Mandant:innen eintragen. Diese werden in <b>zwei gegenüberliegenden Spalten</b> dargestellt - zur optimalen Übersicht finden Sie die Beiträge der <b>Klagepartei</b> stets in der linken, die der <b>Beklagtenpartei</b> stets in der rechten Spalte. Wenn Sie jedoch eine Zeilen- oder Spaltenansicht der Beiträge präferieren, können Sie ganz einfach wechseln. Keine Sorge, auch hier können Sie dank der Farbgebung eindeutig erkennen, welche Beiträge von welcher Partei verfasst wurden.",
  },
  // Gliederung / Beiträge
  {
    src: "videos/GliederungBeitragErstellen.mp4",
    title: "Basisdokument: Beiträge hinzufügen",
    desc: "Auf der Hauptseite der Anwendung können Sie <b>neue Gliederungspunkte erstellen</b> und über den Button 'Beitrag hinzufügen' einen <b>neuen Beitrag hinzufügen</b> - äquivalent zum Erstellen eines neuen Abschnitts, wie Sie es von Ihrem Texteditor kennen. Beiträge werden immer zu Gliederungspunkten hinzugefügt. Das Vergeben eines Titel für einen Gliederungspunkt ist dabei optional und kann von beiden Parteien einzeln vorgenommen werden. Die Gliederungspunkte und ihre Beiträge werden auch rechts in der <b>Sidebar</b> dargestellt.",
  },
  // Bezug
  {
    src: "videos/Bezugnahme.mp4",
    title: "Basisdokument: Fall bearbeiten & Argumente hinzufügen",
    desc: "Als Parteivertreter:in können Sie, um auf einen Beitrag der Gegenseite einzugehen und die Sicht Ihrer Mandant:innen darzustellen, im jeweiligen Abschnitt einen eigenen Beitrag über <b>'auf diesen Beitrag Bezug nehmen'</b> hinzufügen. Bezüge auf Beiträge können Sie am jeweiligen Beitrag erkennen. Mit einem Klick können Sie <b>zwei bezugnehmende Beiträge nebeneinander anzeigen lassen</b>: Klicken Sie dazu auf das Symbol rechts in der Bezugleiste - die beiden Beiträge werden dann in einem eigenen Popup angezeigt.",
  },
  // Beweise
  {
    src: "videos/BeweisErstellen.mp4",
    title: "Beweise in Beiträgen + Beweise-Sidebar",
    desc: "Sie können <b>Beweise</b> in einem eigenen Bereich zu Beiträgen hinzufügen, optional als Anlage, als PDF- oder TIFF-Datei und 'unter Verwahrung gegen die Beweislast'. Diese werden im Dokument übergreifend verwaltet. Nutzen Sie dafür die <b>Beweise-Sidebar</b>. Sie können Beweise in der Beweise-Sidebar <b>filtern</b>. Folgende Filter stehen zur Verfügung: Beweise mit Anlage, Beweise mit PDF/TIFF, Beweise mit externer Anlage und Beweise ohne Anlage.",
  },
  // Hinweise
  {
    src: "videos/Hinweise.mp4",
    title: "Hinweise der Richter:innen nach §139 ZPO",
    desc: "Richter:innen können <b>Hinweise an die beiden Parteien</b> verfassen. Ein Hinweis der Richter:innen kann sich auf einen bestimmten Beitrag beziehen, muss das aber nicht. Hinweise sind auch in der <b>Sidebar</b> dargestellt, die zur Übersicht und Navigation nutzbar ist.",
  },

  // Sortierung / Gliederung
  {
    src: "videos/Gliederung.mp4",
    title: "Gliederungs-Sidebar & individuelle Sortierung",
    desc: "Die <b>Gliederungs-Sidebar</b> gewährt einen besseren Überblick und eine schnellere Navigation im Basisdokument. Per Klick auf einen Gliederungspunkt gelangen Sie sofort an die entsprechende Stelle im Dokument. In der Sidebar finden Sie auch die <b>Sortierungsfunktionen 'Original' und 'Privat'</b>. In der privaten Sortierung können Sie Gliederungspunkte Ihren Vorstellungen entsprechend sortieren. Diese private Sortierung wird für Sie in Ihrer Bearbeitungsdatei gespeichert.",
  },

  // Markierungen, Notizen, Lesezeichen
  {
    src: "videos/Markierung.mp4",
    title: "Markierungen",
    desc: "Wichtige Textstellen im Basisdokument können Sie anhand der <b>Markierfunktion</b> hervorheben. Dafür kann in der oberen Leiste das Werkzeug 'Markieren' sowie die Farbe hierfür ausgewählt werden. Diese Markierungen werden in Ihrer <b>privaten Bearbeitungsdatei</b> für Sie gespeichert. Das Basisdokument kann auch <b>nach Markierungen gefiltert</b> werden.",
  },
  {
    src: "videos/Lesezeichen.mp4",
    title: "Lesezeichen",
    desc: "Zu Beiträgen im Basisdokument können <b>Lesezeichen</b> hinzugefügt werden, die nur für Sie gespeichert werden. In der <b>Sidebar</b> der Anwendung können Sie auf alle Lesezeichen zugreifen. Ein Klick auf die Beitrags-ID bringt Sie direkt zum Beitrag, zu dem das jeweilige Lesezeichen hinzugefügt wurde.",
  },
  {
    src: "videos/Notiz.mp4",
    title: "Notizen",
    desc: "Das Basisdokument erlaubt das Anlegen <b>privater Notizen</b>, die nur für Sie gespeichert werden. Eine Notiz kann optional auch auf einen Beitrag verweisen. Auch hier ist es in der <b>Sidebar</b> möglich, durch einen Klick auf die Beitrags-ID zu dem Beitrag zu gelangen, auf den sich die Notiz bezieht.",
  },

  // Speichern/Export
  {
    src: "videos/Export.mp4",
    title: "Speichern",
    desc: "Sie können Ihre Version des Basisdokuments <b>lokal speichern</b>. Das ermöglicht Ihnen <b>über mehrere Sitzungen hinweg</b>, Beiträge hinzuzufügen, zu bearbeiten und löschen. Haben Sie die Bearbeitung Ihrer <b>Version abgeschlossen</b>, können Sie diese <b>exportieren und die Dateien versenden</b>. Zum Export stehen Ihnen verschiedene Optionen zur Verfügung: Sie könnendem Basisdokument-PDF ein eigenes Deckblatt oder einen Betreff hinzufügen, die Signatur im Basisdokument-PDF ändern, zusätzlich alle neuen Beiträge oder eine Liste aller Beweise als eigene PDF herunterladen, sowie die Anlagen vom Herunterladen ausschließen.<br>Eine detaillierte Anleitung zu einzelnen Export-Optionen finden Sie im <a href='https://www.uni-regensburg.de/forschung/reallabor-informationen/wiki/index.html' target='_blank'>Basisdokument-Wiki</a>.",
  },

  {
    src: "images/BDPDF.png",
    title: "Das Basisdokument-PDF",
    desc: "Das PDF enhält alle Inhalte des Basisdokuments. Zudem finden Sie auf eigenen <b>Übersichtsseiten</b> alle <b>neuen Beiträge</b> dieser Version (diese werden zusätzlich in der Gesamtübersicht des Parteivortrags hervorgehoben) und <b>alle Hinweise</b>. Bezugnehmende Hinweise werden zusätzlich als Kommentare neben den entsprechenden Beiträgen angezeigt.",
  },

  // Ende
  {
    src: "videos/BDHelp.mp4",
    title: "Viel Erfolg bei der Bearbeitung Ihres Falles!",
    desc: "Sollte Ihnen später etwas unklar sein, können Sie jederzeit über das Hilfe-Icon zu diesem Guide zurückkehren.<br><br>Eine Übersicht zu allen Funktionen und detaillierte Anleitungen finden Sie im <a href='https://www.uni-regensburg.de/forschung/reallabor-informationen/wiki/index.html' target='_blank'>Basisdokument-Wiki</a>.",
  },
];
const SwiperButtonNext = () => {
  const swiper = useSwiper();
  return (
    <button
      className="nextEl mx-16 select-all w-10 h-10"
      onClick={() => swiper.slideNext()}>
      <ArrowSquareRight
        size={42}
        className="text-darkGrey hover:text-mediumGrey"
        weight="fill"
      />
    </button>
  );
};

const SwiperButtonPrev = () => {
  const swiper = useSwiper();
  return (
    <button
      className="prevEl mx-16 select-all w-10 h-10"
      onClick={() => swiper.slidePrev()}>
      <ArrowSquareLeft
        size={42}
        className="text-darkGrey hover:text-mediumGrey"
        weight="fill"
      />
    </button>
  );
};

export const OnboardingSwiper = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation={{ nextEl: "nextEL", prevEl: "prevEl" }}
        centeredSlides={true}
        loop={false}
        setWrapperSize={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        className={"rounded-xl space-y-4"}>
        {sliderItems.map((sliderItem, index) => (
          <div className="swiper-wrapper">
            <SwiperSlide key={index}>
              <OnboardingSliderItem
                src={sliderItem.src}
                alt={sliderItem.alt}
                title={sliderItem.title}
                desc={sliderItem.desc}
              />
            </SwiperSlide>
          </div>
        ))}
        <div className="relative flex mx-10 justify-center">
          <SwiperButtonPrev />
          <SwiperButtonNext />
        </div>
      </Swiper>
    </>
  );
};
