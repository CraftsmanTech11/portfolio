"use strict";

//Preloader
var preloader = $(".preloader");
$(window).on("load", function () {
  var preloaderFadeOutTime = 500;

  function hidePreloader() {
    preloader.fadeOut(preloaderFadeOutTime);
  }
  hidePreloader();
});

(function ($) {
  /*global jQuery $*/

  //navigation scroll trigger on scroll
  var lazy = $("#header.on-scroll");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 200) {
      lazy.addClass("visible");
    } else {
      lazy.removeClass("visible");
    }
  });

  //testimonial carousel
  $("#carousel-testimonials").carousel({
    interval: 3000, //TIME IN MILLI SECONDS
  });

  // trigger page scroll trigger
  $("a.page-scroll").on("click", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1500,
        "easeInOutExpo"
      );
    event.preventDefault();
  });

  //portfolio tab nativation
  $(function () {
    var selectedClass = "";
    $(".fil-cat").on("click", function () {
      selectedClass = $(this).attr("data-rel");
      $("#portfolio").fadeTo(100, 0.1);
      $("#portfolio div")
        .not(`.${selectedClass}, .card-overlay`)
        .fadeOut()
        .removeClass("scale-anm");
      setTimeout(function () {
        $("." + selectedClass)
          .fadeIn()
          .addClass("scale-anm");
        $("#portfolio").fadeTo(300, 1);
      }, 300);
    });
  });

  // on-ready trigger
  $(document).ready(function () {
    // trigger parallax hover
    var scene = document.getElementById("scene");

    if (typeof Parallax == "function") var parallax = new Parallax(scene);

    // parallax background
    if (typeof $.fn.parallax == "function") $(".parallax-window").parallax();

    // Trigger skill bar
    if (typeof $.fn.appear == "function") {
      $(".skillbar").each(function () {
        $(this).appear(function () {
          $(this)
            .find(".count-bar")
            .animate(
              {
                width: jQuery(this).attr("data-percent"),
              },
              3000
            );
          var percent = jQuery(this).attr("data-percent");
          $(this)
            .find(".count")
            .html("<span>" + percent + "</span>");
        });
      });

      $("#bars").appear(function () {
        var circularBars = new CircularSkillBar("#bars .bar");
      });
    }

    // jQuery Ripples
    if (typeof $.fn.ripples == "function") {
      try {
        $(".ripple").ripples({
          resolution: 500,
          perturbance: 0.04,
        });
      } catch (e) {
        $(".error").show().text(e);
      }
    }

    // Fullpage model.html
    if (typeof $.fn.fullpage == "function") {
      $("#fullpage").fullpage({
        anchors: [
          "firstPage",
          "secondPage",
          "3rdPage",
          "4thpage",
          "5thpage",
          "6thpage",
          "7thpage",
        ],
        menu: "#bs-example-navbar-collapse-1",

        easingcss3: "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
        responsiveWidth: 992,
        slideSelector: ".fullpage-slide",
        autoScrolling: true,
        fitToSection: false,
        afterResponsive: function (isResponsive) {},
      });
    }

    //stat-counter increment
    $(".stat-count").each(function () {
      $(this).data("count", parseInt($(this).html(), 10));
      $(this).html("0");
      count($(this));
    });

    // at the end trigger window scroll and resize event
    $(window).trigger("resize").trigger("scroll");
  });

  function appendToFolio(arr, id) {
    var el = document.getElementById(id);
    arr.forEach(function (item) {
      let j = item.index;
      let htmlStr = `<div class="tile scale-anm all ${item.type} ">
            <img src="media/designer/portfolio/${j}.jpg" alt="" data-toggle="modal" data-target=".project-${j}" />
            <div class="card-overlay">
                <p class="project-title">${item.title}</p>
                <small class="project-description">${item.description}</small>
            </div>
          </div>`;

      //   Modal
      let htmlStr2 = `<div class="modal fade project-${j}" tabindex="-${j}" role="dialog">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <img src="media/designer/portfolio/${j}.jpg" alt="" class="img-responsive" />
              </div>
            </div>
          </div>`;

      el.insertAdjacentHTML("beforeend", htmlStr);
      $(el).after(htmlStr2);
    });
  }
  let webList = [
      { type: "web", index: 8, title: "Fijicare Website", description: "A Website for the client Fijicare health insurance" },
      { type: "web", index: 7, title: "Hodler WebApp", description: "A NFT Website and WebApp for the client dealing in crypto. \n Features: Payment Gatway, E-KYC, Wallet Money, Realtime data integrations." },
      { type: "web", index: 6, title: "Hodler WebApp", description: "A NFT Website and WebApp for the client dealing in crypto." },
    ],
    ipadList = [
        { type: "ipad", index: 10, title: "Tablet App", description: "Native app for client to collect customer data.\n Features: SSO Login, Camera, Location, Push Notifications" },
        { type: "ipad", index: 11, title: "Tablet App", description: "Native app for client to collect customer data. \n Features: SSO Login, Camera, Location, Push Notifications" },],
    crmList = [
        { type: "crm", index: 1, title: "WebApp/CRM", description: "CRM for manage customer data and users, with varias Roles. \n Features : Document Upload, Email Integration, Invoicing, Schedule Tasks etc." },
        { type: "crm", index: 2, title: "WebApp/CRM", description: "CRM for manage customer data and users, with varias Roles. \n Features : Document Upload, Email Integration, Invoicing, Schedule Tasks etc." },
        { type: "crm", index: 3, title: "WebApp/CRM", description: "CRM for manage customer data and users, with varias Roles. \n Features : Document Upload, Email Integration, Invoicing, Schedule Tasks etc." },
        { type: "crm", index: 4, title: "Client CRM", description: "CRM for manage customer data and users, with varias Roles. \n Features : Document Upload, Email Integration, Billing etc." },
        { type: "crm", index: 5, title: "Client CRM", description: "CRM for manage customer data and users, with varias Roles. \n Features : Graph, Document Upload, Email Integration, Billing etc." },
        { type: "crm", index: 9, title: "Client CRM", description: "CRM for manage customer data and users, with varias Roles. \n Features : Graph, Document Upload, Email Integration, Billing etc."  },
    ];
  let tabs = crmList.concat(ipadList, webList);
  appendToFolio(tabs, "portfolio");


})(jQuery);

/*---- helper functions ----*/

//counter increment helper
function count($this) {
  var current = parseInt($this.html(), 10);
  current = current + 1; /* Where 50 is increment */
  $this.html(++current);
  if (current > $this.data("count")) {
    $this.html($this.data("count"));
  } else {
    setTimeout(function () {
      count($this);
    }, 15);
  }
}
