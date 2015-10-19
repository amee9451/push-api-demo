var port;

self.addEventListener('push', function(event) {
  var obj = event.data.json();

  if(obj.action === 'subscribe' || obj.action === 'unsubscribe') {
  
    var title = 'Subscription change';  
    var body = obj.name + ' has ' + obj.action + 'd.'; 
    var icon = 'push-icon.png';  
    var tag = 'push';
   
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    });
    
    port.postMessage(obj);
  } else if(obj.action === 'init') {
    port.postMessage(obj);
  }
});

self.onmessage = function(e) {
  port = e.ports[0];
}
