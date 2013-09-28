(function () {
  console.log("running");
  var recommendation_window = document.createElement('div');
  recommendation_window.id = 'll_chat_notification';
  recommendation_window.backgroundColor = 'white';
  recommendation_window.style.zIndex = '100003';
  recommendation_window.style.position = 'fixed';
  recommendation_window.style.width = '250px';
  recommendation_window.style.height = '300px';
  recommendation_window.overflow = 'hidden';
  recommendation_window.style.bottom = '10px';
  recommendation_window.style.right = '10px';

  var iframe = document.createElement('iframe');

  iframe.src = "http://suggestr.thill.me/whatever.html";

  iframe.style.zIndex = '100003';
  iframe.scrolling = 'no';
  iframe.style.height = '100%';
  iframe.style.width = '100%';
  recommendation_window.appendChild(iframe);
  document.body.appendChild(recommendation_window);
}())