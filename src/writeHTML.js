module.exports = () => {
  document.body.outerHTML = `
  <body>
    <style>
    </style>
    <section class="section">
      <div class="container">
        <div class="content">
          <div id="custom-top" class="is-hidden"></div>
          <h1 class="title">
            World
          </h1>
          <p class="subtitle is-hidden">
          Tag
          </p>
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