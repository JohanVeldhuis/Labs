# Step 8: Testing your plug-in

You’ve almost made it to the finish but the last step you will need to perform of is test if it works 😉. To do this you will need to perform the following steps:

1.	In the left menu select the **Explorer button** (shortcut: control + shift + e)

    ![Explorer button](/assets/images/explorer.png)

2.	Open the **.vscode** folder
3.	Inside the folder locate **launch.json** and open the file
4.	Locate the  section **Launch App in Teams (Edge)** and replace it completely with the code below:

    ~~~
            {
                "name": "Launch App in Teams (Edge)",
                "type": "msedge",
                "request": "launch",
                "url": "https://teams.microsoft.com/l/app/${{local:TEAMS_APP_ID}}?
                 installAppPackage=true&webjoin=true&${account-hint}",
                "cascadeTerminateToConfigurations": [
                    "Attach to Local Service"
                ],
                "presentation": {
                    "group": "all",
                    "hidden": true
                },
                "internalConsoleOptions": "neverOpen",
                "runtimeArgs": [
                    "--inprivate"
                  ]            
            },
    ~~~

    |Warning|
    | --- |
    |Make sure that the **url** value is not spread across multiple lines|

    
    This will ensure the an inprivate session of Edge is started.

5.	From the left menu select the **debug** button (shortcut control + shift + d)

    ![Debug button](/assets/images/debug_button.png)  

6.	Before starting debugging click on the drop down menu next to the play menu and select the option **Debug in Teams (Edge)**

    ![Debug client](/assets/images/debug_client.png) 


7.	Once changed hit the **play** button and keep an eye on the **Output** window which is located in the bottom of the screen

    During this process an Microsoft Entra application will be created. Once the application is created the .localconfig file will be automatically updated with the Application ID as well as the secret.
    
    Once everything has been setup a new browser window will be launched which will prompt you to install the plug-in. 

8.	Go to **Copilot** in Teams and click on the button shown below: 

    ![Copilot plugins](/assets/images/copilot.png) 

9.	In the list of plug-ins search for the plug-in name you provided during at the start of this hands-on lab. If you don’t know it anymore search for a plug-in which does end with **local**. Enable it my moving the switch.
10.	Before testing you can enable developer mode by entering **-developer on** in the chat and hit enter. Once this is enabled click on another chat and return to Copilot.
11.	Once enabled provide a prompt, some examples are shown below:

    - *what art objects created by Rembrandt van Rijn can be seen in the Rijksmuseum*
    - *can you find more information about De Nachtwacht which can be seen in the Rijksmuseum*
    
    In between testing have a look at the **terminal** view at the bottom of the screen in Visual Studio Code. It will tell you which parameters did receive which value and also shows the number of items found which match the query send to the API

    ![Terminal output](/assets/images/output.png)

    In addition to this the developer output will give you information about which function is used and if it was successful or not.

    ![Teams debug info](/assets/images/teams_debug_info.png)
