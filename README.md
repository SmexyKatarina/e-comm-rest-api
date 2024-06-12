<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">E-Comm with REST API</h3>
  <p align="center">
    A very simple E-Commerce app designed with REST API connected to an external database to retrieve and insert data to handle simple information exchange.
    <br />
    <a href="https://github.com/smexykatarina/e-comm-rest-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/smexykatarina/e-comm-rest-api">View Demo</a>
    ·
    <a href="https://github.com/smexykatarina/e-comm-rest-api/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/smexykatarina/e-comm-rest-api/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![React][React.js]][React-url]
* [![Redux][Redux]][Redux-url]
* [![PostgreSQL][Postgres]][Postgres-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/smexykatarina/e-comm-rest-api.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Copy the `.env-example` file to a `.env` file.
4. Put your database information inside the `.env` file.
   ```
   # Database host name
   DB_HOST = 
   # Database User name
   DB_USER = 
   # Database Password
   DB_PASS = 
   # Database Name
   DB_DABA = 
   # Database Port
   DB_PORT = 
   ```
5. Run the server first by running `npm run start-server`. This runs the server using nodemon for changes to files and resetting the server.
6. Run the front-end next by running `npm start`. This runs the front-end of the site with code changes being check and re-rendering the front-end when there is.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Titus Mercier-Hachey - [@xxthedweebxx](https://twitter.com/xxthedweebxx) - mercier200012@hotmail.com

Project Link: [https://github.com/smexykatarina/e-comm-rest-api](https://github.com/smexykatarina/e-comm-rest-api)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/smexykatarina/e-comm-rest-api.svg?style=for-the-badge
[contributors-url]: https://github.com/smexykatarina/e-comm-rest-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/smexykatarina/e-comm-rest-api.svg?style=for-the-badge
[forks-url]: https://github.com/smexykatarina/e-comm-rest-api/network/members
[stars-shield]: https://img.shields.io/github/stars/smexykatarina/e-comm-rest-api.svg?style=for-the-badge
[stars-url]: https://github.com/smexykatarina/e-comm-rest-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/smexykatarina/e-comm-rest-api.svg?style=for-the-badge
[issues-url]: https://github.com/smexykatarina/e-comm-rest-api/issues
[license-shield]: https://img.shields.io/github/license/smexykatarina/e-comm-rest-api.svg?style=for-the-badge
[license-url]: https://github.com/smexykatarina/e-comm-rest-api/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/https://www.linkedin.com/in/titus-mercier-hachey-3482a029b/
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-222222?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Redux]: https://img.shields.io/badge/Redux-222222?style=for-the-badge&logo=redux&logoColor=764ABC
[Redux-URL]: https://redux.js.org
[Postgres]: https://img.shields.io/badge/Postgres-222222?style=for-the-badge&logo=postgresql&logoColor=4169E1
[Postgres-URL]: https://www.postgresql.org

