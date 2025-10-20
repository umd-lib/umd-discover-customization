(function () {
  ("use strict");

  // Use an empty dependency array (or list required modules). The empty string caused the "Module '' is not available" error.
  var app = angular.module("viewCustom", []);

  // ===================================================================
  // FILTER EXTERNAL SEARCH OPTION MODULE
  // ===================================================================
  app.value("searchTargets", [
    {
      name: "WorldCat UMD",
      url: "https://umaryland.on.worldcat.org/search?queryString=",
      img: "/",
      mapping: function mapping(search) {
        if (Array.isArray(search)) {
          var ret = "";
          for (var i = 0; i < search.length; i++) {
            var terms = search[i].split(",");
            ret += " " + (terms[2] || "");
          }
          return ret.trim();
        } else {
          var terms = search.split(",");
          return terms[2] || "";
        }
      },
    },
  ]);

  app.component("prmFacetExactAfter", {
    bindings: { parentCtrl: "<" },
    template: `
        <div ng-if="$ctrl.showExternalSearch">
            <div ng-hide="$ctrl.parentCtrl.facetGroup.facetGroupCollapsed">
                <div class="section-content animate-max-height-variable">
                    <div class="md-chips md-chips-wrap">
                        <div ng-repeat="target in $ctrl.targets" aria-live="polite" class="md-chip animate-opacity-and-scale facet-element-marker-local4">
                            <div class="md-chip-content layout-row" role="button" tabindex="0">
                                <strong dir="auto" title="{{target.name}}">
                                    <a ng-href="{{$ctrl.getSearchUrl(target)}}" target="_blank">
                                        {{target.name}}
                                    </a>
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    controller: [
      "$scope",
      "$location",
      "searchTargets",
      function ($scope, $location, searchTargets) {
        var ctrl = this;
        this.$onInit = function () {
          ctrl.targets = searchTargets;
          ctrl.showExternalSearch =
            ctrl.parentCtrl.facetGroup.name === "Can't find what you need?";

          var query = $location.search().query;
          var filter = $location.search().pfilter;
          ctrl.queries = Array.isArray(query) ? query : query ? [query] : false;
          ctrl.filters = Array.isArray(filter)
            ? filter
            : filter
            ? [filter]
            : false;
        };

        this.getSearchUrl = function (target) {
          return (
            target.url + target.mapping(ctrl.queries || "", ctrl.filters || "")
          );
        };
      },
    ],
  });

  app.factory("externalSearchService", [
    "$interval",
    "$compile",
    "$rootScope",
    function ($interval, $compile, $rootScope) {
      return {
        get controller() {
          return this.prmFacetCtrl || false;
        },
        set controller(controller) {
          this.prmFacetCtrl = controller;
        },
        addExtSearch: function () {
          var sv = this;
          var checkExist = $interval(function () {
            if (
              sv.prmFacetCtrl &&
              sv.prmFacetCtrl.facetService.results[0] &&
              sv.prmFacetCtrl.facetService.results[0].name !=
                "Can't find what you need?"
            ) {
              if (
                !sv.prmFacetCtrl.facetService.results.find(
                  (facet) => facet.name === "Can't find what you need?"
                )
              ) {
                sv.prmFacetCtrl.facetService.results.unshift({
                  name: "Can't find what you need?",
                  displayedType: "exact",
                  limitCount: 0,
                  facetGroupCollapsed: false,
                  values: undefined,
                });
              }
              $interval.cancel(checkExist);
            }
          }, 100);

          var checksSpan = $interval(function () {
            const externalSearchElements = document.getElementsByClassName(
              "sidebar-section available-facets"
            );
            for (let i = 0; i < externalSearchElements.length; i++) {
              const externalSearch = externalSearchElements[i];
              const spanElement = externalSearch.querySelector("span");
              if (
                spanElement &&
                spanElement.innerText.trim() === "Can't find what you need?"
              ) {
                externalSearch.classList.add("move-up");
                $interval.cancel(checksSpan);
                break;
              }
            }
          }, 100);
        },
      };
    },
  ]);

  app.component("prmFacetAfter", {
    bindings: { parentCtrl: "<" },
    controller: [
      "externalSearchService",
      function (externalSearchService) {
        this.$onInit = function () {
          externalSearchService.controller = this.parentCtrl;
          externalSearchService.addExtSearch();
        };
      },
    ],
  });

  app.component("prmPageNavMenuAfter", {
    controller: [
      "externalSearchService",
      function (externalSearchService) {
        this.$onInit = function () {
          if (externalSearchService.controller) {
            externalSearchService.addExtSearch();
          }
        };
      },
    ],
  });
})();
