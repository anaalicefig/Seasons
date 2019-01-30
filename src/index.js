import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './components/SeasonDisplay';
import Loader from './components/Loader';

class App extends React.Component {
    state = { lat: null, errorMessage: '' };
    
    componentDidMount() {
        // console.log('My component was rendered to the screen');
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                // the only way to update state is using setState
                this.setState({ lat: position.coords.latitude})

                // NEVER do that:
                // this.state.lat = position.coords.latitude

            }, //success
            (err) => {
                this.setState({ errorMessage: err.message })
            } //failure
        );
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        } 

        else if (!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />;
        } 

        return <Loader message="Please accept location request" />
    }

    // React says we have to define render!!
    render() {
        return this.renderContent();
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
