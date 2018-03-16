import React, { Component } from 'react';
import FotoItem from './FotoItem';

export default class Timeline extends Component {


    constructor(){
        super();
        this.state = {fotos: []};
    }


    componentDidMount(){
        fetch('http://localhost:8080/api/public/fotos/alots')
            .then(resultado => resultado.json())
            .then(json => {
                this.setState({fotos:json});
            });
    }

    render(){
        return (
            <div className="fotos container">


                {
                    this.state.fotos.map(foto => <FotoItem foto={foto}/>)

                }

            </div>
        );
    }
}