# Step 7: Updating the manifest

To make sure Copilot understands in which cases it can use the plug-in and which parameters are available.
The manifest can be found in the **appPackage** folder, perform the steps below to update the manifest.

1.	Open **manifest.json**
2.	Find the **developer** section as shown below and update values to for example your own name and website 

     ![Manifest.json](/assets/images/manifest.png)

3.	Find the **commands** section. This will be the section where you can define the commands as well as the parameters which are available.

    In the screenshot below you can see only one command is available **findNpmPackage**. The command has currently only one **parameter** called **NpmPackageName**.
    
    Both the command and parameters do have the **description** and **semanticDescription** properties. This information will be used by Copilot to determine if a command is suitable and if suitable which parameter or parameters will be used. 
    
    ![Module manifest Semantic description](/assets/images/manifest_semanticDescription.png)

    Update the **commands** part with the following code.

    ~~~
    "commands": [
    {
    "id": "findArt",
    "context": [
    "compose",
    "commandBox"
    ],
    "description": "Find art available in the Rijksmuseum using the art title or artist",
    "title": "Find art in using the title",
    "type": "query",
    "semanticDescription": "This command retrieves detailed information about art objects which can are available in the Rijksmuseum using the provided art title or artist which did created the art object.",
    "parameters": [
    {
    "name": "ObjectTitle",
    "title": "Object Title",
    "description": "The title of the piece of art or object to be searched",
    "inputType": "text",
    "semanticDescription": "This parameter is used to identify the specific  
       art object to be queried. Users should provide the exact name of the 
       art object they want to retrieve information for as the value of this 
       parameter."
                  },
                  {
                   "name": "Artist",
                   "title": "Artist",
                   "description": "Artist or maker of the art or object",
                   "inputType": "text",
    "semanticDescription": "This parameter is used to identify which art 
       objects a specific artist did create. Users should provide the name 
       of the artist from which they want to know which art objects the 
       artist did create as the value of this parameter."
                  } 
                   ]
    }
    ]
    ~~~

    |Warning|
    | --- |
    |Make sure that the **semanticDescription** value is not spread across multiple lines|