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
        var $slides, $this, data, slides;
        $this = $(this);
        this.className += ' holycarousel';
        data = $this.data('holycarousel');
        $slides = $this.children();
        $slides.wrapAll('<div class="holy-rail" style="margin-left: 0; width:9999%; margin-left: 0;"></div>');
        slides = $slides.tojqa();
        $slides.width($this.width());
        if (!data) {
          $this.data('holycarousel', {
            opts: opts || {
              responsive: true,
              alterHeight: false
            },
            slides: slides,
            currentIndex: 0
          });
        }
        data = $this.data('holycarousel');
        opts = opts || data.opts;
        if (opts.responsive) {
          $(window).resize(function() {
            return HolyCarousel.respond.apply($this, arguments);
          });
          if (opts.alterHeight) {
            return $this.height(slides[0].outerHeight(true));
          }
        }
      });
      return this;
    },
    respond: function() {
      var currentIndex, data, innerWidth, marginLeft, outerSpace, slide, slides, _i, _len;
      data = this.data('holycarousel');
      slides = data.slides;
      currentIndex = data.currentIndex;
      outerSpace = slides[0].outerWidth(true) - slides[0].width();
      innerWidth = this.width();
      for (_i = 0, _len = slides.length; _i < _len; _i++) {
        slide = slides[_i];
        slide[0].style.width = innerWidth + 'px';
      }
      marginLeft = -Math.abs(slides[data.currentIndex].position().left);
      $('.holy-rail', this).css('margin-left', marginLeft + 'px');
      if (data.opts.alterHeight) {
        this.height(slides[currentIndex].outerHeight(true));
      }
      return this;
    },
    slideTo: function(targetIndex) {
      var currentHeight, currentIndex, data, high, i, low, marginLeft, maxHeight, self, slides, _i, _ref;
      self = this;
      data = this.data('holycarousel');
      slides = data.slides;
      if (data != null) {
        if ((_ref = data.opts) != null) {
          if (typeof _ref.beforeSlide === "function") {
            _ref.beforeSlide(this, targetIndex);
          }
        }
      }
      currentIndex = data.currentIndex;
      marginLeft = -Math.abs(slides[targetIndex].position().left);
      if (data.opts.alterHeight) {
        high = Math.max(currentIndex, targetIndex);
        low = Math.min(currentIndex, targetIndex);
        maxHeight = 0;
        for (i = _i = low; _i <= high; i = _i += 1) {
          currentHeight = slides[i].outerHeight(true);
          if (currentHeight > maxHeight) {
            maxHeight = currentHeight;
          }
        }
        this.height(maxHeight);
      }
      $('.holy-rail', this).animate({
        marginLeft: marginLeft
      }, function() {
        var _ref1;
        if (data != null) {
          if ((_ref1 = data.opts) != null) {
            if (typeof _ref1.afterSlide === "function") {
              _ref1.afterSlide(this, data.currentIndex);
            }
          }
        }
        if (data.opts.alterHeight) {
          return self.height(slides[targetIndex].outerHeight(true));
        }
      });
      data.currentIndex = targetIndex;
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
      currentIndex = data.currentIndex;
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
