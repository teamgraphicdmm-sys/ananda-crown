/**
 * Ananda Crown - Direct Contact & Inquiry Form Handler
 * Self-Hosted Email Delivery (Zero Third-Party Services)
 */

(function () {
  // Determine direct API endpoint (default: /api/contact)
  var SUBMIT_ENDPOINT = window.CONTACT_API_URL || "/api/contact";

  // If viewing via local Apache / XAMPP subfolder (e.g. http://localhost/jsProjects/ananda-crown/...):
  if (window.location.pathname.includes("/jsProjects/ananda-crown") && window.location.port !== "3000") {
    SUBMIT_ENDPOINT = "http://localhost:3000/api/contact";
  }

  /**
   * Helper to send form data to your self-hosted direct mail API
   */
  async function submitContactInquiry(payload) {
    try {
      var formData = new FormData();
      for (var prop in payload) {
        if (
          Object.prototype.hasOwnProperty.call(payload, prop) &&
          payload[prop] !== undefined &&
          payload[prop] !== null
        ) {
          formData.append(prop, payload[prop]);
        }
      }

      var response = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData
      });

      var data = null;
      try {
        data = await response.json();
      } catch (jsonErr) {
        console.warn("Could not parse response as JSON:", jsonErr);
      }

      if (response.ok && data && (data.success === true || data.success === "true")) {
        return {
          success: true,
          message: (data && data.message) ? data.message : "Message sent successfully!"
        };
      } else {
        var errorMsg = (data && data.message)
          ? data.message
          : ("Server error (Status " + response.status + "). Please check your SMTP configuration.");
        console.error("Direct mail server error:", errorMsg);
        return {
          success: false,
          message: errorMsg
        };
      }
    } catch (err) {
      console.error("Direct mail connection error:", err);
      return {
        success: false,
        message: "Unable to reach the email server. Please make sure the server is running."
      };
    }
  }

  // Global references for backwards compatibility
  window.submitContactInquiry = submitContactInquiry;
  window.submitToWeb3Forms = submitContactInquiry;

  /**
   * Field-level error UI helpers
   */
  function showFieldError(inputEl, errorEl, message) {
    if (inputEl) inputEl.classList.add("has-error");
    if (errorEl) {
      if (message) {
        var textEl = errorEl.querySelector(".c-error-text") || errorEl.querySelector(".field-error-msg") || errorEl;
        textEl.textContent = message;
      }
      errorEl.classList.add("is-visible");
      errorEl.style.display = "block";
      errorEl.style.opacity = "1";
    }
  }

  function clearFieldError(inputEl, errorEl) {
    if (inputEl) inputEl.classList.remove("has-error");
    if (errorEl) {
      errorEl.classList.remove("is-visible");
      errorEl.style.display = "none";
      errorEl.style.opacity = "0";
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  window.anandaFormUtils = {
    showFieldError: showFieldError,
    clearFieldError: clearFieldError,
    isValidEmail: isValidEmail
  };

  /**
   * Initialize Homepage Inquiry Modal Form (#email-form)
   */
  function initIndexInquiryForm() {
    var form = document.getElementById("email-form");
    if (!form || form.dataset.mailHandlerInitialized) return;
    form.dataset.mailHandlerInitialized = "true";

    // Disable Webflow form hijack if jQuery is present
    if (window.jQuery) {
      try {
        window.jQuery(form).off("submit");
        window.jQuery(form).unbind("submit");
        window.jQuery(document).off("submit", "#email-form");
      } catch (jqErr) { }
    }
    form.onsubmit = function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      return false;
    };

    var formDone = form.parentElement.querySelector(".form-sucess-component") || form.parentElement.querySelector(".w-form-done");
    var formFail = form.parentElement.querySelector(".error-message") || form.parentElement.querySelector(".w-form-fail");
    var formFailText = formFail ? formFail.querySelector(".form-message-text") : null;
    var submitBtn = form.querySelector('input[type="submit"]') || form.querySelector(".form-botton");
    var privacyCheckbox = document.getElementById("Accept-the-Privacy-Policy");
    var customCheckbox = document.getElementById("custom-checkbox-index") || form.querySelector(".form-checkbox");
    var privacyRow = document.getElementById("privacy-row-index") || form.querySelector(".form-accept");
    var interestLabel = document.getElementById("inquire-modal-interest-label");

    var firstNameInput = document.getElementById("Fisrt-Name");
    var lastNameInput = document.getElementById("Last-Name");
    var emailInput = document.getElementById("Email-Adress-2");
    var phoneInput = document.getElementById("Phone-Number-2");
    var requestInput = document.getElementById("Request-2");

    var errorFirstName = document.getElementById("error-Fisrt-Name");
    var errorLastName = document.getElementById("error-Last-Name");
    var errorEmail = document.getElementById("error-Email-Adress-2");
    var errorPhone = document.getElementById("error-Phone-Number-2");
    var errorRequest = document.getElementById("error-Request-2");
    var errorPrivacy = document.getElementById("error-privacy-index");

    // Clear field errors as user types
    if (firstNameInput) firstNameInput.addEventListener("input", function () { clearFieldError(firstNameInput, errorFirstName); });
    if (lastNameInput) lastNameInput.addEventListener("input", function () { clearFieldError(lastNameInput, errorLastName); });
    if (emailInput) emailInput.addEventListener("input", function () { clearFieldError(emailInput, errorEmail); });
    if (requestInput) requestInput.addEventListener("input", function () { clearFieldError(requestInput, errorRequest); });

    // Sync custom checkbox UI
    if (privacyCheckbox) {
      privacyCheckbox.addEventListener("change", function () {
        if (customCheckbox) {
          customCheckbox.classList.toggle("w--redirected-checked", privacyCheckbox.checked);
        }
        if (privacyCheckbox.checked) {
          clearFieldError(privacyRow, errorPrivacy);
        }
      });
    }

    // Stop link click inside privacy label from toggling checkbox
    var privacyLink = privacyRow ? privacyRow.querySelector("a") : null;
    if (privacyLink) {
      privacyLink.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    var isSubmitting = false;

    async function handleFormSubmit(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      }

      if (isSubmitting) return false;

      if (formFail) formFail.style.display = "none";

      var firstName = (firstNameInput ? firstNameInput.value : "").trim();
      var lastName = (lastNameInput ? lastNameInput.value : "").trim();
      var email = (emailInput ? emailInput.value : "").trim();
      var phone = (phoneInput ? phoneInput.value : "").trim();
      var request = (requestInput ? requestInput.value : "").trim();
      var interest = interestLabel ? interestLabel.textContent.trim() : "REGISTER INTEREST";

      // Field-by-field validation right at each field
      var isValid = true;
      var firstInvalid = null;

      if (!firstName) {
        showFieldError(firstNameInput, errorFirstName, "Please fill in your first name.");
        isValid = false;
        if (!firstInvalid) firstInvalid = firstNameInput;
      } else {
        clearFieldError(firstNameInput, errorFirstName);
      }

      if (!lastName) {
        showFieldError(lastNameInput, errorLastName, "Please fill in your last name.");
        isValid = false;
        if (!firstInvalid) firstInvalid = lastNameInput;
      } else {
        clearFieldError(lastNameInput, errorLastName);
      }

      if (!email) {
        showFieldError(emailInput, errorEmail, "Please enter your email address.");
        isValid = false;
        if (!firstInvalid) firstInvalid = emailInput;
      } else if (!isValidEmail(email)) {
        showFieldError(emailInput, errorEmail, "Please enter a valid email address.");
        isValid = false;
        if (!firstInvalid) firstInvalid = emailInput;
      } else {
        clearFieldError(emailInput, errorEmail);
      }

      if (!request) {
        showFieldError(requestInput, errorRequest, "Please enter your request.");
        isValid = false;
        if (!firstInvalid) firstInvalid = requestInput;
      } else {
        clearFieldError(requestInput, errorRequest);
      }

      // Mandatory Privacy Policy verification
      if (!privacyCheckbox || !privacyCheckbox.checked) {
        showFieldError(privacyRow, errorPrivacy, "Please accept the Privacy Policy to proceed.");
        isValid = false;
        if (!firstInvalid) firstInvalid = privacyRow;
      } else {
        clearFieldError(privacyRow, errorPrivacy);
      }

      if (!isValid) {
        if (firstInvalid && typeof firstInvalid.focus === "function") {
          try { firstInvalid.focus(); } catch (err) { }
        }
        return false;
      }

      isSubmitting = true;
      var originalBtnValue = submitBtn ? submitBtn.value : "SUBMIT";
      if (submitBtn) {
        submitBtn.value = "SENDING...";
        submitBtn.disabled = true;
      }

      var payload = {
        name: (firstName + " " + lastName).trim(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone || "Not provided",
        interest: interest,
        message: request,
        request: request
      };

      try {
        var result = await submitContactInquiry(payload);

        if (result && result.success) {
          form.style.display = "none";
          if (formDone) {
            formDone.style.display = "block";
          }
        } else {
          if (submitBtn) {
            submitBtn.value = originalBtnValue;
            submitBtn.disabled = false;
          }
          if (formFail) {
            if (formFailText) {
              formFailText.textContent = (result && result.message) ? result.message : "Oops! Something went wrong while submitting the form.";
            }
            formFail.style.display = "block";
          } else {
            alert((result && result.message) ? result.message : "Oops! Something went wrong while submitting the form.");
          }
        }
      } finally {
        isSubmitting = false;
      }
    }

    form.addEventListener("submit", handleFormSubmit, true);
    if (submitBtn && submitBtn.getAttribute("type") !== "submit") {
      submitBtn.addEventListener("click", handleFormSubmit);
    }
  }

  /**
   * Initialize Contact Page Form (#contact-inquiry-form)
   */
  function initContactPageForm() {
    var form = document.getElementById("contact-inquiry-form");
    if (!form || form.dataset.mailHandlerInitialized) return;
    form.dataset.mailHandlerInitialized = "true";

    form.onsubmit = function (e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      return false;
    };

    var successBox = document.getElementById("contact-success-state");
    var submitWrap = document.getElementById("submit-btn-wrap");
    var submitBtn = document.getElementById("submit-btn");
    var privacyInput = document.getElementById("privacy-input");
    var privacyRow = document.getElementById("privacy-row");
    var errorBox = document.getElementById("contact-form-error");
    var interestLabel = document.getElementById("interest-label");

    var firstNameInput = document.getElementById("firstName");
    var lastNameInput = document.getElementById("lastName");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var requestInput = document.getElementById("request");

    var errorFirstName = document.getElementById("error-firstName");
    var errorLastName = document.getElementById("error-lastName");
    var errorEmail = document.getElementById("error-email");
    var errorRequest = document.getElementById("error-request");
    var errorPrivacy = document.getElementById("error-privacy");

    // Clear field errors as user types
    if (firstNameInput) firstNameInput.addEventListener("input", function () { clearFieldError(firstNameInput, errorFirstName); });
    if (lastNameInput) lastNameInput.addEventListener("input", function () { clearFieldError(lastNameInput, errorLastName); });
    if (emailInput) emailInput.addEventListener("input", function () { clearFieldError(emailInput, errorEmail); });
    if (requestInput) requestInput.addEventListener("input", function () { clearFieldError(requestInput, errorRequest); });

    // Sync privacy change
    if (privacyInput) {
      privacyInput.addEventListener("change", function () {
        if (privacyInput.checked) {
          clearFieldError(privacyRow, errorPrivacy);
        }
      });
    }

    var isSubmitting = false;

    async function handleContactSubmit(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      }

      if (isSubmitting) return false;

      if (errorBox) errorBox.style.display = "none";

      var firstName = (firstNameInput ? firstNameInput.value : "").trim();
      var lastName = (lastNameInput ? lastNameInput.value : "").trim();
      var email = (emailInput ? emailInput.value : "").trim();
      var phone = (phoneInput ? phoneInput.value : "").trim();
      var request = (requestInput ? requestInput.value : "").trim();
      var interest = interestLabel ? interestLabel.textContent.trim() : "REGISTER INTEREST";

      // Field-by-field validation
      var isValid = true;
      var firstInvalid = null;

      if (!firstName) {
        showFieldError(firstNameInput, errorFirstName, "Please fill in your first name.");
        isValid = false;
        if (!firstInvalid) firstInvalid = firstNameInput;
      } else {
        clearFieldError(firstNameInput, errorFirstName);
      }

      if (!lastName) {
        showFieldError(lastNameInput, errorLastName, "Please fill in your last name.");
        isValid = false;
        if (!firstInvalid) firstInvalid = lastNameInput;
      } else {
        clearFieldError(lastNameInput, errorLastName);
      }

      if (!email) {
        showFieldError(emailInput, errorEmail, "Please enter your email address.");
        isValid = false;
        if (!firstInvalid) firstInvalid = emailInput;
      } else if (!isValidEmail(email)) {
        showFieldError(emailInput, errorEmail, "Please enter a valid email address.");
        isValid = false;
        if (!firstInvalid) firstInvalid = emailInput;
      } else {
        clearFieldError(emailInput, errorEmail);
      }

      if (!request) {
        showFieldError(requestInput, errorRequest, "Please enter your request.");
        isValid = false;
        if (!firstInvalid) firstInvalid = requestInput;
      } else {
        clearFieldError(requestInput, errorRequest);
      }

      // Mandatory Privacy Policy check
      if (!privacyInput || !privacyInput.checked) {
        showFieldError(privacyRow, errorPrivacy, "Please accept the Privacy Policy to proceed.");
        isValid = false;
        if (!firstInvalid) firstInvalid = privacyRow;
      } else {
        clearFieldError(privacyRow, errorPrivacy);
      }

      if (!isValid) {
        if (firstInvalid && typeof firstInvalid.focus === "function") {
          try { firstInvalid.focus(); } catch (err) { }
        }
        return false;
      }

      isSubmitting = true;
      var originalBtnText = submitBtn ? submitBtn.textContent : "SUBMIT";
      if (submitBtn) {
        submitBtn.textContent = "SENDING...";
        submitBtn.disabled = true;
      }

      var payload = {
        name: (firstName + " " + lastName).trim(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone || "Not provided",
        interest: interest,
        message: request,
        request: request
      };

      try {
        var result = await submitContactInquiry(payload);

        if (result && result.success) {
          form.style.display = "none";
          if (submitWrap) submitWrap.style.display = "none";
          if (successBox) successBox.classList.add("is-active");
        } else {
          if (submitBtn) {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
          }
          if (errorBox) {
            errorBox.textContent = (result && result.message) ? result.message : "Failed to submit inquiry. Please try again.";
            errorBox.style.display = "block";
          } else {
            alert((result && result.message) ? result.message : "Failed to submit inquiry. Please try again.");
          }
        }
      } finally {
        isSubmitting = false;
      }
    }

    form.addEventListener("submit", handleContactSubmit, true);
    if (submitBtn && submitBtn.getAttribute("type") !== "submit") {
      submitBtn.addEventListener("click", handleContactSubmit);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initIndexInquiryForm();
      initContactPageForm();
    });
  } else {
    initIndexInquiryForm();
    initContactPageForm();
  }
})();
