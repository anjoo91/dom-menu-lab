
// Task 3.0 & Task 5.0
// Menu data structure
const menuLinks = [
    {text: "about", href: "/about"},
    {text: "catalog", href: "#", subLinks: [
      {text: "all", href: "/catalog/all"},
      {text: "top selling", href: "/catalog/top"},
      {text: "search", href: "/catalog/search"},
    ]},
    {text: "orders", href: "#" , subLinks: [
      {text: "new", href: "/orders/new"},
      {text: "pending", href: "/orders/pending"},
      {text: "history", href: "/orders/history"},
    ]},
    {text: "account", href: "#", subLinks: [
      {text: "profile", href: "/account/profile"},
      {text: "sign out", href: "/account/signout"},
    ]},
  ];
  
// Task 1.0
// Select and cache the <main> element in a variable named mainEl.

let mainEl = document.querySelector("main");

// Task 1.1
// Set the background color of mainEl using the --main-bg CSS custom property.

mainEl.style.backgroundColor = "var(--main-bg)";


// Task 1.2
// Set the content of mainEl to <h1>SEI Rocks!</h1>.

mainEl.innerHTML = "<h1>SEI Rocks!</h1>";

// Task 1.3
// Add a class of flex-ctr to mainEl.

mainEl.classList.add("flex-ctr");

// Task 2.0
// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.

let topMenuEl = document.querySelector("#top-menu");

// Task 2.1
// Set the height topMenuEl element to be 100%.

topMenuEl.style.height = "100%";

// Task 2.2
// Set the background color of topMenuEl using the --top-menu-bg CSS custom property.

topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

// Task 2.3
// Add a class of flex-around to topMenuEl.

topMenuEl.classList.add("flex-around");


// Task 3.1
// Iterate over the entire menuLinks array and for each “link” object:
    // Create an <a> element.
    // On the new element, add an href attribute with its value set to the href property of the “link” object.
    // Set the new element’s content to the value of the text property of the “link” object.
    // Append the new element to the topMenuEl element.

menuLinks.forEach(function(menuLink) {
    let aEl = document.createElement("a"); //Create an <a> element
    aEl.href = menuLink.href; //Add href attribute to <a> & set value to menuLink.href
    aEl.textContent = menuLink.text; //Sets <a>"s content to value of menuLink.text
    topMenuEl.appendChild(aEl); //Append <a> to topMenuEl in DOM
    }
)

// ******************************************************************************   Part 2   ******************************************************************************//

// Task 4.0
// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.

let subMenuEl = document.querySelector("#sub-menu");

// Task 4.1
//Set the height subMenuEl element to be 100%.

subMenuEl.style.height = "100%";

// Task 4.2
// Set the background color of subMenuEl using the --sub-menu-bg CSS custom property.

subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

// Task 4.3
// Add the class of flex-around to the subMenuEl element.

subMenuEl.classList.add("flex-around");

// Task 4.4
// Set the CSS position property of subMenuEl to the value of absolute.

subMenuEl.style.position = "absolute";

// Task 4.5
// Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = "0";

// Task 5.1
// Select and cache all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
// Declare a global showingSubMenu variable and initialize it to false;

let topMenuLinks = topMenuEl.querySelectorAll("a");
let showingSubMenu = false;

// Task 5.2
// Attach a delegated "click" event listener to topMenuEl.
// The first line of code of the event listener function should call the event object"s preventDefault() method.
// The second line of code function should immediately return if the element clicked was not an <a> element.

