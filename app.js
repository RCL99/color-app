const cols = Array.from(document.querySelectorAll('.col'))

function generateRandomColor() {
    const hexCodes = '123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return color
}

const setRandomColor = (startColors) => {
    const startValues = startColors === undefined ? [] : startColors
    console.log(startColors)
    const allColors = []
    cols.forEach((col, id) => {
        const icon = col.querySelector('i')
        const header = col.querySelector('h2')


        if (icon.classList.contains('fa-lock')) {
            allColors.push(startValues[id] ? startValues[id] : header.textContent)
            return
        }

        const color = startValues[id] ? startValues[id] : chroma.random().toString()
        allColors.push(color)

        col.style.backgroundColor = color
        header.textContent = color

        setElementColor(header, color)
        setElementColor(icon, color)
    })
    updateLocationHash(allColors)
}

const setElementColor = (elem, color) => {
    const luminance = chroma(color).luminance()
    elem.style.color = luminance > 0.5 ? "black" : "white"
}

document.addEventListener('click', (e) => {
    const target = e.target

    if (target.dataset.type === 'lock') {
        target.classList.toggle('fa-lock')
        target.classList.toggle('fa-lock-open')
    }
    if (target.dataset.type === 'copy') {
        navigator.clipboard.writeText(target.textContent)
    }
})

document.addEventListener('keydown', (e) => {
    if (e.code.toLowerCase() === 'space') {
        setRandomColor()
    }
})

function updateLocationHash(colors) {
    if (!Array.isArray(colors) || colors.length === 0) return
    document.location.hash = colors.map(el => el.substring(1)).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(el => '#' + el)
    }
    return undefined
}

const startColors = getColorsFromHash()
setRandomColor(startColors)