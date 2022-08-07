import React from "react"

export default function Body() {
    const [length,setLength] = React.useState(15)
    const [password,setPassword] = React.useState("")

    function handleChange(event){
        const {name} = event.target // getting the name of the button through event, to know whether to increment or decrement

        if(name === "increment" && length <30) setLength(prevLength => prevLength + 1)
        else if(name === "decrement" && length >10) setLength(prevLength => prevLength - 1)
    }

    function genPassword(){
        const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        const symbols = ['!','*','@','!','^','#']
        let password = "";

        for(let i = 0; i < length ; i++){
            const randomCharDecider = Math.round(Math.random() * 8)

            if(randomCharDecider === 4){
                const randomSymbol = symbols[Math.floor((Math.random()* 6))]
                console.log(randomSymbol)
                password+= randomSymbol;
            }

            else if(randomCharDecider > 4){
                const randomNumber = Math.floor((Math.random() * 10))
                password += randomNumber;
            }

            else {
                const randomLetter = alphabet[Math.floor((Math.random() * 26))]
                password += Math.floor(Math.random() * 2) === 1 ? randomLetter.toLowerCase() : randomLetter; // 50% chance for character to be uppercase or lowercase, whether the random generates 0 or 1.
            }
            }

        // messy solution maybe redo this entire function sometime, but it works for now.
        if (!symbols.some(v => password.includes(v))) { // if no symbols were generated, reroll
            genPassword();
        }
        else{
            navigator.clipboard.writeText(password) // copies password to clipboard.
            setPassword(password)
        }
    }

    return(
        <form className="Main">

            <h1>Generate a secure, random password</h1>
            <h3>Stop using <mark> unsecure </mark> passwords today!</h3>

            <div className="lengthManagement">
                <strong className="lengthText"> Password Length (10-30): </strong>
                <button type="button" id="decrement"onClick={handleChange} name="decrement">-</button>
                <strong className="length"> {length} </strong>
                <button type="button" id="increment" onClick={handleChange} name="increment">+</button>
            </div>

            <div className="generate">
                <button type="button" name="Generate" onClick={genPassword}>Generate a password</button>
            </div>

            <div className="genPasswords">
                <h1> {password} </h1>
                <text> once generated, the password is automatically copied to your clipboard</text>
            </div>

        </form>


    )



}