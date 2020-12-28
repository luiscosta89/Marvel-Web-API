const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'marvel_logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

const card = document.createElement('div')
card.setAttribute('class', 'card')

const title = document.createElement('h1')
title.textContent = "Comic stories for: Wolverine"

app.appendChild(logo);
app.appendChild(title);
app.appendChild(container);

// you will also have to setup the referring domains on your marvel developer portal
var PRIV_KEY = "287b0831fd9f0ce4d3732454e7699dde853d2270";
var PUBLIC_KEY = "0930f330eef690bb93ef6da9fae9cc96";

function getMarvelResponse() {  

  //Data for each request                                                                                   
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  
  //Select a charecter ID
  var characterId = '1009718'; // wolverine
  
  var url = 'http://gateway.marvel.com:80/v1/public/comics';

  console.log(url);
  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    characters: characterId
    })
    .done(function(response) {         
            
      response.data.results.forEach(element => {    
        
        const h1 = document.createElement('h1')
        h1.textContent = element.title   
        
        //Create a p and set the text content to the story description
        const p = document.createElement('p')

        const img_story = document.createElement('img');        
        
        //Get images
        element.images.forEach(obj => {
          img_story.src = obj.path + "." + obj.extension
        })

        if(element.description == null){
          p.textContent = "No description."
        } else { 
          p.textContent = element.description + "\n" + "Characters list: "
          element.characters.items.forEach(obj => {
            getMarvelCharecters(obj.resourceURI)            
            const q = document.createElement('q')
            p.textContent += obj.name + ", "
          })  
          
        }
        
        container.appendChild(card)
        card.appendChild(h1)
        card.appendChild(img_story)
        card.appendChild(p)

      })      

    })
    .fail(function(err){
      //Error code
      console.log(err);
    });
};

function getMarvelCharecters(id){
  //Data for each request                                                                                   
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  
  var url = id;

  console.log(url);
  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash
    })
    .done(function(response) {
      //Prints all the characters
      //new_str = JSON.stringify(response.data.results[0].thumbnail, null, 4);
      //console.log(new_str);

      const img_character = document.createElement('img');
      
      img_character.src = response.data.results[0].thumbnail.path + "." + response.data.results[0].thumbnail.extension     
      card.appendChild(img_character)
    }  
    );

};

getMarvelResponse();