topMenuEl.addEventListener("click", function(event) {
  event.preventDefault(); //prevents default behavior for 'click'
  
  if(event.target.tagName !== "A") { //tagName returns capitalized tags for HTML
    return;
  }
  
  console.log(event.target.textContent); //verify the handler is working

  // Task 5.3
  // This feature "deselects" the menu item if it"s clicked when it"s currently active, resulting in the sub-menu sliding up as well.
  // Next in the event listener, if the clicked <a> link has a class of active:
    // Remove the active class from the clicked <a> element.
    // Set the showingSubMenu to false.
    // Set the CSS top property of subMenuEl to 0.
    // return; from the event listener function.

  if(event.target.classList.contains("active")) {
    event.target.classList.remove("active");
    showingSubMenu = false;
    subMenuEl.style.top = "0";
    return;
  }
  
  // Task 5.4
  // At this point, a new menu item has been clicked and it"s time to "reset" any currently active menu item...
  // Add code to the bottom of the the event listener that iterates over each <a> element in topMenuLinks and removes the class name of active, 
  // regardless of whether the <a> element has a class of active or not.

  topMenuLinks.forEach(function(link) {
    link.classList.remove("active")
  });

  // Task 5.5
  //Next, the event listener should add a class name of active to the <a> element that was clicked.

  event.target.classList.add("active");

  // Task 5.6
  // Next, add code in the event listener that sets showingSubMenu to true if the clicked <a> element"s "link" object within menuLinks has a subLinks property
  // (all do, except for the "link" object for ABOUT), otherwise, set it to false.

  let linkObject = null;

  for (let i = 0; i< menuLinks.length; i++) {
    if (menuLinks[i].text === event.target.textContent) {
        linkObject = menuLinks[i];
        showingSubMenu = true;
        break; //stop looping if match has been found
    }
  }

    // Task 5.7
    // If showingSubMenu is true:
        //Call a buildSubMenu function passing to it the subLinks array for the clicked <a> element.
        //Set the CSS top property of subMenuEl to 100%.
    // Otherwise (showingSubMenu is false):
        // Set the CSS top property of subMenuEl to 0.
        // Since the About link has been clicked, set mainEl.innerHTML to "<h1>about</h1>".
    if (showingSubMenu) {
        buildSubMenu(linkObject.subLinks);
        subMenuEl.style.top = "100%";
      } else {
        subMenuEl.style.top = "0";
        mainEl.innerHTML = "<h1>about</h1>";
      }

});

// Task 5.8
// Code the buildSubMenu function so that it:
    // Clears the contents of subMenuEl.
    // Iterates over the subLinks array passed as an argument; and for each "link" object:
    // Create an <a> element.
    // On the new element, add an href attribute with its value set to the href property of the "link" object.
    // Set the new element"s content to the value of the text property of the "link" object.
    // Append the new element to the subMenuEl element.

function buildSubMenu(subLinks) {
    subMenuEl.innerHTML = ""; //clear contents of subMenuEl
    
    //interate over subLinks array
    subLinks.forEach(function(subLink) {
        let newAElement = document.createElement("a"); //create new <a> element
        newAElement.href = subLink.href; //set <a> href to subLink.href
        newAElement.textContent = subLink.text; //set <a> contents to subLink.text
        subMenuEl.append(newAElement); //append new <a> element
    })
}

// Task 6.0
// Attach a delegated 'click' event listener to subMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault() method.
// The second line of code function should immediately return if the element clicked was not an <a> element.
// console.log the content of the <a> to verify the handler is working.

subMenuEl.addEventListener('click', function(event){
    event.preventDefault(); //prevents default behavior for 'click'

    if(event.target.tagName !== "A") {
        return;
    }

    console.log(event.target.textContent); //verify that handler is working
    
    // Task 6.1
    // Next, subMenuEl's event listener should:
        // Set showingSubMenu to false.
        // Set the CSS top property of subMenuEl to 0.
    showingSubMenu = false;
    subMenuEl.style.top = "0";

    // Task 6.2
        // Next, subMenuEl's event listener should remove the class name of active from each <a> element in topMenuLinks - whether the active class exists or not.
    topMenuLinks.forEach(function(topMenuLink) {
        topMenuLink.classList.remove("active");
    })

    // Task 6.3
        // Next, subMenuEl's event listener should update the contents of mainEl to the contents of the <a> element, within an <h1>, clicked within subMenuEl.
    mainEl.innerHTML = `<h1>${event.target.textContent}</h1>`; //clicked on a lightbulb in vscode and it converted a concatenation to a template string...cool!

})