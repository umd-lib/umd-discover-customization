(function () {
  ("use strict");

  // Use an empty dependency array (or list required modules). The empty string caused the "Module '' is not available" error.
  var app = angular.module("viewCustom", []);

  // ===================================================================
  // NO SEARCH RESULTS PAGE CUSTOMIZATION MODULE
  // ===================================================================
  // Enhance No Results tile
  app.controller("prmNoSearchResultAfterController", [
    function () {
      var vm = this;
      vm.getSearchTerm = getSearchTerm;
      vm.pciSetting =
        vm.parentCtrl.searchStateService.searchObject.pcAvailability || "";
      function getSearchTerm() {
        return vm.parentCtrl.term;
      }
    },
  ]);

  // Update links in template line below to show the help information, etc.
  app.component("prmNoSearchResultAfter", {
    bindings: { parentCtrl: "<" },
    controller: "prmNoSearchResultAfterController",
    template: `
    <div class="no-results">
      <div class="title">
        <h2>No records found</h2>
        <p>
          <span>There are no results matching your search term.
          </span>
        </p>
      </div>
      <hr />
      <div class="refine-search">
        <h3>Refine Your Search</h3>
        <p>Try these strategies to improve your search results:</p>
        <div class="content">
          <ol>
            <li>
              Check your spelling
              <p>Ensure all words are spelled correctly.</p>
            </li>
            <li>
              Adjust your keywords
              <ul>
                <li>Use synonyms or related terms.</li>
                <li>Try more general keywords.</li>
                <li>Remove some keywords to broaden your search.</li>
              </ul>
            </li>
            <li>
              Use search techniques
              <ul>
                <li>Put phrases in quotes (e.g., "climate change").</li>
              </ul>
            </li>
            <li>
              Modify search scope
              <p>
                Expand or narrow your search to different collections or material
                types.
              </p>
            </li>
          </ol>
        </div>
        
      </div>
      <hr />
      <div class="additional">
          <h3>Additional Resources</h3>
          <div class="worldcat">
            <a
              href="https://umaryland.on.worldcat.org/discovery"
            >WorldCat UMD</a>
            <p>Search and request from other libraries.</p>
          </div>
          <div class="specialist">
            <a
              href="https://lib.guides.umd.edu/SubjectSpecialists/BySubject"
            >Subject Specialists</a>
            <p>
              Get personalized assistance from a librarian with expertise in your
              subject area.
            </p>
          </div>
        </div>
    </div>
  `,
  });
})();
