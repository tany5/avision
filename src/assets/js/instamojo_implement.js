
      /* Start client-defined Callback Handler Functions */
      function onOpenHandler () {
        alert('Payments Modal is Opened');
      }

      function onCloseHandler () {
        alert('Payments Modal is Closed');
      }

      function onPaymentSuccessHandler (response) {
        alert('Payment Success');
        console.log('Payment Success Response', response);
      }

      function onPaymentFailureHandler (response) {
        alert('Payment Failure');
        console.log('Payment Failure Response', response);
      }
      /* End client-defined Callback Handler Functions */

      /* Configuring Handlers */
      Instamojo.configure({
        handlers: {
          onOpen: onOpenHandler,
          onClose: onCloseHandler,
          onSuccess: onPaymentSuccessHandler,
          onFailure: onPaymentFailureHandler
        }
      });
      
      /*function onButtonClick() {
        Instamojo.open('http://www.instamojo.com/@ayushya');
      }*/
    $("body").on('click','.vid_btn_buynow',function(){
        Instamojo.open('https://www.instamojo.com/@avisioninstitute/');
    });