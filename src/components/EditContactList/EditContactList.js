import React from 'react';
import axios from 'axios';
import './EditContactList.css';


class EditContactList extends React.Component {
    state = {
        name: '',
        lastName: '',
        phone: '',
        id: ""
    }

    componentDidMount(){
        this.setState(this.props.contact)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps !== this.props) {
            nextState = nextProps.contact
        }
        return nextProps.data !== this.props.data || nextState !== this.state
    }

    handleInput = e =>{
        let obj = {
            "edit-contact-name": "name",
            "edit-contact-lastName": "lastName",
            "edit-contact-phone": "phone"
        }
        let inpType = obj[e.target.className];
        const newState = {...this.state};
        newState[inpType] = e.target.value;
        this.setState( newState )
    }

    handleEditContact = async () => {
        const obj = { ...this.state }
        if(!this.state.name || !this.state.lastName || !this.state.phone) return

        const response = await axios.patch("http://localhost:8000/list/" + obj.id, obj);
        
        if(response.status >= 200 && response.status < 300) {
            this.props.update(response)
            this.props.closeEdit(null)
        }
        this.setState({
            name: '',
            lastName:'',
            phone:''
        })
    }
    
    closeEdit = ()=>{
        this.props.closeEdit(null)
    }

    render() {
        return(
            <div className='edit-contact'>
                <input 
                    onChange={this.handleInput}
                    value={this.state.name}
                    className="edit-contact-name"
                    placeholder="Name"
                    type="text"

                />
                <input 
                    onChange={this.handleInput}
                    value={this.state.lastName}
                    className="edit-contact-lastName"
                    placeholder="Last Name"
                    type="text"
                />
                <input 
                    onChange={this.handleInput}
                    value={this.state.phone}
                    className="edit-contact-phone"
                    placeholder="Phone"
                    type="number"
                />
                <button onClick={this.handleEditContact}>save</button>
                <button onClick={this.closeEdit}>cancel</button>
            </div>
        )
    }
}

export default EditContactList;
