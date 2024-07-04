const axios = require("axios");
const querystring = require("querystring");
const { TeamsActivityHandler, CardFactory } = require("botbuilder");
const ACData = require("adaptivecards-templating");
const artCard = require("./adaptiveCards/artCard.json");
const config = require("./config");

class SearchApp extends TeamsActivityHandler {
  constructor() {
    super();
  }

  // Message extension Code
  // Search.
  async handleTeamsMessagingExtensionQuery(context, query) {
    const { parameters } = query;

    const objectTitle = getParameterByName(parameters, "ObjectTitle");
    const artist = getParameterByName(parameters, "Artist");
    const type = getParameterByName(parameters, "Type");
    const century = getParameterByName(parameters, "Century");
    const topPieces = getParameterByName(parameters, "Toppieces");
    
    const baseUrlCollection = 'https://www.rijksmuseum.nl/api/nl/collection';

    console.log(
      `🔍 Object: '${objectTitle}' | Artist: '${artist}' | Type '${type}' | century: '${century}' | toppieces: '${topPieces}'`
    ); 

    let objectInfo = '';
    
    if(objectTitle !== '' && century == '') {
      objectInfo = await axios.get(
        `${baseUrlCollection}?key=${config.rijksApiKey}&q=${objectTitle}`);
    }
    else if(artist !== '') {
      objectInfo = await axios.get(
        `${baseUrlCollection}?key=${config.rijksApiKey}&involvedMaker=${artist.replace(/\s/g, "+")}`);
    }
    else if(type !== '') {
      objectInfo = await axios.get(
        `${baseUrlCollection}?key=${config.rijksApiKey}&type=${type}`);
    }
    else if(century !== '') {
      console.log('century');
      let centuryNumberOnly = century.match(/(\d+)/);;
      objectInfo = await axios.get(
        `${baseUrlCollection}?key=${config.rijksApiKey}&f.dating.period=${centuryNumberOnly[0]}`);
    }
    else if(topPieces !== '') {
      objectInfo = await axios.get(
        `${baseUrlCollection}?key=${config.rijksApiKey}&toppieces=True`);
    }                      

    console.log(
      `🔍 Found: ${objectInfo.data.artObjects.length} results matching the query`
    );       

    const attachments = [];
    for (const obj of objectInfo.data.artObjects) {    
      const objectInfoDetails = await axios.get(
        `${baseUrlCollection}/${obj.objectNumber}?key=${config.rijksApiKey}`);

      let objectMaterials = objectInfoDetails.data.artObject.materials.join(' - ');

      if(objectInfoDetails.data.artObject.principalMakers[0].placeOfBirth === null) {
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

      const template = new ACData.Template(artCard);
      const card = template.expand({
        $root: {
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
        },
      });
      const preview = CardFactory.heroCard(obj.title, obj.principalOrFirstMaker);
      const attachment = { ...CardFactory.adaptiveCard(card), preview };
      attachments.push(attachment);
    };

    return {
      composeExtension: {
        type: "result",
        attachmentLayout: "list",
        attachments: attachments,
      },
    };
  }
}

const getParameterByName = (parameters, name) => {
  const param = parameters.find(p => p.name === name);
  return param ? param.value : '';
}
module.exports.SearchApp = SearchApp;