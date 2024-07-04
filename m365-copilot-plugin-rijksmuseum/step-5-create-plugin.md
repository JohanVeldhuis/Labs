# Step 5: Creating the plug-in

Now Visual Studio Code and the Teams Toolkit have been configured it’s time to start developing your own plug-in.

## Create a New App

1. In the **Build your first app** section select the option **Create a New App**, this will result in the following dropdown menu to be shown on the top of Visual Studio Code:

    ![Create a new app](/m365-copilot-plugin-rijksmuseum/assets/images/message_extension.png)

2. From the menu select the **Message Extension** option
3. In the next step select **Custom Search Results**

    ![Custom search results](/m365-copilot-plugin-rijksmuseum/assets/images/custom_search_results.png)

4. In the next step select the **Start with a Bot** option

    ![Start with a bot](/m365-copilot-plugin-rijksmuseum/assets/images/start_with_bot.png)

5. In the **Programming Language** step select **JavaScript**

    ![Programming language](/m365-copilot-plugin-rijksmuseum/assets/images/programming_language.png)

6. In the **Workspace Folder** either accept the default folder location or define a custom location by selecting **Browse**

    ![Workspace folder](/m365-copilot-plugin-rijksmuseum/assets/images/workspace.png)

7. In the **Application Name** field enter a name for your application, for example Rijksmuseum, press **enter** to continue

    ![Workspace folder](/m365-copilot-plugin-rijksmuseum/assets/images/application_name.png)

    |Additional info|
    | --- |
    |If you decide to give the application a different name after developing the app this is possible but this requires you to change the name in multiple files|

8.	One the toolkit has created the structure for the app (also known as scaffolding) several prompts will be shown to you including the one shown below:

    ![Trust prompt](/m365-copilot-plugin-rijksmuseum/assets/images/trust_prompt.png)

    Select **Yes, I trust the authors**

9.	In the bottom right you will see 2 notifications, one of them allows you to install the **Adaptive Card Previewer** extension. It is up to you if you want to install if but if you are unfamiliar with Adaptive Card or simply want to have the ability to preview it prior to running the App press the **install button**.
The other notification can be removed by clicking on the X in the right top corner of the notification.

    ![Trust prompt](/m365-copilot-plugin-rijksmuseum/assets/images/notifications.png)

10.	In the left menu select the **Teams** icon as highlighted below:

    ![Teams icon](/m365-copilot-plugin-rijksmuseum/assets/images/teams_icon.png)

11.	This will open a new pane which allows you to **Sign in to Microsoft 365** and **Sign in to Azure**. For now only signing in to Microsoft 365 is required since you will be running the application locally. Press the **Sign in to Microsoft 365**

    ![Sign in to accounts](/m365-copilot-plugin-rijksmuseum/assets/images/accounts.png)

12.	When prompted select **Sign in**, this will launch a browser window where you can select the account which will be used, make sure you provide an account in your demo tenant.

    ![Sign in to accounts](/m365-copilot-plugin-rijksmuseum/assets/images/accounts_signin.png)

13.	Validate in both cases that once you have been signed in that both the **Custom App Upload Enabled** as well as the **Copilot Access Enabled** options are enabled similar to the screenshot below:

    ![Accounts Custom App Upload and Copilot enabled](/m365-copilot-plugin-rijksmuseum/assets/images/accounts_enabled.png)

## Updating the code
1.	In the left menu select the **Explorer button** (shortcut: control + shift + e)

    ![Explorer button](/m365-copilot-plugin-rijksmuseum/assets/images/explorer.png)

    This will bring you back to the explorer view in Visual Studio Code in which you will see several folders and files being created by the Teams Toolkit

2.	 Open the **.localconfigs** file in the root of the project and add the following line:

     `RIJKS_APIKEY=<YOUR API KEY>`

     Make sure to save the file once you made the modification.
3.	Go to the **SRC** folder and open **config.js**, below the **botPassword** entry add the following line:

    `rijksAPI: process.send.RIJKS_API`
    
    The file should look like this after making the change:

    ![config.js file](/m365-copilot-plugin-rijksmuseum/assets/images/config.png)

    Save the file after making the modifications
