(function() {
  var HolyCarousel;

  $.fn.tojqa = function() {
    var arr, i;
    arr = new Array(this.length);
    i = 0;
    this.each(function() {
      return arr[i++] = $(this);
    });
    return arr;
  };

  HolyCarousel = {
    init: function(opts) {
      this.each(function() {
        var $slides, $this, data;
        $this = $(this);
        this.className += ' holycarousel';
        data = $this.data('holycarousel');
        $slides = $this.children();
        $slides.wrapAll('<div class="holy-rail" style="margin-left: 0; width:9999%; margin-left: 0;"></div>');
        $slides.width($this.width());
        if (!data) {
          $this.data('holycarousel', {
            opts: opts || {
              responsive: true
            },
            slides: $slides.tojqa(),
            currentIndex: 0
          });
        }
        data = $this.data('holycarousel');
        opts = opts || data.opts;
        if (opts.responsive) {
          return $(window).resize(function() {
            return HolyCarousel.respond.apply($this, arguments);
          });
        }
      });
      return this;
    },
    respond: function() {
      var data, innerWidth, marginLeft, outerWidth, parentWidth, slide, slides, _i, _len;
      data = this.data('holycarousel');
      slides = data.slides;
      parentWidth = this.parent().width();
      innerWidth = this.width();
      outerWidth = this.outerWidth(true);
      for (_i = 0, _len = slides.length; _i < _len; _i++) {
        slide = slides[_i];
        slide[0].style.width = innerWidth + 'px';
      }
      data = this.data('holycarousel');
      slides = data.slides;
      marginLeft = -Math.abs(slides[data.currentIndex].position().left);
      $('.holy-rail', this).css('margin-left', marginLeft + 'px');
      return this;
    },
    slideTo: function(index) {
      var data, marginLeft, slides;
      data = this.data('holycarousel');
      slides = data.slides;
      marginLeft = -Math.abs(slides[index].position().left);
      $('.holy-rail', this).animate({
        marginLeft: marginLeft
      });
      data.currentIndex = index;
      return this;
    },
    next: function() {
      var currentIndex, data, numSlides;
      data = this.data('holycarousel');
      numSlides = data.slides.length;
      currentIndex = data.currentIndex;
      HolyCarousel.slideTo.apply(this, [(currentIndex + 1) % numSlides]);
      return this;
    },
    prev: function() {
      var currentIndex, data, numSlides, targetIndex;
      data = this.data('holycarousel');
      if (currentIndex === 0) {
        numSlides = data.slides.length;
        targetIndex = numSlides - 1;
      } else {
        currentIndex = data.currentIndex;
        targetIndex = currentIndex - 1;
      }
      HolyCarousel.slideTo.apply(this, [targetIndex]);
      return this;
    }
  };

  jQuery.fn.holycarousel = jQuery.fn.holyCarousel = $.fn.holycarousel = $.fn.holyCarousel = function(method) {
    if (HolyCarousel[method]) {
      return HolyCarousel[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return HolyCarousel.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.holyCarousel');
    }
    return this;
  };

}).call(this);
