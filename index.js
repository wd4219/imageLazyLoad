function throttle(method, duration) {
  var begin = new Date();
  return function () {
    var context = this, args = arguments, current = new Date();
    if (current - begin >= duration) {
      method.apply(context, args);
      begin = current;
    }
  }
}
function ImgLazyLoad(selector) {
  this.img_list = document.querySelectorAll('img[data-lazy]');
  this.loaded_count = 0;
  this.imgLazyLoad = function (selector) {
    var el = window;
    var self = this;
    this.checkIsInViewport();
    if (selector) {
      el = document.querySelector(selector);
    }
    el.addEventListener('scroll', throttle(function(){
      self.checkIsInViewport();
    },100), false)
    el.addEventListener('touchmove', throttle(function(){
      self.checkIsInViewport();
    },100), false)
  };
  this.checkIsInViewport = function () {
    console.log(0);
    for (var i = this.loaded_count; i < this.img_list.length; i++) {
      if (this.img_list[i].getBoundingClientRect().top < document.documentElement.clientHeight) {
        this.loaded_count++;
        this.img_list[i].setAttribute('src', this.img_list[i].getAttribute('data-lazy'))
      }
      else {
        break;
      }
    }
  }
}
(new ImgLazyLoad()).imgLazyLoad();