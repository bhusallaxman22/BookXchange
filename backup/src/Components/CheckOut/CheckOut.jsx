import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
function CheckOut(props) {
    const location = useLocation();
    const history = useHistory();
    const [item, setItem] = React.useState([]);
    const gfgfdg = { height: '200px', width: 'auto' }
    React.useEffect(() => {
        setItem(location.state.cart);
    }, [location.state.cart]);
    console.log("tttt", item);
    function handleClick(e) {
        const uid = props.userInfo.id
        const bowner = item[0].user[0];
        console.log("bowner", bowner);
        console.log("uid", uid);
        const formData = new FormData();
        formData.append('bowner', bowner);
        formData.append('bid', uid);
        axios.post('/api/v1/transfer', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res);
                history.push('/profile');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            {
                props.isLoggedin ? (
                    <Container style={{ padding: "20px", height: "85vh" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>BOOK ID</TableCell>
                                        <TableCell align="right">BOOK NAME</TableCell>
                                        <TableCell align="right">IMAGE</TableCell>
                                        <TableCell align="right">CREDIT</TableCell>
                                        <TableCell align="right">BUTTON</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item.map((item) => (
                                        <TableRow>
                                            { }
                                            <TableCell> {item.id}</TableCell>
                                            <TableCell align="right">{item.bname}</TableCell>
                                            <TableCell align="right">
                                                <img src={item.image} style={gfgfdg} alt="hh" />
                                            </TableCell>
                                            <TableCell align="right">{item.credit}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" onClick={e => handleClick(item)} color="primary">Buy </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Container>
                ) : (
                    history.push('/login')
                )
            }
        </div>
    )
}

export default CheckOut;

