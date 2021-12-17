import React from 'react'
import {Accordion,Search} from './components';

const items = [
    {title: 'What is react?',
content: 'React is front end javascript library'},
    {title: 'Why use react?',
content: 'React is the most popular JS library used among front end engineers'},
    {title: 'How do you use react?',
content: 'React is used by creating components'},

];

const App = () => {
    return (
        <div className="widgets-container">
            <Search />
        </div>
    )
};

export default App;

