const i1 = document.getElementById('i1')
var points = 0
var board = [
    '1','2','3','10','20','30','40',
    '50','50','50','50','50','50',
    '60','70','80','90',
    '100','100','100','100','100','100',
    '200','300','1000','1000',
    '×2','×½','⇅','T','T','T','T','T','T',]

function create_board (container) {
    for (i = 0; i < 49; i++) {
        square = document.createElement("div")
        container.appendChild(square)
        square.id = "i1"+ i
        if (i != 0) {
            if (i < 7) {
                square.innerHTML = String.fromCharCode(65 + (i-1))
            }
            if ((i / 7) % 1 === 0) { 
                square.innerHTML = i / 7
            }
            if (i > 7 && (i / 7) % 1 != 0) {
                rand_index = Math.floor(Math.random() * board.length)
                square.innerHTML = board[rand_index]
                square.classList.add('s' + board[rand_index])
                square.classList.add('square','unclicked')
                board.splice(rand_index,1)
            }
        }
    }
}

let teams = 2
let teamsWrapper = document.getElementById('teamsWrapper')

function addTeam() {
    let wrapper = document.createElement('div')
    teamsWrapper.appendChild(wrapper)

    let team = document.createElement('div')
    teams++
    team.contentEditable = 'true'
    team.innerHTML = 'team '

    let input = document.createElement('input')
    input.id = `input${teams}`
    input.type = 'text'
    input.className = 'input'

    wrapper.appendChild(team)
    wrapper.appendChild(input)
}

create_board(i1)

document.addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('unclicked')) {
        event.target.classList.remove('unclicked')
        points = event.target.innerHTML
        console.log(points)
    }
    if (event.target.classList.contains('input')) {
        var score = parseFloat(event.target.value)
        if (event.button === 0) {
            if (event.target.value === '') {
                score = 0
            }
            switch (points) {
                case 'T' : score = '0'; break
                case '×2': score = parseFloat(score) * 2; break
                case '×½': score = parseFloat(score) * 0.5; break
                case '⇅' : return;
                default  : score = parseFloat(score) + parseFloat(points); break
            }
        } else if (event.button === 2) {
            event.preventDefault()
            score = parseFloat(score) * 0.9
        }
        event.target.value = score
        score = ''
        points = '0'
    }
})

window.addEventListener('contextmenu', function(event) {
    if (event.target.classList.contains('input')) {
        event.preventDefault()
    }
}, false)