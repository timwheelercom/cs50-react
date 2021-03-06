import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

let id = 0;

const Todo = props => (
    <li>
        <input type="checkbox" checked={props.todo.checked} onChange={props.onToggle} />
        <button onClick={props.onDelete}>delete</button>
        <span>{props.todo.text}</span>
    </li>
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    addTodo() {
        const text = prompt("Enter a todo");
        this.setState({
            todos: [...this.state.todos, { id: id++, text: text, checked: false }]
        });
    }

    removeTodo(id) {
        this.setState({
            // as long as todo id is not equal to id passed in, return todos
            // AKA delete or filter out the selected todo
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }

    toggleTodo(id) {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id !== id) return todo;
                return {
                    id: todo.id,
                    text: todo.text,
                    checked: !todo.checked
                };
            })
        });
    }

    render() {
        return (
            <div>
                <div>Todo Count: {this.state.todos.length}</div>
                <div>Uncomplete Todos: {this.state.todos.filter(todo => !todo.checked).length}</div>
                <button onClick={() => this.addTodo()}>Add Todo</button>
                <ul>
                    {this.state.todos.map(todo => (
                        <Todo
                            onToggle={() => this.toggleTodo(todo.id)}
                            onDelete={() => this.removeTodo(todo.id)}
                            todo={todo} />
                    ))}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));