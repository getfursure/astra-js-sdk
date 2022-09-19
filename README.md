<a name="readme-top"></a>

<div>
 <h1 style="text-align: center;">Astra SDK</h1>

 <p style="text-align: center;">
  The Unofficial Astra Finance SDK
     <br />
     <a href="https://github.com/getfursure/astra-js-sdk"><strong>Documentation</strong></a>
     ·
     <a href="https://github.com/getfursure/astra-js-sdk/issues">Report Bug</a>
     ·
     <a href="https://github.com/getfursure/astra-js-sdk/issues">Request Feature</a>
 </p>
</div>

<br />

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
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

[Astra](https://astra.finance) currently does not offer an official JavaScript SDK for their HTTP/s API

<p style="text-align: right;">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites



### Installation & Setup

1. Get your keys from Astra for the Client Id and Client Secret 
2. Install
   ```sh
   npm install @getfursure/astra-js-sdk --save
   # OR
   yarn add @getfursure/astra-js-sdk
   ```
3. Basic Usage
   ```js
   import { Astra } from '@getfursure/astra-js-sdk'
   const astraClient = new Astra(
     {
      baseUrl: '',
      clientId: '',
      clientSecret: '',
    }
   );
   astraClient.auth.createAccessToken(...);
   ```

<p style="text-align: right;">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Please refer to the [Documentation](https://example.com)

<p style="text-align: right;">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Documentation
- [ ] Routines Resource
- [ ] Cards Resource
- [ ] Testing
- [ ] Linting and Formating

See the [open issues](https://github.com/getfursure/astra-js-sdk/issues) for a full list of proposed features (and known issues).

<p style="text-align: right;">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p style="text-align: right;">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p style="text-align: right;">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact
Open an issue [https://github.com/getfursure/astra-js-sdk/issues](https://github.com/getfursure/astra-js-sdk/issues)

<p style="text-align: right;">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments


<p style="text-align: right;">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/getfursure/astra-js-sdk.svg?style=for-the-badge
[contributors-url]: https://github.com/getfursure/astra-js-sdk/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/getfursure/astra-js-sdk.svg?style=for-the-badge
[forks-url]: https://github.com/getfursure/astra-js-sdk/network/members
[stars-shield]: https://img.shields.io/github/stars/getfursure/astra-js-sdk.svg?style=for-the-badge
[stars-url]: https://github.com/getfursure/astra-js-sdk/stargazers
[issues-shield]: https://img.shields.io/github/issues/getfursure/astra-js-sdk.svg?style=for-the-badge
[issues-url]: https://github.com/getfursure/astra-js-sdk/issues
[license-shield]: https://img.shields.io/github/license/getfursure/astra-js-sdk.svg?style=for-the-badge
[license-url]: https://github.com/getfursure/astra-js-sdk/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
