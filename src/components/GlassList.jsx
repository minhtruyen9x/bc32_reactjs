import React from 'react'

const GlassList = ({ glasses, glassSelect, onSelect }) => {
    return (
        <div className='bg-light py-2 mt-5' style={{ width: "80%", margin: "0 auto" }}>
            <div className="container-fluid">
                <div className="row">
                    {glasses.map(glass => (
                        <div className="col-4 col-md-3 col-lg-2" key={glass.id}>
                            <div
                                onClick={() => onSelect(glass)}
                                className="image p-1 m-1"
                                style={{
                                    outline: glass.id === glassSelect?.id ? "1px solid black" : "none",
                                    cursor: "pointer"
                                }}
                            >
                                <img className='img-fluid' src={glass.url} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default GlassList