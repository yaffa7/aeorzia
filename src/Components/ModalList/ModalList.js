import React from 'react'

export class ModalList extends React.Component {

    render() {
        const firstList = this.props.firstList.map((item)=>{
            return (
                <div onClick={()=>{this.props.firstListFunction(item)}}>{item.name}</div>
            )
        })

        
        console.log("list", firstList)
        return (
            <div>
                {firstList}
                {
                    this.props.secondList && 
                    this.props.secondListActiveObservable ? 
                    this.props.secondList.map((item) => {
                        return <div onClick={()=>{
                            this.props.secondListFunction(this.props.hero, item)
                        }}>{item.name}</div>
                    }): 
                    null
                }
            </div>
        )
    }
}

export default ModalList