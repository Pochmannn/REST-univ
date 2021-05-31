import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.displayName = this.constructor.name;
        this.apiAddress = 'https://localhost:44385/api/cars';
        this.state = {
            items: [],
            newCarProducent: '',
            newCarModel: '',
            newCarTyp: '',
            newCarRokProdukcji: '',
            newCarKrajProdukcji: '',
            newCarPrzebiegKm: '',
            newCarMocKM: '',
            editedCar: {}
        };
        this.handleNewCarProducentChange = this.handleNewCarProducentChange.bind(this);
        this.handleNewCarModelChange = this.handleNewCarModelChange.bind(this);
        this.handleNewCarTypChange = this.handleNewCarTypChange.bind(this);
        this.handleNewCarRokProdukcjiChange = this.handleNewCarRokProdukcjiChange.bind(this);
        this.handleNewCarKrajProdukcjiChange = this.handleNewCarKrajProdukcjiChange.bind(this);
        this.handleNewCarPrzebiegKmChange = this.handleNewCarPrzebiegKmChange.bind(this);
        this.handleNewCarMocKMChange = this.handleNewCarMocKMChange.bind(this);

        this.handleEditCarProducentChange = this.handleEditCarProducentChange.bind(this);
        this.handleEditCarModelChange = this.handleEditCarModelChange.bind(this);
        this.handleEditCarTypChange = this.handleEditCarTypChange.bind(this);
        this.handleEditCarRokProdukcjiChange = this.handleEditCarRokProdukcjiChange.bind(this);
        this.handleEditCarKrajProdukcjiChange = this.handleEditCarKrajProdukcjiChange.bind(this);
        this.handleEditCarPrzebiegKmChange = this.handleEditCarPrzebiegKmChange.bind(this);
        this.handleEditCarMocKMChange = this.handleEditCarMocKMChange.bind(this);
    }

    componentDidMount() {
        this.getCars();
    }

    getCars() {
        fetch(this.apiAddress)
            .then(res => res.json())
            .then(data => this.setState({ items: data }))
            .catch(err => console.log(err));
    }

    deleteCar(id) {
        fetch(`${this.apiAddress}/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    alert('Id not found');
                }
                this.getCars();
            })
            .catch(err => console.log(err));
    }
    //Handle New
    handleNewCarProducentChange(event) {
        this.setState({ newCarProducent: event.target.value });
    }
    handleNewCarModelChange(event) {
        this.setState({ newCarModel: event.target.value });
    }
    handleNewCarTypChange(event) {
        this.setState({ newCarTyp: event.target.value });
    }
    handleNewCarRokProdukcjiChange(event) {
        this.setState({ newCarRokProdukcji: event.target.value });
    }
    handleNewCarKrajProdukcjiChange(event) {
        this.setState({ newCarKrajProdukcji: event.target.value });
    }
    handleNewCarPrzebiegKmChange(event) {
        this.setState({ newCarPrzebiegKm: event.target.value });
    }
    handleNewCarMocKMChange(event) {
        this.setState({ newCarMocKM: event.target.value });
    }
    //Handle Edit
    handleEditCarProducentChange(event) {
        this.setState({
            editedCar: {
                ...this.state.editedCar,
                producent: event.target.value
            }
        });
    }
    handleEditCarModelChange(event) {
        this.setState({
            editedCar: {
                ...this.state.editedCar,
                model: event.target.value
            }
        });
    }
    handleEditCarTypChange(event) {
        this.setState({
            editedCar: {
                ...this.state.editedCar,
                typ: event.target.value
            }
        });
    }
    handleEditCarRokProdukcjiChange(event) {
        this.setState({
            editedCar: {
                ...this.state.editedCar,
                rokProdukcji: event.target.value
            }
        });
    }
    handleEditCarKrajProdukcjiChange(event) {
        this.setState({
            editedCar: {
                ...this.state.editedCar,
                krajProdukcji: event.target.value
            }
        });
    }
    handleEditCarPrzebiegKmChange(event) {
        this.setState({
            editedCar: {
                ...this.state.editedCar,
                przebiegKm: event.target.value
            }
        });
    }
    handleEditCarMocKMChange(event) {
        this.setState({
            editedCar: {
                ...this.state.editedCar,
                mocKM: event.target.value
            }
        });
    }
    //Save
    saveCar(edit) {
        const fetchOptions = edit ?
            {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(this.state.editedCar)
            } :
            {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    producent: this.state.newCarProducent,
                    model: this.state.newCarModel,
                    typ: this.state.newCarTyp,
                    rokProdukcji: this.state.newCarRokProdukcji,
                    krajProdukcji: this.state.newCarKrajProdukcji,
                    przebiegKm: this.state.newCarPrzebiegKm,
                    mocKM: this.state.newCarMocKM

                })
            }
        const fetchAddress = edit ?
            `${this.apiAddress}/${this.state.editedCar.id}` :
            this.apiAddress;
        fetch(fetchAddress, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    alert("Error! Couldn't add the item");
                }
                this.getCars();
            })
            .catch(err => console.log(err));
        this.setState({ newCarProducent: '' });
        this.setState({ newCarModel: '' });
        this.setState({ newCarTyp: '' });
        this.setState({ newCarRokProdukcji: '' });
        this.setState({ newCarKrajProdukcji: '' });
        this.setState({ newCarPrzebiegKm: '' });
        this.setState({ newCarMocKM: '' });

    }

    editCar(item) {
        const itemsChanged = this.state.items
            .map(_item => ({
                ..._item, "edit": (item.edit ?
                    !item.edit && _item.id === item.id :
                    _item.id === item.id)
            }));
        this.setState({ items: itemsChanged });
        this.setState({
            editedCar: itemsChanged.find(i => i.id === item.id)
        });
    }

    render() {
        const listItems = this.state.items
            .map((item, index) => (
                <div class="mb-2" key={index.toString()}>
                    <div >
                        <div >
                            <div class="table table-striped table-dark border-danger text-center w-75">
                                <thead>
                                    <tr>                                       
                                        <th scope="col">Producent</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">Typ</th>
                                        <th scope="col">Rok Produkcji</th>
                                        <th scope="col">Kraj Produkcji</th>
                                        <th scope="col">Przebieg(km)</th>
                                        <th scope="col">Moc(KM)</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                     <tr>                                       
                                        <td>{item.producent}</td>
                                        <td>{item.model}</td>
                                        <td>{item.typ}</td>
                                        <td>{item.rokProdukcji}</td>
                                        <td>{item.krajProdukcji}</td>
                                        <td>{item.przebiegKm}</td>
                                        <td>{item.mocKM}</td>
                                        <button
                                            class="btn btn-primary"
                                            onClick={() => this.editCar(item)}>
                                            Edytuj
                                    </button>
                                        <button
                                            class="btn btn-danger"
                                            onClick={() => this.deleteCar(item.id)}>
                                            Usuń
                                        </button>
                                     </tr>
                                    
                                </tbody>
                              

                            </div>
                        </div>
                        
                    </div>
                    <div>
                       
                        {item.edit && this.state.editedCar.edit &&
                            <div>
                            <div class="table table-striped table-dark border-danger w-75">
                                    Producent:
                                    <input
                                        class="table table-striped table-dark border-danger"
                                        value={this.state.editedCar.producent}
                                        onChange={this.handleEditCarProducentChange} />
                                    Model:
                                    <input
                                    class="table table-striped table-dark border-danger "
                                        value={this.state.editedCar.model}
                                        onChange={this.handleEditCarModelChange} />
                                    Typ:
                                    <select
                                    class="table table-striped table-dark border-danger "
                                        value={this.state.editedCar.typ}
                                    onChange={this.handleEditCarTypChange} >
                                    <option selected>{this.state.editedCar.typ}</option>
                                    <option value="Kombi">Kombi</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Coupe">Coupe</option>
                                    </select>
                                    Rok Produkcji:
                                    <input
                                    class="table table-striped table-dark border-danger "
                                        value={this.state.editedCar.rokProdukcji}
                                        onChange={this.handleEditCarRokProdukcjiChange} />                                   
                                    Kraj Produkcji:
                                    <input
                                    class="table table-striped table-dark border-danger "
                                        value={this.state.editedCar.krajProdukcji}
                                        onChange={this.handleEditCarKrajProdukcjiChange} />
                                    Przebieg(km)
                                    <input
                                    class="table table-striped table-dark border-danger"
                                        value={this.state.editedCar.przebiegKm}
                                        onChange={this.handleEditCarPrzebiegKmChange} />
                                    Moc(KM)
                                    <input
                                    class="table table-striped table-dark border-danger "
                                        value={this.state.editedCar.mocKM}
                                        onChange={this.handleEditCarMocKMChange} />

                                    <button
                                    class="btn btn-danger"
                                        onClick={() => this.saveCar(true)}>
                                        Zapisz edycję
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>))
        return (
            <div>
                <div class="table table-striped table-dark border-danger w-75">
                    Dodaj nowy pojazd
                    <div class="col-sm">                       
                        <input
                            placeholder="Producent"
                            class="table table-striped table-dark border-danger "
                            value={this.state.newCarProducent}
                            onChange={this.handleNewCarProducentChange} />
                        <input
                            placeholder="Model"
                            class="table table-striped table-dark border-danger "
                            value={this.state.newCarModel}
                            onChange={this.handleNewCarModelChange} />
                        <select
                            placeholder="Typ"
                            class="table table-striped table-dark border-danger "
                            value={this.state.newCarTyp}
                            onChange={this.handleNewCarTypChange} >
                            <option value="Kombi">Kombi</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Coupe">Coupe</option>
                        </select>
                        <input
                            placeholder="Rok Produkcji"
                            class="table table-striped table-dark border-danger "
                            value={this.state.newCarRokProdukcji}
                            onChange={this.handleNewCarRokProdukcjiChange} />                      
                        <input
                            placeholder="Kraj Produkcji"
                            class="table table-striped table-dark border-danger "
                            value={this.state.newCarKrajProdukcji}
                            onChange={this.handleNewCarKrajProdukcjiChange} />
                        <input
                            placeholder="Przebieg (km)"
                            class="table table-striped table-dark border-danger "
                            value={this.state.newCarPrzebiegKm}
                            onChange={this.handleNewCarPrzebiegKmChange} />
                        <input
                            placeholder="Moc(KM)"
                            class="table table-striped table-dark border-danger "
                            value={this.state.newCarMocKM}
                            onChange={this.handleNewCarMocKMChange} />
                        <button
                            class="btn btn-primary ml-2"
                            onClick={() => this.saveCar()}>
                            Dodaj Samochód
                        </button>
                    </div>
                </div>
                {listItems}
            </div>
        );
    }
}