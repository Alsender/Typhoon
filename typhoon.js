document.addEventListener('DOMContentLoaded', () => {
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

    create_board(i1)

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('unclicked')) {
            event.target.classList.remove('unclicked')
            points = event.target.innerHTML
            console.log(points)
        }
        if (event.target.classList.contains('input')) {
            var score = parseFloat(event.target.value)
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
            event.target.value = score
            score = ''
            points = '0'
        }
    })
})