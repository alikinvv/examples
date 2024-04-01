import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import 'normalize.css'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from 'styled-react-modal'
import { ToastContainerStyled } from 'react_component'

ReactDOM.render(
    <React.StrictMode>
        <ToastContainerStyled />
        <Provider store={store}>
            <BrowserRouter basename="/iso/portal">
                <ModalProvider>
                    <App />
                </ModalProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)
