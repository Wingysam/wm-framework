const LAST_VOTED_LOCALSTORAGE_ID = 'wm-framework.lastVoted'

function promptToVote (id) {
  const voteModal = document.querySelector('#vote-modal')

  document.querySelector('#vote-modal-button')
    .addEventListener('click', () => {
      localStorage.setItem(LAST_VOTED_LOCALSTORAGE_ID, new Date())
      window.location.href = `http://blockheadsfans.com/servers/vote.php?id=${id}`
    })

  voteModal.classList.add('is-active')

  document.querySelector('#vote-modal-close')
    .addEventListener('click', () => {
      voteModal.classList.remove('is-active')
    })
}

module.exports = config => {
  if (!config.config.votepopup) return

  const lastVoted = localStorage.getItem(LAST_VOTED_LOCALSTORAGE_ID)
  
  if (!lastVoted) promptToVote(config.config.votepopup)

  const lastVotedDate = Date.parse(lastVoted)

  const date = new Date()

  date.setHours(date.getHours() - 6)

  if (lastVotedDate > date) return

  promptToVote(config.config.votepopup)
}