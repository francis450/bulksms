 $(document).ready(function(){
    fetchmembers();

    $(".sendSMS").click(function(e) {
         
      e.preventDefault();
      var to = $(".recepient").val();
      var smsbody = $(".message").val();
      $.ajax({
        url: "src/sms/send-sms-lib.php",
        data: {
          recepient: to,
          message: smsbody
        },
        error: function() {
          $(".mdl-spinner").fadeOut("fast");
          $(".success-help").html("An error has occurred").fadeIn("slow");
        },
        success: function(data) {
          addMessage();
        },
        type: "POST"
      });
    });

    function addMessage(){
        var $div = $('<div>', {
            style: 'padding: 11px;'
        });

        var $dateParagraph = $('<p>', {
            text: saa
        });
        var $nameSmall = $('<p>', {
            text: $(".recepient option:selected").text()
        });
        var $msgBtnHolder = $('<div>', {
            class: 'msg-btn-holder'
        });

        var $senderMsgBtn = $('<div>', {
            class: 'sender-msg msg-btn'
        });

        var $verseParagraph = $('<p>', {
            text: $('.message').val()
        });

        $senderMsgBtn.append($verseParagraph);
        $msgBtnHolder.append($senderMsgBtn);
        $div.append($dateParagraph, $nameSmall, $msgBtnHolder);
        $('.content').append($div);
        var $content = $('.content');
        $content.scrollTop($content[0].scrollHeight);
        $('.message').val('');
    }

    function saa(){
      // Get the current date and time
      var currentTime = new Date();

      // Format the time in the desired format (e.g., HH:MM:SS AM/PM)
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var seconds = currentTime.getSeconds();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 12-hour clock format
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
            
      var formattedTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;

      // Display the current time in an element with the id "time"
      // $('#time').text(formattedTime);
      return formattedTime;
    }
    
})

    const notifications = document.querySelector('.notifications');
    const popup = document.getElementById('popup');
    var isPopupVisible = false;
    notifications.addEventListener('click', () => {
        // Calculate the position of the popup relative to the notifications element
        const notificationsRect = notifications.getBoundingClientRect();
        const top = notificationsRect.top;
        const left = notificationsRect.left;

        // Position the popup
        popup.style.top = `${top}px`;
        popup.style.left = `${left}px`;

        // Show the popup
        popup.style.display = 'block';
        isPopupVisible = true;
    });

    document.addEventListener('click', (e) => {
        if (isPopupVisible && !popup.contains(e.target) && e.target !== notifications) {
            popup.style.display = 'none';
            isPopupVisible = false; // Set the flag to false when the popup is hidden
        }
    });

    const endpointURL = 'src/members';

    // Function to make an AJAX request to fetch the data from the endpoint.
    function fetchmembers() {
        fetch(endpointURL)
            .then(response => response.json())
            .then(data => populateSelect(data))
            .catch(error => console.error('Error:', error));
    }

    // Function to populate the <select> element with the data.
    function populateSelect(data) {
        const selectElement = document.getElementById('to');

        // Iterate through the data and create <option> elements.
        for (const entry of data) {
            const option = document.createElement('option');
            option.value = entry.tel; // Assuming 'tel' is the telephone number field.
            option.textContent = entry.name; // Assuming 'name' is the name field.
            selectElement.appendChild(option);
        }
    }
    