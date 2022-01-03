function handleSubmit(event) {
  event.preventDefault();

  try {
    let formText = document.getElementById("url").value;  
    if(formText === null){
      return alert("URL cannot be null");
    }    

    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  
    if(!pattern.test(formText))
      return alert('Not a url');    

    clearErrors();
    Client.checkForUrl(formText);
    let data = { url: encodeURI(formText) };
    showPreloader();
    postUrl("http://localhost:8081/postData", data);
  } catch (error) {
    displayErrors(error);
  }
}

const postUrl = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  try {
    const data = await response.json();
    updateUI(data);
    return data;
  } catch (error) {
    displayErrors(error);
  }
};

function displayErrors(error) {
  let errors = document.getElementById("validation");
  errors.innerHTML = "";
  let p = document.createElement("p");
  p.classList.add("error");
  p.innerText = error;
  errors.appendChild(p);
}

function clearErrors() {
  let errors = document.getElementById("validation");
  errors.innerHTML = "";
}

const updateUI = async (result) => {
  let results = document.getElementById("results");
  results.classList.remove("loader");
  results.innerHTML = "";
  results.scrollIntoView({ behavior: "smooth" });

  let heading = document.createElement("h3");
  heading.innerText = "Analysis Results";
  results.appendChild(heading);

  // score tag
  let score_tag = document.createElement("div");
  score_tag.innerHTML = "<span>Score Tag: </span>" + result.score_tag;
  score_tag.classList.add("score_tag");
  results.appendChild(score_tag);

  // Confidence
  let confidence = document.createElement("div");
  confidence.innerHTML = "<span>Confidence: </span>" + result.confidence;
  confidence.classList.add("confidence");
  results.appendChild(confidence);

  // Subjectivity
  let subjectivity = document.createElement("div");
  subjectivity.innerHTML = "<span>Subjectivity: </span>" + result.subjectivity;
  subjectivity.classList.add("subjectivity");
  results.appendChild(subjectivity);

  // agreement
  let agreement = document.createElement("div");
  agreement.innerHTML = "<span>Agreement: </span>" + result.agreement;
  agreement.classList.add("agreement");
  results.appendChild(agreement);

  // irony
  let irony = document.createElement("div");
  irony.innerHTML = "<span>Irony: </span>" + result.irony;
  irony.classList.add("irony");
  results.appendChild(irony);

  document.getElementById("results-section").classList.add("roundGrayBorder");
};

function showPreloader() {
  let results = document.getElementById("results");
  results.innerHTML = "";
  results.scrollIntoView({ behavior: "smooth" });

  let loader = document.createElement("div");
  loader.classList.add("loader");
  results.appendChild(loader);

  let heading = document.createElement("div");
  heading.innerHTML = "<p>Loading analysis result ....</p>";
  results.appendChild(heading);
}

export { handleSubmit, displayErrors, clearErrors, updateUI, showPreloader };
