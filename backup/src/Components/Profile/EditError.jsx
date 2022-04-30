import React from 'react'
import { Link } from 'react-router-dom'

export default function EditError() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            alignContent: 'center',
            alignItems: "center",
            height: '85vh'

        }}>
            <div>
                <p style={{ color: 'red' }}>Looks like you directly jumped to this page.</p>
                <p><h4>Go back to <Link to={"/myBooks"}>Previous Page</Link>and select item you want.</h4></p>
            </div>
        </div>
    )
}
