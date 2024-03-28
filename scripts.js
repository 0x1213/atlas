$(document).ready(function () {
  // handle Transcribe button enable/disable
  $('#urlInput').on('input', function () {
    $('#submit').prop('disabled', !$(this).val());
  });
  // Function to handle form submission
  $('#transcriptionForm').submit(function (event) {
    event.preventDefault(); // Prevent default form submission
    var url = $('#urlInput').val();
    var language = $('#languageSelect').val();

    // Check if URL input is empty
    if (url === '') {
      alert('URL cannot be empty!');
      return;
    }

    // Disable submit button
    $('#submit').prop('disabled', true);

    // Send POST request
    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/process',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ url: url, language: language }),
      success: function (response, status, xhr) {
        if (xhr.status === 201) {
          var jobId = response.jobId;
          console.log(response);
          // hide div with id form
          $('#form').hide();
          // show div with id processing
          $('#processing').show();
          checkStatus(jobId); // Start checking status
        }
      },
      error: function (xhr, status, error) {
        showError();
      },
    });
  });

  // Function to check job status
  function checkStatus(jobId) {
    var intervalId = setInterval(function () {
      $.get('http://localhost:3000/status?jobId=' + jobId, function (response) {
        if (response.status === 'completed') {
          clearInterval(intervalId);

          showResults(jobId);
        }
      });
    }, 10000);
  }

  // Function to handle showing results
  function showResults(jobId) {
    $.get('http://localhost:3000/download?jobId=' + jobId, function (response) {
      var downloads = response.downloads;
      $('#processing').hide();
      //   $('#results').empty();
      $.each(downloads, function (format, link) {
        $('.dl-links').append(
          '<button><a href="' + link + '">' + format + '</a></button>'
        );
      });
      // hide div with id processing
      $('#processing').hide();
      // show div with id results
      $('#results').show();
    });
  }

  // Function to show error message
  function showError() {
    $('#error').text('Oops, something went wrong :(');
    $('#error').show();
  }
});
