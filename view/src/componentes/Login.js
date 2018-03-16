import React, {Component} from 'react';
import {browserHistory} from 'react-router';


export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {msg: this.props.location.query.msg}
    }

    autenticar(event) {
        event.preventDefault();

        const autenticacao = {
            login: this.login.value,
            senha: this.senha.value
        };


        fetch('http://localhost:8080/api/public/login',{
            method: 'POST',
            body: JSON.stringify(autenticacao),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }).then(response => {
            if (response.ok){
                return response.text();
            }else{
                throw new Error("não foi possível fazer login");
            }
        }).then(token => {
            localStorage.setItem('auth-token',token);
            browserHistory.push('/timeline');
        }).catch(error => {
            this.setState({msg:error.message});
        });
    }



    render(){
        return(
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.autenticar.bind(this)}>
                    <input type="text" ref={(input) => this.login = input}/>
                    <input type="password" ref={(i) => this.senha = i}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}