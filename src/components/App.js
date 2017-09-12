import React, {Component} from 'react';
import Jumbotron from './Jumbotron';
import '../styles/App.css';

class App extends Component {
  // PROPS AND STATE
  // Set props and state below.
  // You should set state for vehicles (empty array), value (empty string), pilot (empty) string.
  // Enter your code below:
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      vehicles: [],
      value: '',
      pilot: ''
    }
  }


  // FORM: HANDLE INPUT CHANGES
  // handleNameChange below:
  // See form lesson for details.
  // Enter your code below:
  handleNameChange(event) {
    this.setState({value: event.target.value})
  }


  //  FORM: SUBMIT METHOD
  // handleSubmit below:
  // See form lesson for details.
  // Once the form is sumbited, two things need to happen: set the state of pilot to the input value.
  // Then, set the value of the input back to an empty string.
  // Enter your code below:
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      pilot: this.state.value,
      value: ''
    })

  }

  // LIFECYCLE
  // Which lifecycle is best for fetching data?
  // Inside this lifecycle, you will fetch the vehicles from here: https://swapi.co/api/vehicles/
  // Once you have fetched that data, set the state of vehicles to the fetched data.
  // In your response look for 'results'. It should return this array.
  // You will want to use this array when you set the state of 'vehicles'. You will need this data in your render.
  // Enter your code below:
  componentDidMount() {
    fetch('https://swapi.co/api/vehicles/').then((response) => {
      return response.json()
    }).then((data) => {
      let vehicles = data.results;
      console.log(vehicles);
      this.setState({
        vehicles: vehicles
      })
    })
  }

  // RENDER
  // Before you can map over the data you've fetched, you will first need to store that 'state' in a variable.
  // Map over the data.
  // Don't forget to set the 'key'. In this case, use the vehicle name.
  // You will need the following values: name, model, manufacturer, class, passengers, crew, length, max speed, and cargo capacity.
  // Rendering: create a 'card' for each of the vehicles. consult the Bootstrap 4 docs for details.
  // Enter your code below:

  render() {
    /*
    Store vehicles state in a variable.
    Map over this variable to access the values needed to render.
    */
    let vehicleArray = this.state.vehicles;
    let vehicles = vehicleArray.map((vehicle) => {
      return (
        <div key={vehicle.name} className="card">
          <h4>Vehicle: {vehicle.name}</h4>
          <h5>Model: {vehicle.model}</h5>
          <div className="specs">
            <h5>Specs</h5>
            <ul>
              <li>Manufacturer: {vehicle.manufacturer}</li>
              <li>Class: {vehicle.vehicle_class}</li>
              <li>Passengers: {vehicle.passengers}</li>
              <li>Crew: {vehicle.crew}</li>
              <li>Length: {vehicle.length}</li>
              <li>Max Speed: {vehicle.max_atmosphering_speed}</li>
              <li>Cargo Capacity: {vehicle.cargo_capacity}</li>
            </ul>
          </div>
        </div>
      )
    })
    return (
      <div className="App">
        <Jumbotron />
        <div className="form">
          <h3>What is your name, pilot?</h3>
          <form className="form" onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleNameChange} placeholder="Enter your name"/>
            <input type="submit" value="Submit" />
          </form>
          <h1>{this.state.pilot}</h1>
        </div>
        {vehicles}
        {/*
        The App component needs the following:
         jumbotron section, form section, vehicle cards section.
         Your form will also need a header in which you will pass the state of the form upon submit.
         */}
      </div>
    )
  }
}

export default App;
