import React, { Component } from 'react';
import Display from "./Display";
class Bill extends Component {
    locale = 'en-IN'
  currency = 'INR'
    constructor(props) {
        super(props);
        this.state = {
            gst: 0,
            items: [{
                itemDesc: '',
                price: 0
            }],
            bill:[],
            edit:false
        }

    }
    handleAddItem(e) {
        e.preventDefault()
        let addItem = this.state.items
        this.setState({
            items: addItem.concat(
                [{ itemDesc: '', price: 0 }]
            )
        })
    }
    handleChangeGST(e){
        this.setState({gst:e.target.value})
    }
    handleChangeItems(e, elementIndex) {
        let items = this.state.items.map((item, i) => {
            if (elementIndex !== i) return item
            return { ...item, [e.target.name]: e.target.value }
        })
        this.setState({ items })
    }
    onGenerateBill(e){
        let allItem=this.state.items
        this.setState({
            bill:allItem
        })
    }
    formatCurrency = (amount) => {
        return (new Intl.NumberFormat(this.locale, {
          style: 'currency',
          currency: this.currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 3
        }).format(amount))
      }
    billTotal(){
        return this.state.bill.reduce((prev,cur)=>(prev+=parseInt(cur.price)),0)
    }
    calGST(){
        return this.billTotal()*(this.state.gst/100);
    }
    totalAmount(){
        return parseInt(this.billTotal())+ parseInt(this.calGST())
    }
    onHandleNew(){
        this.setState({
            items:[{
                itemDesc: '',
                price: 0
            }],
            gst:''
        })
    }
    onChangeEdit(){
        // e.preventDefault()
        this.setState({
            edit:true
        })
    }

    render() {
        return (
            <div className="main">
                <div className="container-left">
                <div className="new-btn">
                            <button onClick={e=>this.onHandleNew(e)}>New</button>
                        </div>
                    <div className="bill">
                    
                        <div className="bill-container">
                            <div className="bill-table  flex">
                                <div className="table">
                                    <div className="table-header">
                                        <div className="table-header-content item">
                                            ITEM
                                        </div>
                                        <div className="table-header-content rs">
                                            Rs.
                                        </div>
                                    </div>
                                    {this.state.items.map((item, i) => {
                                        return (
                                            <div className="table-content " key={i}>
                                                <div className="flex">
                                                    <div className="table-header-content item">
                                                        <input
                                                            className="input-field"
                                                            type="text"
                                                            value={item.itemDesc}
                                                            name="itemDesc"
                                                            onChange={e=>this.handleChangeItems(e,i)}
                                                        />
                                                    </div>
                                                    <div className="table-header-content rs">
                                                        <input
                                                            className="input-field"
                                                            type="number"
                                                            value={item.price}
                                                            name="price"
                                                            onChange={e=>this.handleChangeItems(e,i)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="btn-container">
                                    <button onClick={this.handleAddItem.bind(this)}>ADD</button>
                                </div>
                                

                            </div>
                            <div className="gst flex">
                                <div className="gst-con  flex">
                                    <div className="gst-label">GST(%)</div>
                                    <div>
                                        <input
                                            className="gst-input"
                                            type="number"
                                            value={this.state.gst}
                                            onChange={this.handleChangeGST.bind(this)}
                                        />
                                    </div>

                                </div>
                                <div className="generate-bill-con">
                                    <button onClick={e=>this.onGenerateBill(e)}>Generate Bill</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-right">
                  <div className="display">
                     {this.state.bill[0]&&
                     <Display 
                     generateBill={this.state.bill}
                     totalAmount={this.formatCurrency(this.totalAmount())}
                     edit={this.state.edit}
                     onChangeEdit={e=>this.onChangeEdit(e)}
                     />
                     
                     }
                  </div>
                  
                </div>
            </div>
        );
    }
}

export default Bill;