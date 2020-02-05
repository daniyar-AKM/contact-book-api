import React from 'react';
import axios from 'axios'
import './AddContact.css';


class AddContact extends React.Component {
    state = {
        name: '',
        lastName:'',
        phone:''
    }

    handleInput = e =>{
        let obj = {
            "add-contact-name": "name",
            "add-contact-lastName": "lastName",
            "add-contact-phone": "phone"
        }
        let inpType = obj[e.target.className];
        const newState = {...this.state};
        newState[inpType] = e.target.value;
        this.setState( newState )
    }

    handleAddContact = async () => {
        const obj = {...this.state}
        if(!this.state.name || !this.state.lastName || !this.state.phone) return
        const response = await axios.post("http://localhost:8000/list",obj);
        if(response.status > 200 && response.status < 300) this.props.update()
        this.setState({
            name: '',
            lastName:'',
            phone:''
        })

    }
    

    render() {
        return(
            <div className='add-contact'>
                <input 
                    onChange={this.handleInput}
                    value={this.state.name}
                    className="add-contact-name"
                    placeholder="Name"
                    type="text"

                />
                <input 
                    onChange={this.handleInput}
                    value={this.state.lastName}
                    className="add-contact-lastName"
                    placeholder="Last Name"
                    type="text"
                />
                <input 
                    onChange={this.handleInput}
                    value={this.state.phone}
                    className="add-contact-phone"
                    placeholder="Phone"
                    type="number"
                />
                <button onClick={this.handleAddContact}>AddContact</button>
            </div>
        )
    }
}

export default AddContact;