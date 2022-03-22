import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    state = { loading: false };

    componentDidMount() {
        // 测试 devServer 的代理功能
        // fetch('/api/category')
        //     .then(resp => resp.json())
        //     .then(res => console.log('here here', res));
    }


    render() {
        const env = process.env;
        process.env.ID = 'jkwjhie897348yhfuhih^&*';
        console.log(env);
        return (
            <div className="App" style={{ height: '100vh' }}>
                <div className="App-header" style={{ height: '100%' }}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Infinity</h2>
                </div>
                {/* <p>{ this.state.loading.toString() }</p> */}
                <p>{ env.toString() }</p>
                {/* <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p> */}
            </div>
        );
    }
}

export default App;
