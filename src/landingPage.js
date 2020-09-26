
import React,{ Component } from 'react';
import './landingPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import UserService from './services/userservice'
class LandingPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            fields: {},
            errors: {},
            users:[]
        }
        this.editUser=this.editUser.bind(this);
        this.viewUser=this.viewUser.bind(this);
     }
 componentDidMount(){
     axios.get("http://54.202.218.249:9501/api/users").then(res => {
        const users = res.data;
        this.setState({ users });
      })
    // UserService.getUser().then((res) => {
    //     this.setState({ users: res.data});
    // });
 }
 deleteUser(id){
    UserService.deleteUser(id).then( res => {
        this.setState({users: this.state.users.filter(user => user.id !== id)});
    });
}
viewUser(id){
    this.props.history.push(`/view-employee/${id}`);
}
editUser(id){
    this.props.history.push(`/user/${id}`);
}
 handleRemoveRow = () => {
    this.setState({
      users: this.state.users.slice(0, -1)
    });
  };
     handleValidation(){
         let fields = this.state.fields;
         let errors = {};
         let formIsValid = true;

         //Name
         if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
         }
   
         if(typeof fields["name"] !== "undefined"){
            if(!fields["name"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["name"] = "Only letters";
            }        
         }
    
         //Email
         if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
         }
   
         if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "Email is not valid";
             }
        }  

        this.setState({errors: errors});
        return formIsValid;
    }
     
    contactSubmit(e){
         e.preventDefault();
         
         if(this.handleValidation()){
            const users = {
                fields:this.state.fields
            }
            axios.post('54.202.218.249:9501/api/users', users)
            .then(res => console.log(res.data));
            
            alert("Form submitted");
         }else{
            alert("Form has errors.")
         }
   
     }
      
update(e) {
    e.preventDefault();
    const employee = {
        fields:this.state.fields
    }
    axios.put('54.202.218.249:9501/api/users{this.state.id}', employee)
    .then(res => console.log(res.data));
}
handleDelete = (itemId) => {
    // Whatever you want to do with that item
    axios.delete("54.202.218.249:9501/api/users", { params: { _id: itemId } }).then(response => {
      console.log(response);
    });
}
  
     handleChange(field, e){         
         let fields = this.state.fields;
         fields[field] = e.target.value;        
         this.setState({fields});
     }
    render(){
        return(
          <div className="container">
                  	 <div className="register col-md-5 col-sm-6">
                <h1 className="title"><strong>Bio Data</strong>
				</h1>
                <form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
                    <div className="form-group">
                    <label className="reg_txt">Name <span>*</span></label>
                        <div className="controls form-inline">       
                          <input type="text" ref="name" className="input-name" placeholder="First" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                          <input type="text" className="input-name" ref="name" placeholder="Last" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
   					         </div>                   
                    </div>
                    <div className="clearfix"></div>
                    
                    <div className="form-group">
                    <label className="reg_txt">Email  <span>*</span></label>
                        <input type="text" className="form-register text" id="" placeholder="E-mail" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
                    </div>
                    <div className="clearfix"></div>
                    
                    <div className="form-group" style={{height:"70px"}}>
                    <label className="reg_txt">Phone Number  <span>*</span></label>
                    	<div className="clearfix"></div>
                       <div className="wsite-form">
							<input type="text" className="text input-name1"  onChange={this.handleChange.bind(this, "phonenumber")} value={this.state.fields["phonenumber"]}/>
					   </div>
                       <div className="line">-</div>
                       <div className="wsite-form">
							<input type="text" className="text input-name1"  onChange={this.handleChange.bind(this, "phonenumber")} value={this.state.fields["phonenumber"]}/>
					   </div>
                       <div className="line">-</div>
                       <div className="wsite-form">
							<input type="text" className="text input-name1" onChange={this.handleChange.bind(this, "phonenumber")} value={this.state.fields["phonenumber"]} />
					   </div>
                       
                    </div>
                    
                    <div className="clearfix"></div>
                    
                    <div className="form-group">
                    <label className="reg_txt">Address  <span>*</span></label>
                        <input type="text" className="form-register text" id="" placeholder="Line 1" style={{marginBottom:"15px"}} onChange={this.handleChange.bind(this, "address")} value={this.state.fields["address"]}/>
                        <input type="text" className="form-register text" id="" placeholder="Line 2" onChange={this.handleChange.bind(this, "address")} value={this.state.fields["address"]}/>
                    </div>
                    
                    <div className="form-group">                    
                        <div className="controls form-inline">       
                          <input type="text" className="input-name" placeholder="City"  onChange={this.handleChange.bind(this, "city")} value={this.state.fields["city"]}/>
                          <input type="text" className="input-name" placeholder="State" onChange={this.handleChange.bind(this, "state")} value={this.state.fields["state"]} />
   					    </div>                        
                    </div>
                    
                    <div className="form-group">                    
                        <div className="controls form-inline">       
                          <input type="text" className="input-name" placeholder="Zip Code"  onChange={this.handleChange.bind(this, "zipcode")} value={this.state.fields["zipcode"]}/>
                          <input type="text" className="input-name" placeholder="Country" onChange={this.handleChange.bind(this, "country")} value={this.state.fields["country"]}/>
   					    </div>                        
                    </div>
					
					<div className="form-group">
                    <label className="reg_txt">Write Your qualification <span>*</span></label>
                        <input type="text" class="form-register text" id="" placeholder="" style={{marginBottom:"15px"}} onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}/>
                        {/* <!-- <input type="text" class="form-register text" id="" placeholder="Add your qualification"> <span><img alt="" src="images/plus.png" class="add"></span>  */}
                    </div>
                    
                    
                    <div className="clearfix"></div>
                    
                    <div className="form-group">
                    <label className="reg_txt">Comment  <span>*</span></label>                        
                        <textarea class="form-register text" ></textarea>
                    </div>
                    
                    <div className="form-group">
                        <button type="submit" className="btn btn-default submit" style={{width:"97%"}}>Submit</button>
                    </div>
                    </form>
                </div>
                <div className="col-md-6 tabt">
		    <table className="table">
  
          <tbody>
		  <tr className="ztxt">
	  <th>FirstName</th>
      <th>lastName</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Edit</th>
	  <th>Delete</th>
	  <th>View</th>
      </tr>
        {this.state.users.map(user=><tr><td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        
	  
	  <td><button className="ed" onClick={ () => this.editUser(user.id)}>Edit</button></td>
	  <td><button className="ed" style={{background:"#f00"}} onClick={this.handleRemoveRow.bind(this)}>Delete</button></td>
	  <td><button className="ed"style={{background:"#000"}} onClick={ () => this.viewUser(user.id)}>View</button></td>
    </tr>)}
	</tbody>
	</table>
		</div>
          </div>
        )
    }
}
export default LandingPage;