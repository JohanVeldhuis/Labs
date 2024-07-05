# Lab

Lab guide which can be used to create a plugin for M365 Copilot based on the open data api from the Rijksmuseum

## Prerequisites

*	Visual Studio Code needs to be installed on your machine: [Download Visual Studio Code - Mac, Linux, Windows](https://code.visualstudio.com/Download)
  * Access to a tenant which has M365 Copilot licenses:
*	Demo tenant: use your M365 Copilot tenant which you setup using demos.microsoft.com
*Side-loading apps need to be configured:
 *	Demo tenant: follow the steps below:
    *	Go to Teams apps > Setup Policies > Global.
    * Toggle Upload custom apps to the On position.
    * Select Save.
    * If you created a new policy, remember to add users to it by selecting the policy and “Manage users”.
    *	It can take up to 24 hours for the sideloading to be active.
*	Rijksmuseum Studio account which can be used to create an API-key use the link below to create an account:
  *	[Rijksstudio - Rijksmuseum](https://www.rijksmuseum.nl/en/rijksstudio)


The lab is split in in 9 steps, where the 9th step is optional.

1. [Prerequisites](step-1-prerequisites.md)
2. [Install Nodejs](step-2-nodejs.md)
3. [Get API key](step-3-get-api-key.md)
4. [Setup VSCode](step-4-setup-vscode.md)
5. [Create plugin](step-5-create-plugin.md)
6. [Update adaptive card](step-6-update-adaptivecard.md)
7. [Update manifest](step-7-update-manifest.md)
8. [Testing](step-8-testing.md)
9. [Challenge yourself](step-9-challenge-yourself.md)

## Video
[watch](/m365-copilot-plugin-rijksmuseum/assets/video/Searching%20for%20Rembrandt.mp4)