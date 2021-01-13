import React, { Component } from 'react';

class Display extends Component {
    render() {
        return (
            <div>
                <div className="table">

                    <div className="table-header">

                        <div className="display-table-header">
                            <div className="edit-btn">
                                {this.props.edit?<button onClick={this.props.onChangeCancel}>Cancel</button>:<button onClick={this.props.onChangeEdit}>Edit</button>}
                            </div>
                        </div>
                    </div>
                    {this.props.generateBill.map((item, i) => {
                        return (
                            <div key={i} className="table-content">
                                <div className="flex">
                                    <div className="display-item-description item">
                                       
                                        {this.props.edit
                                        ?
                                        <input 
                                         className="input-field"
                                         value={item.itemDesc}
                                         name="itemDesc"
                                         onChange={this.props.handleChangeDisplayItems(i)}
                                        />
                                        :
                                        item.itemDesc
                                        }
                                    </div>
                                    <div className="dotted-line"></div>
                                    <div className="display-item-description amount">
                                        
                                        {this.props.edit?
                                        <input 
                                         className="input-field rs"
                                         value={item.price}
                                         name="price"
                                         onChange={this.props.handleChangeDisplayItems(i)}
                                        />
                                        :
                                        item.price
                                    }
                                    </div>
                                </div>
                            </div>
                            
                        )
                    })}
                    <div className="table-content">
                                <div className="flex">
                                    <div className="display-item-description item">
                                        Total
                                    </div>
                                    <div className="dotted-line"></div>
                                    <div className="display-item-description amount">
                                    {this.props.totalAmount}
                                    </div>
                                </div>
                            </div>
                    
                </div>
            </div>
        );
    }
}

export default Display;