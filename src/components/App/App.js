import React from 'react';
import './App.css';

class App extends React.Component {

    render() {
        return(
            <div className="App">
                <header className="App-header">
                    <span className="searchbar">searchbar</span>
                    <span className="ellipse1">My Courses</span>
                    <span className="ellipse2">Future Plan</span>
                    <span className="ellipse3">Cart</span>
                </header>
            </div>
            )
    }
}

export default App;
