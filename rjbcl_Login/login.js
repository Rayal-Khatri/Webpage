// ---- Chrome BFCache + opacity fix ----
window.addEventListener('pageshow', function (event) {
  document.body.style.opacity = '1';
  document.body.classList.remove('page-loading');

  if (event.persisted) {
    window.location.reload();
  }
});



$(document).ready(function () {

  // ===========
  $(".error-message").hide();
  // ================
  // TAB SWITCHING
  // ===========================
  $('.tab-btn').on('click', function () {
    const targetTab = $(this).data('tab');

    // Clear error message when switching tabs
    hideErrorMessage();

    // Update active tab button
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');

    // Switch form containers
    $('.form-container').removeClass('active');
    if (targetTab === 'policy') {
      $('#policyFormWrapper').addClass('active');
    } else if (targetTab === 'agent') {
      $('#agentFormWrapper').addClass('active');
    }
  });

  // Set active tab from Django context (if provided)
  if (window.activeTab) {
    const tabButton = $(`.tab-btn[data-tab="${window.activeTab}"]`);
    if (tabButton.length) {
      tabButton.click();
    }
  }

  // ===========================
  // PASSWORD VISIBILITY TOGGLE
  // ===========================

  $('.toggle-password').on('click', function () {
    const targetId = $(this).data('target');
    const passwordInput = $(`#${targetId}`);
    const icon = $(this).find('i');

    if (passwordInput.attr('type') === 'password') {
      passwordInput.attr('type', 'text');
      icon.removeClass('bi-eye').addClass('bi-eye-slash');
    } else {
      passwordInput.attr('type', 'password');
      icon.removeClass('bi-eye-slash').addClass('bi-eye');
    }
  });

  // ===========================
  // DJANGO MESSAGES
  // ===========================
  $('.js-msg').each(function () {
    const msgTags = $(this).data('tags');
    const msgText = $(this).data('text');

    if (msgTags.includes('success')) {
      showSuccessMessage(msgText);
    } else if (msgText.includes('Incorrect password!') || msgText.includes('Invalid policy number or user not found.')|| msgText.includes('Agent code not found!')) {
      showErrorMessage("Invalid Credentials. Please Try Again!");
    } else if (msgTags.includes('warning')) {
      showErrorMessage(msgText);
    } else {
      showErrorMessage(msgText);
    }
  });

  // ===========================
  // FORM VALIDATION ENHANCEMENT
  // ===========================
  $('form').on('submit', function (e) {
    const form = $(this);
    const submitBtn = form.find('button[type="submit"]');

    // Clear previous errors
    hideErrorMessage();

    // Check if all required fields are filled
    let isValid = true;
    form.find('[required]').each(function () {
      if (!$(this).val().trim()) {
        isValid = false;
        $(this).addClass('is-invalid');
      } else {
        $(this).removeClass('is-invalid');
      }
    });

    if (!isValid) {
      e.preventDefault();
      showErrorMessage('Please fill in all required fields.');
      return false;
    }

    // Disable submit button to prevent double submission
    submitBtn.prop('disabled', true);
    submitBtn.html('<span class="spinner-border spinner-border-sm me-2"></span>Please Wait...');
  });

  // Remove invalid class on input
  $('input').on('input', function () {
    $(this).removeClass('is-invalid');
    hideErrorMessage();
  });

  // ===========================
  // SMOOTH ANIMATIONS
  // ===========================
  // Add focus effect to form controls
  $('.form-control').on('focus', function () {
    $(this).parent().addClass('focused');
  });

  $('.form-control').on('blur', function () {
    $(this).parent().removeClass('focused');
  });

  // ===========================
  // SECURITY ENHANCEMENTS
  // ===========================



  // Clear password fields on page load (security measure)
  $('input[type="password"]').val('');

  // ===========================
  // LOADING STATE MANAGEMENT
  // ===========================
  // Show loading state when navigating away
  $('a').on('click', function () {
    const href = $(this).attr('href');
    if (href && !href.startsWith('#') && !$(this).hasClass('no-loading')) {
      $('body').addClass('page-loading');
    }
  });


  // ===========================
  // ACCESSIBILITY IMPROVEMENTS
  // ===========================
  // Add aria-labels for screen readers
  $('.toggle-password').attr('aria-label', 'Toggle password visibility');
  $('.tab-btn').each(function () {
    const tabName = $(this).data('tab');
    $(this).attr('aria-label', `Switch to ${tabName} login`);
  });

  // ===========================
  // VALIDATION REAL TIME
  // ===========================
  $('#policy-number, #agent-code').on('blur', function () {
    const $field = $(this);
    if (!$field.val() || $field.val().trim() === '') {
      // Don't add invalid class if field is pan-number AND occupation is 194
      $field.addClass('is-invalid');
    } else {
      $field.removeClass('is-invalid');
    }
  });
    // USER REGISTRATION DATE PICKER INITIALIZATION
  $("#user_dob_bs").NepaliDatePicker();
  $("#user_dob_ad").on("focus", function () {
    this.showPicker();
  });

});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show error message in error-message element
function showErrorMessage(message) {
  const errorEl = $('.error-message');
  errorEl.text(message);
  errorEl.fadeIn(300);

  // Auto-hide after 5 seconds
  setTimeout(function () {
    errorEl.fadeOut(300);
  }, 5000);
}

// Hide error message
function hideErrorMessage() {
  $('.error-message').fadeOut(300);
}

// Show success message
function showSuccessMessage(message) {
  // If you have a success-message element, use it
  const successEl = $('.success-message');
  if (successEl.length) {
    successEl.text(message);
    successEl.fadeIn(300);

    setTimeout(function () {
      successEl.fadeOut(300);
    }, 5000);
  } else {
    // Fallback: use error-message element but you could add different styling
    const errorEl = $('.error-message');
    errorEl.text(message);
    errorEl.removeClass('text-danger').addClass('text-success');
    errorEl.fadeIn(300);

    setTimeout(function () {
      errorEl.fadeOut(300, function () {
        errorEl.removeClass('text-success').addClass('text-danger');
      });
    }, 5000);
  }
}

// Show custom error message (legacy function name maintained for compatibility)
function showError(message) {
  showErrorMessage(message);
}

// Show success (legacy function name maintained for compatibility)
function showSuccess(message) {
  showSuccessMessage(message);
}



// SWITCH TAB BASED ON URL PARAMETER
window.activeTab = "{{ active_tab }}";
(function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab && (tab === 'agent' || tab === 'policy')) {
      window.activeTab = tab;
    }
  } catch (e) {
    // ignore if URLSearchParams not supported (very old browsers)
  }
})();