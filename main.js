// Small enhancements only: the page works without JavaScript.

document.getElementById('year').textContent = new Date().getFullYear()

// Project cover follows the cursor while hovering a project (desktop only)
const preview = document.getElementById('preview')
if (matchMedia('(hover: hover) and (min-width: 880px)').matches) {
  let x = 0, y = 0, raf = 0
  const place = () => {
    raf = 0
    preview.style.left = `${x + 200}px`
    preview.style.top = `${y}px`
  }
  document.querySelectorAll('.project[data-img]').forEach((row) => {
    row.addEventListener('pointerenter', () => {
      preview.src = row.dataset.img
      preview.classList.add('is-on')
    })
    row.addEventListener('pointerleave', () => preview.classList.remove('is-on'))
    row.addEventListener('pointermove', (e) => {
      x = Math.min(e.clientX, innerWidth - 400)
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(place)
    })
  })
}

// Contact form: sent to Netlify Forms without leaving the page
const form = document.getElementById('contactForm')
const status = document.getElementById('formStatus')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (!form.reportValidity()) return
  const btn = form.querySelector('button')
  btn.disabled = true
  status.className = 'form__status'
  status.textContent = 'Envoi…'
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
    if (!res.ok) throw new Error()
    form.reset()
    status.classList.add('is-ok')
    status.textContent = 'Merci, votre message est bien parti. Je vous réponds rapidement.'
  } catch {
    status.classList.add('is-error')
    status.textContent = "L'envoi n'a pas fonctionné. Écrivez-moi directement à hakim.ouadie@gmail.com."
  } finally {
    btn.disabled = false
  }
})
