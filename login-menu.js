

export class LoginMenu {

    constructor() {
        this.nicknameInput = document.getElementById("nicknameInput");
        this.passwordInput = document.getElementById("passwordInput");
        
        this.loginButton = document.getElementById("loginButton");
        this.loginButton.addEventListener('click', async function() {
            if (this.nicknameInput.value == "" || this.passwordInput.value == "") return;
            
            if ((await login(this.nicknameInput.value, this.passwordInput.value)).success) game.startGame();
            else {
                this.loginButton.style.backgroundColor = "red";
                setTimeout(function(){
                    this.loginButton.style.backgroundColor = "";
                }, 1000)
            }
        });
        this.registerButton = document.getElementById("registerButton");
        this.registerButton.addEventListener('click', async function() {
        
            if (this.nicknameInput.value == "" || this.passwordInput.value == "") return;
        
            if ((await register(this.nicknameInput.value, this.passwordInput.value)).success) game.startGame();
            else {
                this.registerButton.style.backgroundColor = "red";
                setTimeout(function(){
                    this.registerButton.style.backgroundColor = "";
                }, 1000)
            }
        });
        
    }


}
