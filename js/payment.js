$(document).ready(() => {
    $("body").animate({ opacity: 1 }, 1000);
  });
  let seatNumber = localStorage.getItem("seat");
  let Cost = localStorage.getItem("Cost");
  let showTime=localStorage.getItem("time");
  let createAccordion = () => {
    let accordion = document.createElement("div");
    accordion.classList.add("accordion");

    // Debit Card Section
    accordion.appendChild(
      createSection("Debit Card", "debitCardContent", "Debit card")
    );

    // Credit Card Section
    accordion.appendChild(
      createSection("Credit Card", "creditCardContent", "Credit card")
    );

    // Interac Transfer Section
    accordion.appendChild(
      createInteracSection("Interac Transfer", "interacTransferContent")
    );

    document.getElementById("paymentContainer").appendChild(accordion);
  };

  let createSection = (title, contentId, cardType) => {
    let section = document.createElement("div");
    section.classList.add("accordion-section");

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("accordion-title");
    titleDiv.textContent = title;
    titleDiv.addEventListener("click", () => {
      toggleAccordionContent(contentId);
    });

    let contentDiv = document.createElement("div");
    contentDiv.id = contentId;
    contentDiv.classList.add("accordion-content");

    // Dynamically generate form fields for each section
    contentDiv.appendChild(
      createFormField("Card Number", "text", "cardNumber", cardType)
    );
    contentDiv.appendChild(
      createFormField("Expiration Date", "text", "expirationDate")
    );
    contentDiv.appendChild(createFormField("CVV", "text", "cvv"));

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Submit Payment";
    submitButton.addEventListener("click", () => {
      validateForm(contentId);
    });
    contentDiv.appendChild(submitButton);

    section.appendChild(titleDiv);
    section.appendChild(contentDiv);

    return section;
  };

  let createInteracSection = (title, contentId) => {
    let section = document.createElement("div");
    section.classList.add("accordion-section");

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("accordion-title");
    titleDiv.textContent = title;
    titleDiv.addEventListener("click", () => {
      toggleAccordionContent(contentId);
    });

    let contentDiv = document.createElement("div");
    contentDiv.id = contentId;
    contentDiv.classList.add("accordion-content");
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    contentDiv.innerHTML +='<h6> Email : ' +userInfo.email+ '</h6>'
    contentDiv.innerHTML +='<h6>Ph.no : ' + userInfo.phoneNumber+ '</h6>';

    contentDiv.appendChild(
      createFormField("Reference ID (10 digits)", "text", "referenceId")
    );

    let submitButton = document.createElement("button");
    submitButton.type = "button";
    submitButton.textContent = "Submit Payment";
    submitButton.addEventListener("click", () => {
      validateInteracForm(contentId);
    });
    contentDiv.appendChild(submitButton);

    section.appendChild(titleDiv);
    section.appendChild(contentDiv);

    return section;
  };

  let createFormField = (labelText, inputType, inputId, cardType) => {
    let label = document.createElement("label");
    label.textContent = labelText;

    let input = document.createElement("input");
    input.type = inputType;
    input.id = inputId;
    input.name = inputId;
    input.placeholder = cardType ? `${cardType} Number` : labelText;
    input.required = true;

    label.appendChild(input);

    return label;
  };

  let toggleAccordionContent = (contentId) => {
    $(".accordion-content")
      .not("#" + contentId)
      .slideUp();
    $("#" + contentId).slideToggle();
  };

  let validateForm = (contentId) => {
    let firstInvalidField = null;
    let cardNumberField = $("#" + contentId + " #cardNumber");
    let expirationDateField = $("#" + contentId + " #expirationDate");
    let cvvField = $("#" + contentId + " #cvv");

    let cardNumber = cardNumberField.val();
    let expirationDate = expirationDateField.val();
    let cvv = cvvField.val();

    let errorMessage = "";
    let isValid = true;

    if (!/^\d{16}$/.test(cardNumber)) {
      errorMessage += "Invalid card number.\n";
      isValid = false;
      if (!firstInvalidField) {
        firstInvalidField = cardNumberField;
      }
    }

    // Validate expiration date and check if it is in the future
    let today = new Date();
    let enteredDate = new Date(
      "20" + expirationDate.split("/").reverse().join("-")
    );

    if (enteredDate < today) {
      errorMessage += "Card is expired!!.\n";
      isValid = false;
      if (!firstInvalidField) {
        firstInvalidField = expirationDateField;
      }
    }

    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      errorMessage += "Invalid expiration date.\n";
      isValid = false;
      if (!firstInvalidField) {
        firstInvalidField = expirationDateField;
      }
    }

    if (!/^\d{3}$/.test(cvv)) {
      errorMessage += "Invalid CVV.\n";
      isValid = false;
      if (!firstInvalidField) {
        firstInvalidField = cvvField;
      }
    }

    // Display error message in alert box
    if (!isValid) {
      alert("Oops!\n" + errorMessage);
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    } else {
      // Display success message in alert box
      alert("Payment Successfully Completed !!");

      // Show QR code modal
      showQRCodeModal();
    }
  };

  let validateInteracForm = (contentId) => {
    let firstInvalidField = null; // Keep track of the first input field with a validation error
    let referenceIdField = $("#" + contentId + " #referenceId");
    let referenceId = referenceIdField.val();

    let errorMessage = "";
    let isValid = true;

    // Validate reference ID (10 digits)
    if (!/^\d{10}$/.test(referenceId)) {
      errorMessage +=
        "Invalid reference ID. It must be a 10-digit code.\n";
      isValid = false;
      if (!firstInvalidField) {
        firstInvalidField = referenceIdField;
      }
    }

    // Display error message in alert box
    if (!isValid) {
      alert("Validation Error:\n" + errorMessage);

      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    } else {
      alert("Payment Successfully Completed !!");
      showQRCodeModal();
    }
  };

  let showQRCodeModal = () => {
    let modalContent = `
              <div class="modal" id="qrCodeModal">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header">
                              <h5 class="modal-title">Payment Successful</h5>
                           
                          </div>
                          <div class="modal-body" id="qrCodeContainer">
                              <div id="showTime"></div>
                              <div id="paymentValue"></div>
                          <div id="seat-number"></div>

                              </div>
                         
                          <div class="modal-footer">
                           
                              <a href="#" id="redirectButton" class="btn btn-primary">Go to Home Page</a>
                          </div>
                      </div>
                  </div>
              </div>
          `;

    $("body").append(modalContent);

    let qrCodeContent = "Your QR Code Content";
    let qrCode = new QRCode(document.getElementById("qrCodeContainer"), {
      text: qrCodeContent,
      width: 128,
      height: 128,
    });

    $("#qrCodeModal").modal("show");
    $("#redirectButton").on("click", function (){
      clearLocalStorageExceptOne("userInfo","isLoggedIn");
  function clearLocalStorageExceptOne(keepKey,login) {
      for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key !==keepKey ) {
          localStorage.removeItem(key);
         
        }
        localStorage.setItem("isLoggedIn",true);
      }
    }
        window.location.href = "index.html";
        $("#qrCodeModal").modal("hide");
    });
    $("#paymentValue").text("Cost:" + Cost);
    $("#seat-number").text("Seat-Number:" + seatNumber);         
    $("#showTime").text("Show Time:" + showTime);
    
    $("#qrCodeModal").on("hidden.bs.modal", function () {
      $(this).remove();
    });
  };
  $("#logout").click(()=>{
let path = window.location.pathname;
let page = path.split("/").pop();
if(page=="seat_selection.html"|| page=="payment.html"){
window.location.href = "index.html";
}
else{
clearLocalStorageExceptOne("userInfo");
function clearLocalStorageExceptOne(keepKey) {
for (var key in localStorage) {
  if (localStorage.hasOwnProperty(key) && key !== keepKey) {
    localStorage.removeItem(key);
  }
}
}
}


})
  $(document).ready(() => {
    createAccordion();
  });