const ALL_BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const dog = document.querySelector('.dog');
const spinner = document.querySelector('.spinner');
const dropdown = document.querySelector('.dropdown');
let DOG_URL;
let keys;

function getAdress() {
  let selected = dropdown.options[dropdown.selectedIndex].text;
  DOG_URL = "https://dog.ceo/api/breed/" + selected + '/images/random';
}

function showImage() {
  spinner.style = 'visibility: visible';
  fetch(DOG_URL)
    .then((response) => response.json())
    .then((processedResponse) => {
      const img = document.createElement('img');
      img.src = processedResponse.message;
      img.alt = 'Cute dog';
      img.style = "height: 300px";
      if (dog.lastChild) {
        dog.removeChild(dog.lastChild);
      }
      spinner.style = 'visibility: hidden';
      dog.appendChild(img);
    });
}

fetch(ALL_BREEDS_URL)
  .then((response) => response.json())
  .then((processedResponse) => {
    keys = Object.keys(processedResponse.message);
    keys.forEach((item, i) => {
      const option = document.createElement('option');
      option.id = i;
      option.value = item;
      option.innerHTML = item;
      dropdown.appendChild(option);
    });
    document.getElementById('0').setAttribute('selected', 'true');
    getAdress();
  })
