import React from 'react';
import axios from 'axios';
import './List.css';

class List extends React.Component {
    state = {
      data: []
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps !== this.props) {
            nextState.data = nextProps.data
        }
        return nextProps.data !== this.props.data || nextState !== this.state
    }

    handleDeleteContact = async id => {
        const response = await axios.delete(`http://localhost:8000/list/${id}`);

        if(response.status >= 200 && response.status<300){
            this.props.update()
        }
    }

    render() {
        return (
            <ul>
                {this.state.data.map(item => (
                    <li key={item.id}>
                        {item.name} {item.lastName} {item.phone}
                        
                        <button onClick={() => this.handleDeleteContact(item.id)}>
                            Delete
                        </button>
                        <button onClick={()=> this.props.openEdit(item)}>
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        );
    }
}

export default List;