

<script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js?v=4534" defer></script>

<script>
  window.OneSignalDeferred = window.OneSignalDeferred || [];

  OneSignalDeferred.push(async function(OneSignal) {
     
    await OneSignal.init({
      appId: "710b8a5e-2354-4475-a80a-18d203bf655c",
      safari_web_id: "web.onesignal.auto.52db6e33-5c43-4c7e-8893-c04dfe7146e4",
      notifyButton: {
        enable: true,
      },
    });
   
    await OneSignal.login("221");
  
  });




</script>