4.	In the **SRC** folder you will also find a file called **searchApp.js** this is the file where you will add the code which can be used by Copilot to query the Rijksmuseum data api and provide an answer on your question.
Open the file and find the section shown below:

    ![searchApp.js](/m365-copilot-plugin-rijksmuseum/assets/images/search.png)

    Currently if you would run the app you would be able to query the NPM.js registry containing the components available for NPM.js.
    Remove everything from this section **except** the first line which starts with **async**.
5.	To make sure you can use different parameters to search for the data add the following code:

    ~~~
    const { parameters } = query;
    const objectTitle = 
    getParameterByName(parameters, ObjectTitle");
    const artist = getParameterByName(parameters, "Artist");
    ~~~

    If warnings are shown for **getParameterByName** ignore them for now this will be resolved later.
    After making the code change the code should be like shown below:

    ![getParameterbyName.js](/m365-copilot-plugin-rijksmuseum/assets/images/getparameterbyname.png)
    
6.	To see what parameters Copilot does send to your plugin add the following code below the code you just added:

    ~~~
    console.log(`🔍 Object: '${objectTitle}' | Artist: '${artist}' | Type
    '${type}' | year: '${year}' | toppieces: '${topPieces}'`);
    ~~~

    |Note|
    | --- |
    |Although not strictly necessary make sure the code above is on one line to make it easier to read the code.|
7.	To make sure the correct query is send validation of the parameter values is required.
To do this add the following code:

    ~~~
    const baseUrlCollection = 'www.rijksmuseum.nl/api/nl/collection';
    let objectInfo = '';
        
    if(objectTitle !== '') {
    objectInfo = await axios.get(
           `${baseUrlCollection}?key=${config.rijksApiKey}&q=${objectTitle}`);
    }
    else if(artist !== '') {
    objectInfo = await axios.get(
    `${baseUrlCollection}?key=${config.rijksApiKey}&involvedMaker=${artist.replace(/\s/g, "+")}`);
    }
    ~~~
    
    Using the code above we define the **baseUrlCollection** constant. This is the URL part which is similar for all requests in the plug-in and will make it easier to update the code if the URL would change in the future.
    
    In addition to this the if statements will validate if a parameter has a value and if so it will send the query to the API with the value provided by Copilot.
8.	To see how many results were returned add the following code

    ~~~
    console.log(
    ` 🔍 Found: ${objectInfo.data.artObjects.length} results matching the query`
    );
    ~~~

    |Note|
    | --- |
    |Although not strictly necessary make sure the code above is on one line to make it easier to read the code.|

9.	Since the responses in the API will only provide us basic information about the art object or artist which created the object you will need to add some additional code to collect additional details about the object. This will be done by using the **objectnumber** which has been assigned to each object.
Find the following section in the code:

    ![getParameterbyName.js](/m365-copilot-plugin-rijksmuseum/assets/images/attachments.png)
    
    Replace the **response.data.object.forEach((obj) =>** with the following code

    ~~~
    for (const obj of objectInfo.data.artObjects) {
    ~~~

    |Warning|
    | --- |
    |Verify your code after making the change because there is one additional step you need to take. 
    HINT: look for red markings in the code.|
    
    Above the **const template** line add the following code which will send the additional query to the API and in addition the following will be done:
    
    ~~~
    const objectInfoDetails = await axios.get(
    `${baseUrlCollection}/${obj.objectNumber}?key=${config.rijksApiKey}`);
    
    let objectMaterials = objectInfoDetails.data.artObject.materials.join(' - ');
    
    if(objectInfoDetails.data.artObject.principalMakers[0].placeOfBirth === null){
    objectInfoDetails.data.artObject.principalMakers[0].placeOfBirth = 'Unknown';
    }
    
    if(objectInfoDetails.data.artObject.principalMakers[0].placeOfDeath === null) {
    objectInfoDetails.data.artObject.principalMakers[0].placeOfDeath = 'Unknown';        
    }
    
    let headerImage = '';
    if(obj.hasImage === false) {
    headerImage = '';        
    }
    else{
    headerImage = obj.headerImage.url;
    }
    
    let webImage = '';
    if(obj.hasImage === false) {
    webImage = '';        
    }
    else{
    webImage = obj.webImage.url;
    }      
    
    let plaqueDescriptionEnglish = '';
    if(objectInfoDetails.data.artObject.plaqueDescriptionEnglish === null) {
    plaqueDescriptionEnglish = '';        
    }
    else{
    plaqueDescriptionEnglish = objectInfoDetails.data.artObject.plaqueDescriptionEnglish;
    }   
    
    let artistDateOfBirth = '';
    if(objectInfoDetails.data.artObject.principalMakers[0].dateOfBirth === null) {
    artistDateOfBirth = '';        
    }
    else{
    artistDateOfBirth = objectInfoDetails.data.artObject.principalMakers[0].dateOfBirth;
    }
    
    let artistDateOfDeath = '';
    if(objectInfoDetails.data.artObject.principalMakers[0].dateOfDeath === null) {
    artistDateOfDeath = '';        
    }
    else{
    artistDateOfDeath = objectInfoDetails.data.artObject.principalMakers[0].dateOfDeath;
    } 
    
    let artistPlaceOfBirth = '';
    if(objectInfoDetails.data.artObject.principalMakers[0].placeOfBirth === null) {
    artistPlaceOfBirth = '';        
    }
    else{
    artistPlaceOfBirth = objectInfoDetails.data.artObject.principalMakers[0].placeOfBirth;
    } 
    
    let artistPlaceOfDeath = '';
    if(objectInfoDetails.data.artObject.principalMakers[0].placeOfDeath === null) {
    artistPlaceOfDeath = '';        
    }
    else{
    artistPlaceOfDeath = objectInfoDetails.data.artObject.principalMakers[0].placeOfDeath;
    } 
    
    let artistNationality= '';
    if(objectInfoDetails.data.artObject.principalMakers[0].nationality === null) {
    artistNationality = '';        
    }
    else{
    artistNationality = objectInfoDetails.data.artObject.principalMakers[0].nationality;
    }
    ~~~
    
    |Additional info|
    | --- |
    |If multiple materials where using to create the object we will convert it to a string where a – is added between each material
     If values are null the value will be set to an empty string
    
    The reason for doing these data manipulations is to ensure we can add the data correctly to the adaptive card and in addition also prevent errors when running the code.
    
    Now we have added a lot of functionality you will need add this data to the adaptive card. It is up to you which data you would like to add but below are some examples which you could consider adding to the card:
    
    - Art object title
    - Art object description
    - Art object image(s)
    - Art object dimensions
    
    For inspiration have a look at the documentation of the API: API | RijksData (rijksmuseum.nl)
    10.	Once you have selected the data which you would like to add to the adaptive card search for the following code in the file:
    
        ![getParameterbyName.js](/m365-copilot-plugin-rijksmuseum/assets/images/adaptivecard.png)
        
        With the curly braces ({ and }) you can defined which data you would like to send to the adaptive card. 
        
        This is in the following format:
        
        ~~~
        <placeholder name on the adaptive card> : <value from the data>
        ~~~
        
        Below is some example code which you can use in your plug-in:
        ~~~
        objectTitle: obj.title,
        objectLongTitle: obj.longTitle,
        objectHeaderImage: headerImage,
        objectWebImage: webImage,          
        objectType: objectInfoDetails.data.artObject.objectTypes[0],
        objectMaterials: objectMaterials,
        objectDimensions: objectInfoDetails.data.artObject.subTitle,                    
        objectDescription: plaqueDescriptionEnglish,
        objectPresentingDate: objectInfoDetails.data.artObject.dating.presentingDate,          
        artistName: objectInfoDetails.data.artObject.principalMaker,
        artistDateOfBirth: artistDateOfBirth,
        artistDateofDeath: artistDateOfDeath,
        artistNationality: artistNationality,
        artistPlaceOfBirth: artistPlaceOfBirth,
        artistPlaceOfDeath: artistPlaceOfDeath
        ~~~
    11.	As discussed earlier we need to add some code which allows us to map the parameter name to the value specified. To do this add the following code above the **module exports.Search** line:
    
        ~~~
        const getParameterByName = (parameters, name) => {
          const param = parameters.find(p => p.name === name);
          return param ? param.value : '';
        }
        ~~~
    12.	Save the file