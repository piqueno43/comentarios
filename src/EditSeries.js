import React, { Component } from 'react'
import api from './Api'
import { Redirect } from 'react-router-dom'
const status = {
    'watched': 'Assistido',
    'watching': 'Assistindo',
    'toWatch': 'Assistir'
}

class EditSeries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genres: [],
            isLoading: false,
            redirect: false,
            series: {}
        }
        this.saveSeries = this.saveSeries.bind(this)
    }
    componentDidMount() {
        this.setState({ isLoading: true })
        api.loadSeriesById(this.props.match.params.id)
            .then((res) => this.setState({ series: res.data }))
        api.loadGenres()
            .then((res) => {
                this.setState({
                    isLoading: false,
                    genres: res.data,

                })
            })

    }
    saveSeries() {
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            comments: this.refs.comments.value,
            genre: this.refs.genres.value
        }
        api.saveSeries(newSeries)
            .then((res) => {
                this.setState({
                    redirect: '/series/' + this.refs.genre.value
                })
            })

    }
    render() {
        return (
            <section className="intro-section" >
                {
                    this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <h1>Série edit</h1>
                <form>
                    Nome: <input type="text" defaultValue={this.state.series.name} ref='name' className="form-control" /><br />
                    Comentários: <textarea className="form-control" defaultValue={this.state.series.comments} ref='comments'></textarea><br />
                    Status: <select className="form-control" ref='status'>
                        {Object
                            .keys(status).map(key => <option key={key} value={key}>{status[key]}</option>)}
                    </select>
                    Genero: <select className="form-control" ref='genres'>
                        {this.state.genres
                            .map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                    <button className="btn btn-primary" onClick={this.saveSeries}>Salvar</button>
                </form>
            </section >
        )
    }
}
export default EditSeries