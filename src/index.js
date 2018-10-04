import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './contaiers/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

import './index.css';

const store = createStore(rootReducer, composeWithDevTools(
	applyMiddleware(thunk)
));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
