module.exports = () => {
  document.body.outerHTML = `
  <body>
    <style>
      @font-face {
        font-family: "blockheads";
        src: url("http://theblockheads.net/fonts/BlockheadsFont-Regular.ttf");
      }
    </style>
    <section class="section">
      <div class="container">
        <div id="vote-modal" class="modal">
          <div id="vote-modal-background" class="modal-background"></div>
          <div class="modal-content">
            <div class="box has-text-centered">
              <span id="vote-modal-message" class="is-size-3"></span>
              <br>
              <a id="vote-modal-button" class="button is-primary is-large">Vote</a>
            </div>
          </div>
          <button id="vote-modal-close" class="modal-close is-large" aria-label="close"></button>
        </div>
        <div class="content">
          <div id="custom-top" class="is-hidden"></div>
          <h1 class="title"></h1>
          <p class="subtitle is-hidden"></p>
          <div id="tags" class="field is-grouped is-grouped-multiline"></div>
          <div id="custom-middle" class="is-hidden"></div>
          <div id="lists"></div>
          <div id="custom-bottom" class="is-hidden"></div>
        </div>
      </div>
    </section>
  </body>
  `
  
  document.querySelector('head').innerHTML = `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
  <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
  `
}