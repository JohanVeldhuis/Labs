# Step 6: Updating the adaptive card

Now you have added functionality to the plug-in the next step is to make sure that once Copilot provides an answer it can also leverage adaptive cards.

To do this you will need to update the adaptive card. There are 2 ways to do this:

-	Use Visual Studio Code with the Preview Adaptive Card feature
-	Use the Adaptive Card designer on: https://adaptivecards.io/designer

If you are familiar with creating adaptive cards challenge yourself by modifying the adaptive card manually. The adaptive card can be found in the **src/adaptiveCards** folder.

If you are not familiar follow the steps below which will help you getting started using the designer on adaptivecards.io.

1.	Go to https://adaptivecards.io
2.	From the menu on the top select **Designer**

    |Additional info|
    | --- |
    |If you first need some inspiration select the Samples option from the menu which contains several examples which might help you with designing your own adaptive card.|

3.	Search for the button New Card the menu bar, this will open the window shown below:

    ![Update Adaptive Card](/m365-copilot-plugin-rijksmuseum/assets/images/adaptivecard_update.png)

4.	Select one of the cards from the ***Explore** section or select **Blank Card** to start from scratch
5.	Once the designer has loaded you will either get a blank card or a card with several components on it. Prior to making any changes to the adaptive card perform the following changes in the designer menu settings:

    - **Select host app:** Microsoft Teams
    - **Target version:** 1.5 (should be done automatically but please validate)
    
6.	In the left part of the screen you will find **Card Elements** which you can add easily to your adaptive card by drag and drop

    ![Adaptive Card elements](/m365-copilot-plugin-rijksmuseum/assets/images/adaptivecard_elements.png)

7.	Once you added a card element to your adaptive card it is time to customize it. To make sure the card is showing the text which is retrieved from the API only one change is required.

    Select the element which you would like to modify. This will open the **Element Properties** on the right side of the designer. Search for the property Text, the default value of it will be **New TextBlock** in case you added a text block.
    
    Update this value to **\${\<Name of the property>}** for example **\${objectTitle}**


    ![Programming language](/m365-copilot-plugin-rijksmuseum/assets/images/adaptivecard_element_properties.png)

    Feel free to make additional changes in the **Layout** and **Style** section of the **Element Properties**.

8.	Repeat the step 6 and 7 if you want to add more elements.

    |Warning|
    | --- |
    |Make sure to assign the correct value to the Text property|

9.	Once you have finished adding all the components you can click on **Copy card payload** from the menu. 
10.	Got back to Visual Studio Code and navigate to **src/adaptiveCard** in the explorer view. Here you will find **helloWorldCard.json** which is the adaptive card which you need to update.
11.	Open the file and replace the content with the content from the adaptive card designer.
12.	Save the file. 