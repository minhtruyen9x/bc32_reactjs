import React, { Component } from 'react'
import AvatarCard from './AvatarCard'
import GlassList from './GlassList'
import data from "../data/glassdata.json"

export default class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            glassSelect: null
        }
    }

    handleGlassSelect = (glass) => {
        this.setState({ glassSelect: glass })
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6">
                        <AvatarCard glassSelect={this.state.glassSelect} />
                    </div>
                    <div className="col-6">
                        <AvatarCard />
                    </div>
                    <div className="col-12">
                        <GlassList
                            onSelect={this.handleGlassSelect}
                            glasses={data}
                            glassSelect={this.state.glassSelect}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
