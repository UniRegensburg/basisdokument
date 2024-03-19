<p align="center">
  <img src="https://user-images.githubusercontent.com/44339207/189524995-fa130521-2814-493b-8998-f54b630e8a88.png" width="100%">
</p>

Please note - This repository is a fork with continued development of https://github.com/markusbink/basisdokument-implementierung

## About

This application is part of a research project at the University of Regensburg in cooperation with the Ministries of Justice in Bavaria and Lower Saxony.
The project serves to gain insights into the digital possibilities of formally structuring party submissions in civil proceedings.
The Chair of Media Informatics supported the project by developing a prototype that was piloted and tested in four courts from January 2023 to June 2024.

This app enables lawyers and judges to create their previous analogue correspondence in a digital environment.
It offers a variety of useful features that aim to ease the process of working on cases while also making the process more time efficient.

The app is based on previous student work as part of a project seminar in the Master's programm of Media Informatics by [Hahn, Röhr & Sautmann (2021)](https://github.com/kindOfCurly/PS-Basisdokument/wiki/Projekt-Log) and [Freisleben, Schwarz & Zels (2021)](https://elearning.uni-regensburg.de/mod/resource/view.php?id=2172773).
The first version of this app was also developed by a group of students: [Bink, Emmert, Hellwig, Lanzinger, Schönwerth](https://github.com/markusbink/basisdokument-implementierung/wiki).

All requirements have been merged into one application that can be used by all parties (Plaintiff, Defendant, Judge).
The app allows them to create and edit a digital document called "Basisdokument".

**Get in touch with our application here: https://app.parteivortrag.de/**

Further information about the project and documentation of the features can be found at the projct homepage: https://www.uni-regensburg.de/forschung/reallabor-parteivortrag-im-zivilprozess/startseite/index.html

## Members of the project group

The following people are or were involved in the research project at the Chair of Media Informatics (University of Regensburg):

_Prof. Dr. Christian Wolff, Victoria Böhm, Jakob Fehle, Julia Sageder, Martina Emmert, Marie Sautmann_

## Original development setting (2022)

_Course: MEI-M26 Projektseminar (P-(D-)36633 Praxisseminar) im M.Sc. Medieninformatik, Sommersemester 2022_

_Course Instructors: Prof. Dr. Christian Wolff, M.A. Victoria Böhm, M.Sc. Jakob Fehle_

_Projectteam: Markus Bink, Martina Emmert, Nils Constantin Hellwig, Michelle Lanzinger, Nicole Schönwerth_

For further information see the original repository and its Wiki: https://markusbink.github.io/basisdokument-implementierung/

## Running the project locally

To get started, download the project, `cd` into the root directory and install all dependencies using `npm install --force` or any other package manager of your choosing.
After all dependencies have successfully been installed, you can run `npm start` in your terminal which opens the app in your browser under the following URL: [http://localhost:3000](http://localhost:3000).
If you get errors doing this, remember to update to the latest version of npm and node.

## Continous integration

This repository uses github actions to automatically deploy changes.
`dev` is deployed to https://test.parteivortrag.de/ and `main` is deployed to https://app.parteivortrag.de/.
