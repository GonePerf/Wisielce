
let password = prompt("Zaszyfruj hasło")
let hided_password = ""
let pass_length = password.length
let alphabet = 'aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż'
let fails = 0

for(let i = 0; i < pass_length; i++){
    if(password.charAt(i) !== ' '){
        hided_password += '-'
    }
    else{
        hided_password += ' '
    }
}

function write_password(){
    document.getElementById('board').innerHTML = hided_password
}

function start(){
    let content = ''
    
    for(let i = 0; i < 35; i++){
        let elem = 'letter' + i
        
        content += '<div class="letter active_letter" id=' + elem + ' onclick="check(' + i + ')">' + alphabet.charAt(i).toUpperCase() + '</div>'
        if((i+1) % 7 == 0){
            content += '<div style="clear: both;"></div>'
        }
    }
    
    document.getElementById('alphabet').innerHTML = content
    write_password()
}

function setLetter(index, letter){
    if(index > hided_password.length -1){
        return hided_password.toString()
    }
    else{
        return hided_password.substring(0, index) + letter + hided_password.substring(index + 1)
    }
}

function check(num){
    let hit = false
    for(let i = 0; i < pass_length; i++){
        if(password.charAt(i) == alphabet.charAt(num)){
            hided_password = setLetter(i, alphabet.charAt(num))
            hit = true
        }
    }
    if(hit == true){
        let elem = 'letter' + num
        document.getElementById(elem).style.background = '#005500'
        document.getElementById(elem).style.cursor = 'default'
        document.getElementById(elem).classList.remove('active_letter')
        write_password()
    }
    else{
        let elem = 'letter' + num
        document.getElementById(elem).style.background = '#550000'
        document.getElementById(elem).style.cursor = 'default'
        document.getElementById(elem).classList.remove('active_letter')
        document.getElementById(elem).setAttribute('onclick', ';')
        fails ++
        document.getElementById('state').innerHTML = '<img src="img/s' + fails + '.jpg">'
    }
    
    if(password == hided_password){
       document.getElementById('alphabet').innerHTML = ' Wygrałeś!!! :D <br /><br /><br /> <span class="reset" onclick="location.reload()">Reset</span>'
    }
    
    if(fails >= 9){
        document.getElementById('alphabet').innerHTML = ' Przegrałeś :( :( Prawidłowe hasło: <br /> "' + password + '" <br /><br /><br /> <span class="reset" onclick="location.reload()">Reset</span>'
    }
    
}

window.onload = start